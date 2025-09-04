import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import * as THREE from 'three';
import './HeroAbout.css';

// 3D Icon Components
const FloatingIcon = ({ position, color, children }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.3]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff006e" />
      
      <FloatingIcon position={[-2, 1, 0]} color="#00f5ff" />
      <FloatingIcon position={[2, -1, 0]} color="#ff006e" />
      <FloatingIcon position={[0, 2, -1]} color="#7c3aed" />
      <FloatingIcon position={[-1, -2, 1]} color="#f59e0b" />
      
      {/* Central rotating sphere */}
      <Float speed={1} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[0.8, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#00f5ff"
            attach="material"
            distort={0.6}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

// Typewriter Effect Component
const TypeWriter = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

const HeroAbout = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const achievements = [
    { number: "94%", label: "Drowsy Driver Detection Accuracy" },
    { number: "30%", label: "EV Charging Wait Time Reduction" },
    { number: "40%", label: "Faster Interview Prep Sessions" },
    { number: "8.35", label: "CGPA in AI & Data Science" }
  ];

  const glowVariants = {
    initial: { boxShadow: "0 0 20px rgba(0, 245, 255, 0.3)" },
    hover: { 
      boxShadow: "0 0 40px rgba(0, 245, 255, 0.6)",
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="hero-about" ref={ref}>
      <motion.div
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate={mainControls}
      >
        <div className="hero-content">
          <div className="hero-text">
            <motion.div className="hero-greeting" variants={itemVariants}>
              <span className="greeting-text">Hello, I'm</span>
            </motion.div>
            
            <motion.h1 className="hero-name" variants={itemVariants}>
              <TypeWriter text="Sunil V" delay={150} />
            </motion.h1>
            
            <motion.div className="hero-title" variants={itemVariants}>
              <TypeWriter text="AI & Data Science Engineer" delay={100} />
            </motion.div>
            
            <motion.p className="hero-description" variants={itemVariants}>
              Passionate about building intelligent systems that solve real-world problems. 
              Specializing in Machine Learning, Deep Learning, and Full-Stack Development 
              with expertise in Python, React, and cutting-edge AI technologies.
            </motion.p>

            <motion.div className="hero-buttons" variants={itemVariants}>
              <motion.button
                className="cta-button primary"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 245, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/projects')}
              >
                <span>Explore My Work</span>
              </motion.button>
              
              {/* <motion.button
                className="cta-button secondary"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 110, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Download Resume</span>
              </motion.button> */}

              <motion.button
                className="cta-button secondary"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 110, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/resume')}
              >
                <Download size={20} />
                <span>Download Resume</span>
              </motion.button>

            </motion.div>
          </div>

          <motion.div className="hero-3d" variants={itemVariants}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <Suspense fallback={null}>
                <Scene3D />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        className="about-section"
        variants={containerVariants}
        initial="hidden"
        animate={mainControls}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          About Me
        </motion.h2>
        
        <div className="about-content">
          <motion.div className="about-text" variants={itemVariants}>
            <p>
              I'm a final-year B.Tech student in Artificial Intelligence and Data Science at 
              KPR Institute of Engineering and Technology, with a strong foundation in both 
              theoretical concepts and practical applications.
            </p>
            
            <p>
              My journey in technology has led me to work on impactful projects like drowsy 
              driver detection systems, EV charging optimization apps, and AI-powered interview 
              preparation platforms. I've gained valuable industry experience through internships 
              at Zoho Corporation and currently work at Cognizant Technology Solutions in the 
              Non-Functional Testing team.
            </p>
            
            <p>
              I'm passionate about leveraging AI and machine learning to create solutions that 
              make a difference in people's lives, whether it's improving road safety, optimizing 
              infrastructure, or enhancing learning experiences.
            </p>
          </motion.div>

          <motion.div className="achievements-grid" variants={itemVariants}>
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="achievement-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="achievement-number"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                >
                  {achievement.number}
                </motion.div>
                <div className="achievement-label">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroAbout;
