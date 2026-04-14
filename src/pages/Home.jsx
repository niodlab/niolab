import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRegionTheme } from '../context/RegionThemeContext';

const FadeInWhenVisible = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const { mode, regionId } = useRegionTheme();
  const heroVideoRef = useRef(null);
  const heroVideoSrc = regionId === 'bahrain'
    ? `${import.meta.env.BASE_URL}images/hero-home/hero-Video 1.mp4`
    : `${import.meta.env.BASE_URL}images/hero-home/hero-Video 2.mp4`;
  const ctaBackgroundColor = regionId === 'us' && mode === 'dark' ? '#0A3161' : 'var(--color-accent)';

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video) return;

    const attemptPlayback = () => {
      video.play().catch(() => {
        // Autoplay can still be browser-gated, so fail silently.
      });
    };

    attemptPlayback();
    video.addEventListener('loadeddata', attemptPlayback);
    video.addEventListener('canplay', attemptPlayback);

    return () => {
      video.removeEventListener('loadeddata', attemptPlayback);
      video.removeEventListener('canplay', attemptPlayback);
    };
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video) return;

    video.load();
    video.play().catch(() => {
      // Autoplay can still be browser-gated, so fail silently.
    });
  }, [heroVideoSrc]);

  return (
    <div className="home-page">
      {/* 2. HERO SECTION */}
      <section className="hero-section" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '100vh', height: '100vh', position: 'relative', overflow: 'hidden', isolation: 'isolate', color: 'white', paddingTop: 0, paddingBottom: '3rem' }}>
        
        {/* Video Background */}
        <video
          ref={heroVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={`${import.meta.env.BASE_URL}images/hero-home/heroSlide-1.jpg`}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src={heroVideoSrc} type="video/mp4" />
        </video>

        {/* Dark Overlay for Readability (Gradient to keep top clear) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(8,12,20,0.38) 0%, rgba(8,12,20,0.28) 45%, rgba(8,12,20,0.42) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        ></div>
        
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              maxWidth: '920px',
              margin: '0 auto'
            }}
          >
            <h1 className="text-hero" style={{ marginBottom: '1rem', maxWidth: '900px', margin: '0 auto 1rem', color: 'white', textShadow: '0 3px 18px rgba(0, 0, 0, 0.45)' }}>
              Designing experiences users love, and businesses grow with.
            </h1>
            <p className="text-xl" style={{ margin: '10px auto 1.5rem', maxWidth: '650px', color: 'rgba(255,255,255,0.92)', textShadow: '0 2px 14px rgba(0, 0, 0, 0.38)' }}>
              Nio d'Lab is a Bangalore-based UX design studio crafting intuitive, research-driven digital products for web and mobile.
            </p>
            <div className="hero-cta" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/work" className="btn btn-primary">View Our Work</Link>
              <Link to="/contact" className="btn btn-outline hero-secondary-cta">Get in Touch</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. ABOUT PREVIEW */}
      <section className="about-preview" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <FadeInWhenVisible>
            <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
              <div>
                <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Driven by research, designed for impact.</h2>
                <p className="text-lg text-muted" style={{ marginBottom: '1.5rem' }}>
                  At Nio d'Lab, we believe that great design merges empathy with business strategy. We take a research-driven approach to deeply understand user behavior and align it with your business objectives.
                </p>
                <Link to="/about" className="text-accent hover-underline flex-center" style={{ width: 'fit-content' }}>
                  Read our story <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="about-visual flex-center">
                <img src={`${import.meta.env.BASE_URL}images/abstract-ux-01.jpg`} alt="Abstract UX Design" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }} />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="services-section">
        <div className="container">
          <FadeInWhenVisible>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Our Capabilities</h2>
              <p className="text-lg text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
                End-to-end design solutions tailored for ambitious brands.
              </p>
            </div>
            <div className="grid grid-cols-3">
              {[
                { title: 'UX Research', desc: 'Understanding your users through qualitative and quantitative methods to inform design decisions.' },
                { title: 'UI Design', desc: 'Crafting visually stunning, accessible, and responsive interfaces that elevate your brand.' },
                { title: 'Product Design', desc: 'Holistic design strategy that aligns user needs with long-term business goals.' },
                { title: 'Usability Testing', desc: 'Validating concepts and identifying friction points through real-user testing sessions.' },
                { title: 'Design Systems', desc: 'Building scalable and consistent UI component libraries for faster development.' },
                { title: 'UX Audit', desc: 'Comprehensive review of your existing product to uncover usability issues and opportunities.' }
              ].map((service, i) => (
                <motion.div 
                  key={service.title} 
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3 className="text-xl" style={{ marginBottom: '1rem' }}>{service.title}</h3>
                  <p className="text-muted">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* 5. FEATURED WORK */}
      <section className="work-section" style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}>
        <div className="container">
          <FadeInWhenVisible>
            <div className="flex-between" style={{ marginBottom: '4rem' }}>
              <h2 className="text-h2">Selected Work</h2>
              <Link to="/work" className="btn btn-outline" style={{ color: 'var(--color-bg)', borderColor: 'rgba(255,255,255,0.2)' }}>
                View All Projects
              </Link>
            </div>
            
            <div className="grid grid-cols-2">
              {[
                {
                  title: 'Fintech Dashboard',
                  category: 'Product Design',
                  result: 'Increased retention by 25%',
                  summary: 'Reframed a dense financial workflow into a confident daily dashboard for growth teams.',
                  image: `${import.meta.env.BASE_URL}images/abstract-ux-01b.jpg`
                },
                {
                  title: 'E-commerce Redesign',
                  category: 'UX/UI Design',
                  result: 'Improved conversion by 40%',
                  summary: 'Simplified product discovery and checkout so more first-time visitors became paying customers.',
                  image: `${import.meta.env.BASE_URL}images/abstract-ux-01c.jpg`
                }
              ].map((project, i) => (
                <motion.div 
                  key={project.title}
                  className="work-card featured-work-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <div style={{ height: '360px', borderRadius: '1rem', marginBottom: '1.5rem', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={project.image}
                      alt={`${project.title} abstract case study visual`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="featured-work-overlay">
                      <span className="featured-work-badge">{project.category}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl" style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: '#d0d0d0', marginBottom: '0.75rem' }}>{project.summary}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: '#aaa' }}>Outcome</p>
                    <p style={{ color: '#0055ff', fontWeight: 500 }}>{project.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* 6. PROCESS SECTION */}
      <section className="process-section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <FadeInWhenVisible>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 className="text-h2" style={{ marginBottom: '1rem' }}>How We Work</h2>
              <p className="text-lg text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
                A structured, iterative methodology to ensure predictable and high-quality outcomes.
              </p>
            </div>
            <div className="grid grid-cols-4">
              {[
                { step: '01', title: 'Discover', desc: 'Understanding your business, market, and user needs through deep research.' },
                { step: '02', title: 'Define', desc: 'Synthesizing insights to create a clear product strategy and architecture.' },
                { step: '03', title: 'Design', desc: 'Iterative prototyping and visual design to bring the experience to life.' },
                { step: '04', title: 'Deliver', desc: 'Comprehensive handoff and QA to ensure pixel-perfect implementation.' }
              ].map((process, i) => (
                <motion.div 
                  key={process.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-accent)', opacity: 0.2, marginBottom: '1rem' }}>
                    {process.step}
                  </div>
                  <h3 className="text-xl" style={{ marginBottom: '1rem' }}>{process.title}</h3>
                  <p className="text-muted">{process.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="why-us-section">
        <div className="container">
          <FadeInWhenVisible>
            <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
              <div>
                <img
                  src={`${import.meta.env.BASE_URL}images/service-bg-01.jpg`}
                  alt="Nio d'Lab creative studio visual"
                  style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }}
                />
              </div>
              <div style={{ paddingLeft: '2vw' }}>
                <h2 className="text-h2" style={{ marginBottom: '2rem' }}>Why partner with Nio d'Lab?</h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { title: 'Human-Centered Design', desc: 'We build for real people, solving actual problems to drive meaningful engagement.' },
                    { title: 'Data-Driven Decisions', desc: 'Every design choice is backed by research, metrics, and thorough testing.' },
                    { title: 'Scalable Solutions', desc: 'We create future-proof design systems that grow seamlessly with your product.' },
                    { title: 'Clean & Impactful Aesthetic', desc: 'Our visual language is premium, minimal, and tailored to build trust.' }
                  ].map((item) => (
                    <li key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <h4 className="text-lg" style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</h4>
                        <p className="text-muted">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="cta-section" style={{ padding: '8rem 0', backgroundColor: ctaBackgroundColor, color: 'white', textAlign: 'center' }}>
        <div className="container">
          <FadeInWhenVisible>
            <h2 className="text-h1" style={{ marginBottom: '1.5rem' }}>Let's build something meaningful together.</h2>
            <p className="text-xl" style={{ marginBottom: '3rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 3rem' }}>
              Ready to elevate your digital product? Get in touch to discuss your next big idea.
            </p>
            <Link to="/contact" className="btn home-cta-button" style={{ backgroundColor: 'white', color: 'var(--color-accent)', padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
              Start Your Project
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default Home;
