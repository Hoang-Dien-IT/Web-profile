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
          {/* Floating Letters Animation */}
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 relative z-10"
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.span 
              className="block mb-2 relative hero-greeting text-white"
              whileHover={{ scale: 1.05 }}
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)) drop-shadow(0 2px 10px rgba(0, 0, 0, 0.8))',
                fontWeight: '700',
                letterSpacing: '0.025em',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
              }}
            >
              {"Hi, I'm".split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block relative"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.2,
                    filter: "drop-shadow(0 0 30px rgba(249, 115, 22, 0.8)) drop-shadow(0 0 60px rgba(99, 102, 241, 0.6))"
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.span>
            
            <motion.span 
              className="block font-black tracking-wider relative transform-3d hero-name text-white"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.9))',
                fontWeight: '900',
                letterSpacing: '0.02em',
                textShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(249, 115, 22, 0.2)'
              }}
              whileHover={{ 
                scale: 1.02,
                filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.6)) drop-shadow(0 6px 30px rgba(0, 0, 0, 1))"
              }}
            >
              {"Nguyen Hoang Dien".split(' ').map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="inline-block mr-6"
                  initial={{ y: 100, opacity: 0, rotateX: 45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.5 + wordIndex * 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.08,
                    rotateY: 5,
                    z: 50,
                    filter: "drop-shadow(0 0 60px rgba(249, 115, 22, 0.9))"
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    fontWeight: '900',
                    letterSpacing: '0.025em'
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          
          {/* Premium Floating Decoration */}
          <motion.div
            className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-orange-500/40 to-red-500/40 rounded-full blur-lg"
            animate={{
              rotate: 360,
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-br from-blue-500/40 to-cyan-500/40 rounded-full blur-lg"
            animate={{
              rotate: -360,
              scale: [1.2, 0.8, 1.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
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
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          {/* Primary CTA - Ultra Premium */}
          <motion.div
            whileHover={{ 
              scale: 1.1, 
              y: -12,
              rotateX: 15,
              rotateY: 10,
            }}
            whileTap={{ scale: 0.92 }}
            className="relative group perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.button
              onClick={() => {
                const element = document.getElementById('projects');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-ultra relative inline-flex items-center px-12 py-6 text-white font-bold rounded-2xl shadow-2xl transition-all duration-700 group overflow-hidden"
              whileHover={{
                background: "linear-gradient(135deg, #f97316, #dc2626, #ea580c)",
                boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.5), 0 0 100px rgba(249, 115, 22, 0.3)"
              }}
            >
              <span className="relative z-20 flex items-center text-lg">
                {"View My Work".split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    whileHover={{ 
                      y: [-2, -8, -2], 
                      color: "#fff",
                      textShadow: "0 0 20px #fff"
                    }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
                <motion.svg
                  className="ml-4 w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 12, rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
              
              {/* Multiple Layered Backgrounds */}
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 rounded-2xl" />
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ 
                  background: [
                    "linear-gradient(45deg, #f59e0b, #ef4444)",
                    "linear-gradient(135deg, #f97316, #dc2626)",
                    "linear-gradient(225deg, #ea580c, #b91c1c)",
                    "linear-gradient(315deg, #f59e0b, #ef4444)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Glow Effects */}
              <span className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 rounded-2xl" />
              <span className="absolute -inset-4 bg-gradient-to-r from-orange-400/30 to-red-400/30 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 rounded-2xl" />
              
              {/* Sparkle Effects */}
              <motion.div
                className="absolute inset-0 overflow-hidden rounded-2xl"
                whileHover="sparkle"
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${20 + (i * 15) % 60}%`,
                    }}
                    variants={{
                      sparkle: {
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 180, 360],
                      }
                    }}
                    transition={{ delay: i * 0.1, duration: 0.6, repeat: 2 }}
                  />
                ))}
              </motion.div>
            </motion.button>
            
            {/* Floating Ring */}
            <motion.div
              className="absolute inset-0 border-2 border-orange-400/40 rounded-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Resume CTA - Glass Morphism Premium */}
          <motion.div
            whileHover={{ 
              scale: 1.08, 
              y: -10,
              rotateX: -10,
              rotateY: -5,
            }}
            whileTap={{ scale: 0.94 }}
            className="relative group perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.a
              href="https://drive.google.com/file/d/1QoWI4A9RuRBHf9OoMxEXfgF4CxGki0Bm/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in Google Drive (opens in a new tab)"
              title="Download Resume"
              className="glass-premium relative inline-flex items-center px-12 py-6 border-2 border-orange-400/60 text-orange-300 font-bold rounded-2xl transition-all duration-700 group overflow-hidden backdrop-blur-xl"
              whileHover={{
                borderColor: "#f97316",
                color: "#fff",
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.4), 0 0 80px rgba(249, 115, 22, 0.2)"
              }}
            >
              <span className="relative z-20 flex items-center text-lg">
                <motion.svg 
                  className="mr-4 w-7 h-7" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  aria-hidden
                  whileHover={{ 
                    y: [0, -6, 0], 
                    rotate: [0, 360, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
                {"Download Resume".split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    whileHover={{ 
                      y: [-1, -6, -1], 
                      color: "#f97316",
                      textShadow: "0 0 15px #f97316"
                    }}
                    transition={{ delay: index * 0.04, duration: 0.4 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
              
              {/* Glass Background Layers */}
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl backdrop-blur-sm" />
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ 
                  background: [
                    "linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(220, 38, 38, 0.1))",
                    "linear-gradient(135deg, rgba(251, 146, 60, 0.15), rgba(239, 68, 68, 0.1))",
                    "linear-gradient(225deg, rgba(249, 115, 22, 0.1), rgba(220, 38, 38, 0.1))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Glowing Border Animation */}
              <motion.span 
                className="absolute inset-0 border-2 border-orange-400/40 rounded-2xl"
                animate={{ 
                  borderColor: [
                    "rgba(249, 115, 22, 0.4)",
                    "rgba(249, 115, 22, 0.8)",
                    "rgba(220, 38, 38, 0.6)",
                    "rgba(249, 115, 22, 0.4)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Pulse Rings */}
              <motion.div
                className="absolute -inset-4 border border-orange-400/20 rounded-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-6 border border-orange-400/10 rounded-2xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0, 0.3] 
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              
              {/* Glow Effect */}
              <span className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 rounded-2xl" />
            </motion.a>
          </motion.div>

          {/* Contact CTA - Minimal Premium */}
          <motion.div
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              rotateX: 5,
            }}
            whileTap={{ scale: 0.95 }}
            className="relative group perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.button
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass-premium relative inline-flex items-center px-10 py-5 border-2 border-blue-400/50 text-blue-300 font-bold rounded-2xl transition-all duration-600 group overflow-hidden backdrop-blur-lg"
              whileHover={{
                borderColor: "#3b82f6",
                color: "#fff",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4)"
              }}
            >
              <span className="relative z-20 flex items-center text-lg">
                {"Get In Touch".split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    whileHover={{ 
                      y: [-1, -4, -1], 
                      color: "#3b82f6"
                    }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
                <motion.svg
                  className="ml-3 w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 25, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </motion.svg>
              </span>
              
              {/* Subtle Glass Background */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl backdrop-blur-sm" />
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              />
              
              {/* Subtle Glow */}
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />
            </motion.button>
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