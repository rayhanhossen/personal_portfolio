-- Portfolio Database Schema Setup for Supabase

-- 1. Table: Personal Information
CREATE TABLE IF NOT EXISTS personal_info (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    location TEXT,
    timezone TEXT,
    notice_period TEXT,
    whatsapp TEXT,
    linkedin TEXT,
    github TEXT,
    facebook TEXT,
    instagram TEXT,
    cv_link TEXT,
    about TEXT[] -- Array of paragraphs
);

-- 2. Table: Skills
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    items TEXT[] NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- 3. Table: Experience
CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    period TEXT,
    start_date TEXT, -- YYYY-MM
    end_date TEXT,   -- YYYY-MM or 'Present'
    description TEXT[] NOT NULL,
    skills TEXT[] DEFAULT '{}',
    sort_order INTEGER DEFAULT 0
);

-- 4. Table: Projects
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    category TEXT CHECK (category IN ('professional', 'small')),
    live_link TEXT,
    source_link TEXT,
    sort_order INTEGER DEFAULT 0
);

-- 5. Table: Quotes
CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    author TEXT NOT NULL
);

-- --- PRE-SEEDING DATA (Rayhan's current content) ---

-- Clean existing data before seeding
TRUNCATE personal_info, skills, experience, projects, quotes RESTART IDENTITY;

-- Personal Info
INSERT INTO personal_info (name, title, email, phone, location, timezone, notice_period, whatsapp, linkedin, github, facebook, instagram, cv_link, about)
VALUES (
    'Rayhan', 'Software Engineer', 'to.rayhanhossen@gmail.com', '+8801621145012', 
    'Dhaka, Bangladesh', 'GMT+6', '2 Months', 'https://wa.me/8801621145012', 
    'https://www.linkedin.com/in/rayhanhossen/', 'https://github.com/rayhanhossen', 
    'https://www.facebook.com/maverickrayhan/', 'https://www.instagram.com/maverickrayhan/', 
    'https://drive.google.com/uc?export=download&id=1WoS8uMgPH64ywzrcrXLm4kCwA-VqTaaG',
    ARRAY[
        'Experienced Software Engineer building and scaling backend systems across fintech, telecommunications, and e-commerce — proficient in <strong class="text-white font-semibold">Django, FastAPI, PostgreSQL, Docker</strong> and AWS.',
        'Currently focused on AI-powered systems, leveraging <strong class="text-cyan-400 font-medium">LLMs, RAG, and Model Content Processors (MCP)</strong> to build intelligent, data-driven backend platforms.'
    ]
);

-- Skills
INSERT INTO skills (category, items, sort_order) VALUES
('Programming', ARRAY['Python', 'TypeScript', 'JavaScript'], 1),
('Frameworks', ARRAY['Django', 'FastAPI', 'NestJS'], 2),
('Front-End', ARRAY['React', 'HTML5', 'CSS3'], 3),
('Databases', ARRAY['PostgreSQL', 'MSSQL'], 4),
('Caching & Messaging', ARRAY['Redis', 'Celery'], 5),
('Cloud & DevOps', ARRAY['AWS Lambda', 'AWS S3', 'AWS EC2', 'Docker', 'CI/CD pipelines', 'Git'], 6),
('AI & Data Processing', ARRAY['LLM', 'RAG', 'MCP'], 7),
('Automation & Testing', ARRAY['Selenium', 'Pandas', 'OpenCV', 'PaddleOCR', 'AutoIT'], 8),
('Development Methodologies', ARRAY['Sprint Planning', 'Code Reviews'], 9);

-- Experience
INSERT INTO experience (role, company, location, period, start_date, end_date, description, skills, sort_order) VALUES
('BI System Engineer', 'BRAC IT Services Limited', 'Dhaka, Bangladesh', 'Jun 2025 - Present', '2025-06', 'Present', ARRAY['Build interactive dashboards using <strong>Python</strong> and <strong>Django</strong>, enabling data-driven decisions and analytics across internal teams.', 'Apply <strong>LLMs</strong>, <strong>RAG</strong>, and <strong>Model Content Processors (MCP)</strong> to build intelligent backend systems for processing unstructured data.'], ARRAY['Python', 'Django', 'LLM', 'RAG', 'MCP'], 1),
('Software Engineer', 'BRAC IT Services Limited', 'Dhaka, Bangladesh', 'Feb 2024 - May 2025', '2024-02', '2025-05', ARRAY['Developed an eKYC identity verification system using <strong>FastAPI</strong>, <strong>PaddleOCR</strong>, and <strong>Amazon Rekognition</strong>.', 'Enhanced the OCR pipeline with <strong>Google Translate API</strong> to support Bangla-to-English text conversion.', 'Designed and deployed a containerized <strong>Python-Flask</strong> backend for scalable employee data processing, integrated with <strong>Apache Spark</strong> and <strong>Iceberg</strong>, and automated setup via <strong>Docker</strong> multi-stage builds.', 'Built RPA workflows automating CIB data extraction using <strong>Selenium</strong>, <strong>Pandas</strong>, <strong>OpenCV</strong>, <strong>AutoIT</strong>, and <strong>PaddleOCR</strong>.', 'Contributed to backend infrastructure by configuring <strong>Red Hat Linux</strong> servers, enabling server-to-server communication, and deploying secure, scalable APIs with <strong>Nginx</strong>.'], ARRAY['FastAPI', 'PaddleOCR', 'AWS Rekognition', 'Docker', 'Selenium', 'Pandas', 'Linux/Nginx'], 2),
('Team Lead - Site Furnishing & Critical Deployment', 'Daniyal Technologies', 'Remote', 'Sep 2023 - Dec 2023', '2023-09', '2023-12', ARRAY['Led <strong>cross-functional frontend and backend teams</strong> to deliver mission-critical e-commerce projects on time, maintaining high code quality and system performance.', 'Directed the design, development, and deployment of new features, contributing to a <strong>continuous cycle of product improvement</strong> and customer value delivery.', 'Facilitated daily stand-ups and sprint planning sessions, monitored team progress, and resolved <strong>technical and operational blockers</strong>.', '<strong>Mentored junior developers</strong> on best practices and collaborated with stakeholders to align technical execution with evolving business requirements.'], ARRAY['Team Leadership', 'Project Management', 'Agile/Scrum', 'Code Review', 'Mentorship'], 3),
('Software Engineer - II', 'Daniyal Technologies', 'Remote', 'Jul 2022 - Aug 2023', '2022-07', '2023-08', ARRAY['Developed scalable <strong>RESTful APIs</strong> for a multi-store e-commerce platform using <strong>NestJS</strong> and <strong>TypeScript</strong>, ensuring modular architecture and high performance.', 'Integrated <strong>NMI payment gateway</strong> to enable secure transactions, incorporating robust error handling and transaction lifecycle management.', 'Implemented delivery logistics with <strong>FedEx and UPS APIs</strong> to automate shipping rate calculation, real-time tracking, and label generation.', 'Collaborated with frontend and QA teams to support API integration and testing, following <strong>Git workflows</strong>, code reviews, and documentation standards.'], ARRAY['NestJS', 'TypeScript', 'REST APIs', 'Payment Gateway Integration', 'FedEx/UPS APIs'], 4),
('Software Engineer', 'Divergent Technologies Ltd', 'Dhaka, Bangladesh', 'Dec 2020 - Jun 2022', '2020-12', '2022-06', ARRAY['Built and maintained an LDAP-based access management system using <strong>Python</strong>, <strong>Django</strong>, <strong>Celery</strong>, <strong>Redis</strong>, and <strong>PostgreSQL</strong>, automating provisioning for telecom enterprise users.', 'Developed backend micro-services using <strong>NestJS</strong> and <strong>TypeScript</strong> for fintech features like merchant onboarding, leveraging <strong>DynamoDB</strong> and <strong>Docker</strong> for scalability.', 'Automated enterprise workflows with <strong>Selenium</strong>, <strong>AutoIT</strong>, and <strong>Pandas</strong>, including SMS notifications, SAP vendor payments, and remote file processing.', 'Collaborated within Agile teams, performed code reviews, and ensured secure, maintainable backend delivery aligned with <strong>industry best practices</strong>.'], ARRAY['Python', 'Django', 'Celery/Redis', 'PostgreSQL', 'NestJS', 'Docker', 'Selenium'], 5),
('Web Developer', 'Weabers', 'Dhaka, Bangladesh', 'Sep 2020 - Dec 2020', '2020-09', '2020-12', ARRAY['Developed responsive frontend components using <strong>HTML5</strong>, <strong>CSS3</strong>, and <strong>JavaScript</strong> to enhance UX for SME clients.'], ARRAY['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'], 6);

-- Projects
INSERT INTO projects (title, description, image_url, tech_stack, category, live_link, source_link, sort_order) VALUES
('Smart Document Assistant (LLM + RAG + FAISS)', 'AI-powered PDF question-answering assistant using FastAPI, SentenceTransformers, TinyLLaMA, and FAISS for vector-based semantic search — enabling intelligent content understanding and zero-shot contextual query handling across unstructured documents via a custom MCP pipeline.', '/project_smart_doc.png', ARRAY['LLM', 'RAG', 'Python', 'FAISS'], 'professional', 'https://www.google.com', 'https://www.google.com', 1),
('Brac Bank eKYC System', 'Built an automated identity verification platform using FastAPI, PaddleOCR, and Amazon Rekognition. Added Bangla-to-English OCR translation and scalable REST endpoints. Managed async background jobs with Celery and Docker for containerized execution.', '/project_ekyc.png', ARRAY['FastAPI', 'PaddleOCR', 'Celery', 'Docker'], 'professional', '#', '#', 2),
('Robi Axiata UAM (User Access Management)', 'Engineered an LDAP-based enterprise user management system for Robi Axiata using Django, PostgreSQL, Redis, and Celery — automating provisioning across telecom services and eliminating manual onboarding overhead. Secured via Docker deployment with role-based access workflows.', '/project_uam.png', ARRAY['DRF', 'VueJS', 'Docker', 'Celery', 'Redis'], 'professional', '#', '', 3),
('Bkash Merchant Portal', 'Scalable fintech platform using NestJS, API Gateway, and DynamoDB enabling efficient merchant onboarding and real-time transaction handling for 1,400+ active merchants. Improved observability with centralized logging and event-driven error-handling patterns.', '/project_bkash.png', ARRAY['TypeScript', 'NestJs', 'DynamoDB'], 'professional', '#', '#', 4),
('Bot boilerplate', 'Start creating scalable discord.js bot with typescript in seconds', 'https://placehold.co/400x300/333/FFF?text=Bot', ARRAY['Discord.js', 'TS', 'JS'], 'small', '#', '#', 5);

-- Quotes
INSERT INTO quotes (text, author) VALUES
('Ship fast, but never at the cost of code quality. Speed without structure is just technical debt in disguise.', 'My Principle'),
('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 'Martin Fowler'),
('I don''t just build features — I build systems that scale. Every line of code should serve the architecture, not fight it.', 'My Principle'),
('Make it work, make it right, make it fast.', 'Kent Beck'),
('The best backend is the one nobody notices — it just works, silently, reliably, at scale.', 'My Principle'),
('The only way to go fast, is to go well.', 'Robert C. Martin'),
('I treat every codebase like I''ll have to debug it at 3 AM. Clean code isn''t a luxury — it's a survival strategy.', 'My Principle');
