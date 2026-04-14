import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { title: 'UX Research', desc: 'User interviews, competitive analysis, persona development, and journey mapping. We eliminate guesswork by understanding your users deeply.' },
    { title: 'UI Design', desc: 'Pixel-perfect, accessible, and responsive visual design. We craft interfaces that reflect your brand identity while maintaining exceptional usability.' },
    { title: 'Product Strategy', desc: 'Aligning user needs with your business outcomes. We help you prioritize features, define MVPs, and plan for scalable growth.' },
    { title: 'Usability Testing', desc: 'Validating our designs with real users. We observe, document, and iterate to ensure the product is intuitive and friction-free.' },
    { title: 'Design Systems', desc: 'Creating comprehensive, reusable component libraries. We ensure visual consistency across your ecosystem and speed up development.' },
    { title: 'UX Audit', desc: 'Detailed heuristics evaluation of your existing platform. We identify usability flaws and provide actionable recommendations for improvement.' },
    { title: 'AI Driven Digital marketing', desc: 'Data-informed digital marketing powered by AI insights. We help you optimize campaigns, personalize customer journeys, improve targeting, and turn engagement into measurable business growth.' }
  ];

  return (
    <div className="page-container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-hero" style={{ marginBottom: '1.5rem' }}>Our Services</h1>
          <p className="text-xl text-muted" style={{ marginBottom: '4rem', maxWidth: '700px' }}>
            Comprehensive design solutions from foundational research to the final polished interface. We partner with you at every stage of the product lifecycle.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          {services.map((service, i) => (
            <motion.div 
              key={service.title} 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ padding: '3rem' }}
            >
              <h3 className="text-2xl" style={{ marginBottom: '1rem', color: 'var(--color-accent)' }}>{service.title}</h3>
              <p className="text-lg text-muted" style={{ lineHeight: 1.6 }}>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
