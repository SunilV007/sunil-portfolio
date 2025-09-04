import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', key: 'hero' },
    { path: '/projects', label: 'Projects', key: 'projects' },
    { path: '/skills', label: 'Skills', key: 'skills' },
    { path: '/resume', label: 'Resume', key: 'resume' },
    // { path: '/articles', label: 'Articles', key: 'articles' },
    { path: '/coding-profiles', label: 'Profiles', key: 'coding-profiles' },
    { path: '/contact', label: 'Contact', key: 'contact' },
    { path: '/cta', label: 'Hire Me', key: 'cta' }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (key) => {
    setCurrentPage(key);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="navigation desktop-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="nav-container">
          <motion.div
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" onClick={() => handleNavClick('hero')}>
              <span className="logo-text">Sunil V</span>
              <span className="logo-subtitle">AI Engineer</span>
            </Link>
          </motion.div>

          <div className="nav-items">
            {navItems.map((item, index) => (
              <motion.div
                key={item.key}
                className="nav-item"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.key)}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.span>
                  {location.pathname === item.path && (
                    <motion.div
                      className="nav-indicator"
                      layoutId="nav-indicator"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        className="mobile-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mobile-nav-header">
          <Link to="/" className="mobile-logo" onClick={() => handleNavClick('hero')}>
            <span className="logo-text">Sunil V</span>
          </Link>
          
          <motion.button
            className="menu-toggle"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-menu-content">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.key)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Navigation;
