import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Eye, FileText, Award, Briefcase, GraduationCap, CheckCircle } from 'lucide-react';
import './Resume.css';

const Resume = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    
    try {
      // Simple and reliable download method
      const link = document.createElement('a');
      link.href = '/resume/Resume.pdf';
      link.download = 'Sunil_Resume.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // For better browser compatibility
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadSuccess(true);
      console.log('Resume download initiated successfully');
      
      // Reset success state after 3 seconds
      setTimeout(() => setDownloadSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error downloading resume:', error);
      
      // Fallback: Open in new tab
      window.open('/resume/Resume.pdf', '_blank');
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreview = () => {
    window.open('/resume/Resume.pdf', '_blank');
  };

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

  const experience = [
    {
      title: "Non-Functional Testing Engineer",
      company: "Cognizant Technology Solutions",
      period: "Feb 2025 - Present",
      location: "Coimbatore",
      description: "Performance testing tools training including LoadRunner, JMeter, and APM tools like AppDynamics and PerfMon.",
      achievements: [
        "Extensive training on performance testing tools",
        "Hands-on experience with LoadRunner and JMeter",
        "Performance monitoring and script creation",
        "Enterprise-level application testing analysis"
      ]
    },
    {
      title: "Machine Learning Intern",
      company: "Zoho Corporation",
      period: "June 2023 - July 2023",
      location: "Chennai",
      description: "Gained practical experience in developing and deploying ML models using TensorFlow, Scikit-learn, and Keras.",
      achievements: [
        "Developed ML models using TensorFlow and Keras",
        "Explored Generative AI applications",
        "Worked with NLP techniques for text analysis",
        "Implemented LLMs for business applications"
      ]
    }
  ];

  const education = [
    {
      degree: "B.Tech in Artificial Intelligence and Data Science",
      institution: "KPR Institute of Engineering and Technology",
      period: "Expected June 2025",
      grade: "CGPA: 8.35 / 10.0"
    },
    {
      degree: "Higher Secondary Education",
      institution: "Vidhyaa Vikas Matriculation Higher Secondary School",
      period: "Completed",
      grade: "86.5%"
    }
  ];

  const certifications = [
    "Advanced Python Programming",
    "Data Analytics with Python - NPTEL",
    "Core Java - L&T"
  ];

  const skills = {
    "Programming Languages": ["Python", "Java", "C", "JavaScript"],
    "Web Development": ["HTML", "CSS", "React", "REST APIs"],
    "AI & ML": ["Machine Learning", "Deep Learning", "CNN", "NLP", "LLMs"],
    "Databases": ["MySQL", "PostgreSQL"],
    "Cloud & Tools": ["AWS", "Git", "Jenkins", "Firebase"],
    "Libraries": ["NumPy", "Pandas", "Scikit-Learn", "TensorFlow"]
  };

  return (
    <div className="resume-page" ref={ref}>
      <motion.div
        className="resume-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="resume-header" variants={itemVariants}>
          <h1 className="page-title">My Resume</h1>
          <p className="page-subtitle">
            Download or preview my complete professional profile
          </p>
          
          <div className="resume-actions">
            <motion.button
              className="resume-btn download"
              onClick={handleDownload}
              disabled={isDownloading}
              whileHover={{ scale: isDownloading ? 1 : 1.05, boxShadow: "0 0 30px rgba(0, 245, 255, 0.5)" }}
              whileTap={{ scale: isDownloading ? 1 : 0.95 }}
              style={{ 
                opacity: isDownloading ? 0.7 : 1,
                backgroundColor: downloadSuccess ? '#10b981' : undefined,
                transition: 'all 0.3s ease'
              }}
            >
              {isDownloading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Download size={20} />
                  </motion.div>
                  <span>Downloading...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle size={20} />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download size={20} />
                  <span>Download PDF</span>
                </>
              )}
            </motion.button>
            
            <motion.button
              className="resume-btn preview"
              onClick={handlePreview}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 110, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={20} />
              <span>Preview</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="resume-content">
          {/* Professional Summary */}
          <motion.section className="resume-section" variants={itemVariants}>
            <div className="section-header">
              <FileText className="section-icon" />
              <h2>Professional Summary</h2>
            </div>
            <div className="section-content">
              <p>
                Passionate AI & Data Science Engineer with expertise in machine learning, 
                deep learning, and full-stack development. Proven track record in building 
                intelligent systems with 94% accuracy in computer vision projects and 
                experience in optimizing real-world applications. Currently working at 
                Cognizant Technology Solutions with hands-on experience from Zoho Corporation internship.
              </p>
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section className="resume-section" variants={itemVariants}>
            <div className="section-header">
              <Briefcase className="section-icon" />
              <h2>Work Experience</h2>
            </div>
            <div className="section-content">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="experience-item"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="exp-header">
                    <h3>{exp.title}</h3>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                  <div className="exp-company">{exp.company} • {exp.location}</div>
                  <p className="exp-description">{exp.description}</p>
                  <ul className="exp-achievements">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section className="resume-section" variants={itemVariants}>
            <div className="section-header">
              <GraduationCap className="section-icon" />
              <h2>Education</h2>
            </div>
            <div className="section-content">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="education-item"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="edu-header">
                    <h3>{edu.degree}</h3>
                    <span className="edu-grade">{edu.grade}</span>
                  </div>
                  <div className="edu-institution">{edu.institution}</div>
                  <div className="edu-period">{edu.period}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section className="resume-section" variants={itemVariants}>
            <div className="section-header">
              <Award className="section-icon" />
              <h2>Technical Skills</h2>
            </div>
            <div className="section-content">
              <div className="skills-grid">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <motion.div
                    key={index}
                    className="skill-category"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4>{category}</h4>
                    <div className="skill-tags">
                      {skillList.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Certifications */}
          <motion.section className="resume-section" variants={itemVariants}>
            <div className="section-header">
              <Award className="section-icon" />
              <h2>Certifications</h2>
            </div>
            <div className="section-content">
              <div className="certifications-list">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="certification-item"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Award size={16} />
                    <span>{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Contact Info */}
        <motion.div className="resume-contact" variants={itemVariants}>
          <h3>Contact Information</h3>
          <div className="contact-grid">
            <div className="contact-item">
              <strong>Email:</strong> sunilvenkatachalam313@gmail.com
            </div>
            <div className="contact-item">
              <strong>LinkedIn:</strong> linkedin.com/in/sunil-v
            </div>
            <div className="contact-item">
              <strong>GitHub:</strong> github.com/SunilV007
            </div>
            <div className="contact-item">
              <strong>Location:</strong> Coimbatore, Tamil Nadu, India
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Resume;
