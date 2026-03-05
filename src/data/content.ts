import type { SkillGroup, Experience, Project } from "../types";

// personal info 
export const personalInfo = {
    name: "Rayhan",
    title: "Software Engineer",
    email: "to.rayhanhossen@gmail.com",
    phone: "+8801621145012",
    location: "Dhaka, Bangladesh",
    timezone: "GMT+6",
    noticePeriod: "2 Months",
    whatsapp: "https://wa.me/8801621145012",
    linkedin: "https://www.linkedin.com/in/rayhanhossen/",
    github: "https://github.com/rayhanhossen",
    facebook: "https://www.facebook.com/maverickrayhan/",
    instagram: "https://www.instagram.com/maverickrayhan/",
    about: [
        `Experienced Software Engineer with 5 years of success building and scaling backend systems
        across fintech, telecommunications, and e-commerce sectors.
        Proficient in Django, FastAPI, Celery, Redis, PostgreSQL, MSSQL, Docker, and AWS S3.
        Demonstrated ability to architect RESTful APIs and deliver performant, production-ready solutions`,

        `Currently focused on AI-powered systems, leveraging LLMs, Retrieval-Augmented Generation (RAG),
         and Model Content Processors (MCP) to develop data-driven backend platforms.`
    ],
    cvLink: "https://drive.google.com/uc?export=download&id=1WoS8uMgPH64ywzrcrXLm4kCwA-VqTaaG",
};


// skills 
export const skills: SkillGroup[] = [
    { category: "Programming", items: ["Python", "TypeScript", "JavaScript"] },
    { category: "Frameworks", items: ["Django", "FastAPI", "NestJS"] },
    { category: "Front-End", items: ["React", "HTML5", "CSS3"] },
    { category: "Databases", items: ["PostgreSQL", "MSSQL"] },
    { category: "Caching & Messaging", items: ["Redis", "Celery"] },
    { category: "Cloud & DevOps", items: ["AWS Lambda", "AWS S3", "AWS EC2", "Docker", "CI/CD pipelines", "Git"] },
    { category: "AI & Data Processing", items: ["LLM", "RAG", "MCP"] },
    { category: "Automation & Testing", items: ["Selenium", "Pandas", "OpenCV", "PaddleOCR", "AutoIT"] },
    { category: "Development Methodologies", items: ["Sprint Planning", "Code Reviews"] }
];


// experience
export const experiences: Experience[] = [
    {
        id: 1,
        role: "BI System Engineer",
        company: "BRAC IT Services Limited",
        location: "Dhaka, Bangladesh",
        period: "Jun 2025 - Present",
        startDate: "2025-06",
        endDate: "Present",
        description: [
            "Build interactive dashboards using <strong>Python</strong> and <strong>Django</strong>, enabling data-driven decisions and analytics across internal teams.",
            "Apply <strong>LLMs</strong>, <strong>RAG</strong>, and <strong>Model Content Processors (MCP)</strong> to build intelligent backend systems for processing unstructured data."
        ],
        skills: ["Python", "Django", "LLM", "RAG", "MCP"]
    },
    {
        id: 2,
        role: "Software Engineer",
        company: "BRAC IT Services Limited",
        location: "Dhaka, Bangladesh",
        period: "Feb 2024 - May 2025",
        startDate: "2024-03",
        endDate: "2025-05",
        description: [
            "Developed an eKYC identity verification system using <strong>FastAPI</strong>, <strong>PaddleOCR</strong>, and <strong>Amazon Rekognition</strong>.",
            "Enhanced the OCR pipeline with <strong>Google Translate API</strong> to support Bangla-to-English text conversion.",
            "Designed and deployed a containerized <strong>Python-Flask</strong> backend for scalable employee data processing, integrated with <strong>Apache Spark</strong> and <strong>Iceberg</strong>, and automated setup via <strong>Docker</strong> multi-stage builds.",
            "Built RPA workflows automating CIB data extraction using <strong>Selenium</strong>, <strong>Pandas</strong>, <strong>OpenCV</strong>, <strong>AutoIT</strong>, and <strong>PaddleOCR</strong>.",
            "Contributed to backend infrastructure by configuring <strong>Red Hat Linux</strong> servers, enabling server-to-server communication, and deploying secure, scalable APIs with <strong>Nginx</strong>."
        ],
        skills: ["FastAPI", "PaddleOCR", "AWS Rekognition", "Docker", "Selenium", "Pandas", "Linux/Nginx"]
    },
    {
        id: 3,
        role: "Team Lead - Site Furnishing & Critical Deployment",
        company: "Daniyal Technologies",
        location: "Remote",
        period: "Sep 2023 - Dec 2023",
        startDate: "2023-09",
        endDate: "2023-12",
        description: [
            "Led <strong>cross-functional frontend and backend teams</strong> to deliver mission-critical e-commerce projects on time, maintaining high code quality and system performance.",
            "Directed the design, development, and deployment of new features, contributing to a <strong>continuous cycle of product improvement</strong> and customer value delivery.",
            "Facilitated daily stand-ups and sprint planning sessions, monitored team progress, and resolved <strong>technical and operational blockers</strong>.",
            "<strong>Mentored junior developers</strong> on best practices and collaborated with stakeholders to align technical execution with evolving business requirements."
        ],
        skills: ["Team Leadership", "Project Management", "Agile/Scrum", "Code Review", "Mentorship"]
    },
    {
        id: 4,
        role: "Software Engineer - II",
        company: "Daniyal Technologies",
        location: "Remote",
        period: "Jul 2022 - Aug 2023",
        startDate: "2022-07",
        endDate: "2023-08",
        description: [
            "Developed scalable <strong>RESTful APIs</strong> for a multi-store e-commerce platform using <strong>NestJS</strong> and <strong>TypeScript</strong>, ensuring modular architecture and high performance.",
            "Integrated <strong>NMI payment gateway</strong> to enable secure transactions, incorporating robust error handling and transaction lifecycle management.",
            "Implemented delivery logistics with <strong>FedEx and UPS APIs</strong> to automate shipping rate calculation, real-time tracking, and label generation.",
            "Collaborated with frontend and QA teams to support API integration and testing, following <strong>Git workflows</strong>, code reviews, and documentation standards."
        ],
        skills: ["NestJS", "TypeScript", "REST APIs", "Payment Gateway Integration", "FedEx/UPS APIs"]
    },
    {
        id: 5,
        role: "Software Engineer",
        company: "Divergent Technologies Ltd",
        location: "Dhaka, Bangladesh",
        period: "Dec 2020 - Jun 2022",
        startDate: "2020-12",
        endDate: "2022-06",
        description: [
            "Built and maintained an LDAP-based access management system using <strong>Python</strong>, <strong>Django</strong>, <strong>Celery</strong>, <strong>Redis</strong>, and <strong>PostgreSQL</strong>, automating provisioning for telecom enterprise users.",
            "Developed backend micro-services using <strong>NestJS</strong> and <strong>TypeScript</strong> for fintech features like merchant onboarding, leveraging <strong>DynamoDB</strong> and <strong>Docker</strong> for scalability.",
            "Automated enterprise workflows with <strong>Selenium</strong>, <strong>AutoIT</strong>, and <strong>Pandas</strong>, including SMS notifications, SAP vendor payments, and remote file processing.",
            "Collaborated within Agile teams, performed code reviews, and ensured secure, maintainable backend delivery aligned with <strong>industry best practices</strong>."
        ],
        skills: ["Python", "Django", "Celery/Redis", "PostgreSQL", "NestJS", "Docker", "Selenium"]
    },
    {
        id: 6,
        role: "Web Developer",
        company: "Weabers",
        location: "Dhaka, Bangladesh",
        period: "Sep 2020 - Dec 2020",
        startDate: "2020-09",
        endDate: "2020-12",
        description: [
            "Developed responsive frontend components using <strong>HTML5</strong>, <strong>CSS3</strong>, and <strong>JavaScript</strong> to enhance UX for SME clients."
        ],
        skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    }
];


// projects 
export const projects: Project[] = [
    {
        id: 1,
        title: "Smart Document Assistant (LLM + RAG + FAISS)",
        description: `AI-powered PDF question-answering assistant using FastAPI, SentenceTransformers,
        TinyLLaMA, and FAISS for vector-based semantic search — enabling intelligent content understanding
        and zero-shot contextual query handling across unstructured documents via a custom MCP pipeline.`,
        image: "/project_smart_doc.png",
        tech: ["LLM", "RAG", "Python", "FAISS"],
        category: "professional",
        liveLink: "https://www.google.com",
        sourceLink: "https://www.google.com"
    },
    {
        id: 2,
        title: "Brac Bank eKYC System",
        description: `Built an automated identity verification platform using FastAPI,
        PaddleOCR, and Amazon Rekognition. Added Bangla-to-English OCR translation and scalable REST endpoints.
        Managed async background jobs with Celery and Docker for containerized execution.`,
        image: "/project_ekyc.png",
        tech: ["FastAPI", "PaddleOCR", "Celery", "Docker"],
        category: "professional",
        liveLink: "#",
        sourceLink: "#"
    },
    {
        id: 3,
        title: "Robi Axiata UAM (User Access Management)",
        description: `Engineered an LDAP-based enterprise user management system for Robi Axiata using Django,
        PostgreSQL, Redis, and Celery — automating provisioning across telecom services and eliminating
        manual onboarding overhead. Secured via Docker deployment with role-based access workflows.`,
        image: "/project_uam.png",
        tech: ["DRF", "VueJS", "Docker", "Celery", "Redis"],
        category: "professional",
        liveLink: "#",
        sourceLink: ""
    },
    {
        id: 4,
        title: "Bkash Merchant Portal",
        description: `Scalable fintech platform using NestJS, API Gateway, and DynamoDB enabling efficient
        merchant onboarding and real-time transaction handling for 1,400+ active merchants. Improved
        observability with centralized logging and event-driven error-handling patterns.`,
        image: "/project_bkash.png",
        tech: ["TypeScript", "NestJs", "DynamoDB"],
        category: "professional",
        liveLink: "#",
        sourceLink: "#"
    },
    {
        id: 5,
        title: "Bot boilerplate",
        description: "Start creating scalable discord.js bot with typescript in seconds",
        image: "https://placehold.co/400x300/333/FFF?text=Bot", // Empty for small project
        tech: ["Discord.js", "TS", "JS"],
        category: "small",
        liveLink: "#",
        sourceLink: "#"
    }
];



// quotes
export const quotes = [
    {
        text: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
    },
    {
        text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler"
    },
    {
        text: "Make it work, make it right, make it fast.",
        author: "Kent Beck"
    },
    {
        text: "Simplicity is the soul of efficiency.",
        author: "Austin Freeman"
    },
    {
        text: "Optimism is an occupational hazard of programming: feedback is the treatment.",
        author: "Kent Beck"
    },
    {
        text: "The only way to go fast, is to go well.",
        author: "Robert C. Martin"
    },
    {
        text: "Programs must be written for people to read, and only incidentally for machines to execute.",
        author: "Harold Abelson"
    },
    {
        text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        author: "Brian Kernighan"
    },
    {
        text: "The best way to predict the future is to invent it.",
        author: "Alan Kay"
    },
];

// core tech stack 
export const heroStack = [
    "Python",
    "Django",
    "FastAPI",
    "React",
    "AWS",
    "Docker",
    "PostgreSQL",
    "RAG",
    "MCP"
];