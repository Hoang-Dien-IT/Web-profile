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
  fullName: "Nguyễn Hoàng Điển",
  title: "Full Stack Developer & AI Engineer",
  bio: "",
  location: "Việt Nam",
  email: "nguyenhoangdien1x@gmail.com",
  phone: "+84 944779743",
  website: "https://github.com/Hoang-Dien-IT",
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
  avatar: "/anhcuatoi.jpg",
  resume: "https://drive.google.com/file/d/1QoWI4A9RuRBHf9OoMxEXfgF4CxGki0Bm/view?usp=drive_link",
  socialLinks: {
    github: "https://github.com/Hoang-Dien-IT",
    linkedin: "https://linkedin.com/in/hoangdiendev",
    twitter: "https://twitter.com/hoangdiendev",
    facebook: "https://facebook.com/hoangdiendev",
    instagram: "https://instagram.com/hoangdiendev"
  },
  isActive: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-10-16T00:00:00.000Z"
};