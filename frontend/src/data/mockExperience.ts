export interface Experience {
  _id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  createdAt: string;
  updatedAt: string;
}

export const mockExperiences: Experience[] = [
  {
    _id: "exp-001",
    company: "TechVision Solutions",
    position: "Senior Full Stack Developer",
    location: "Ho Chi Minh City, Vietnam",
    startDate: "2023-01-01T00:00:00.000Z",
    current: true,
    description: "Leading development of enterprise-level web applications and AI-driven solutions. Responsible for architecting scalable systems and mentoring junior developers.",
    responsibilities: [
      "Architect and develop full-stack applications using modern technologies",
      "Lead a team of 5 developers in agile development processes",
      "Implement machine learning models for business intelligence",
      "Design and optimize database schemas for high-performance applications",
      "Conduct code reviews and ensure best practices across the team",
      "Collaborate with product managers and designers on feature development"
    ],
    achievements: [
      "Increased application performance by 40% through optimization strategies",
      "Successfully delivered 3 major projects ahead of schedule",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Mentored 8 junior developers, with 3 receiving promotions",
      "Led migration to microservices architecture improving scalability"
    ],
    technologies: ["React", "Node.js", "Python", "MongoDB", "PostgreSQL", "Docker", "AWS", "TensorFlow"],
    employmentType: "full-time",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "exp-002",
    company: "DataFlow Analytics",
    position: "Full Stack Developer",
    location: "Hanoi, Vietnam",
    startDate: "2021-06-01T00:00:00.000Z",
    endDate: "2022-12-31T00:00:00.000Z",
    current: false,
    description: "Developed data analytics platforms and machine learning solutions for business intelligence. Worked on both frontend interfaces and backend data processing systems.",
    responsibilities: [
      "Build responsive web applications using React and TypeScript",
      "Develop RESTful APIs and microservices with Node.js and Python",
      "Implement data visualization components using D3.js and Chart.js",
      "Work with data scientists to deploy ML models in production",
      "Optimize database queries and implement caching strategies",
      "Participate in agile development and sprint planning"
    ],
    achievements: [
      "Developed analytics dashboard handling 1M+ data points daily",
      "Reduced API response time by 50% through optimization",
      "Built real-time data processing pipeline with 99.9% uptime",
      "Created reusable component library used across 5 projects",
      "Implemented automated testing increasing code coverage to 85%"
    ],
    technologies: ["React", "TypeScript", "Node.js", "Python", "D3.js", "PostgreSQL", "Redis", "Docker"],
    employmentType: "full-time",
    createdAt: "2021-06-01T00:00:00.000Z",
    updatedAt: "2022-12-31T00:00:00.000Z"
  },
  {
    _id: "exp-003",
    company: "WebCraft Studio",
    position: "Frontend Developer",
    location: "Da Nang, Vietnam",
    startDate: "2020-03-01T00:00:00.000Z",
    endDate: "2021-05-31T00:00:00.000Z",
    current: false,
    description: "Specialized in creating modern, responsive web applications with focus on user experience and performance optimization.",
    responsibilities: [
      "Develop modern web applications using React and Vue.js",
      "Collaborate with UI/UX designers to implement pixel-perfect designs",
      "Ensure cross-browser compatibility and mobile responsiveness",
      "Optimize application performance and loading speeds",
      "Implement state management solutions using Redux and Vuex",
      "Write unit and integration tests for frontend components"
    ],
    achievements: [
      "Improved website loading speed by 35% through optimization",
      "Successfully delivered 12 client projects with 100% satisfaction rate",
      "Implemented progressive web app features increasing user engagement by 25%",
      "Created design system components used across multiple projects",
      "Trained 2 junior developers in modern frontend practices"
    ],
    technologies: ["React", "Vue.js", "JavaScript", "Sass", "Webpack", "Jest", "Cypress"],
    employmentType: "full-time",
    createdAt: "2020-03-01T00:00:00.000Z",
    updatedAt: "2021-05-31T00:00:00.000Z"
  },
  {
    _id: "exp-004",
    company: "Freelance Developer",
    position: "Full Stack Developer",
    location: "Remote",
    startDate: "2019-06-01T00:00:00.000Z",
    endDate: "2020-02-28T00:00:00.000Z",
    current: false,
    description: "Provided freelance web development services for various clients, building custom solutions from small business websites to complex web applications.",
    responsibilities: [
      "Develop custom websites and web applications for clients",
      "Handle full project lifecycle from requirements to deployment",
      "Provide technical consulting and solution architecture",
      "Implement responsive designs and ensure cross-platform compatibility",
      "Set up hosting and deployment infrastructure",
      "Provide ongoing maintenance and support"
    ],
    achievements: [
      "Completed 15+ successful projects for diverse client base",
      "Achieved 95% client retention rate",
      "Built e-commerce solution generating $50K+ monthly revenue for client",
      "Reduced development time by 30% using reusable templates",
      "Established ongoing partnerships with 3 agencies"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML5", "CSS3"],
    employmentType: "freelance",
    createdAt: "2019-06-01T00:00:00.000Z",
    updatedAt: "2020-02-28T00:00:00.000Z"
  },
  {
    _id: "exp-005",
    company: "CodeLab Vietnam",
    position: "Junior Web Developer",
    location: "Ho Chi Minh City, Vietnam",
    startDate: "2018-09-01T00:00:00.000Z",
    endDate: "2019-05-31T00:00:00.000Z",
    current: false,
    description: "Started my professional journey as a junior developer, learning modern web development practices and contributing to various client projects.",
    responsibilities: [
      "Assist in developing web applications using HTML, CSS, and JavaScript",
      "Learn and apply React.js for frontend development",
      "Support senior developers in backend development tasks",
      "Participate in code reviews and team meetings",
      "Debug and fix issues in existing applications",
      "Document code and maintain project documentation"
    ],
    achievements: [
      "Successfully completed training program in modern web technologies",
      "Contributed to 8 client projects during the employment period",
      "Improved personal coding skills and learned industry best practices",
      "Received positive feedback for quick learning and dedication",
      "Built first production React application with minimal supervision"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap", "jQuery"],
    employmentType: "full-time",
    createdAt: "2018-09-01T00:00:00.000Z",
    updatedAt: "2019-05-31T00:00:00.000Z"
  }
];