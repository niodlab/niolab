import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="page-container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <motion.div
        className="about-title-band"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h1 className="text-hero about-title-heading">
            We design for humans, <br /><span style={{ color: 'var(--color-accent)' }}>optimize for business.</span>
          </h1>
        </div>
      </motion.div>

      <div className="container">
        <div className="grid grid-cols-2" style={{ marginTop: '4rem', gap: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Our Mission</h2>
            <p className="text-lg text-muted" style={{ marginBottom: '1.5rem' }}>
              At Nio d'Lab, our mission is to create intuitive digital experiences that seamlessly align with your broader business goals. 
              We believe that exceptional design is not just about aesthetics—it's about understanding behavior, removing friction, and driving real-world results.
            </p>
            <p className="text-lg text-muted">
              We leverage data, profound user empathy, and a rigorous testing methodology to ensure that every pixel serves a specific purpose.
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
            <div className="card" style={{ padding: '3rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 className="text-xl" style={{ marginBottom: '1rem', fontStyle: 'italic' }}>"Design is the silent ambassador of your brand."</h3>
              <p className="text-muted">— The Founder</p>
              
              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                <p className="text-muted">
                  Founded in Bangalore, Nio d'Lab began with a simple idea: that premium, enterprise-grade UX design should be accessible to ambitious teams everywhere. Today, we partner with startups and established enterprises globally.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
