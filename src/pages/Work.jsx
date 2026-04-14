import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Work = () => {
  const projects = [
    {
      id: 1,
      title: 'Nova Fintech App',
      category: 'Product Design & Strategy',
      result: 'Increased user retention by 35% in first month',
      summary: 'We redesigned the core portfolio experience so recurring tasks became faster, calmer, and easier to trust.',
      image: `${import.meta.env.BASE_URL}images/abstract-ux-01.jpg`
    },
    {
      id: 2,
      title: 'Lumina E-Commerce',
      category: 'UX Research & UI Design',
      result: 'Boosted checkout conversion by 42%',
      summary: 'Research uncovered hesitation points across mobile shopping, leading to a cleaner path from browsing to purchase.',
      image: `${import.meta.env.BASE_URL}images/abstract-ux-01b.jpg`
    },
    {
      id: 3,
      title: 'HealthSync Dashboard',
      category: 'Enterprise UX',
      result: 'Reduced onboarding time by 60%',
      summary: 'We turned a multi-role clinical dashboard into a guided experience with clearer hierarchy and faster onboarding.',
      image: `${import.meta.env.BASE_URL}images/abstract-ux-01c.jpg`
    },
    {
      id: 4,
      title: 'Aura Smart Home App',
      category: 'Mobile App Design',
      result: '4.8 star average rating on App Store',
      summary: 'A more reassuring control model and stronger visual feedback made daily home automation feel effortless.',
      image: `${import.meta.env.BASE_URL}images/abstract-ux-02.jpg`
    }
  ];

  return (
    <div className="page-container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-hero" style={{ marginBottom: '1.5rem' }}>Selected Work</h1>
          <p className="text-xl text-muted" style={{ marginBottom: '4rem', maxWidth: '700px' }}>
            A collection of recent projects where our strategic design approach solved complex problems and drove measurable business impact.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2" style={{ gap: '3rem' }}>
          {projects.map((project, i) => (
            <motion.div 
              key={project.id} 
              className="work-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ height: '400px', borderRadius: '1rem', marginBottom: '1.5rem', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={project.image}
                  alt={`${project.title} case study cover`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="hover-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,85,255,0.8)', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s ease' }}>
                  <span style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>View Case Study <ArrowRight size={20} /></span>
                </div>
              </div>
              <h3 className="text-2xl" style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
              <p className="text-muted" style={{ marginBottom: '1rem' }}>{project.summary}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>{project.category}</p>
                <div style={{ padding: '0.3rem 0.8rem', backgroundColor: 'rgba(0,85,255,0.1)', color: 'var(--color-accent)', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
                  {project.result}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .work-card:hover .hover-overlay { opacity: 1 !important; }
      `}} />
    </div>
  );
};

export default Work;
