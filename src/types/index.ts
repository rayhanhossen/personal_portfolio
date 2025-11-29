export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[]; // e.g., "HTML SCSS Python"
  liveLink?: string;
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
  description: string | string[]; // Can be a paragraph or bullet points
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link: string;
  iconClass: string; // FontAwesome class
  colorClass: string; // Tailwind text color class
  borderColorClass: string; // Tailwind border color class
}

export interface FunFact {
  id: number;
  text: string; // Can contain HTML strings if sanitized, but plain text preferred
}