export interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number; // 1-100
  yearsOfExperience: number;
  description?: string;
  projects?: string[];
  createdAt: string;
  updatedAt: string;
}

export const mockSkills: Skill[] = [
  // Frontend Technologies
  {
    _id: "skill-001",
    name: "JavaScript",
    category: "Frontend",
    level: 95,
    yearsOfExperience: 5,
    description: "Advanced proficiency in modern JavaScript (ES6+), including async/await, destructuring, modules, and functional programming concepts.",
    projects: ["AI-Powered E-Commerce Platform", "Smart Task Management App", "Real-time Chat Application"],
    createdAt: "2019-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-002",
    name: "TypeScript",
    category: "Frontend",
    level: 90,
    yearsOfExperience: 3,
    description: "Strong understanding of TypeScript for type-safe development, interfaces, generics, and advanced type manipulation.",
    projects: ["AI-Powered E-Commerce Platform", "Data Analytics Dashboard"],
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-003",
    name: "React.js",
    category: "Frontend",
    level: 92,
    yearsOfExperience: 4,
    description: "Expert in React ecosystem including hooks, context, state management, performance optimization, and modern patterns.",
    projects: ["AI-Powered E-Commerce Platform", "Real-time Chat Application", "Data Analytics Dashboard"],
    createdAt: "2020-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-004",
    name: "Next.js",
    category: "Frontend",
    level: 85,
    yearsOfExperience: 2,
    description: "Proficient in Next.js for SSR, SSG, API routes, and full-stack React applications with optimal performance.",
    projects: ["Data Analytics Dashboard"],
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-005",
    name: "Vue.js",
    category: "Frontend",
    level: 75,
    yearsOfExperience: 2,
    description: "Good understanding of Vue.js ecosystem, composition API, and reactive programming patterns.",
    projects: ["IoT Monitoring System"],
    createdAt: "2022-06-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  
  // Backend Technologies
  {
    _id: "skill-006",
    name: "Node.js",
    category: "Backend",
    level: 88,
    yearsOfExperience: 4,
    description: "Extensive experience building scalable backend services, APIs, and microservices with Node.js and Express.",
    projects: ["AI-Powered E-Commerce Platform", "Real-time Chat Application", "IoT Monitoring System"],
    createdAt: "2020-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-007",
    name: "Python",
    category: "Backend",
    level: 90,
    yearsOfExperience: 4,
    description: "Advanced Python development for web applications, data processing, and machine learning applications.",
    projects: ["AI-Powered E-Commerce Platform", "Data Analytics Dashboard", "IoT Monitoring System"],
    createdAt: "2020-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-008",
    name: "Express.js",
    category: "Backend",
    level: 85,
    yearsOfExperience: 3,
    description: "Proficient in building RESTful APIs, middleware development, and server-side application architecture.",
    projects: ["Smart Task Management App", "Real-time Chat Application"],
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-009",
    name: "FastAPI",
    category: "Backend", 
    level: 80,
    yearsOfExperience: 2,
    description: "Experience building high-performance Python APIs with automatic documentation and type validation.",
    projects: ["Data Analytics Dashboard"],
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },

  // Databases
  {
    _id: "skill-010",
    name: "MongoDB",
    category: "Database",
    level: 82,
    yearsOfExperience: 3,
    description: "Proficient in NoSQL database design, aggregation pipelines, indexing, and performance optimization.",
    projects: ["AI-Powered E-Commerce Platform", "Real-time Chat Application"],
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-011", 
    name: "PostgreSQL",
    category: "Database",
    level: 85,
    yearsOfExperience: 3,
    description: "Advanced SQL skills, database optimization, complex queries, and relational database design.",
    projects: ["Smart Task Management App", "Data Analytics Dashboard"],
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-012",
    name: "Redis",
    category: "Database",
    level: 75,
    yearsOfExperience: 2,
    description: "Experience with caching strategies, session management, and real-time data processing.",
    projects: ["AI-Powered E-Commerce Platform"],
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },

  // Machine Learning & AI
  {
    _id: "skill-013",
    name: "Machine Learning",
    category: "AI/ML",
    level: 88,
    yearsOfExperience: 3,
    description: "Strong foundation in ML algorithms, model training, evaluation, and deployment in production environments.",
    projects: ["AI-Powered E-Commerce Platform", "Smart Task Management App", "Data Analytics Dashboard"],
    createdAt: "2021-06-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-014",
    name: "TensorFlow",
    category: "AI/ML",
    level: 82,
    yearsOfExperience: 2,
    description: "Experience building and training neural networks, computer vision models, and NLP applications.",
    projects: ["AI-Powered E-Commerce Platform"],
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-015",
    name: "PyTorch",
    category: "AI/ML",
    level: 78,
    yearsOfExperience: 2,
    description: "Proficient in deep learning model development, research-oriented ML projects, and model optimization.",
    projects: ["Smart Task Management App"],
    createdAt: "2022-03-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-016",
    name: "scikit-learn",
    category: "AI/ML",
    level: 85,
    yearsOfExperience: 3,
    description: "Extensive use of sklearn for classical ML algorithms, data preprocessing, and model evaluation.",
    projects: ["Smart Task Management App", "Data Analytics Dashboard"],
    createdAt: "2021-06-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },

  // DevOps & Cloud
  {
    _id: "skill-017",
    name: "Docker",
    category: "DevOps",
    level: 80,
    yearsOfExperience: 2,
    description: "Containerization of applications, multi-stage builds, and orchestration with Docker Compose.",
    projects: ["AI-Powered E-Commerce Platform", "Smart Task Management App", "Data Analytics Dashboard"],
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-018",
    name: "AWS",
    category: "Cloud",
    level: 75,
    yearsOfExperience: 2,
    description: "Experience with EC2, S3, Lambda, RDS, and other AWS services for scalable cloud applications.",
    projects: ["AI-Powered E-Commerce Platform", "Real-time Chat Application", "IoT Monitoring System"],
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "skill-019",
    name: "Git",
    category: "Tools",
    level: 90,
    yearsOfExperience: 5,
    description: "Advanced version control, branching strategies, code review processes, and collaborative development.",
    projects: ["All Projects"],
    createdAt: "2019-01-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  }
];