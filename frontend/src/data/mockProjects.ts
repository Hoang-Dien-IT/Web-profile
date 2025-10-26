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
    title: "Web Drugs Interaction Checker",
    description: "A web application that checks for potential drug interactions using a comprehensive database.",
    longDescription: "Developed a web application that allows users to input multiple medications and checks for potential interactions using a comprehensive database. The application provides detailed information about each drug, including side effects, contraindications, and alternative medications.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Docker", "AWS", "API Gemini"],
    category: "AI-powered website",
    status: "completed",
    featured: true,
    images: [
      "/images/projects1/images_1.png",
      "/images/projects1/images_2.png",
      "/images/projects1/images_3.png",
      "/images/projects1/images_4.png"
    ],
    demoUrl: "https://ddi.lab.io.vn/",
    githubUrl: "https://github.com/Hoang-Dien-IT/Web-Drugs-Interaction-Checker.git",
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
    title: "Stranger detection system using camera-IP: SafeFace",
    description: "The SafeFace project is an automated management and monitoring system using surveillance cameras and a processing pipeline that employs RetinaFace and ArcFace models for human face detection and recognition.",
    longDescription: "Built a comprehensive task management system that uses machine learning to analyze work patterns and suggest optimal task prioritization. Features include smart notifications, productivity tracking, team collaboration tools, and detailed analytics dashboards.",
    technologies: ["React Native", "Express.js", "MongoDB", "Python", "scikit-learn", "ArcFace", "OpenCV", "RetinaFace"],
    category: "AI-powered website",
    status: "completed",
    featured: true,
    images: [
      "/images/projects2/images_1.jpg",
      "/images/projects2/images_2.jpg",
      "/images/projects2/images_3.jpg",
      "/images/projects2/images_4.jpg",
      "/images/projects2/images_5.jpg",
      "/images/projects2/images_6.jpg",
      "/images/projects2/images_7.jpg",
      "/images/projects2/images_8.jpg"
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
    title: "Website identifies football players",
    description: "The project involves building a CNN model and training it on self-collected data. The website allows users to recognize famous English Premier League football players through uploaded facial images of the players.",
    longDescription: "Developed a comprehensive platform that leverages machine learning and computer vision techniques to identify football players in live video feeds. The system provides real-time analytics and insights into player performance and tactics.",
    technologies: ["Flask", "TensorFlow.js", "CNN", "MongoDB", "OpenCV", "DeepLearning", "Data Processing", "Python"],
    category: "AI-powered website",
    status: "in-progress",
    featured: false,
    images: [
      "/images/projects3/images_1.jpg",
      "/images/projects3/images_2.jpg",
      "/images/projects3/images_3.jpg",
      "/images/projects3/images_4.jpg"
    ],
    demoUrl: "https://website-identifies-football-players.vercel.app",
    githubUrl: "https://github.com/hoangdiendev/website-identifies-football-players",
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
    title: "HRM System Winform",
    description: "The project helps users manage human resources more easily and is built as a Windows application.",
    longDescription: "Created a comprehensive analytics platform that processes large datasets and provides interactive visualizations, automated reporting, and predictive analytics using machine learning algorithms. Designed for business intelligence and data-driven decision making.",
    technologies: ["C#", "WinForms", "SQL Server", "DevExpress"],
    category: "System",
    status: "completed",
    featured: true,
    images: [
      "/images/projects4/images_1.jpg",
      "/images/projects4/images_2.jpg",
      "/images/projects4/images_3.jpg",
      "/images/projects4/images_4.jpg"
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
    title: "Lung disease classification from X-ray images",
    description: "An AI model for classifying lung diseases from X-ray images using a CNN architecture with well-preprocessed data.",
    longDescription: "Developed a deep learning model using convolutional neural networks (CNN) to classify lung diseases from X-ray images. The system provides accurate predictions and insights to assist radiologists in diagnosing lung conditions.",
    technologies: ["CNN", "TensorFlow.js", "OpenCV", "DeepLearning", "Data Processing", "Python"],
    category: "AI Model",
    status: "planned",
    featured: false,
    images: [
      "/images/projects5/images_1.jpg",
      "/images/projects5/images_2.jpg",
      "/images/projects5/images_3.jpg",
      "/images/projects5/images_4.jpg",
      "/images/projects5/images_5.jpg"
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
  },
    {
    _id: "project-006",
    title: "Web Portfolio",
    description: "A personal portfolio website showcasing my projects and skills.",
    longDescription: "This portfolio website is built using modern web technologies and showcases my work, skills, and experiences in a visually appealing manner.",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Vercel", "TypeScript", "Tailwind CSS"],
    category: "Frontend",
    status: "in-progress",
    featured: true,
    images: [
      "/images/projects6/images_1.png",
      "/images/projects6/images_2.png",
      "/images/projects6/images_3.png",
      "/images/projects6/images_4.png"
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
    createdAt: "2025-10-15T00:00:00.000Z",
    updatedAt: "2025-10-15T00:00:00.000Z"
  }
];