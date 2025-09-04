import React from 'react';
import { motion } from 'framer-motion';
import './GradientBlur.css';

const GradientBlur = () => {
  return (
    <div className="gradient-blur-container">
      <motion.div
        className="gradient-blur gradient-blur-1"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="gradient-blur gradient-blur-2"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="gradient-blur gradient-blur-3"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default GradientBlur;
