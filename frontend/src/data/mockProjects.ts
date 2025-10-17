export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  startDate: string;
  endDate?: string;
  challenges?: string[];
  learnings?: string[];
  createdAt: string;
  updatedAt: string;
}

export const mockProjects: Project[] = [
  {
    _id: "project-001",
    title: "AI-Powered E-Commerce Platform",
    description: "A modern e-commerce platform with AI-driven product recommendations and intelligent inventory management.",
    longDescription: "Developed a comprehensive e-commerce solution featuring machine learning algorithms for personalized product recommendations, automated inventory management, and real-time analytics dashboard. The platform uses advanced AI to predict customer behavior and optimize sales strategies.",
    technologies: ["React", "Node.js", "Python", "TensorFlow", "MongoDB", "Redis", "AWS"],
    category: "Full Stack",
    status: "completed",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=entropy&auto=format",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=entropy&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=entropy&auto=format"
    ],
    demoUrl: "https://ai-ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/hoangdiendev/ai-ecommerce",
    startDate: "2024-01-15T00:00:00.000Z",
    endDate: "2024-06-30T00:00:00.000Z",
    challenges: [
      "Implementing real-time recommendation engine",
      "Scaling ML models for production",
      "Optimizing database queries for large datasets"
    ],
    learnings: [
      "Advanced machine learning deployment strategies",
      "Microservices architecture with Docker",
      "Performance optimization for ML applications"
    ],
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-07-01T00:00:00.000Z"
  },
  {
    _id: "project-002", 
    title: "Smart Task Management App",
    description: "An intelligent task management application with AI-powered priority suggestions and productivity analytics.",
    longDescription: "Built a comprehensive task management system that uses machine learning to analyze work patterns and suggest optimal task prioritization. Features include smart notifications, productivity tracking, team collaboration tools, and detailed analytics dashboards.",
    technologies: ["React Native", "Express.js", "PostgreSQL", "Python", "scikit-learn", "Docker"],
    category: "Mobile App",
    status: "completed",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=entropy&auto=format",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&crop=entropy&auto=format"
    ],
    demoUrl: "https://smart-tasks-demo.vercel.app",
    githubUrl: "https://github.com/hoangdiendev/smart-tasks",
    startDate: "2023-09-01T00:00:00.000Z",
    endDate: "2023-12-15T00:00:00.000Z",
    challenges: [
      "Cross-platform mobile development",
      "Real-time synchronization between devices",
      "Implementing machine learning on mobile"
    ],
    learnings: [
      "React Native best practices",
      "Mobile-first ML model design",
      "Real-time data synchronization"
    ],
    createdAt: "2023-09-01T00:00:00.000Z",
    updatedAt: "2023-12-20T00:00:00.000Z"
  },
  {
    _id: "project-003",
    title: "Real-time Chat Application",
    description: "A scalable real-time chat application with advanced features like file sharing, voice messages, and video calls.",
    longDescription: "Developed a modern messaging platform supporting real-time communication, multimedia sharing, group chats, and video conferencing. Built with performance and scalability in mind to handle thousands of concurrent users.",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "WebRTC", "AWS S3"],
    category: "Web Application",
    status: "in-progress",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop&crop=entropy&auto=format",
      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop&crop=entropy&auto=format"
    ],
    demoUrl: "https://realtime-chat-demo.vercel.app",
    githubUrl: "https://github.com/hoangdiendev/realtime-chat",
    startDate: "2024-08-01T00:00:00.000Z",
    challenges: [
      "Handling high concurrent connections",
      "Implementing WebRTC for video calls",
      "Optimizing real-time message delivery"
    ],
    learnings: [
      "WebSocket optimization techniques",
      "WebRTC implementation challenges",
      "Scalable real-time architecture"
    ],
    createdAt: "2024-08-01T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  },
  {
    _id: "project-004",
    title: "Data Analytics Dashboard",
    description: "Interactive dashboard for visualizing complex business data with machine learning insights.",
    longDescription: "Created a comprehensive analytics platform that processes large datasets and provides interactive visualizations, automated reporting, and predictive analytics using machine learning algorithms. Designed for business intelligence and data-driven decision making.",
    technologies: ["Next.js", "Python", "Pandas", "D3.js", "FastAPI", "PostgreSQL", "Docker"],
    category: "Data Science",
    status: "completed",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=entropy&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=entropy&auto=format",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&crop=entropy&auto=format"
    ],
    demoUrl: "https://data-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/hoangdiendev/data-dashboard",
    startDate: "2023-05-01T00:00:00.000Z",
    endDate: "2023-08-30T00:00:00.000Z",
    challenges: [
      "Processing large datasets efficiently",
      "Creating responsive data visualizations", 
      "Implementing real-time data updates"
    ],
    learnings: [
      "Advanced data visualization techniques",
      "Performance optimization for large datasets",
      "Integration of ML models with web interfaces"
    ],
    createdAt: "2023-05-01T00:00:00.000Z",
    updatedAt: "2023-09-01T00:00:00.000Z"
  },
  {
    _id: "project-005",
    title: "IoT Monitoring System",
    description: "A comprehensive IoT device monitoring and control system with real-time data visualization.",
    longDescription: "Developed an end-to-end IoT solution for monitoring and controlling connected devices. Features include real-time sensor data collection, automated alerts, device management, and predictive maintenance using machine learning algorithms.",
    technologies: ["Vue.js", "Node.js", "MQTT", "InfluxDB", "Python", "Raspberry Pi", "AWS IoT"],
    category: "IoT",
    status: "planned",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=entropy&auto=format"
    ],
    githubUrl: "https://github.com/hoangdiendev/iot-monitoring",
    startDate: "2024-11-01T00:00:00.000Z",
    challenges: [
      "Handling high-frequency sensor data",
      "Ensuring reliable device communication",
      "Implementing edge computing solutions"
    ],
    learnings: [
      "IoT protocols and standards",
      "Edge computing architecture",
      "Time-series data management"
    ],
    createdAt: "2024-10-15T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z"
  }
];