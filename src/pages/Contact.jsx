import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form data:', data);
      setSubmitStatus('success');
      setIsSubmitting(false);
      reset();
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "sunilvenkatachalam313@gmail.com",
      href: "mailto:sunilvenkatachalam313@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9025012316",
      href: "tel:+919025012316"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Coimbatore, Tamil Nadu, India",
      href: "#"
    }
  ];

  return (
    <div className="contact-page" ref={ref}>
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h1 className="page-title" variants={itemVariants}>
          Get In Touch
        </motion.h1>
        
        <motion.p className="page-subtitle" variants={itemVariants}>
          Ready to bring your ideas to life? Let's collaborate and create something amazing together.
        </motion.p>

        <div className="contact-content">
          {/* Contact Information */}
          <motion.div className="contact-info" variants={itemVariants}>
            <h2>Let's Connect</h2>
            <p>
              I'm always excited to discuss new opportunities, innovative projects, 
              and ways to leverage AI and technology for meaningful impact.
            </p>

            <div className="contact-details">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="contact-detail"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="contact-icon">
                      <IconComponent size={24} />
                    </div>
                    <div className="contact-text">
                      <h3>{info.title}</h3>
                      <p>{info.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="contact-cta">
              <h3>Why Work With Me?</h3>
              <ul>
                <li>🚀 Cutting-edge AI & ML expertise</li>
                <li>💡 Full-stack development skills</li>
                <li>🎯 Problem-solving mindset</li>
                <li>⚡ Fast learner and adaptable</li>
                <li>🤝 Collaborative team player</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="contact-form-container" variants={itemVariants}>
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Send a Message</h2>
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && (
                  <span className="error-message">{errors.subject.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="6"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters"
                    }
                  })}
                  className={errors.message ? 'error' : ''}
                  placeholder="Tell me about your project or opportunity..."
                />
                {errors.message && (
                  <span className="error-message">{errors.message.message}</span>
                )}
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Success/Error Messages */}
              {submitStatus && (
                <motion.div
                  className={`submit-message ${submitStatus}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      Message sent successfully! I'll get back to you soon.
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} />
                      Something went wrong. Please try again.
                    </>
                  )}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
