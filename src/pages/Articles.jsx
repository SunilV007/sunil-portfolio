import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search, Filter, BookOpen, TrendingUp } from 'lucide-react';
import './Articles.css';

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const articles = [
    {
      id: 1,
      title: "Building Real-time Drowsy Driver Detection with CNN",
      excerpt: "A deep dive into creating an AI system that achieved 94% accuracy in detecting driver fatigue using computer vision and deep learning techniques.",
      category: "AI/ML",
      readTime: "8 min read",
      date: "2024-12-15",
      image: "/api/placeholder/400/250",
      tags: ["Computer Vision", "CNN", "TensorFlow", "OpenCV"],
      featured: true
    },
    {
      id: 2,
      title: "Optimizing EV Charging Infrastructure with Machine Learning",
      excerpt: "How SVR-based prediction models can reduce waiting times by 30% and improve charging station efficiency through smart resource allocation.",
      category: "Data Science",
      readTime: "6 min read",
      date: "2024-11-28",
      image: "/api/placeholder/400/250",
      tags: ["Machine Learning", "SVR", "Optimization", "IoT"],
      featured: false
    },
    {
      id: 3,
      title: "The Future of AI-Powered Interview Preparation",
      excerpt: "Exploring how speech recognition, natural language processing, and Gemini API can revolutionize the way students prepare for interviews.",
      category: "AI/ML",
      readTime: "5 min read",
      date: "2024-11-10",
      image: "/api/placeholder/400/250",
      tags: ["NLP", "Speech Recognition", "Gemini API", "Education"],
      featured: false
    },
    {
      id: 4,
      title: "From Theory to Practice: My Journey with Large Language Models",
      excerpt: "Lessons learned while working with LLMs at Zoho Corporation and how to implement them in real-world business applications.",
      category: "AI/ML",
      readTime: "7 min read",
      date: "2024-10-22",
      image: "/api/placeholder/400/250",
      tags: ["LLMs", "NLP", "Business Applications", "Zoho"],
      featured: false
    },
    {
      id: 5,
      title: "Performance Testing in the Modern Era",
      excerpt: "Understanding LoadRunner, JMeter, and APM tools for enterprise-level application testing and performance monitoring.",
      category: "Testing",
      readTime: "6 min read",
      date: "2024-10-05",
      image: "/api/placeholder/400/250",
      tags: ["Performance Testing", "LoadRunner", "JMeter", "APM"],
      featured: false
    },
    {
      id: 6,
      title: "Building Scalable React Applications with Modern Tools",
      excerpt: "Best practices for creating maintainable and performant React applications using Vite, TypeScript, and modern development workflows.",
      category: "Web Development",
      readTime: "9 min read",
      date: "2024-09-18",
      image: "/api/placeholder/400/250",
      tags: ["React", "Vite", "TypeScript", "Performance"],
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Articles', count: articles.length },
    { id: 'AI/ML', label: 'AI & Machine Learning', count: articles.filter(a => a.category === 'AI/ML').length },
    { id: 'Data Science', label: 'Data Science', count: articles.filter(a => a.category === 'Data Science').length },
    { id: 'Web Development', label: 'Web Development', count: articles.filter(a => a.category === 'Web Development').length },
    { id: 'Testing', label: 'Testing', count: articles.filter(a => a.category === 'Testing').length }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="articles-page" ref={ref}>
      <motion.div
        className="articles-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="articles-header" variants={itemVariants}>
          <h1 className="page-title">Featured Articles</h1>
          <p className="page-subtitle">
            Insights, tutorials, and thoughts on AI, machine learning, and modern web development
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div className="articles-filters" variants={itemVariants}>
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category.label}</span>
                <span className="category-count">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Article */}
        {featuredArticle && selectedCategory === 'all' && (
          <motion.div className="featured-article" variants={itemVariants}>
            <div className="featured-badge">
              <TrendingUp size={16} />
              <span>Featured Article</span>
            </div>
            <div className="featured-content">
              <div className="featured-image">
                <img src={featuredArticle.image} alt={featuredArticle.title} />
                <div className="featured-overlay">
                  <div className="featured-category">{featuredArticle.category}</div>
                </div>
              </div>
              <div className="featured-text">
                <h2 className="featured-title">{featuredArticle.title}</h2>
                <p className="featured-excerpt">{featuredArticle.excerpt}</p>
                <div className="featured-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{formatDate(featuredArticle.date)}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <div className="meta-item">
                    <User size={16} />
                    <span>Sunil V</span>
                  </div>
                </div>
                <div className="featured-tags">
                  {featuredArticle.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <motion.button
                  className="read-more-btn"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <motion.div className="articles-grid" variants={containerVariants}>
          {regularArticles.length > 0 ? (
            regularArticles.map((article, index) => (
              <motion.article
                key={article.id}
                className="article-card"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                  <div className="article-overlay">
                    <div className="article-category">{article.category}</div>
                  </div>
                </div>
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <div className="article-meta">
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="article-tags">
                    {article.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                  <motion.button
                    className="read-more-btn small"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Read More</span>
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div className="no-articles" variants={itemVariants}>
              <BookOpen size={48} />
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div className="newsletter-section" variants={itemVariants}>
          <div className="newsletter-content">
            <h3>Stay Updated</h3>
            <p>Get notified when I publish new articles about AI, ML, and web development</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <motion.button
                className="newsletter-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Articles;
