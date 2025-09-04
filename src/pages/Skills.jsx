import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Code, Database, Cloud, Brain, Smartphone, Globe, Settings, BookOpen } from 'lucide-react';
import './Skills.css';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2, suffix = "%", isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const incrementTime = (duration * 1000) / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span>{count}{suffix}</span>;
};

// Circular Progress Component
const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, isInView }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="circular-progress-svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={isInView ? strokeDashoffset : circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isInView ? strokeDashoffset : circumference }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#ff006e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="circular-progress-text">
        <AnimatedCounter value={percentage} isInView={isInView} />
      </div>
    </div>
  );
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const skillCategories = {
    technical: {
      title: "Technical Skills",
      icon: Code,
      color: "#00f5ff",
      skills: [
        { name: "Python", level: 90, icon: "🐍" },
        { name: "JavaScript", level: 85, icon: "⚡" },
        { name: "React", level: 88, icon: "⚛️" },
        { name: "Machine Learning", level: 85, icon: "🤖" },
        { name: "Deep Learning", level: 80, icon: "🧠" },
        { name: "TensorFlow", level: 82, icon: "🔥" },
      ]
    },
    databases: {
      title: "Databases & Cloud",
      icon: Database,
      color: "#ff006e",
      skills: [
        { name: "MySQL", level: 85, icon: "🗄️" },
        { name: "PostgreSQL", level: 80, icon: "🐘" },
        { name: "AWS", level: 75, icon: "☁️" },
        { name: "Firebase", level: 88, icon: "🔥" },
        { name: "Git", level: 90, icon: "📦" },
        { name: "Jenkins", level: 70, icon: "🚀" },
      ]
    },
    frameworks: {
      title: "Frameworks & Libraries",
      icon: Settings,
      color: "#7c3aed",
      skills: [
        { name: "NumPy", level: 88, icon: "🔢" },
        { name: "Pandas", level: 90, icon: "🐼" },
        { name: "Scikit-Learn", level: 85, icon: "📊" },
        { name: "Keras", level: 82, icon: "🧠" },
        { name: "Flutter", level: 78, icon: "📱" },
        { name: "REST APIs", level: 85, icon: "🌐" },
      ]
    },
    ai: {
      title: "AI & ML Specialization",
      icon: Brain,
      color: "#f59e0b",
      skills: [
        { name: "CNN", level: 85, icon: "👁️" },
        { name: "NLP", level: 80, icon: "💬" },
        { name: "LLMs", level: 75, icon: "🤖" },
        { name: "Model Deployment", level: 82, icon: "🚀" },
        { name: "Computer Vision", level: 88, icon: "📸" },
        { name: "Data Analytics", level: 90, icon: "📈" },
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const currentSkills = skillCategories[selectedCategory];

  return (
    <div className="skills-page" ref={ref}>
      <motion.div
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        animate={mainControls}
      >
        <motion.h1 className="page-title" variants={itemVariants}>
          My Skills & Expertise
        </motion.h1>
        
        <motion.p className="page-subtitle" variants={itemVariants}>
          A comprehensive overview of my technical abilities and proficiency levels
        </motion.p>

        {/* Category Selector */}
        <motion.div className="category-selector" variants={itemVariants}>
          {Object.entries(skillCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={key}
                className={`category-card ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ '--category-color': category.color }}
              >
                <div className="category-icon">
                  <IconComponent size={24} />
                </div>
                <span className="category-title">{category.title}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Display */}
        <motion.div
          className="skills-display"
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="skills-category-title"
            style={{ color: currentSkills.color }}
            variants={itemVariants}
          >
            {currentSkills.title}
          </motion.h2>

          <div className="skills-grid">
            {currentSkills.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="skill-header">
                  <div className="skill-icon">{skill.icon}</div>
                  <h3 className="skill-name">{skill.name}</h3>
                </div>
                
                <div className="skill-progress">
                  <CircularProgress 
                    percentage={skill.level} 
                    isInView={isInView}
                  />
                </div>
                
                <div className="skill-level">
                  <span className="level-text">
                    {skill.level >= 90 ? 'Expert' : 
                     skill.level >= 80 ? 'Advanced' : 
                     skill.level >= 70 ? 'Intermediate' : 'Beginner'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div className="skills-stats" variants={itemVariants}>
          <div className="stats-grid">
            <motion.div 
              className="stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">
                <AnimatedCounter value="20" suffix="+" isInView={isInView} />
              </div>
              <div className="stat-label">Technologies Mastered</div>
            </motion.div>
            
            <motion.div 
              className="stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">
                <AnimatedCounter value="3" suffix="+" isInView={isInView} />
              </div>
              <div className="stat-label">Years of Coding</div>
            </motion.div>
            
            <motion.div 
              className="stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">
                <AnimatedCounter value="15" suffix="+" isInView={isInView} />
              </div>
              <div className="stat-label">Projects Completed</div>
            </motion.div>
            
            <motion.div 
              className="stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">
                <AnimatedCounter value="5" suffix="+" isInView={isInView} />
              </div>
              <div className="stat-label">Certifications Earned</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;
