import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import { LanguageProvider } from './context/LanguageContext';

// Pages as Sections
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Skills from './pages/Skills/Skills';
import Experience from './pages/Experience/Experience';
import Projects from './pages/Projects/Projects';


const App: React.FC = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);
  
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Main Portfolio Route */}
          <Route path="/" element={
            <div className="App min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white relative overflow-x-hidden">
              {/* Particles Background */}
              <ParticlesBackground />
              
              {/* Navigation */}
              <Navbar />
              
              {/* Main Content - Single Page with Sections */}
              <main className="relative z-10">
                <section id="home" className="min-h-screen">
                  <Home />
                </section>
                
                <section id="about" className="min-h-screen">
                  <About />
                </section>
                
                <section id="skills" className="min-h-screen">
                  <Skills />
                </section>
                
                <section id="experience" className="min-h-screen">
                  <Experience />
                </section>
                
                <section id="projects" className="min-h-screen">
                  <Projects />
                </section>
                
                {/* <section id="contact" className="min-h-screen">
                  <Contact />
                </section> */}
              </main>
              
              {/* Scroll to Top */}
              <ScrollToTop />
              
              {/* Background Gradients */}
              <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success-500/5 rounded-full blur-3xl animate-spin-slow"></div>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
