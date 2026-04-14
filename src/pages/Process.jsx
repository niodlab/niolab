import React from 'react';
import { motion } from 'framer-motion';

const Process = () => {
  const steps = [
    { 
      num: '01', 
      title: 'Discover & Empathize', 
      desc: 'We start by immersing ourselves in your business context and user world. Through stakeholder interviews, user research, and competitive analysis, we uncover the real problems to solve.',
      deliverables: ['User Personas', 'Journey Maps', 'Research Report', 'Competitive Analysis']
    },
    { 
      num: '02', 
      title: 'Define & Strategize', 
      desc: 'Research is synthesized into actionable insights. We define the product architecture, prioritize features based on user value and business effort, and align on a unified strategy.',
      deliverables: ['Information Architecture', 'User Flows', 'Feature Prioritization', 'Product Strategy']
    },
    { 
      num: '03', 
      title: 'Design & Prototype', 
      desc: 'Ideas take shape through iterative design. We move from low-fidelity wireframes to high-fidelity interactive prototypes, ensuring alignment at every step before committing to full visual design.',
      deliverables: ['Wireframes', 'Interactive Prototypes', 'Visual Design (UI)', 'Design System']
    },
    { 
      num: '04', 
      title: 'Deliver & Validate', 
      desc: 'We validate designs through usability testing, iterate based on feedback, and prepare comprehensive documentation for a seamless handoff to your engineering team.',
      deliverables: ['Usability Testing Report', 'Final Mockups', 'Developer Handoff Specs', 'QA Support']
    }
  ];

  return (
    <div className="page-container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-hero" style={{ marginBottom: '1.5rem', maxWidth: '800px' }}>
            A rigorous process for <span style={{ color: 'var(--color-accent)' }}>predictable excellence.</span>
          </h1>
          <p className="text-xl text-muted" style={{ marginBottom: '5rem', maxWidth: '700px' }}>
            Great design doesn\'t happen by accident. Our methodical, 4-step approach ensures that every project is grounded in research and optimized for success.
          </p>
        </motion.div>
        
        <div style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div className="d-none-mobile" style={{ position: 'absolute', top: 0, bottom: 0, left: '2rem', width: '2px', backgroundColor: 'var(--color-border)', zIndex: -1 }}></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {steps.map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ display: 'flex', gap: '3rem', position: 'relative' }}
                className="process-row"
              >
                <div className="d-none-mobile" style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'var(--color-bg)', border: '2px solid var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-accent)', flexShrink: 0, zIndex: 1 }}>
                  {step.num}
                </div>
                
                <div className="card" style={{ flex: 1, padding: '3rem', borderLeft: '4px solid var(--color-accent)' }}>
                  <div className="d-none-desktop" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '1rem', opacity: 0.5 }}>{step.num}</div>
                  <h3 className="text-2xl" style={{ marginBottom: '1.5rem' }}>{step.title}</h3>
                  <p className="text-lg text-muted" style={{ marginBottom: '2rem', lineHeight: 1.6 }}>{step.desc}</p>
                  
                  <div>
                    <h4 className="text-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, color: '#888', marginBottom: '1rem' }}>Key Deliverables</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {step.deliverables.map(del => (
                        <span key={del} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '2rem', fontSize: '0.9rem' }}>
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .process-row { flex-direction: column; gap: 1rem !important; }
        }
      `}} />
    </div>
  );
};

export default Process;
