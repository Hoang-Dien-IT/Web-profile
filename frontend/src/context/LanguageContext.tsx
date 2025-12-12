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
    
    // Experience Data - Job 1
    'exp.001.company': 'DH Digital Solutions Company Limited',
    'exp.001.position': 'Implementation Specialist & QA Engineer',
    'exp.001.location': 'Can Tho City, Vietnam',
    'exp.001.description': 'DH Solutions provides a comprehensive ecosystem of healthcare management software for the medical industry.',
    'exp.001.achievement1': 'Able to document and design hospital medical examination and treatment workflows.',
    'exp.001.achievement2': 'Understand the functions and usage of modules in the HIS (Hospital Information System) software.',
    'exp.001.achievement3': 'Deploy modules into real hospital environments.',
    'exp.001.achievement4': 'Provide support for multiple partners and clients.',
    
    // Experience Data - Job 2
    'exp.002.company': 'Can Tho University',
    'exp.002.position': 'Full Stack Developer And AI Engineer',
    'exp.002.location': 'Can Tho City, Vietnam',
    'exp.002.description': 'Focused on continuous learning and self-development, particularly in computer science fields related to image and data processing. Engaged in multiple deep learning projects to strengthen technical and analytical skills.',
    'exp.002.achievement1': 'Developed a football player recognition website using a CNN model with approximately 90% accuracy.',
    'exp.002.achievement2': 'Developed a web-based system to help users check drug interactions.',
    'exp.002.achievement3': 'Developed a camera management system integrated with a stranger detection model for IP cameras.',
    'exp.002.achievement4': 'Developed a Windows-based human resource management system using C#.',
    'exp.002.achievement5': 'Developed a small web application for online book borrowing management.',

    // About Experience Data
    'about.experience.techvision.role': 'Implementation Specialist & QA Engineer',
    'about.experience.techvision.company': 'DH Digital Solutions Company Limited',
    'about.experience.techvision.period': '2025 - Present',
    'about.experience.techvision.description': 'DH Solutions provides a comprehensive ecosystem of healthcare management software for the medical industry.',
    // 'about.experience.dataflow.role': 'Full Stack Developer',
    // 'about.experience.dataflow.company': 'DataFlow Analytics',
    // 'about.experience.dataflow.period': '2021 - 2022',
    // 'about.experience.dataflow.description': 'Developed data analytics platforms and machine learning solutions for business intelligence.',

    // Contact Page
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s work together',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',

    // Project Data
    'project.drug-checker.title': 'Web Drugs Interaction Checker',
    'project.drug-checker.description': 'A web application that checks for potential drug interactions using a comprehensive database.',
    'project.drug-checker.longDescription': 'Developed a web application that allows users to input multiple medications and checks for potential interactions using a comprehensive database. The application provides detailed information about each drug, including side effects, contraindications, and alternative medications.',
    'project.drug-checker.category': 'AI-powered website',
    
    'project.safeface.title': 'Stranger detection system using camera-IP: SafeFace',
    'project.safeface.description': 'The SafeFace project is an automated management and monitoring system using surveillance cameras and a processing pipeline that employs RetinaFace and ArcFace models for human face detection and recognition.',
    'project.safeface.longDescription': 'Built a comprehensive task management system that uses machine learning to analyze work patterns and suggest optimal task prioritization. Features include smart notifications, productivity tracking, team collaboration tools, and detailed analytics dashboards.',
    'project.safeface.category': 'AI-powered website',
    
    'project.football.title': 'Website identifies football players',
    'project.football.description': 'The project involves building a CNN model and training it on self-collected data. The website allows users to recognize famous English Premier League football players through uploaded facial images of the players.',
    'project.football.longDescription': 'Developed a comprehensive platform that leverages machine learning and computer vision techniques to identify football players in live video feeds. The system provides real-time analytics and insights into player performance and tactics.',
    'project.football.category': 'AI-powered website',
    
    'project.hrm.title': 'HRM System Winform',
    'project.hrm.description': 'The project helps users manage human resources more easily and is built as a Windows application.',
    'project.hrm.longDescription': 'Created a comprehensive analytics platform that processes large datasets and provides interactive visualizations, automated reporting, and predictive analytics using machine learning algorithms. Designed for business intelligence and data-driven decision making.',
    'project.hrm.category': 'System',
    
    'project.lung.title': 'Lung disease classification from X-ray images',
    'project.lung.description': 'An AI model for classifying lung diseases from X-ray images using a CNN architecture with well-preprocessed data.',
    'project.lung.longDescription': 'Developed a deep learning model using convolutional neural networks (CNN) to classify lung diseases from X-ray images. The system provides accurate predictions and insights to assist radiologists in diagnosing lung conditions.',
    'project.lung.category': 'AI Model',
    
    'project.portfolio.title': 'Web Portfolio',
    'project.portfolio.description': 'A personal portfolio website showcasing my projects and skills.',
    'project.portfolio.longDescription': 'This portfolio website is built using modern web technologies and showcases my work, skills, and experiences in a visually appealing manner.',
    'project.portfolio.category': 'Frontend',

    // Projects Page
    'projects.title': 'Projects',
    'projects.subtitle': 'A collection of projects that showcase my skills and passion for development',
    'projects.filterAll': 'All',
    'projects.liveDemo': '🚀 Live Demo',
    'projects.code': '💻 Code',
    'projects.featured': '⭐ Featured',
    'projects.ctaTitle': 'Interested in Working Together?',
    'projects.ctaSubtitle': 'I\'m always excited to work on new projects and collaborate with amazing people.',
    'projects.ctaButton': 'Let\'s Discuss Your Project',
    'projects.viewDetails': 'View Details',
    'projects.modal.description': 'Description',
    'projects.modal.technologies': 'Technologies Used',
    'projects.modal.category': 'Category',
    'projects.modal.status': 'Status',
    'projects.modal.completed': 'Completed',
    'projects.modal.features': 'Key Features',
    'projects.modal.gallery': 'Project Gallery',
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
    
    // Experience Data - Job 1
    'exp.001.company': 'Công Ty TNHH Giải Pháp Số DH',
    'exp.001.position': 'Chuyên Viên Triển Khai & Kỹ Sư QA',
    'exp.001.location': 'Thành phố Cần Thơ, Việt Nam',
    'exp.001.description': 'DH Solutions cung cấp hệ sinh thái phần mềm quản lý y tế toàn diện cho ngành y tế.',
    'exp.001.achievement1': 'Có khả năng tài liệu hóa và thiết kế quy trình khám chữa bệnh tại bệnh viện.',
    'exp.001.achievement2': 'Hiểu biết về chức năng và cách sử dụng các module trong phần mềm HIS (Hệ thống thông tin bệnh viện).',
    'exp.001.achievement3': 'Triển khai các module vào môi trường bệnh viện thực tế.',
    'exp.001.achievement4': 'Cung cấp hỗ trợ cho nhiều đối tác và khách hàng.',
    
    // Experience Data - Job 2
    'exp.002.company': 'Đại Học Cần Thơ',
    'exp.002.position': 'Lập Trình Viên Full Stack & Kỹ Sư AI',
    'exp.002.location': 'Thành phố Cần Thơ, Việt Nam',
    'exp.002.description': 'Tập trung vào học tập liên tục và phát triển bản thân, đặc biệt trong các lĩnh vực khoa học máy tính liên quan đến xử lý hình ảnh và dữ liệu. Tham gia nhiều dự án học sâu để tăng cường kỹ năng kỹ thuật và phân tích.',
    'exp.002.achievement1': 'Phát triển website nhận diện cầu thủ bóng đá sử dụng mô hình CNN với độ chính xác khoảng 90%.',
    'exp.002.achievement2': 'Phát triển hệ thống web giúp người dùng kiểm tra tương tác thuốc.',
    'exp.002.achievement3': 'Phát triển hệ thống quản lý camera tích hợp mô hình phát hiện người lạ cho camera IP.',
    'exp.002.achievement4': 'Phát triển hệ thống quản lý nhân sự trên Windows sử dụng C#.',
    'exp.002.achievement5': 'Phát triển ứng dụng web nhỏ quản lý mượn sách trực tuyến.',

    // About Experience Data
    'about.experience.techvision.role': 'Chuyên Viên Triển Khai & Kỹ Sư QA',
    'about.experience.techvision.company': 'Công Ty TNHH Giải Pháp Kỹ Thuật Số DH',
    'about.experience.techvision.period': '2025 - Hiện tại',
    'about.experience.techvision.description': 'DH Solutions cung cấp toàn diện hệ sinh thái phần mềm quản lý khám chữa bệnh cho ngành y tế.',
    // 'about.experience.dataflow.role': 'Lập Trình Viên Full Stack',
    // 'about.experience.dataflow.company': 'DataFlow Analytics',
    // 'about.experience.dataflow.period': '2021 - 2022',
    // 'about.experience.dataflow.description': 'Phát triển các nền tảng phân tích dữ liệu và các giải pháp học máy cho trí tuệ kinh doanh.',

    // Contact Page
    'contact.title': 'Liên Hệ',
    'contact.subtitle': 'Hãy cùng làm việc',
    'contact.name': 'Tên',
    'contact.email': 'Email',
    'contact.message': 'Tin Nhắn',
    'contact.send': 'Gửi Tin Nhắn',

    // Project Data
    'project.drug-checker.title': 'Website Kiểm Tra Tương Tác Thuốc',
    'project.drug-checker.description': 'Ứng dụng web kiểm tra tương tác thuốc tiềm ẩn sử dụng cơ sở dữ liệu toàn diện.',
    'project.drug-checker.longDescription': 'Phát triển ứng dụng web cho phép người dùng nhập nhiều loại thuốc và kiểm tra tương tác tiềm ẩn bằng cơ sở dữ liệu toàn diện. Ứng dụng cung cấp thông tin chi tiết về từng loại thuốc, bao gồm tác dụng phụ, chống chỉ định và thuốc thay thế.',
    'project.drug-checker.category': 'Website AI',
    
    'project.safeface.title': 'Hệ thống phát hiện người lạ bằng camera-IP: SafeFace',
    'project.safeface.description': 'Dự án SafeFace là hệ thống quản lý và giám sát tự động sử dụng camera giám sát và pipeline xử lý sử dụng mô hình RetinaFace và ArcFace để phát hiện và nhận dạng khuôn mặt con người.',
    'project.safeface.longDescription': 'Xây dựng hệ thống quản lý tác vụ toàn diện sử dụng machine learning để phân tích patterns làm việc và đề xuất ưu tiên tác vụ tối ưu. Tính năng bao gồm thông báo thông minh, theo dõi năng suất, công cụ cộng tác nhóm và dashboard phân tích chi tiết.',
    'project.safeface.category': 'Website AI',
    
    'project.football.title': 'Website nhận dạng cầu thủ bóng đá',
    'project.football.description': 'Dự án bao gồm xây dựng mô hình CNN và huấn luyện trên dữ liệu tự thu thập. Website cho phép người dùng nhận dạng các cầu thủ bóng đá nổi tiếng Premier League Anh thông qua hình ảnh khuôn mặt được tải lên.',
    'project.football.longDescription': 'Phát triển nền tảng toàn diện tận dụng machine learning và kỹ thuật computer vision để nhận dạng cầu thủ bóng đá trong video trực tiếp. Hệ thống cung cấp phân tích và thông tin chi tiết về hiệu suất và chiến thuật cầu thủ.',
    'project.football.category': 'Website AI',
    
    'project.hrm.title': 'Hệ Thống HRM Winform',
    'project.hrm.description': 'Dự án giúp người dùng quản lý nguồn nhân lực dễ dàng hơn và được xây dựng dưới dạng ứng dụng Windows.',
    'project.hrm.longDescription': 'Tạo nền tảng phân tích toàn diện xử lý tập dữ liệu lớn và cung cấp visualization tương tác, báo cáo tự động và phân tích dự đoán sử dụng thuật toán machine learning. Được thiết kế cho business intelligence và ra quyết định dựa trên dữ liệu.',
    'project.hrm.category': 'Hệ Thống',
    
    'project.lung.title': 'Phân loại bệnh phổi từ hình ảnh X-quang',
    'project.lung.description': 'Mô hình AI phân loại bệnh phổi từ hình ảnh X-quang sử dụng kiến trúc CNN với dữ liệu được tiền xử lý tốt.',
    'project.lung.longDescription': 'Phát triển mô hình deep learning sử dụng convolutional neural networks (CNN) để phân loại bệnh phổi từ hình ảnh X-quang. Hệ thống cung cấp dự đoán chính xác và thông tin chi tiết để hỗ trợ bác sĩ X-quang trong chẩn đoán tình trạng phổi.',
    'project.lung.category': 'Mô Hình AI',
    
    'project.portfolio.title': 'Website Portfolio',
    'project.portfolio.description': 'Website portfolio cá nhân trình bày các dự án và kỹ năng của tôi.',
    'project.portfolio.longDescription': 'Website portfolio này được xây dựng bằng công nghệ web hiện đại và trình bày công việc, kỹ năng và kinh nghiệm của tôi một cách hấp dẫn về mặt thị giác.',
    'project.portfolio.category': 'Frontend',

    // Projects Page
    'projects.title': 'Dự Án',
    'projects.subtitle': 'Bộ sưu tập các dự án thể hiện kỹ năng và đam mê phát triển của tôi',
    'projects.filterAll': 'Tất Cả',
    'projects.liveDemo': '🚀 Demo Trực Tiếp',
    'projects.code': '💻 Mã Nguồn',
    'projects.featured': '⭐ Nổi Bật',
    'projects.ctaTitle': 'Quan Tâm Đến Việc Hợp Tác?',
    'projects.ctaSubtitle': 'Tôi luôn hào hức làm việc trên các dự án mới và hợp tác với những người tuyệt vời.',
    'projects.ctaButton': 'Hãy Thảo Luận Dự Án Của Bạn',
    'projects.viewDetails': 'Xem Chi Tiết',
    'projects.modal.description': 'Mô Tả',
    'projects.modal.technologies': 'Công Nghệ Sử Dụng',
    'projects.modal.category': 'Danh Mục',
    'projects.modal.status': 'Trạng Thái',
    'projects.modal.completed': 'Hoàn Thành',
    'projects.modal.features': 'Tính Năng Chính',
    'projects.modal.gallery': 'Thư Viện Ảnh',
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