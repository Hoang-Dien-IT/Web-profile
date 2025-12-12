import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Projects from '../pages/Projects/Projects';
import Skills from '../pages/Skills/Skills';
import Experience from '../pages/Experience/Experience';
// import Contact from '../pages/Contact/Contact';

// Animation component wrapper
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ 
      type: "tween",
      ease: "anticipate",
      duration: 0.5
    }}
    className="w-full min-h-screen"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          } 
        />
        <Route 
          path="/about" 
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <PageWrapper>
              <Projects />
            </PageWrapper>
          } 
        />
        <Route 
          path="/skills" 
          element={
            <PageWrapper>
              <Skills />
            </PageWrapper>
          } 
        />
        <Route 
          path="/experience" 
          element={
            <PageWrapper>
              <Experience />
            </PageWrapper>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;