import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Download, Mail, MessageCircle, Sparkles, Zap } from 'lucide-react';
import './CallToAction.css';

const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const glowVariants = {
    initial: { boxShadow: "0 0 20px rgba(0, 245, 255, 0.3)" },
    hover: { 
      boxShadow: "0 0 40px rgba(0, 245, 255, 0.6)",
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const services = [
    {
      icon: "🤖",
      title: "AI/ML Solutions",
      description: "Custom machine learning models and AI-powered applications"
    },
    {
      icon: "🌐",
      title: "Full-Stack Development",
      description: "Modern web applications with React, Node.js, and cloud deployment"
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Cross-platform mobile apps using Flutter and React Native"
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description: "Data visualization, insights, and predictive analytics solutions"
    }
  ];

  return (
    <div className="cta-page" ref={ref}>
      <motion.div
        className="cta-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Floating Elements */}
        <motion.div
          className="floating-element element-1"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={30} />
        </motion.div>
        
        <motion.div
          className="floating-element element-2"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap size={25} />
        </motion.div>

        {/* Main Content */}
        <motion.div className="cta-hero" variants={itemVariants}>
          <motion.h1 
            className="cta-title"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Ready to Build Something
            <span className="gradient-text"> Amazing?</span>
          </motion.h1>
          
          <motion.p 
            className="cta-subtitle"
            variants={itemVariants}
          >
            Let's transform your ideas into powerful AI-driven solutions. 
            From concept to deployment, I'll help you leverage cutting-edge technology 
            to solve real-world problems and drive innovation.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div className="services-grid" variants={containerVariants}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div className="cta-buttons" variants={itemVariants}>
          <motion.button
            className="cta-btn primary"
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
          >
            <Mail size={20} />
            <span>Hire Me Now</span>
            <ArrowRight size={20} />
            <div className="btn-glow"></div>
          </motion.button>
          
          <motion.button
            className="cta-btn secondary"
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/resume')}
          >
            <Download size={20} />
            <span>Download Resume</span>
            <div className="btn-glow pink"></div>
          </motion.button>
          
          <motion.button
            className="cta-btn tertiary"
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://wa.me/919876543210', '_blank')}
          >
            <MessageCircle size={20} />
            <span>Let's Chat</span>
            <div className="btn-glow green"></div>
          </motion.button>
        </motion.div>

        {/* Statistics */}
        <motion.div className="cta-stats" variants={itemVariants}>
          <div className="stats-container">
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.1 }}
            >
              <div className="stat-number">15+</div>
              <div className="stat-label">Projects Delivered</div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.1 }}
            >
              <div className="stat-number">94%</div>
              <div className="stat-label">Client Satisfaction</div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.1 }}
            >
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.1 }}
            >
              <div className="stat-number">2+ Years</div>
              <div className="stat-label">Industry Experience</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action Footer */}
        <motion.div className="cta-footer" variants={itemVariants}>
          <h2>Why Choose Me?</h2>
          <div className="features-list">
            <motion.div 
              className="feature"
              whileHover={{ x: 10 }}
            >
              <span className="feature-icon">⚡</span>
              <span>Fast Development & Delivery</span>
            </motion.div>
            <motion.div 
              className="feature"
              whileHover={{ x: 10 }}
            >
              <span className="feature-icon">🎯</span>
              <span>Focused on Results</span>
            </motion.div>
            <motion.div 
              className="feature"
              whileHover={{ x: 10 }}
            >
              <span className="feature-icon">🔧</span>
              <span>Modern Tech Stack</span>
            </motion.div>
            <motion.div 
              className="feature"
              whileHover={{ x: 10 }}
            >
              <span className="feature-icon">🤝</span>
              <span>Collaborative Approach</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CallToAction;
