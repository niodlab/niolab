import React from 'react';

const Terms = () => {
  return (
    <div className="page-container legal-page">
      <div className="container legal-container">
        <p className="legal-eyebrow">Terms</p>
        <h1 className="text-h1 legal-title">Terms of Service</h1>
        <p className="text-lg text-muted legal-intro">
          Project work, timelines, deliverables, and commercial terms are confirmed in writing before any engagement begins.
        </p>

        <section className="legal-section">
          <h2 className="text-h3">Scope</h2>
          <p className="text-muted">
            Every engagement is defined by an agreed proposal or statement of work that outlines deliverables, responsibilities, and milestones.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="text-h3">Collaboration</h2>
          <p className="text-muted">
            Successful delivery depends on timely feedback, approvals, and access to the information needed to complete the work.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="text-h3">Ownership</h2>
          <p className="text-muted">
            Final ownership and usage rights are transferred according to the signed project agreement and payment terms.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="text-h3">Questions</h2>
          <p className="text-muted">
            For project or commercial questions, contact hello@theneenalab.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
