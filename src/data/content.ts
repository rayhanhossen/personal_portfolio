import type { SkillGroup, Experience, Project } from "../types";

// personal info 
export const personalInfo = {
    name: "Rayhan",
    title: "Software Engineer",
    email: "to.rayhanhossen@gmail.com",
    phone: "+8801621145012",
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
    cvLink: "https://drive.google.com/file/d/1WoS8uMgPH64ywzrcrXLm4kCwA-VqTaaG/view?usp=sharing",
};


// skills 
export const skills: SkillGroup[] = [
    { category: "Programming", items: ["Python,", "TypeScript", "JavaScript"] },
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
            "Build interactive dashboards using Python and Django, enabling data-driven decisions and analytics across internal teams.",
            "Apply LLMs, RAG, and Model Content Processors (MCP) to build intelligent backend systems for processing unstructured data."
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
            "Developed an eKYC identity verification system using FastAPI, PaddleOCR, and Amazon Rekognition, reducing manual data entry by 60%.",
            "Enhanced the OCR pipeline with Google Translate API to support Bangla-to-English text conversion.",
            "Designed and deployed a containerized Python-Flask backend for scalable employee data processing, integrated with Apache Spark and Iceberg, and automated setup via Docker multi-stage builds.",
            "Built RPA workflows automating CIB data extraction, reducing manual processing time by 70% using Selenium, Pandas, OpenCV, AutoIT, and PaddleOCR.",
            "Contributed to backend infrastructure by configuring Red Hat Linux servers, enabling server-to-server communication, and deploying secure, scalable APIs with Nginx."
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
            "Led cross-functional frontend and backend teams to deliver mission-critical e-commerce projects on time, maintaining high code quality and system performance.",
            "Directed the design, development, and deployment of new features, contributing to a continuous cycle of product improvement and customer value delivery.",
            "Facilitated daily stand-ups and sprint planning sessions, monitored team progress, and resolved technical and operational blockers.",
            "Mentored junior developers on best practices and collaborated with stakeholders to align technical execution with evolving business requirements."
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
            "Developed scalable RESTful APIs for a multi-store e-commerce platform using NestJS and TypeScript, ensuring modular architecture and high performance.",
            "Integrated NMI payment gateway to enable secure transactions, incorporating robust error handling and transaction lifecycle management.",
            "Implemented delivery logistics with FedEx and UPS APIs to automate shipping rate calculation, real-time tracking, and label generation.",
            "Collaborated with frontend and QA teams to support API integration and testing, following Git workflows, code reviews, and documentation standards."
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
            "Built and maintained an LDAP-based access management system using Python, Django, Celery, Redis, and PostgreSQL, automating provisioning for telecom enterprise users.",
            "Developed backend micro-services using NestJS and TypeScript for fintech features like merchant onboarding, leveraging DynamoDB and Docker for scalability.",
            "Automated enterprise workflows with Selenium, AutoIT, and Pandas, including SMS notifications, SAP vendor payments, and remote file processing.",
            "Collaborated within Agile teams, performed code reviews, and ensured secure, maintainable backend delivery aligned with industry best practices."
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
            "Developed responsive frontend components using HTML5, CSS3, and JavaScript to enhance UX for SME clients."
        ],
        skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    }
];


// projects 
export const projects: Project[] = [
    {
        id: 1,
        title: "Smart Document Assistant (LLM + RAG + FAISS)",
        description: `Built a PDF question-answering assistant using FastAPI, SentenceTransformers,
        TinyLLaMA, and FAISS for vector-based semantic search. Processed unstructured documents with a
        custom Model Content Processor (MCP), enabling intelligent content understanding and contextual query handling.`,
        image: "https://placehold.co/400x300/222/FFF?text=Smart Document Assistant",
        tech: ["LLM", "RAG", "Python", "FAISS"],
        category: "professional",
        liveLink: "https://www.google.com",
        sourceLink: "https://www.google.com"
    },
    {
        id: 2,
        title: "Brac Bank eKYC System",
        description: `Developed an automated identity verification platform using FastAPI, PaddleOCR,
        and Amazon Rekognition, reducing manual workload by 60%. Enabled Bangla-to-English OCR translation
        via Google Translate API and designed scalable RESTful endpoints for cross-system integration. Managed
        background processes using Celery and Docker, ensuring efficient and containerized asynchronous task execution.
        `,
        image: "https://placehold.co/400x300/333/FFF?text=Brac Bank eKYC System",
        tech: ["FastAPI", "PaddleOCR", "Celery", "Docker"],
        category: "professional",
        liveLink: "#",
        sourceLink: "#"
    },
    {
        id: 3,
        title: "Robi Axiata UAM (User Access Management)",
        description: `Engineered an LDAP-based enterprise user management system for Robi Axiata using Django,
        PostgreSQL, Redis, and Celery. Automated provisioning and de-provisioning across telecom services,
        reducing onboarding time and administrative overhead. Ensured secure deployment using Docker and implemented 
        role-based access workflows aligned with internal compliance standards.`,
        image: "https://placehold.co/400x300/333/FFF?text=UAM", // Empty for small project
        tech: ["DRF", "VueJS", "Docker", "Celery", "Redis"],
        category: "professional",
        liveLink: "#",
        sourceLink: ""
    },
    {
        id: 4,
        title: "Bkash Merchant Portal",
        description: `Contributed to a scalable fintech platform using NestJS, API Gateway, and DynamoDB,
        enabling efficient merchant onboarding and transaction handling. Improved system observability and 
        fault tolerance with centralized logging and event-driven error-handling patterns.`,
        image: "https://placehold.co/400x300/333/FFF?text=Bkash Marchent Portal",
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
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "It’s not a bug – it’s an undocumented feature.", author: "Anonymous" }
];


export const heroStack = [
    "Python",
    "Django",
    "FastAPI",
    "React",
    "AWS",
    "Docker",
    "LLM",
    "PostgreSQL"
];