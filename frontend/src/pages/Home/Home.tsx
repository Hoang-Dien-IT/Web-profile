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
      {/* Ultra Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 animated-gradient opacity-20" />
        
        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 2 === 0 ? 'floating' : 'floating-slow'} ${
              i % 3 === 0 ? 'w-32 h-32' : i % 3 === 1 ? 'w-24 h-24' : 'w-16 h-16'
            } ${
              i % 4 === 0 ? 'bg-gradient-to-br from-orange-500/30 to-red-500/20' :
              i % 4 === 1 ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/20' :
              i % 4 === 2 ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/20' :
              'bg-gradient-to-br from-purple-500/30 to-pink-500/20'
            } rounded-full blur-xl mega-glow morphing-border`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i * 8) % 60}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 50, 0],
              scale: [1, 1.3, 0.8, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Premium Mouse Follower */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-radial from-orange-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none shimmer-effect"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
        />
        
        {/* Parallax Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-900/20 to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Ultra Premium Main Heading */}
        <motion.div variants={itemVariants} className="mb-6 relative">
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 relative z-10"
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.span 
              className="block text-white mb-2 relative"
              whileHover={{ scale: 1.05 }}
            >
              Hi, I'm
              <span className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-xl rounded-lg opacity-0 animate-pulse" />
            </motion.span>
            <motion.span 
              className="block gradient-text neon-glow relative transform-3d"
              whileHover={{ 
                scale: 1.02,
                textShadow: "0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor"
              }}
            >
              Nguyen Hoang Dien
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 opacity-10 blur-2xl" />
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Enhanced Typing Animation */}
        <motion.div variants={itemVariants} className="mb-8 relative">
          <div className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light">
            <motion.span 
              className="gradient-text-secondary neon-glow relative"
              animate={{ 
                textShadow: [
                  "0 0 10px currentColor",
                  "0 0 20px currentColor, 0 0 40px currentColor",
                  "0 0 10px currentColor"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {displayText}
              <motion.span 
                className="text-orange-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.span>
          </div>
        </motion.div>

        {/* Premium Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed relative glass-premium p-6 rounded-2xl"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <span className="relative z-10">
            I craft beautiful, responsive, and user-friendly digital experiences 
            with modern technologies. Passionate about creating innovative solutions 
            that make a difference.
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-blue-500/10 to-green-500/10 rounded-2xl shimmer-effect" />
        </motion.p>

        {/* Ultra Premium CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.08, y: -8 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <button
              onClick={() => {
                const element = document.getElementById('projects');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-ultra relative inline-flex items-center px-10 py-5 text-white font-bold rounded-full shadow-2xl transition-all duration-500 group overflow-hidden transform-3d"
            >
              <span className="relative z-10 flex items-center">
                View My Work
                <motion.svg
                  className="ml-3 w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 blur opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.06, y: -6 }}
            whileTap={{ scale: 0.96 }}
            className="relative group"
          >
            <a
              href="https://drive.google.com/file/d/1QoWI4A9RuRBHf9OoMxEXfgF4CxGki0Bm/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in Google Drive (opens in a new tab)"
              title="Download Resume"
              className="glass-premium relative inline-flex items-center px-10 py-5 border-2 border-orange-400 text-orange-300 font-bold rounded-full transition-all duration-500 group mega-glow overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <motion.svg 
                  className="mr-3 w-6 h-6" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  aria-hidden
                  whileHover={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
                Download Resume
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="absolute -inset-2 border border-orange-400/30 rounded-full animate-ping" />
              <span className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.06, y: -6 }}
            whileTap={{ scale: 0.96 }}
            className="relative group"
          >
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass-premium relative inline-flex items-center px-10 py-5 border-2 border-blue-400 text-blue-300 font-bold rounded-full transition-all duration-500 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Get In Touch
                <motion.svg
                  className="ml-3 w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </motion.svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
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