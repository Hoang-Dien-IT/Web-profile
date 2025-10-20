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
    'about.story': 'My Story',
    'about.description1': "I'm a passionate full-stack developer with over 4 years of experience creating digital solutions that make a difference. My journey started with curiosity about how websites work, and it has evolved into a deep love for crafting beautiful, functional applications.",
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

    // Experience Page
    'experience.title': 'Experience',
    'experience.subtitle': 'My professional journey',
    'experience.keyAchievements': 'Key Achievements',

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
    'about.story': 'Câu Chuyện Của Tôi',
    'about.description1': 'Tôi là một full-stack developer đầy đam mê với hơn 4 năm kinh nghiệm tạo ra các giải pháp số tạo nên sự khác biệt. Hành trình của tôi bắt đầu từ sự tò mò về cách hoạt động của website, và đã phát triển thành tình yêu sâu sắc với việc tạo ra những ứng dụng đẹp và chức năng.',
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

    // Experience Page
    'experience.title': 'Kinh Nghiệm',
    'experience.subtitle': 'Hành trình nghề nghiệp của tôi',
    'experience.keyAchievements': 'Thành Tựu Chính',

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