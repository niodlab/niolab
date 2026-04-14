import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, Mic, MicOff, Sparkles } from 'lucide-react';
import { useRegionTheme } from '../context/RegionThemeContext';

const getFollowUpQuestion = (input) => {
  const normalized = input.toLowerCase();

  if (normalized.includes('e-commerce') || normalized.includes('ecommerce')) {
    return 'Got it. Is this for mobile, web, or both?';
  }

  if (normalized.includes('redesign') || normalized.includes('ux')) {
    return 'Understood. Are you redesigning an existing product, or building a new experience from scratch?';
  }

  if (normalized.includes('app') || normalized.includes('mobile')) {
    return 'Sounds good. Is the main focus onboarding, conversion, usability, or the full product flow?';
  }

  if (normalized.includes('website') || normalized.includes('web')) {
    return 'Thanks. Is this primarily a marketing site, a product experience, or both?';
  }

  return 'Thanks. Could you tell us whether this project is for web, mobile, or both?';
};

const Contact = () => {
  const { mode, regionId } = useRegionTheme();
  const whatsappNumber = '+91 9986330787';
  const whatsappPhone = '919986330787';
  const initialFormState = {
    name: '',
    email: '',
    details: '',
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState('');
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');
  const resetTimerRef = useRef(null);
  const celebrationTimerRef = useRef(null);
  const whatsAppTimerRef = useRef(null);
  const labelColor =
    mode === 'dark' && (regionId === 'us' || regionId === 'bahrain') ? 'rgb(173 173 173)' : '#555';

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) return undefined;

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? '')
        .join(' ')
        .trim();

      transcriptRef.current = transcript;
    };

    recognition.onend = () => {
      setIsListening(false);

      const spokenText = transcriptRef.current.trim();

      if (!spokenText) return;

      setFormData((current) => ({
        ...current,
        details: current.details ? `${current.details.trim()}\n\n${spokenText}` : spokenText,
      }));
      setVoiceMessage(getFollowUpQuestion(spokenText));
      setError('');
      setSuccess('');
      transcriptRef.current = '';
    };

    recognition.onerror = () => {
      setIsListening(false);
      setError('Voice input is unavailable right now. Please type your project details instead.');
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      if (celebrationTimerRef.current) {
        window.clearTimeout(celebrationTimerRef.current);
      }
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
      if (whatsAppTimerRef.current) {
        window.clearTimeout(whatsAppTimerRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((current) => ({ ...current, [id]: value }));
    setError('');
    setSuccess('');

    if (id === 'details') {
      setVoiceMessage(value.trim() ? getFollowUpQuestion(value) : '');
    }
  };

  const handleVoiceCapture = () => {
    if (!recognitionRef.current) {
      setError('This browser does not support voice input. Please type your project details instead.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    transcriptRef.current = '';
    setVoiceMessage('Listening... tell us about your project and we will guide the next question.');
    setError('');
    recognitionRef.current.start();
    setIsListening(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.details.trim()) {
      setError('Please complete your name, email, and project details before sending.');
      return;
    }
    setSuccess('Successfully submitted. We will connect to you soon.');
    setShowCelebration(true);
    setVoiceMessage('');

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }
    if (celebrationTimerRef.current) {
      window.clearTimeout(celebrationTimerRef.current);
    }

    celebrationTimerRef.current = window.setTimeout(() => {
      setShowCelebration(false);
      celebrationTimerRef.current = null;
    }, 3000);

    resetTimerRef.current = window.setTimeout(() => {
      setFormData(initialFormState);
      setError('');
      setSuccess('');
      setShowCelebration(false);
      setVoiceMessage('');
      resetTimerRef.current = null;
    }, 6000);
  };

  const handleWhatsAppContact = () => {
    if (typeof window === 'undefined') return;

    setWhatsAppMessage('');

    if (whatsAppTimerRef.current) {
      window.clearTimeout(whatsAppTimerRef.current);
    }

    const deepLink = `whatsapp://send?phone=${whatsappPhone}`;

    window.location.href = deepLink;

    whatsAppTimerRef.current = window.setTimeout(() => {
      if (!document.hidden) {
        setWhatsAppMessage(`Please send your message to : ${whatsappNumber}`);
      }
      whatsAppTimerRef.current = null;
    }, 1200);
  };

  return (
    <div className="page-container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="grid grid-cols-2" style={{ gap: '4rem', alignItems: 'flex-start' }}>
            <div>
              <h1 className="text-hero" style={{ marginBottom: '1.5rem', fontSize: '3.5rem' }}>Let's build something <span style={{ color: 'var(--color-accent)' }}>meaningful.</span></h1>
              <p className="text-xl text-muted" style={{ marginBottom: '3rem' }}>
                Whether you have a clear vision or just a rough idea, we're here to help bring it to life. Fill out the form and we'll get back to you within 24 hours.
              </p>
              
              <div style={{ marginBottom: '2.5rem' }}>
                <h4 className="text-xl" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Email</h4>
                <a href="mailto:hello@theneenalab.com" style={{ fontSize: '1.25rem', color: 'var(--color-accent)', textDecoration: 'none' }}>hello@theneenalab.com</a>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <h4 className="text-xl" style={{ fontWeight: 600, marginBottom: '0.75rem' }}>WhatsApp</h4>
                <button
                  type="button"
                  onClick={handleWhatsAppContact}
                  className="btn whatsapp-contact-button"
                  style={{ padding: '0.95rem 1.3rem', fontSize: '1rem' }}
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </button>
                <p className="text-lg" style={{ marginTop: '0.9rem', color: 'var(--color-text)' }}>{whatsappNumber}</p>
                {whatsAppMessage ? <p className="form-message whatsapp-message">{whatsAppMessage}</p> : null}
              </div>
              
              <div>
                <h4 className="text-xl" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Location</h4>
                <div
                  style={{
                    marginBottom: '1rem',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    maxWidth: '360px',
                  }}
                >
                  <iframe
                    title="Bangalore map"
                    src="https://www.google.com/maps?q=Bangalore,India&z=11&output=embed"
                    width="100%"
                    height="180"
                    style={{ border: 0, display: 'block' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="text-lg text-muted">Bangalore, India</p>
              </div>
            </div>
            
            <motion.div 
              className="card" 
              style={{ padding: '3rem', backgroundColor: 'var(--color-bg)', boxShadow: 'var(--shadow-lg)', border: 'none' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: labelColor }}>Your Name</label>
                  <input type="text" id="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #ddd', outline: 'none', fontSize: '1rem', backgroundColor: '#f9f9f9', transition: 'border 0.3s ease' }} placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: labelColor }}>Your Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #ddd', outline: 'none', fontSize: '1rem', backgroundColor: '#f9f9f9', transition: 'border 0.3s ease' }} placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="details" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: labelColor }}>Project Details</label>
                  <button
                    type="button"
                    onClick={handleVoiceCapture}
                    className="btn btn-outline"
                    style={{ marginBottom: '0.9rem', width: '100%', justifyContent: 'center' }}
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                    {isListening ? 'Stop Listening' : 'Talk to us'}
                  </button>
                  <textarea id="details" value={formData.details} onChange={handleChange} required rows={5} style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #ddd', outline: 'none', fontSize: '1rem', resize: 'vertical', backgroundColor: '#f9f9f9', transition: 'border 0.3s ease' }} placeholder="Tell us about your project goals, timeline, and budget..."></textarea>
                  {voiceMessage ? (
                    <div
                      style={{
                        marginTop: '0.9rem',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        backgroundColor: '#f3f7ff',
                        border: '1px solid #d8e4ff',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Sparkles size={18} style={{ color: 'var(--color-accent)', marginTop: '0.1rem', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.3rem' }}>
                          AI Follow-up
                        </p>
                        <p style={{ color: '#2b2b2b' }}>{voiceMessage}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
                {error ? <p className="form-message form-error">{error}</p> : null}
                {success ? (
                  <motion.div
                    className="form-message form-success"
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    style={{ position: 'relative' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
                      <motion.div
                        initial={{ scale: 0.7, rotate: -12 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        <CheckCircle2 size={20} />
                      </motion.div>
                      <span>{success}</span>
                    </div>
                  </motion.div>
                ) : null}
                <div style={{ position: 'relative' }}>
                  {showCelebration ? (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '-2.5rem -1.25rem -2rem -1.25rem',
                        pointerEvents: 'none',
                        overflow: 'hidden',
                      }}
                    >
                      {[...Array(40)].map((_, index) => (
                        <motion.div
                          key={`dot-${index}`}
                          style={{
                            position: 'absolute',
                            top: '-8%',
                            left: `${5 + ((index * 7) % 90)}%`,
                            width: index % 4 === 0 ? '0.7rem' : '0.42rem',
                            height: index % 4 === 0 ? '0.7rem' : '0.42rem',
                            borderRadius: '999px',
                            backgroundColor:
                              index % 4 === 0 ? '#f79009' : index % 4 === 1 ? 'var(--color-accent)' : index % 4 === 2 ? '#12b76a' : '#ec4899',
                            boxShadow: '0 0 10px rgba(255,255,255,0.65)',
                          }}
                          initial={{ y: '-8%', opacity: 0, scale: 0.4 }}
                          animate={{
                            y: ['0%', '42%', '110%'],
                            x: [0, index % 2 === 0 ? 10 : -10, index % 2 === 0 ? 20 : -20],
                            opacity: [0, 1, 0],
                            scale: [0.4, 1, 0.6],
                          }}
                          transition={{ duration: 0.45, delay: index * 0.01, ease: 'easeOut' }}
                        />
                      ))}

                      {[...Array(22)].map((_, index) => (
                        <motion.div
                          key={`star-${index}`}
                          style={{
                            position: 'absolute',
                            top: '-5%',
                            left: `${8 + ((index * 8.5) % 84)}%`,
                            color:
                              index % 4 === 0 ? '#f79009' : index % 4 === 1 ? '#0055ff' : index % 4 === 2 ? '#12b76a' : '#ec4899',
                            fontSize: index % 3 === 0 ? '1rem' : '0.8rem',
                            lineHeight: 1,
                            textShadow: '0 0 10px rgba(255,255,255,0.72)',
                          }}
                          initial={{ opacity: 0, scale: 0.25, rotate: 0 }}
                          animate={{
                            y: ['0%', '55%', '120%'],
                            x: [0, index % 2 === 0 ? 8 : -8, index % 2 === 0 ? 16 : -16],
                            opacity: [0, 1, 0],
                            scale: [0.25, 1.2, 0.35],
                            rotate: [0, 180, 320],
                          }}
                          transition={{ duration: 0.5, delay: index * 0.012, ease: 'easeOut' }}
                        >
                          ★
                        </motion.div>
                      ))}

                      {[
                        { top: '18%', left: '18%' },
                        { top: '8%', left: '50%' },
                        { top: '18%', left: '82%' },
                      ].map((burst, burstIndex) => (
                        <div
                          key={`burst-${burstIndex}`}
                          style={{
                            position: 'absolute',
                            top: burst.top,
                            left: burst.left,
                            width: '1px',
                            height: '1px',
                          }}
                        >
                          {[...Array(14)].map((_, index) => (
                            <motion.span
                              key={`burst-${burstIndex}-${index}`}
                              style={{
                                position: 'absolute',
                                width: '0.32rem',
                                height: '0.32rem',
                                borderRadius: '999px',
                                backgroundColor:
                                  index % 4 === 0 ? '#f79009' : index % 4 === 1 ? 'var(--color-accent)' : index % 4 === 2 ? '#12b76a' : '#ec4899',
                                boxShadow: '0 0 12px rgba(255,255,255,0.65)',
                              }}
                              initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                              animate={{
                                x: [0, Math.cos((index / 14) * Math.PI * 2) * 42],
                                y: [0, Math.sin((index / 14) * Math.PI * 2) * 32],
                                opacity: [0, 1, 0],
                                scale: [0.3, 1.1, 0.15],
                              }}
                              transition={{ duration: 0.38, delay: 0.03 + burstIndex * 0.08 + index * 0.006, ease: 'easeOut' }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.125rem', position: 'relative', zIndex: 1 }}>
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
