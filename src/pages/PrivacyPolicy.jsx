import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#0B0B0B] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-2xl border border-white/5 relative">
        <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
        
        <h1 className="font-heading font-black text-3xl uppercase tracking-wider text-white border-b border-white/5 pb-4">
          Privacy Policy & Safety Guidelines
        </h1>
        
        <div className="mt-8 flex flex-col gap-6 text-sm text-brand-muted leading-relaxed font-light">
          <p>
            Effective Date: July 14, 2026. Established by S R Industries, managed under owner <strong>G. Rengaraj</strong>.
          </p>
          
          <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider mt-4">
            1. Information Collection
          </h3>
          <p>
            We collect personal coordinates (name, email, phone number) and project attachment specifications submitted via our contact desks. This information is utilized solely to compile structural pricing estimates and verify industrial requirements.
          </p>

          <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider mt-4">
            2. File Upload Safety
          </h3>
          <p>
            Blueprints and drawing files (PDF, PNG, DXF, DWG) uploaded to our system are checked for malware using automated middleware blocks. Files are stored securely on our localized server directory and are accessible only to our engineering estimation team.
          </p>

          <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider mt-4">
            3. Data Sharing & Security
          </h3>
          <p>
            S R Industries does not share, sell, or rent client contact logs to marketing companies. We deploy SSL data encryption over HTTP routes and secure Express servers configurations (via Helmet security headers) to block cross-site script injections.
          </p>

          <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider mt-4">
            4. Industrial Erection Safety
          </h3>
          <p>
            Safety compliance is paramount. Physical site operations follow state industrial rules. The company provides scaffolding validation, PPE kits, and structural drawings checkoffs prior to staircase, shed, or mezzanine setups.
          </p>

          <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider mt-4">
            5. Contact Coordinates
          </h3>
          <p>
            If you have questions about data handling, email our desk at <a href="mailto:rengraj19@gmail.com" className="text-brand-gold hover:underline">rengraj19@gmail.com</a> or write to:
            <br />
            <strong>S R Industries</strong>, 2/334 Pushpagiri Main Road, Manimangalam, Padappai, Chennai - 601301.
          </p>
        </div>
      </div>
    </div>
  )
}
