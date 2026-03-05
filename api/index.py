import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Rayhan's Portfolio API")

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    # We don't crash here so it can build on Vercel, but endpoints will error
    supabase: Client = None
else:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    db_status = "connected" if supabase else "missing credentials"
    return {"status": "up", "owner": "Rayhan", "database": db_status}

@app.get("/api/content")
async def get_all_content():
    """Fetches all portfolio data from Supabase tables."""
    if not supabase:
        throw_auth_error()

    try:
        # Fetch all sections in parallel (conceptually, though sequential here for simplicity)
        personal = supabase.table("personal_info").select("*").single().execute()
        skills = supabase.table("skills").select("*").order("sort_order").execute()
        experience = supabase.table("experience").select("*").order("sort_order").execute()
        projects = supabase.table("projects").select("*").order("sort_order").execute()
        quotes = supabase.table("quotes").select("*").execute()

        return {
            "personalInfo": personal.data,
            "skills": skills.data,
            "experiences": experience.data,
            "projects": projects.data,
            "quotes": quotes.data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/content/{section}")
async def get_section(section: str):
    """Fetches a specific section from the corresponding table."""
    if not supabase:
        throw_auth_error()

    # Map section name to table name
    table_map = {
        "personalInfo": "personal_info",
        "skills": "skills",
        "experiences": "experience",
        "projects": "projects",
        "quotes": "quotes"
    }

    table_name = table_map.get(section)
    if not table_name:
        raise HTTPException(status_code=404, detail="Section not found")

    try:
        query = supabase.table(table_name).select("*")
        
        # Apply sorting where applicable
        if table_name in ["skills", "experience", "projects"]:
            query = query.order("sort_order")

        result = query.execute()
        
        # personal_info is a single object
        if section == "personalInfo":
            return result.data[0] if result.data else {}
            
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def throw_auth_error():
    raise HTTPException(
        status_code=503, 
        detail="Database connection not configured. Please add SUPABASE_URL and SUPABASE_KEY to environment variables."
    )
