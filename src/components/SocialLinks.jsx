import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Youtube, Twitter, Mail } from 'lucide-react';
import './SocialLinks.css';

const SocialLinks = () => {
  const socialData = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/SunilV007',
      color: '#333333',
      hoverColor: '#ffffff'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/sunil-v-70aa45225/',
      color: '#0077B5',
      hoverColor: '#00a0dc'
    },
    // {
    //   name: 'Instagram',
    //   icon: Instagram,
    //   url: '#',
    //   color: '#E4405F',
    //   hoverColor: '#ff6b8a'
    // },
    {
      name: 'YouTube',
      icon: Youtube,
      url: '#',
      color: '#FF0000',
      hoverColor: '#ff4444'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: '#',
      color: '#1DA1F2',
      hoverColor: '#4ab3f4'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:sunilvenkatachalam313@gmail.com',
      color: '#00f5ff',
      hoverColor: '#ff006e'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className="social-links"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="social-container">
        {socialData.map((social, index) => {
          const IconComponent = social.icon;
          return (
            <motion.div
              key={social.name}
              variants={itemVariants}
              className="social-item"
            >
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 5,
                  boxShadow: `0 0 20px ${social.hoverColor}40`
                }}
                whileTap={{ scale: 0.9 }}
                style={{ '--social-color': social.color, '--social-hover': social.hoverColor }}
              >
                <IconComponent size={24} />
                <span className="social-tooltip">{social.name}</span>
              </motion.a>
            </motion.div>
          );
        })}
      </div>
      
      <motion.div
        className="social-line"
        initial={{ height: 0 }}
        animate={{ height: 80 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </motion.div>
  );
};

export default SocialLinks;
