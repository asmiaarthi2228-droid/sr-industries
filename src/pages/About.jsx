import React from 'react'
import { Award, ShieldAlert, BadgeCheck, FileClock, UserCheck, Milestone } from 'lucide-react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="bg-[#0B0B0B] text-white flex flex-col gap-24 md:gap-32 py-16">
      
      {/* Page Header */}
      <section className="relative px-6 md:px-12 text-center max-w-5xl mx-auto pt-8">
        <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
        <span className="text-xs uppercase tracking-widest text-brand-gold font-heading font-bold">About S R Industries</span>
        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-wide text-white mt-4">
          Established in 2019
        </h1>
        <p className="text-base md:text-xl text-brand-muted mt-6 max-w-3xl mx-auto font-light leading-relaxed">
          S R Industries, spearheaded by founder G. Rengaraj, stands as a symbol of precision, safety compliance, and engineering durability in the structural fabrication landscape.
        </p>
      </section>

      {/* Founder Message Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Quote Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-brand-gold/10 rounded-full blur-xl pointer-events-none" />
            <div className="glass-panel p-8 md:p-10 rounded-2xl border border-brand-gold/20 shadow-2xl flex flex-col gap-6 relative">
              <span className="text-6xl font-heading text-brand-gold/20 absolute top-4 right-6 font-serif">“</span>
              <p className="text-sm md:text-base text-white/95 leading-relaxed font-light italic relative z-10">
                "Our business is not just joining steel beams. It is understanding exactly what our client's logistics, load limits, and regulatory needs are, then executing it with precision workmanship. We believe a contract is signed once, but relationship quality is proven every single day."
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-brand-surface border border-brand-gold/30 flex items-center justify-center font-heading font-bold text-brand-gold">
                  GR
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm uppercase text-white tracking-wider">G. Rengaraj</h4>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-brand-muted mt-0.5">Founder & Managing Owner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile details */}
          <div className="lg:col-span-7 flex flex-col gap-6 font-light text-brand-muted text-sm md:text-base leading-relaxed">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-heading font-bold">Our Philosophy</span>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase tracking-wider">
              From Local Suburbs to Regional Projects
            </h3>
            <p>
              S R Industries was established in Chennai with a singular target: providing industrial companies with high-quality MS & SS metal fabrications that skip the typical compromises of local machine shops.
            </p>
            <p>
              By investing in calibrated welding machinery, proper painting booths, and structural alignment bays, we ensure that every platform trolley, heavy shed, and mezzanine floor meets standard corporate code tolerances.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4 items-start">
                <UserCheck className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                <div>
                  <h5 className="font-heading font-semibold text-sm text-white uppercase tracking-wider">Experienced Supervision</h5>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">Every welding run is checked directly by senior site foremen.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <BadgeCheck className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                <div>
                  <h5 className="font-heading font-semibold text-sm text-white uppercase tracking-wider">Raw Material Traceability</h5>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">We source certified carbon steel and stainless alloys directly from vetted steel suppliers.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Timeline / Milestones */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <Milestone className="w-8 h-8 text-brand-gold" />
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-wide uppercase">
            Evolution Milestones
          </h2>
          <p className="text-xs text-brand-muted tracking-widest uppercase font-mono">OUR CHRONOLOGICAL RECORD</p>
        </div>

        <div className="relative border-l border-white/5 pl-8 md:pl-12 flex flex-col gap-12 max-w-4xl mx-auto">
          {/* Milestone 1 */}
          <div className="relative">
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-brand-bg border-2 border-brand-gold flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            </div>
            <div>
              <span className="font-mono font-bold text-sm text-brand-gold">2019</span>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider mt-1">Foundation Setup</h4>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-light mt-2">
                S R Industries begins operations under owner G. Rengaraj in Chennai. Operations focused on custom gates, staircases, and residential grills.
              </p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="relative">
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-brand-bg border-2 border-white/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-muted" />
            </div>
            <div>
              <span className="font-mono font-bold text-sm text-white/55">2021</span>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider mt-1">Industrial Pivot</h4>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-light mt-2">
                Expanded capital machinery to cater to corporate warehouse demands, supplying industrial platform trolleys, warehouse storage racks, and logistics pallets.
              </p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="relative">
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-brand-bg border-2 border-white/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-muted" />
            </div>
            <div>
              <span className="font-mono font-bold text-sm text-white/55">2023</span>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider mt-1">Structural & Erection Launch</h4>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-light mt-2">
                Acquired structural erection licenses to support factory sheds and heavy mezzanine flooring systems, scaling operations across Tamil Nadu.
              </p>
            </div>
          </div>

          {/* Milestone 4 */}
          <div className="relative">
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-brand-bg border-2 border-brand-gold flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-brand-gold" />
            </div>
            <div>
              <span className="font-mono font-bold text-sm text-brand-gold">Present</span>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider mt-1">Smart Shopfloor Digitalization</h4>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-light mt-2">
                Deployment of advanced CAD verification pipelines, enabling full documentation-compliance for automobile components and heavy manufacturing clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety and Standards Panel */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16 w-full">
        <div className="glass-panel p-8 md:p-12 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col gap-3">
            <ShieldAlert className="w-8 h-8 text-brand-gold" />
            <h4 className="font-heading font-bold text-sm uppercase text-white tracking-widest mt-2">Zero-Accident Safety Policy</h4>
            <p className="text-xs text-brand-muted leading-relaxed font-light">
              We strictly enforce on-site safety procedures, including structural scaffolding audits, heavy lift crane operations guidelines, and protective welding gear.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t md:border-t-0 md:border-x border-white/5 pt-8 md:pt-0 md:px-8">
            <Award className="w-8 h-8 text-brand-gold" />
            <h4 className="font-heading font-bold text-sm uppercase text-white tracking-widest mt-2">Corporate Compliance</h4>
            <p className="text-xs text-brand-muted leading-relaxed font-light">
              Registered under GST and MSME schemas. Fully compliant with state industrial safety regulations and environmental guidelines.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t md:border-t-0 pt-8 md:pt-0 md:pl-8">
            <FileClock className="w-8 h-8 text-brand-gold" />
            <h4 className="font-heading font-bold text-sm uppercase text-white tracking-widest mt-2">Documentation Vouch</h4>
            <p className="text-xs text-brand-muted leading-relaxed font-light">
              We supply full chemical composition test certificates for raw steel batches and structural safety certificates for mezzanine projects.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}
