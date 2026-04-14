import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegionTheme } from '../context/RegionThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { mode, region, regionTime, regions, setRegion } = useRegionTheme();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileMenuOpen);

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container flex-between">
        <Link to="/" className="logo">
          Nio d'Lab
        </Link>
        
        <nav className="desktop-nav">
          <ul>
            {links.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="navbar-actions">
          <div className="region-switcher d-none-mobile" aria-label="Select region">
            {regions.map((regionOption) => (
              <button
                key={regionOption.id}
                type="button"
                className={`region-chip ${regionOption.id === region.id ? 'active' : ''}`}
                onClick={() => setRegion(regionOption.id)}
                aria-pressed={regionOption.id === region.id}
                aria-label={regionOption.label}
              >
                <span className="region-flag" aria-hidden="true">{regionOption.flag}</span>
              </button>
            ))}
          </div>
          <div className="region-status d-none-mobile" aria-live="polite">
            <span>{region.label}</span>
            <span className="region-status-dot" aria-hidden="true" />
            <span>{regionTime}</span>
            <span className="region-status-mode">{mode === 'light' ? 'Day' : 'Night'}</span>
          </div>
          <Link to="/contact" className="btn btn-primary d-none-mobile">
            Start a Project
          </Link>
          <button 
            className="mobile-menu-btn d-none-desktop"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            className="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              <li className="mobile-region-panel">
                <p className="mobile-region-title">Region Theme</p>
                <p className="mobile-region-summary">
                  {region.flag} {region.label} · {regionTime} · {mode === 'light' ? 'Day mode' : 'Night mode'}
                </p>
                <div className="region-switcher mobile-region-switcher" aria-label="Select region">
                  {regions.map((regionOption) => (
                    <button
                      key={regionOption.id}
                      type="button"
                      className={`region-chip ${regionOption.id === region.id ? 'active' : ''}`}
                      onClick={() => setRegion(regionOption.id)}
                      aria-pressed={regionOption.id === region.id}
                      aria-label={regionOption.label}
                    >
                      <span className="region-flag" aria-hidden="true">{regionOption.flag}</span>
                    </button>
                  ))}
                </div>
              </li>
              {links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className={location.pathname === link.path ? 'active' : ''}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  Start a Project
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
