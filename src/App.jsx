import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import Navigation from './components/Navigation';
import HeroAbout from './pages/HeroAbout';
import CallToAction from './pages/CallToAction';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Articles from './pages/Articles';
import CodingProfiles from './pages/CodingProfiles';
import SocialLinks from './components/SocialLinks';
import ParticlesBackground from './components/ParticlesBackground';
import GradientBlur from './components/GradientBlur';

import ProfileImage from "./assets/images/portfolio.png";

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  in: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  out: { 
    opacity: 0, 
    y: -50,
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loading-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Sunil V
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            AI & Data Science Engineer
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <ParticlesBackground />
        <GradientBlur />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  key="hero"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="page-container"
                >
                  <HeroAbout />
                </motion.div>
              } 
            />
            <Route 
              path="/cta" 
              element={
                <motion.div
                  key="cta"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="page-container"
                >
                  <CallToAction />
                </motion.div>
              } 
            />
            <Route 
              path="/resume" 
              element={
                <motion.div
                  key="resume"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="page-container"
                >
                  <Resume />
                </motion.div>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <motion.div
                  key="projects"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="page-container"
                >
                  <Projects />
                </motion.div>
              } 
            />
            <Route 
              path="/skills" 
              element={
                <motion.div
                  key="skills"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="page-container"
                >
                  <Skills />
                </motion.div>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <motion.div
                  key="contact"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="page-container"
                >
                  <Contact />
                </motion.div>
              } 
            />
            <Route 
              path="/articles" 
              element={
                <motion.div
                  key="articles"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="page-container"
                >
                  <Articles />
                </motion.div>
              } 
            />
            <Route 
              path="/coding-profiles" 
              element={
                <motion.div
                  key="coding-profiles"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="page-container"
                >
                  <CodingProfiles />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
        
        <SocialLinks />
      </div>
    </Router>
  );
}

export default App;