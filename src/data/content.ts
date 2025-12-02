import type { SkillGroup, Experience, Project, Education, Certificate, FunFact } from "../types";

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
        "Hello, I'm Rayhan hossen!",
        "I'm a self-taught front-end developer based in Dhaka, Bangladesh. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.",
        "Transforming my creativity and knowledge into websites has been my passion for over a year.",
        "Transforming my creativity and knowledge into websites has been my passion for over a year.",
        "Transforming my creativity and knowledge into websites has been my passion for over a year."
    ],
    cvLink: "/files/my-cv.pdf",
};


// skills 
export const skills: SkillGroup[] = [
    { category: "Languages", items: ["TypeScript", "Lua", "Python", "JavaScript", "C++"] },
    { category: "Databases", items: ["SQLite", "PostgreSQL", "Mongo", "Redis"] },
    { category: "Frameworks", items: ["React", "Vue", "Discord.js", "Flask", "Express.js", "Laravel"] },
    { category: "Tools", items: ["VSCode", "Neovim", "Linux", "Figma", "Git"] },
    { category: "Other", items: ["HTML", "CSS", "SCSS", "REST"] },
    { category: "Testing", items: ["Jest", "Cypress"] }
];


// experience
export const experiences: Experience[] = [
    {
        id: 1,
        role: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "New York, NY",
        period: "Jan 2023 - Present",
        startDate: "2023-01",
        endDate: "Present",
        description: [
            "Leading a team of 5 developers in migrating legacy monolith to micro-frontend architecture.",
            "Implemented CI/CD pipelines reducing deployment time by 60%. Leading a team of 5 developers in migrating legacy monolith to micro-frontend architecture.Leading a team of 5 developers in migrating legacy monolith to micro-frontend architecture.",
            "Mentoring junior developers and conducting code reviews.",
            "Leading a team of 5 developers in migrating legacy monolith to micro-frontend architecture."
        ]
    },
    {
        id: 2,
        role: "Web Developer",
        company: "Creative Studio",
        location: "London, UK",
        period: "Jan 2021 - Dec 2023",
        startDate: "2021-01",
        endDate: "2023-12",
        description: [
            "Developed and maintained 20+ responsive websites for diverse clients.",
            "Collaborated with designers to implement pixel-perfect UIs from Figma.",
            "Optimized website performance achieving 90+ Lighthouse scores."
        ]
    },
    {
        id: 3,
        role: "Junior Developer",
        company: "StartUp Galaxy",
        location: "Remote",
        period: "Jan 2020 - Dec 2021",
        startDate: "2020-01",
        endDate: "2021-12",
        description: [
            "Assisted in building the MVP of a fintech application using React.",
            "Fixed bugs and implemented new features based on user feedback."
        ]
    }
];


// projects 
export const projects: Project[] = [
    {
        id: 1,
        title: "ChertNodes",
        description: "Minecraft servers hosting",
        image: "https://placehold.co/400x300/222/FFF?text=ChertNodes",
        tech: ["HTML", "SCSS", "Python", "Flask"],
        category: "professional",
        liveLink: "https://www.google.com",
        sourceLink: "https://www.stripe.com"
    },
    {
        id: 2,
        title: "ProtectX For ED",
        description: "Discord anti-crash bot",
        image: "https://placehold.co/400x300/333/FFF?text=ProtectX",
        tech: ["React", "Express", "Discord.js", "Node.js"],
        category: "professional",
        liveLink: "#",
        sourceLink: "#"
    },
    {
        id: 3,
        title: "Bot boilerplate",
        description: "Start creating scalable discord.js bot with typescript in seconds",
        image: "https://placehold.co/400x300/333/FFF?text=Bot", // Empty for small project
        tech: ["Discord.js", "TS", "JS"],
        category: "small",
        liveLink: "#",
        sourceLink: "https://www.google.com"
    }
];


// education
export const education: Education[] = [
    {
        id: 1,
        degree: "BSc Computer Science",
        institution: "University of Technology",
        period: "2016 - 2020",
        details: "Focus on Algorithms, Data Structures. Thesis: Optimizing Neural Networks."
    }
];


// certificates
export const certificates: Certificate[] = [
    {
        id: 1,
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "Jan 2023",
        link: "#",
        iconClass: "fab fa-aws",
        colorClass: "text-white",
        borderColorClass: "hover:border-primary"
    }
];


// fun facts 
export const funFacts: FunFact[] = [
    { id: 1, text: "I like winter more than summer" },
    { id: 2, text: "I often bike with my friends" },
    { id: 3, text: "I love to explore the nature" },
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