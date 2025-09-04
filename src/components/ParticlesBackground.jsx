import React, { useEffect, useRef } from 'react';
import './ParticlesBackground.css';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const particlesArray = useRef([]);
  const mouse = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = Math.random() > 0.5 ? '#00f5ff' : '#ff006e';
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        if (mouse.current.x != null && mouse.current.y != null) {
          const dx = mouse.current.x - this.x;
          const dy = mouse.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.current.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.current.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * 2;
            const directionY = forceDirectionY * force * 2;
            
            this.x += directionX;
            this.y += directionY;
          }
        }

        // Bounce off edges
        if (this.size > 0.2) this.size -= 0.1;
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    const createParticles = () => {
      particlesArray.current = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.current.push(new Particle(x, y));
      }
    };

    // Connect particles with lines
    const connectParticles = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.current.length; a++) {
        for (let b = a; b < particlesArray.current.length; b++) {
          const distance = Math.sqrt(
            Math.pow(particlesArray.current[a].x - particlesArray.current[b].x, 2) +
            Math.pow(particlesArray.current[a].y - particlesArray.current[b].y, 2)
          );
          
          if (distance < 100) {
            opacityValue = 1 - (distance / 100);
            ctx.strokeStyle = `rgba(0, 245, 255, ${opacityValue})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray.current[a].x, particlesArray.current[a].y);
            ctx.lineTo(particlesArray.current[b].x, particlesArray.current[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.current.length; i++) {
        particlesArray.current[i].update();
        particlesArray.current[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    };

    // Mouse move event
    const handleMouseMove = (event) => {
      mouse.current.x = event.x;
      mouse.current.y = event.y;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initialize
    createParticles();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
};

export default ParticlesBackground;
