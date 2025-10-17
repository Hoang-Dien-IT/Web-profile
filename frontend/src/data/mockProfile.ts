export interface Profile {
  _id: string;
  fullName: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  skills: string[];
  interests: string[];
  availability: boolean;
  avatar?: string;
  resume?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mockProfile: Profile = {
  _id: "profile-001",
  fullName: "Hoàng Diên",
  title: "Full Stack Developer & AI Engineer",
  bio: "Passionate developer with expertise in modern web technologies, artificial intelligence, and machine learning. I love creating innovative solutions that bridge the gap between complex backend systems and intuitive user interfaces. With a strong foundation in both frontend and backend development, I specialize in building scalable applications using cutting-edge technologies.",
  location: "Việt Nam",
  email: "hoangdien.dev@gmail.com",
  phone: "+84 123 456 789",
  website: "https://hoangdien.dev",
  skills: [
    "JavaScript",
    "TypeScript", 
    "React.js",
    "Node.js",
    "Python",
    "Machine Learning",
    "Deep Learning",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Git",
    "TensorFlow",
    "PyTorch",
    "Express.js",
    "Next.js",
    "Tailwind CSS",
    "REST APIs",
    "GraphQL"
  ],
  interests: [
    "Artificial Intelligence",
    "Machine Learning", 
    "Web Development",
    "Data Science",
    "Cloud Computing",
    "Open Source",
    "Technology Innovation",
    "Problem Solving"
  ],
  availability: true,
  avatar: "/images/profile-avatar.jpg",
  resume: "/files/hoangdien-cv.pdf",
  socialLinks: {
    github: "https://github.com/hoangdiendev",
    linkedin: "https://linkedin.com/in/hoangdiendev",
    twitter: "https://twitter.com/hoangdiendev",
    facebook: "https://facebook.com/hoangdiendev",
    instagram: "https://instagram.com/hoangdiendev"
  },
  isActive: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-10-16T00:00:00.000Z"
};