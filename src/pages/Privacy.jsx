import React from 'react';

const Privacy = () => {
  return (
    <div className="page-container legal-page">
      <div className="container legal-container">
        <p className="legal-eyebrow">Privacy</p>
        <h1 className="text-h1 legal-title">Privacy Policy</h1>
        <p className="text-lg text-muted legal-intro">
          We only collect the details you explicitly share with us through our contact channels so we can respond to project inquiries.
        </p>

        <section className="legal-section">
          <h2 className="text-h3">What we collect</h2>
          <p className="text-muted">
            Name, email address, and project details submitted through the contact form or sent directly to our inbox.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="text-h3">How we use it</h2>
          <p className="text-muted">
            We use your information to reply to your inquiry, understand your project needs, and continue relevant conversations about potential work.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="text-h3">What we do not do</h2>
          <p className="text-muted">
            We do not sell your information or use it for unrelated marketing without your consent.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="text-h3">Contact</h2>
          <p className="text-muted">
            Questions about privacy can be sent to hello@theneenalab.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
