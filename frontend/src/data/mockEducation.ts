export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
  achievements: string[];
  relevantCourses: string[];
  degreeType: 'high-school' | 'associate' | 'bachelor' | 'master' | 'doctorate' | 'certificate' | 'diploma';
  createdAt: string;
  updatedAt: string;
}

export const mockEducation: Education[] = [
  {
    _id: "edu-001",
    institution: "University of Technology Ho Chi Minh City",
    degree: "Bachelor of Science in Computer Science",
    field: "Computer Science",
    location: "Ho Chi Minh City, Vietnam",
    startDate: "2015-09-01T00:00:00.000Z",
    endDate: "2019-06-30T00:00:00.000Z",
    current: false,
    gpa: "3.8/4.0",
    description: "Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and artificial intelligence. Specialized in web development and machine learning during final years.",
    achievements: [
      "Graduated Summa Cum Laude (Top 5% of class)",
      "Dean's List for 6 consecutive semesters",
      "Best Final Year Project Award - AI Recommendation System",
      "President of Computer Science Student Association (2018-2019)",
      "Winner of University Programming Contest 2018",
      "Published research paper on Machine Learning Applications"
    ],
    relevantCourses: [
      "Data Structures and Algorithms",
      "Web Development",
      "Database Systems",
      "Software Engineering",
      "Machine Learning",
      "Artificial Intelligence",
      "Computer Networks",
      "Operating Systems",
      "Mobile Application Development",
      "Human-Computer Interaction",
      "Cybersecurity Fundamentals",
      "Cloud Computing"
    ],
    degreeType: "bachelor",
    createdAt: "2015-09-01T00:00:00.000Z",
    updatedAt: "2019-06-30T00:00:00.000Z"
  },
  {
    _id: "edu-002",
    institution: "FPT University",
    degree: "Certificate in Advanced Machine Learning",
    field: "Machine Learning & AI",
    location: "Ho Chi Minh City, Vietnam",
    startDate: "2020-01-15T00:00:00.000Z",
    endDate: "2020-08-30T00:00:00.000Z",
    current: false,
    description: "Intensive certificate program focusing on advanced machine learning techniques, deep learning, and practical AI applications in business contexts.",
    achievements: [
      "Completed with Distinction (95% final score)",
      "Best Capstone Project - Predictive Analytics for E-commerce",
      "Mentored 5 fellow students in TensorFlow implementation",
      "Presented research findings at AI Conference Vietnam 2020"
    ],
    relevantCourses: [
      "Deep Learning with TensorFlow",
      "Natural Language Processing",
      "Computer Vision",
      "Reinforcement Learning",
      "MLOps and Model Deployment",
      "Big Data Analytics",
      "Neural Network Architectures",
      "Time Series Analysis",
      "Recommender Systems",
      "AI Ethics and Responsible AI"
    ],
    degreeType: "certificate",
    createdAt: "2020-01-15T00:00:00.000Z",
    updatedAt: "2020-08-30T00:00:00.000Z"
  },
  {
    _id: "edu-003",
    institution: "Coursera - Stanford University",
    degree: "Machine Learning Specialization",
    field: "Machine Learning",
    location: "Online",
    startDate: "2019-10-01T00:00:00.000Z",
    endDate: "2020-02-28T00:00:00.000Z",
    current: false,
    description: "Comprehensive online specialization covering machine learning fundamentals, supervised and unsupervised learning, and practical applications taught by Andrew Ng.",
    achievements: [
      "Completed all courses with 98%+ scores",
      "Applied learned concepts in personal projects",
      "Received verified certificate with honors",
      "Implemented all programming assignments from scratch"
    ],
    relevantCourses: [
      "Machine Learning Foundation",
      "Advanced Learning Algorithms",
      "Unsupervised Learning, Recommenders, Reinforcement Learning",
      "Applied Machine Learning in Python",
      "Statistical Learning Theory",
      "Practical ML Projects"
    ],
    degreeType: "certificate",
    createdAt: "2019-10-01T00:00:00.000Z",
    updatedAt: "2020-02-28T00:00:00.000Z"
  },
  {
    _id: "edu-004",
    institution: "Google Cloud Platform",
    degree: "Professional Cloud Architect Certification",
    field: "Cloud Computing",
    location: "Online",
    startDate: "2022-03-01T00:00:00.000Z",
    endDate: "2022-06-15T00:00:00.000Z",
    current: false,
    description: "Professional certification demonstrating ability to design, develop, and manage robust, secure, scalable, and dynamic solutions on Google Cloud Platform.",
    achievements: [
      "Passed certification exam on first attempt",
      "Scored in top 10% of certified professionals",
      "Applied knowledge in production cloud migrations",
      "Helped company reduce cloud costs by 30%"
    ],
    relevantCourses: [
      "Google Cloud Platform Fundamentals",
      "Architecting with Google Compute Engine",
      "Architecting with Google Kubernetes Engine",
      "Google Cloud Platform Big Data and Machine Learning",
      "Security in Google Cloud Platform",
      "Google Cloud Platform Networking"
    ],
    degreeType: "certificate",
    createdAt: "2022-03-01T00:00:00.000Z",
    updatedAt: "2022-06-15T00:00:00.000Z"
  },
  {
    _id: "edu-005",
    institution: "AWS Training and Certification",
    degree: "AWS Certified Solutions Architect",
    field: "Cloud Architecture",
    location: "Online",
    startDate: "2023-01-10T00:00:00.000Z",
    endDate: "2023-04-20T00:00:00.000Z",
    current: false,
    description: "Industry-recognized certification validating expertise in designing distributed systems and applications on the Amazon Web Services platform.",
    achievements: [
      "Achieved certification with score of 892/1000",
      "Implemented learned architectures in production systems",
      "Led team migration to AWS infrastructure",
      "Reduced infrastructure costs by 25% through optimization"
    ],
    relevantCourses: [
      "AWS Cloud Practitioner Essentials",
      "Architecting on AWS",
      "Advanced Architecting on AWS",
      "AWS Security Best Practices",
      "AWS Cost Optimization",
      "Disaster Recovery on AWS",
      "Serverless Architectures on AWS",
      "DevOps on AWS"
    ],
    degreeType: "certificate",
    createdAt: "2023-01-10T00:00:00.000Z",
    updatedAt: "2023-04-20T00:00:00.000Z"
  }
];