import React from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import { Phone, Mail, MapPin, Clock, Award, Shield, FileCheck, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#080808] border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[250px] h-[250px] bg-brand-bronze/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-white/5">
          
          {/* Corporate Profile Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <BrandLogo mode="logo" size={44} className="shrink-0" />
              <div className="flex flex-col">
                <span className="font-heading font-black text-sm tracking-[0.2em] text-white">
                  S R <span className="text-brand-gold">INDUSTRIES</span>
                </span>
                <span className="text-[8px] tracking-[0.18em] text-brand-muted uppercase font-light -mt-0.5">
                  Fabrication & Engineering
                </span>
              </div>
            </div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-brand-gold bg-brand-gold/5 border border-brand-gold/10 px-3 py-1 rounded w-fit">
              Established 2019
            </div>
            <p className="text-sm text-brand-muted leading-relaxed font-light">
              Pioneering precision structural and custom metal fabrication since 2019. Driven by heavy engineering standards, quality inspection workflows, and customer satisfaction.
            </p>
            {/* Accreditation Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-brand-surface border border-white/5 text-xs text-brand-gold font-heading">
                <FileCheck className="w-4 h-4 text-brand-gold" />
                <span>GST Registered</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-brand-surface border border-white/5 text-xs text-brand-gold font-heading">
                <Award className="w-4 h-4 text-brand-gold" />
                <span>MSME Certified</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-semibold text-xs tracking-[0.3em] uppercase text-white border-l-2 border-brand-gold pl-3">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm text-brand-muted">
              {[
                { name: 'Home Portal', path: '/' },
                { name: 'Corporate Profile', path: '/about' },
                { name: 'Engineering Services', path: '/services' },
                { name: 'Industrial Catalog', path: '/products' },
                { name: 'Project Portfolio', path: '/portfolio' },
                { name: 'Contact Desk', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="hover:text-brand-gold transition-colors duration-200 flex items-center gap-1 group font-light"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialized Services Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-semibold text-xs tracking-[0.3em] uppercase text-white border-l-2 border-brand-gold pl-3">
              Capabilities
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-brand-muted font-light">
              <li>Heavy Structural Fabrication</li>
              <li>Industrial Trolleys & Pallets</li>
              <li>MS & SS Precision Fabrication</li>
              <li>Roofing Sheets & Sheds</li>
              <li>Machine Frames & Bases</li>
              <li>Mezzanine Flooring Systems</li>
            </ul>
          </div>

          {/* Direct Contacts Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-semibold text-xs tracking-[0.3em] uppercase text-white border-l-2 border-brand-gold pl-3">
              Contact Office
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-brand-muted font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  2/334 Pushpagiri Main Road,<br />
                  Manimangalam, Padappai,<br />
                  Tamil Nadu, Chennai - 601301
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+918610235094" className="hover:text-brand-gold transition-colors">+91 86102 35094</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="mailto:rengraj19@gmail.com" className="hover:text-brand-gold transition-colors">rengraj19@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright block */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 text-xs text-brand-muted font-light">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-gold/40" />
            <span>&copy; {currentYear} S R Industries. All Engineering Rights Reserved. Estd. 2019.</span>
          </div>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">
              Privacy Policy & Terms
            </Link>
            <span className="text-white/5">|</span>
            <Link to="/admin" className="hover:text-white transition-colors duration-200">
              Admin Portal
            </Link>
            <span className="text-white/5">|</span>
            <span className="text-[10px] tracking-wider uppercase">
              Principal Owner: <strong className="text-brand-gold font-normal">G. Rengaraj</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
