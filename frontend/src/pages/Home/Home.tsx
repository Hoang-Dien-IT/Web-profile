import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const typingTexts = [
      "Full Stack Developer",
      "AI Engineer", 
      "Data Scientist",
      "Deep Learning Enthusiast",
      "Backend Developer"
    ];
    
    const currentText = typingTexts[currentIndex];
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setDisplayText(currentText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % typingTexts.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}

        {/* Mouse follower effect */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-radial from-primary-500/10 via-secondary-500/5 to-transparent rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 200 }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Main heading with gradient text */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="block text-white mb-2">Hi, I'm</span>
            <motion.span 
              className="block gradient-text"
            >
              Nguyen Hoang Dien
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Animated subtitle with typing effect */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light">
            <span className="gradient-text-secondary">
              {displayText}
              <span className="animate-ping">|</span>
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          I craft beautiful, responsive, and user-friendly digital experiences 
          with modern technologies. Passionate about creating innovative solutions 
          that make a difference.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById('projects');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-2xl transition-all duration-300 group"
            >
              View My Work
              <motion.svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 border-2 border-secondary-500 text-secondary-400 font-semibold rounded-full hover:border-secondary-400 hover:text-secondary-300 transition-all duration-300 backdrop-blur-sm bg-white/5"
            >
              Get In Touch
              <motion.svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ rotate: 15 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </motion.svg>
            </button>
          </motion.div>
        </motion.div>

        {/* Social links */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-6 mt-12"
        >
          {[
            { name: 'GitHub', iconClass: 'fa-brands fa-github', color: '#ffffff', href: 'https://github.com/Hoang-Dien-IT' },
            { name: 'LinkedIn', iconClass: 'fa-brands fa-linkedin', color: '#0077B5', href: 'https://www.linkedin.com/in/nguy%E1%BB%85n-ho%C3%A0ng-%C4%91i%E1%BB%83n-215444334/' },
            { name: 'Facebook', iconClass: 'fa-brands fa-facebook', color: '#1DA1F2', href: 'https://www.facebook.com/hoang.ien.428831/' },
            { name: 'Email', iconClass: 'fa-solid fa-envelope', color: '#ea4335', href: 'mailto:nguyenhoangdien1x@gmail.com' },
          ].map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-lg hover:bg-primary-500/20 transition-all duration-300 group"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <i 
                className={`${social.iconClass} group-hover:scale-110 transition-transform duration-300`}
                style={{ color: social.color }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;