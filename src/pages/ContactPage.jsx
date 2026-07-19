import React from 'react'
import { Phone, Mail, MapPin, Clock, ShieldCheck, Compass } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import FAQAccordion from '../components/FAQAccordion'

export default function ContactPage() {
  return (
    <div className="bg-[#0B0B0B] text-white flex flex-col gap-24 py-16">
      
      {/* Header */}
      <section className="relative px-6 md:px-12 text-center max-w-5xl mx-auto pt-8">
        <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
        <span className="text-xs uppercase tracking-widest text-brand-gold font-heading font-bold">Get In Touch</span>
        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-wide text-white mt-4">
          Contact Desk
        </h1>
        <p className="text-base md:text-xl text-brand-muted mt-6 max-w-3xl mx-auto font-light leading-relaxed">
          Submit drawing specifications, request site visits, or get pricing estimates. Our engineering desk replies within 24 hours.
        </p>
      </section>

      {/* Main Grid: Info vs Form */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Info Column (Left) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-heading font-bold">Contact Coordinates</span>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase tracking-wider">
              S R Industries Office
            </h3>
            <p className="text-sm text-brand-muted font-light leading-relaxed">
              Located in the industrial corridor of Padappai, Chennai, our facility is fully equipped to handle major projects.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Phone */}
            <div className="flex gap-4 items-start border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-brand-gold shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <span className="text-brand-muted block font-light">Call Direct</span>
                <a href="tel:+918610235094" className="font-bold text-white hover:text-brand-gold transition-colors">+91 86102 35094</a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 items-start border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-brand-gold shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <span className="text-brand-muted block font-light">Email Address</span>
                <a href="mailto:rengraj19@gmail.com" className="font-bold text-white hover:text-brand-gold transition-colors">rengraj19@gmail.com</a>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4 items-start border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-brand-gold shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-sm leading-relaxed">
                <span className="text-brand-muted block font-light">Factory Premises</span>
                <span className="font-bold text-white block">2/334 Pushpagiri Main Road</span>
                <span className="text-brand-muted font-light text-xs">Manimangalam, Padappai, Chennai - 601301</span>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4 items-start pb-4">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-brand-gold shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <span className="text-brand-muted block font-light">Working Shift</span>
                <span className="font-bold text-white">9:00 AM – 8:00 PM</span>
                <span className="text-brand-muted font-light text-xs block mt-0.5">Monday through Saturday</span>
              </div>
            </div>

          </div>

          {/* WhatsApp Direct Action Button */}
          <div>
            <a
              href="https://wa.me/918610235094"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-lg bg-brand-surface border border-[#25D366]/40 hover:bg-[#25D366]/10 text-white font-heading font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.12 1.952 11.47 1.952c-5.437 0-9.86 4.37-9.864 9.8-.001 1.761.47 3.483 1.365 5.013l-.99 3.619 3.738-.97c1.554.84 3.09 1.29 4.73 1.29zm8.562-5.733c-.23-.115-1.363-.672-1.574-.749-.21-.077-.363-.115-.516.115-.153.23-.593.749-.727.904-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.142-.683-.61-1.144-1.363-1.278-1.593-.134-.23-.014-.354.101-.469.103-.104.23-.268.344-.402.115-.134.153-.23.23-.383.077-.153.038-.287-.019-.402-.057-.115-.516-1.245-.707-1.703-.186-.447-.376-.386-.516-.393-.134-.007-.287-.007-.44-.007-.153 0-.402.057-.613.287-.21.23-.804.786-.804 1.916 0 1.13.823 2.222.938 2.375.115.153 1.62 2.474 3.924 3.469.548.237 1.05.393 1.41.507.558.178 1.066.153 1.468.093.448-.067 1.363-.556 1.554-1.093.19-.537.19-1.002.134-1.093-.057-.091-.21-.13-.44-.246z" />
              </svg>
              <span>Instant WhatsApp Desk</span>
            </a>
          </div>

        </div>

        {/* Form Column (Right) */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </section>

      {/* Styled Google Maps iframe Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="glass-panel p-4 rounded-2xl border border-white/5 overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
          <iframe
            title="S R Industries Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.3789498263725!2d80.0163539!3d12.8839958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUzJzAyLjQiTiA4MMKwMDAnNTguOSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(100%)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          />
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16 w-full">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <Compass className="w-8 h-8 text-brand-gold animate-spin-slow" />
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-wide uppercase">
            Frequently Asked Queries
          </h2>
          <p className="text-xs text-brand-muted tracking-widest uppercase font-mono">SUPPORT DOCUMENTATION</p>
        </div>
        <FAQAccordion />
      </section>

    </div>
  )
}
