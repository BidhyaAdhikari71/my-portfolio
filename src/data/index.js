export const PERSONAL = {
  name:       "Bidhya Adhikari",
  initials:   "BA",
  title:      "MERN Stack Developer",
  roles:      ["MERN Stack Developer", "Frontend Specialist", "UI/UX Enthusiast", "Clean Code Advocate"],
  location:   "Butwal, Nepal",
  university: "Tribhuvan University",
  email:      "adhikaribidhya963@gmail.com",
  phone:      "+977 9824460356",
  linkedin:   "https://linkedin.com/in/bidhya-adhikari-58b249317",
  github:     "https://github.com/BidhyaAdhikari71",
  available:  true,
  bio: [
    "I'm a motivated MERN Stack Developer from Butwal, Nepal, passionate about crafting responsive, scalable web applications that deliver seamless user experiences.",
    "With hands-on experience at Synthbit Technology, I've built a strong foundation in frontend and backend development — writing clean, maintainable code with a keen eye for UI/UX.",
    "I believe every pixel matters. Great software isn't just about functionality — it's about the feeling it creates in the person using it.",
  ],
  stats: [
    { label: "Projects Built", value: 3,  suffix: "+" },
    { label: "Technologies",   value: 15, suffix: "+" },
    { label: "Months Exp.",    value: 6,  suffix: "+" },
  ],
};

export const SKILLS = {
  Frontend: [
    { name: "React.js",          level: 85 },
    { name: "HTML5",             level: 92 },
    { name: "CSS3",              level: 88 },
    { name: "JavaScript ES6+",   level: 82 },
    { name: "Tailwind CSS",      level: 80 },
    { name: "Bootstrap",         level: 78 },
    { name: "Responsive Design", level: 90 },
  ],
  Backend: [
    { name: "Node.js",    level: 72 },
    { name: "Express.js", level: 70 },
    { name: "REST APIs",  level: 78 },
    { name: "JWT Auth",   level: 68 },
    { name: "Middleware", level: 65 },
  ],
  Database: [
    { name: "MongoDB",  level: 70 },
    { name: "Mongoose", level: 68 },
    { name: "MySQL",    level: 65 },
  ],
  Tools: [
    { name: "Git",     level: 80 },
    { name: "GitHub",  level: 82 },
    { name: "VS Code", level: 90 },
    { name: "Postman", level: 72 },
    { name: "Figma",   level: 60 },
  ],
  Others: [
    { name: "Context API", level: 75 },
    { name: "React Hooks", level: 80 },
    { name: "Redux",       level: 58 },
  ],
};

export const PROJECTS = [
  {
    id:          "expense-tracker",
    title:       "Smart Expense Tracker",
    subtitle:    "Full-Stack Finance App",
    stack:       ["React.js", "Node.js", "Express.js", "MySQL"],
    description: "A full-stack expense tracking application to manage daily income and expenses with data analysis and clean dashboards.",
    longDesc:    "Built to solve the problem of disorganised personal finances, this app lets users track every transaction with categories, dates, and notes. The backend exposes RESTful APIs with JWT-secured endpoints, while the frontend provides a clean, intuitive interface with live charts and summaries.",
    bullets: [
      "Add, edit & delete transactions with category tagging",
      "MySQL for structured relational data storage",
      "REST APIs via Node.js/Express.js with JWT auth",
      "Basic data analysis and visual summary charts",
    ],
    color: "#86efac", colorDim: "rgba(134,239,172,0.08)",
    icon: "💰", status: "Complete", year: "2026", github: "#", live: "#", featured: true,
  },
  {
    id:          "gym-website",
    title:       "Gym Website",
    subtitle:    "Multi-Page Frontend",
    stack:       ["HTML5", "CSS3", "JavaScript"],
    description: "A responsive multi-page gym website with modern UI design, smooth animations, and full mobile-first approach.",
    longDesc:    "Designed and developed a complete gym brand website with a strong visual identity. The site features a bold hero section, services overview, trainer profiles, and a contact page — all crafted with vanilla HTML/CSS/JS for maximum performance.",
    bullets: [
      "Multi-page architecture: home, services, contact",
      "Mobile-first responsive design across all breakpoints",
      "Smooth CSS animations and scroll interactions",
      "Clean, semantic HTML for accessibility",
    ],
    color: "#7dd3fc", colorDim: "rgba(125,211,252,0.08)",
    icon: "🏋️", status: "Complete", year: "2025", github: "#", live: "#", featured: true,
  },

{
  id:          "airline-website",
  title:       "Airline Booking Website",
  subtitle:    "Multi-Page Frontend",
  stack:       ["HTML5", "CSS3", "JavaScript"],
  description: "A responsive airline booking website with flight search, modern UI, and seamless user experience across all devices.",
  longDesc:    "Designed and developed a complete airline web platform focused on usability and performance. The project includes a dynamic homepage, flight search interface, booking flow, and contact section — all built using vanilla HTML, CSS, and JavaScript with a clean and intuitive layout.",
  bullets: [
    "Flight search and booking interface UI",
    "Multi-page structure: home, flights, booking, contact",
    "Mobile-first responsive design for all screen sizes",
    "Interactive elements with smooth transitions and animations",
    "Clean, semantic HTML for accessibility and SEO",
  ],
  color: "#60a5fa",
  colorDim: "rgba(96,165,250,0.08)",
  icon: "✈️",
  status: "Complete",
  year: "2024",
  github: "#",
  live: "#",
  featured: true,
},

  {
    id:          "portfolio",
    title:       "Portfolio Website",
    subtitle:    "Personal Brand",
    stack:       ["React.js", "Tailwind CSS"],
    description: "Personal developer portfolio showcasing projects and skills with smooth animations and elegant dark design.",
    longDesc:    "This very portfolio — built from scratch with React.js and a fully custom design system. Features scroll-triggered animations, page-based navigation, skill showcases, and contact integration. Deployed on Vercel.",
    bullets: [
      "Responsive UI with scroll-triggered animations",
      "Deployed on Vercel with CI/CD pipeline",
      "Custom design system with reusable components",
      "SEO-optimised with clean semantic structure",
    ],
    color: "#a78bfa", colorDim: "rgba(167,139,250,0.08)",
    icon: "🚀", status: "Live", year: "2026", github: "#", live: "#", featured: true,
  },
];

export const EXPERIENCE = [
  {
    company: "Synthbit Technology",
    role:    "Frontend Developer (Intern)",
    type:    "work",
    period:  "2025 – Present",
    desc:    "Assisted in developing and improving web application features using JavaScript and React.js. Gained hands-on experience working with frontend components and basic backend integration. Collaborated with team members to understand real-world development workflows.",
    tags:    ["React.js", "JavaScript", "Frontend", "Team Collaboration"],
    color:   "#a78bfa",
    label:   "WORK",
  },
  {
    company: "Tribhuvan University",
    role:    "Bachelor's Degree · Computer Science",
    type:    "education",
    period:  "2022 – Present",
    desc:    "Pursuing a Bachelor's degree with a strong academic foundation in computer science, software engineering, and technology fundamentals.",
    tags:    ["Computer Science", "Software Engineering", "Algorithms"],
    color:   "#7dd3fc",
    label:   "EDU",
  },
];

export const NAV_PAGES = [
  { label: "Home",       page: "home" },
  { label: "About",      page: "about" },
  { label: "Projects",   page: "projects" },
  { label: "Skills",     page: "skills" },
  { label: "Experience", page: "experience" },
  { label: "Contact",    page: "contact" },
];
