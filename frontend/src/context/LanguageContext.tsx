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
    'home.description': 'I craft beautiful, responsive, and user-friendly digital experiences with modern technologies. Passionate about creating innovative solutions that make a difference.',
    'home.viewWork': 'View My Work',
    'home.downloadResume': 'Download Resume',
    'home.getInTouch': 'Get In Touch',

    // About Page
    'about.title': 'About Me',
    'about.subtitle': 'Get to know me better',
    'about.description': 'I am a passionate AI Engineer with expertise in machine learning, deep learning, and software development. I love creating innovative solutions that solve real-world problems.',
    'about.skills.title': 'Skills',
    'about.skills.programming': 'Programming Language',
    'about.skills.framework': 'Framework',
    'about.skills.library': 'Library',
    'about.skills.database': 'Database Management System',
    'about.skills.tools': 'Tools & Platforms',

    // Skills Page
    'skills.title': 'Technologies I Love',
    'skills.subtitle': 'Modern tools and technologies I use to build amazing digital experiences',

    // Experience Page
    'experience.title': 'Experience',
    'experience.subtitle': 'My professional journey',

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
    'home.name': 'Nguyễn Hoàng Điền',
    'home.title': 'Kỹ Sư AI',
    'home.description': 'Tôi tạo ra những trải nghiệm số đẹp mắt, phản hồi nhanh và thân thiện với người dùng bằng các công nghệ hiện đại. Đam mê tạo ra những giải pháp sáng tạo tạo nên sự khác biệt.',
    'home.viewWork': 'Xem Công Việc',
    'home.downloadResume': 'Tải Hồ Sơ',
    'home.getInTouch': 'Liên Hệ',

    // About Page
    'about.title': 'Giới Thiệu',
    'about.subtitle': 'Tìm hiểu thêm về tôi',
    'about.description': 'Tôi là một Kỹ sư AI đầy đam mê với chuyên môn về học máy, học sâu và phát triển phần mềm. Tôi yêu thích tạo ra những giải pháp sáng tạo giải quyết các vấn đề thực tế.',
    'about.skills.title': 'Kỹ Năng',
    'about.skills.programming': 'Ngôn Ngữ Lập Trình',
    'about.skills.framework': 'Framework',
    'about.skills.library': 'Thư Viện',
    'about.skills.database': 'Hệ Quản Trị Cơ Sở Dữ Liệu',
    'about.skills.tools': 'Công Cụ & Nền Tảng',

    // Skills Page
    'skills.title': 'Công Nghệ Tôi Yêu Thích',
    'skills.subtitle': 'Các công cụ và công nghệ hiện đại tôi sử dụng để xây dựng những trải nghiệm số tuyệt vời',

    // Experience Page
    'experience.title': 'Kinh Nghiệm',
    'experience.subtitle': 'Hành trình nghề nghiệp của tôi',

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