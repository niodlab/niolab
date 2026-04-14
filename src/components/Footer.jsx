import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top grid grid-cols-4">
          <div className="footer-col-main">
            <h3>Nio d'Lab</h3>
            <p className="text-muted">
              Designing experiences users love, and businesses grow with. Bangalore based UX design studio.
            </p>
          </div>
          
          <div className="footer-col">
            <h4>Studio</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/work">Our Work</Link></li>
              <li><Link to="/process">Process</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Socials</h4>
            <ul>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} /></a></li>
              <li><a href="https://behance.net" target="_blank" rel="noopener noreferrer">Behance <ArrowUpRight size={14} /></a></li>
              <li><a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble <ArrowUpRight size={14} /></a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get in Touch</h4>
            <ul>
              <li><a href="mailto:hello@theneenalab.com">hello@theneenalab.com</a></li>
              <li className="text-muted mt-2">Bangalore, India</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom flex-between">
          <p className="text-muted">&copy; {new Date().getFullYear()} Nio d'Lab. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy" className="text-muted">Privacy Policy</Link>
            <Link to="/terms" className="text-muted">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
