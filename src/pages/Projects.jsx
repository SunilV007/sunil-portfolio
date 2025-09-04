import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Torus } from '@react-three/drei';
import { ExternalLink, Github, Eye, Code, Database, Brain, Smartphone } from 'lucide-react';
import './Projects.css';
import DDDImage from "../assets/images/DDD.jpeg";
import EVImage from "../assets/images/EV.jpg";
import MockImage from "../assets/images/prepai.jpg";
import BTImage from "../assets/images/BT.jpg";
// 3D Project Icons
const ProjectIcon3D = ({ type, color }) => {
  const meshRef = useRef();

  const iconComponents = {
    ml: () => <Brain size={40} />,
    web: () => <Code size={40} />,
    mobile: () => <Smartphone size={40} />,
    data: () => <Database size={40} />
  };

  return (
    <div className="project-icon-3d">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {type === 'ml' && (
          <Sphere ref={meshRef} args={[0.8]} position={[0, 0, 0]}>
            <meshStandardMaterial color={color} />
          </Sphere>
        )}
        {type === 'web' && (
          <Box ref={meshRef} args={[1.2, 0.8, 0.3]} position={[0, 0, 0]}>
            <meshStandardMaterial color={color} />
          </Box>
        )}
        {type === 'mobile' && (
          <Box ref={meshRef} args={[0.6, 1.2, 0.1]} position={[0, 0, 0]}>
            <meshStandardMaterial color={color} />
          </Box>
        )}
        {type === 'data' && (
          <Torus ref={meshRef} args={[0.8, 0.3, 16, 100]} position={[0, 0, 0]}>
            <meshStandardMaterial color={color} />
          </Torus>
        )}
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      id: 1,
      title: "Drowsy Driver Detection",
      category: "ml",
      description: "AI-powered system that detects drowsy driver states with 94% accuracy using CNN and real-time computer vision.",
      longDescription: "Built and trained a Convolutional Neural Network (CNN) model using TensorFlow and Keras to detect drowsy driver states. The system uses OpenCV for real-time frame processing and triggers alerts when eyes remain closed or yawning is detected for over 3 seconds.",
      technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
      image: DDDImage,
      metrics: ["94% Accuracy", "Real-time Processing", "<50ms Detection"],
      features: [
        "Real-time eye state detection",
        "Yawning pattern recognition", 
        "Alert system integration",
        "Optimized for performance"
      ],
      github: "https://github.com/SunilV007/Drowsy-Driver-Detection",
      demo: "#",
      type: "ml",
      color: "#00f5ff"
    },
    {
      id: 2,
      title: "EV Charging App",
      category: "mobile",
      description: "Flutter mobile app for booking EV charging slots with SVR-based prediction model for usage optimization.",
      longDescription: "Developed a comprehensive Flutter mobile application that enables users to book EV charging slots, reducing wait times by 30%. Implemented an SVR-based prediction model to analyze charging station usage patterns and improve infrastructure efficiency by 15%.",
      technologies: ["Flutter", "Python", "SVR", "Firebase", "REST APIs"],
      image: EVImage,
      metrics: ["30% Wait Reduction", "15% Efficiency Gain", "Real-time Booking"],
      features: [
        "Real-time slot booking",
        "Usage pattern prediction",
        "Load testing optimized",
        "Concurrent user support"
      ],
      github: "https://github.com/SunilV007/ev_application",
      demo: "#",
      type: "mobile",
      color: "#ff006e"
    },
    {
      id: 3,
      title: "Mock Interview AI Assistant",
      category: "web",
      description: "React-based web application with AI interviewer using Gemini API for dynamic question generation and feedback.",
      longDescription: "Designed and deployed a React-based web application that helps students improve interview performance with 40% faster practice sessions. Features text-to-speech for AI questions, speech-to-text for responses, and real-time feedback using Gemini API.",
      technologies: ["React", "Gemini API", "Speech Recognition", "TTS", "JavaScript"],
      image: MockImage,
      metrics: ["40% Faster Sessions", "25% More Engagement", "Real-time Feedback"],
      features: [
        "AI-powered interviewer",
        "Speech-to-text responses",
        "Dynamic question generation",
        "Performance analytics"
      ],
      github: "https://github.com/SunilV007/PrepAi-Assistant",
      demo: "https://prep-ai-assistant-five.vercel.app/login",
      type: "web",
      color: "#7c3aed"
    },
    {
      id: 4,
      title: "BudgetBuddy - Personal Finance Manager",
      category: "web",
      description: "Full-stack React application with Firebase backend for comprehensive personal finance management and real-time data synchronization.",
      longDescription: "Developed a comprehensive personal finance management application using modern web technologies, featuring user authentication, real-time data synchronization, and advanced data visualization capabilities. Built responsive single-page application using React 18 with modern hooks architecture, integrated with Firebase Authentication and Cloud Firestore for real-time operations.",
      technologies: ["React", "Firebase", "Chart.js", "Styled Components", "Cloud Firestore", "Vite"],
      image: BTImage,
      metrics: ["Real-time Sync", "5 Core Modules", "Cross-device Support"],
      features: [
        "User authentication system with Firebase Auth",
        "Budget management with visual progress indicators",
        "Transaction tracking with real-time synchronization",
        "Income management with recurring support",
        "Interactive financial reports and analytics",
        "Data migration from localStorage to Firebase",
        "Responsive three-column adaptive layout",
        "Real-time data updates across devices"
      ],
      detailedFeatures: {
        "Frontend Development": [
          "Built with React 18 using modern hooks architecture",
          "React Router DOM for seamless navigation across 5 modules",
          "Sophisticated three-column adaptive layout design",
          "Interactive data visualizations using Chart.js",
          "Styled Components for CSS-in-JS architecture"
        ],
        "Backend & Cloud": [
          "Firebase Authentication with email/password system",
          "Cloud Firestore for real-time NoSQL operations",
          "Scalable database schema with user-specific collections",
          "Real-time listeners for instant data updates",
          "Automated data synchronization across devices"
        ],
        "Core Functionality": [
          "Secure user profile management and session persistence",
          "Custom spending categories with budget limits",
          "Add/edit/delete transactions with search/filter capabilities",
          "Multiple income sources with configurable frequencies",
          "Interactive charts showing spending breakdowns and trends",
          "Automated localStorage to Firebase migration"
        ],
        "Technical Implementation": [
          "React Context API for application-wide state management",
          "Firebase onSnapshot listeners for real-time updates",
          "Comprehensive error handling with user feedback",
          "Cloud-based storage with automatic backup",
          "Performance optimization with lazy loading"
        ]
      },
      github: "https://github.com/SunilV007/Budgeting-Buddy",
      demo: "#",
      type: "web",
      color: "#10b981"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Eye },
    { id: 'ml', label: 'Machine Learning', icon: Brain },
    { id: 'web', label: 'Web Development', icon: Code },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { id: 'data', label: 'Data Science', icon: Database }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="projects-page" ref={ref}>
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h1 className="page-title" variants={itemVariants}>
          My Projects
        </motion.h1>
        
        <motion.p className="page-subtitle" variants={itemVariants}>
          Showcasing my journey through AI, web development, and innovative solutions
        </motion.p>

        {/* Category Filter */}
        <motion.div className="category-filter" variants={itemVariants}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent size={20} />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="projects-grid" variants={containerVariants}>
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                variants={itemVariants}
                layout
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image">
                  {project.image && !project.image.includes('/api/placeholder') ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="project-actual-image"
                    />
                  ) : (
                    <ProjectIcon3D type={project.type} color={project.color} />
                  )}
                  <div className="project-overlay">
                    <div className="project-links">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="project-metrics">
                    {project.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="metric">
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
              
              <div className="modal-content">
                <h2>{selectedProject.title}</h2>
                <p className="modal-description">{selectedProject.longDescription}</p>
                
                <div className="modal-features">
                  <h3>Key Features</h3>
                  {selectedProject.detailedFeatures ? (
                    <div className="detailed-features">
                      {Object.entries(selectedProject.detailedFeatures).map(([category, features]) => (
                        <div key={category} className="feature-category">
                          <h4>{category}</h4>
                          <ul>
                            {features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul>
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div className="modal-technologies">
                  <h3>Technologies Used</h3>
                  <div className="tech-list">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn github"
                  >
                    <Github size={20} />
                    View Code
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn demo"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
