import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Code, Trophy, Star, TrendingUp, Users, Award } from 'lucide-react';
import './CodingProfiles.css';

const CodingProfiles = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const profiles = [
    {
      id: 1,
      name: "GitHub",
      username: "SunilV007",
      url: "https://github.com/SunilV007",
      icon: Github,
      color: "#181717",
      hoverColor: "#333333",
      stats: [
        { label: "Repositories", value: "20+", icon: Code },
        { label: "Stars Earned", value: "5+", icon: Star },
        { label: "Contributions", value: "40+", icon: TrendingUp },
        { label: "Followers", value: "10+", icon: Users }
      ],
      description: "Open source contributions and personal projects showcasing AI/ML and web development expertise.",
      achievements: [
        "15+ public repositories",
        "Active contributor to open source",
        "Well-documented code with README files",
        "Diverse tech stack projects"
      ],
      languages: ["Python", "JavaScript", "Java", "HTML/CSS"],
      featured: true
    },
    {
      id: 2,
      name: "LeetCode",
      username: "Sunil_011",
      url: "https://leetcode.com/u/Sunil_011/",
      icon: Code,
      color: "#FFA500",
      hoverColor: "#FFB84D",
      stats: [
        { label: "Problems Solved", value: "150+", icon: Trophy },
        { label: "Contest Rating", value: "1200+", icon: TrendingUp },
        { label: "Streak", value: "30 days", icon: Star },
        { label: "Ranking", value: "Top 10%", icon: Award }
      ],
      description: "Competitive programming and algorithmic problem solving with focus on data structures and algorithms.",
      achievements: [
        "Solved 100+ coding problems",
        "Consistent daily practice",
        "Strong in Dynamic Programming",
        "Active in weekly contests"
      ],
      languages: ["Python", "Java", "C++"],
      featured: false
    },
    {
      id: 4,
      name: "HackerRank",
      username: "sunil_011",
      url: "https://www.hackerrank.com/profile/Sunil_011",
      icon: Code,
      color: "#2EC866",
      hoverColor: "#4FD683",
      stats: [
        { label: "Badges Earned", value: "5+", icon: Award },
        { label: "Problems Solved", value: "30+", icon: Code },
        { label: "Ranking", value: "5 Star", icon: Star },
        { label: "Certificates", value: "3", icon: Trophy }
      ],
      description: "Skill assessments and coding challenges across multiple programming domains and technologies.",
      achievements: [
        "5-star rating in Python",
        "Multiple domain certifications",
        "70+ challenges completed",
        "Strong in algorithms & data structures"
      ],
      languages: ["Python", "Java", "SQL"],
      featured: false
    },
    {
      id: 5,
      name: "CodeChef",
      username: "sunil_011",
      url: "https://www.codechef.com/users/sunil_011",
      icon: Code,
      color: "#5B4638",
      hoverColor: "#8B6F47",
      stats: [
        { label: "Rating", value: "1400+", icon: TrendingUp },
        { label: "Problems Solved", value: "20+", icon: Code },
        { label: "Contests", value: "5+", icon: Trophy },
        { label: "Global Rank", value: "3 Star", icon: Star }
      ],
      description: "Competitive programming platform with monthly long challenges and cook-off competitions.",
      achievements: [
        "3-star competitive programmer",
        "Regular contest participation",
        "60+ problems solved",
        "Monthly challenge participant"
      ],
      languages: ["Python", "C++", "Java"],
      featured: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.97
    }
  };

  const featuredProfile = profiles.find(p => p.featured);
  const regularProfiles = profiles.filter(p => !p.featured);

  return (
    <div className="coding-profiles-page" ref={ref}>
      <motion.div
        className="profiles-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="profiles-header" variants={itemVariants}>
          <h1 className="page-title">Coding Profiles</h1>
          <p className="page-subtitle">
            Explore my journey across various competitive programming and development platforms
          </p>
        </motion.div>

        {/* Featured Profile */}
        {featuredProfile && (
          <motion.div 
            className="featured-profile"
            variants={itemVariants}
          >
            <div className="featured-badge">
              <Star className="badge-icon" />
              <span>Featured Profile</span>
            </div>
            
            <motion.div
              className="featured-content"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              style={{ '--profile-color': featuredProfile.color, '--profile-hover': featuredProfile.hoverColor }}
            >
              <div className="featured-left">
                <div className="profile-header">
                  <div className="profile-icon-large">
                    <featuredProfile.icon size={40} />
                  </div>
                  <div className="profile-info">
                    <h2 className="profile-name">{featuredProfile.name}</h2>
                    <p className="profile-username">@{featuredProfile.username}</p>
                  </div>
                  <motion.a
                    href={featuredProfile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-link-btn"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
                
                <p className="profile-description">{featuredProfile.description}</p>
                
                <div className="achievements-list">
                  <h4>Key Achievements</h4>
                  <ul>
                    {featuredProfile.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="languages-used">
                  <h4>Primary Languages</h4>
                  <div className="language-tags">
                    {featuredProfile.languages.map((lang, index) => (
                      <span key={index} className="language-tag">{lang}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="featured-right">
                <div className="stats-grid">
                  {featuredProfile.stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        className="stat-card"
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className="stat-icon">
                          <IconComponent size={24} />
                        </div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Regular Profiles Grid */}
        <motion.div className="profiles-grid" variants={containerVariants}>
          {regularProfiles.map((profile, index) => {
            const IconComponent = profile.icon;
            return (
              <motion.div
                key={profile.id}
                className="profile-card"
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ '--profile-color': profile.color, '--profile-hover': profile.hoverColor }}
              >
                <div className="card-header">
                  <div className="profile-icon">
                    <IconComponent size={30} />
                  </div>
                  <motion.a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-link"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
                
                <h3 className="card-title">{profile.name}</h3>
                <p className="card-username">@{profile.username}</p>
                <p className="card-description">{profile.description}</p>
                
                <div className="card-stats">
                  {profile.stats.slice(0, 2).map((stat, statIndex) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={statIndex} className="mini-stat">
                        <StatIcon size={16} />
                        <span className="mini-stat-value">{stat.value}</span>
                        <span className="mini-stat-label">{stat.label}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="card-languages">
                  {profile.languages.slice(0, 3).map((lang, langIndex) => (
                    <span key={langIndex} className="mini-language-tag">{lang}</span>
                  ))}
                </div>
                
                <div className="card-achievements">
                  <div className="achievement-highlight">
                    {profile.achievements[0]}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary Stats */}
        <motion.div className="summary-section" variants={itemVariants}>
          <h2 className="summary-title">Overall Coding Journey</h2>
          <div className="summary-stats">
            <motion.div 
              className="summary-stat"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="summary-number">500+</div>
              <div className="summary-label">Problems Solved</div>
            </motion.div>
            <motion.div 
              className="summary-stat"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="summary-number">6</div>
              <div className="summary-label">Active Platforms</div>
            </motion.div>
            <motion.div 
              className="summary-stat"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="summary-number">50+</div>
              <div className="summary-label">Contests Participated</div>
            </motion.div>
            <motion.div 
              className="summary-stat"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="summary-number">5</div>
              <div className="summary-label">Languages Mastered</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CodingProfiles;
