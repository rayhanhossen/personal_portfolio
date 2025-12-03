export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[]; // e.g., "HTML SCSS Python"
  liveLink: string;
  sourceLink: string;
  cached?: boolean; // For "complete-apps" vs "small-projects"
  category: 'professional' | 'small'; 
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string | string[]; // Can be a paragraph or bullet points
}