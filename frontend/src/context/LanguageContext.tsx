import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',
    'nav.letsTalk': "Let's Talk",

    // Home Page
    'home.greeting': "Hi, I'm",
    'home.name': 'Nguyen Hoang Dien',
    'home.title': 'AI Engineer',
    'home.description': 'I am a final-year Computer Science student with a strong passion for Artificial Intelligence, particularly in Computer Vision and Machine Learning, and a solid foundation in computer science.',
    'home.viewWork': 'View My Work',
    'home.downloadResume': 'Download Resume',
    'home.getInTouch': 'Get In Touch',

    // About Page
    'about.title': 'About Me',
    'about.subtitle': 'Get to know me better',
    'about.story': 'My Story',
    'about.description1': "I am a final-year Computer Science student with a strong passion for Artificial Intelligence, particularly in Computer Vision and Machine Learning, and a solid foundation in computer science. I aspire to join your company and contribute to building advanced and innovative solutions, applying the knowledge I have acquired to solve real-world problems. I am eager to learn and grow, with the goal of becoming a skilled AI Engineer, especially in the field of Computer Vision. I am committed to long-term collaboration and development with your company.",
    'about.location': 'Location',
    'about.email': 'Email',
    'about.availability': 'Availability',
    'about.availableText': 'Available for projects',
    'about.unavailableText': 'Currently unavailable',
    'about.projects': 'Projects',
    'about.years': 'Years',
    'about.clients': 'Clients',
    'about.skills.title': 'Skills',
    'about.skills.programming': 'Programming Language',
    'about.skills.framework': 'Framework',
    'about.skills.library': 'Library',
    'about.skills.database': 'Database Management System',
    'about.skills.tools': 'Tools & Platforms',
    'about.experience.title': 'Experience',

    // Skills Page
    'skills.title': 'Technologies I Love',
    'skills.subtitle': 'Modern tools and technologies I use to build amazing digital experiences',
    'skills.footer.text': 'Always learning and exploring new technologies to stay ahead of the curve',
    'skills.footer.cta': "Let's Build Something Together",

    // Experience Page
    'experience.title': 'Experience',
    'experience.subtitle': 'My professional journey',
    'experience.keyAchievements': 'Key Achievements',

    // About Experience Data
    'about.experience.techvision.role': 'Implementation Specialist & QA Engineer',
    'about.experience.techvision.company': 'DH Digital Solutions Company Limited',
    'about.experience.techvision.period': '2025 - Present',
    'about.experience.techvision.description': 'DH Solutions provides a comprehensive ecosystem of healthcare management software for the medical industry.',
    // 'about.experience.dataflow.role': 'Full Stack Developer',
    // 'about.experience.dataflow.company': 'DataFlow Analytics',
    // 'about.experience.dataflow.period': '2021 - 2022',
    // 'about.experience.dataflow.description': 'Developed data analytics platforms and machine learning solutions for business intelligence.',

    // Projects Page
    'projects.title': 'Projects',
    'projects.subtitle': 'Things I\'ve built',

    // Contact Page
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s work together',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
  },
  vi: {
    // Navigation
    'nav.home': 'Trang Chủ',
    'nav.about': 'Giới Thiệu',
    'nav.skills': 'Kỹ Năng',
    'nav.experience': 'Kinh Nghiệm',
    'nav.projects': 'Dự Án',
    'nav.contact': 'Liên Hệ',
    'nav.resume': 'Hồ Sơ',
    'nav.letsTalk': 'Liên Hệ',

    // Home Page
    'home.greeting': 'Xin chào, tôi là',
    'home.name': 'Nguyễn Hoàng Điển',
    'home.title': 'Kỹ Sư AI',
    'home.description': 'Tôi là sinh viên năm cuối ngành Khoa học máy tính, có niềm đam mê mạnh mẽ với Trí tuệ nhân tạo, đặc biệt là trong các lĩnh vực Thị giác máy tính và Học máy, cùng với nền tảng vững chắc về khoa học máy tính.',
    'home.viewWork': 'Xem Công Việc',
    'home.downloadResume': 'Tải Hồ Sơ',
    'home.getInTouch': 'Liên Hệ',

    // About Page
    'about.title': 'Giới Thiệu',
    'about.subtitle': 'Tìm hiểu thêm về tôi',
    'about.story': 'Câu Chuyện Của Tôi',
    'about.description1': 'Tôi là sinh viên năm cuối ngành Khoa học máy tính, có niềm đam mê mạnh mẽ với Trí tuệ nhân tạo, đặc biệt là trong các lĩnh vực Thị giác máy tính và Học máy, cùng với nền tảng vững chắc về khoa học máy tính. Tôi mong muốn được gia nhập công ty của quý vị để đóng góp vào việc xây dựng các giải pháp tiên tiến và sáng tạo, áp dụng những kiến thức đã học để giải quyết các vấn đề thực tiễn. Tôi luôn khao khát được học hỏi và phát triển, với mục tiêu trở thành một kỹ sư AI giỏi, đặc biệt trong lĩnh vực Thị giác máy tính. Tôi cam kết gắn bó và phát triển lâu dài cùng công ty.',
    'about.location': 'Vị Trí',
    'about.email': 'Email',
    'about.availability': 'Tình Trạng',
    'about.availableText': 'Sẵn sàng nhận dự án',
    'about.unavailableText': 'Hiện không khả dụng',
    'about.projects': 'Dự Án',
    'about.years': 'Năm',
    'about.clients': 'Khách Hàng',
    'about.skills.title': 'Kỹ Năng',
    'about.skills.programming': 'Ngôn Ngữ Lập Trình',
    'about.skills.framework': 'Framework',
    'about.skills.library': 'Thư Viện',
    'about.skills.database': 'Hệ Quản Trị Cơ Sở Dữ Liệu',
    'about.skills.tools': 'Công Cụ & Nền Tảng',
    'about.experience.title': 'Kinh Nghiệm',

    // Skills Page
    'skills.title': 'Công Nghệ Tôi Yêu Thích',
    'skills.subtitle': 'Các công cụ và công nghệ hiện đại tôi sử dụng để xây dựng những trải nghiệm số tuyệt vời',
    'skills.footer.text': 'Luôn học hỏi và khám phá công nghệ mới để dẫn đầu xu hướng',
    'skills.footer.cta': 'Hãy Cùng Xây Dựng Điều Gì Đó',

    // Experience Page
    'experience.title': 'Kinh Nghiệm',
    'experience.subtitle': 'Hành trình nghề nghiệp của tôi',
    'experience.keyAchievements': 'Thành Tựu Chính',

    // About Experience Data
    'about.experience.techvision.role': 'Chuyên Viên Triển Khai & Kỹ Sư QA',
    'about.experience.techvision.company': 'Công Ty TNHH Giải Pháp Kỹ Thuật Số DH',
    'about.experience.techvision.period': '2025 - Hiện tại',
    'about.experience.techvision.description': 'DH Solutions cung cấp toàn diện hệ sinh thái phần mềm quản lý khám chữa bệnh cho ngành y tế.',
    // 'about.experience.dataflow.role': 'Lập Trình Viên Full Stack',
    // 'about.experience.dataflow.company': 'DataFlow Analytics',
    // 'about.experience.dataflow.period': '2021 - 2022',
    // 'about.experience.dataflow.description': 'Phát triển các nền tảng phân tích dữ liệu và các giải pháp học máy cho trí tuệ kinh doanh.',

    // Projects Page
    'projects.title': 'Dự Án',
    'projects.subtitle': 'Những thứ tôi đã xây dựng',

    // Contact Page
    'contact.title': 'Liên Hệ',
    'contact.subtitle': 'Hãy cùng làm việc',
    'contact.name': 'Tên',
    'contact.email': 'Email',
    'contact.message': 'Tin Nhắn',
    'contact.send': 'Gửi Tin Nhắn',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};