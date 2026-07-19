import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Construction } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="bg-[#0B0B0B] text-white min-h-[70vh] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      
      <div className="absolute w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md text-center flex flex-col items-center gap-6 relative z-10">
        <div className="w-16 h-16 rounded-full bg-brand-surface border border-brand-gold/30 flex items-center justify-center text-brand-gold">
          <Construction className="w-8 h-8 text-brand-gold animate-bounce" />
        </div>

        <h1 className="font-heading font-black text-6xl md:text-8xl text-stroke-gold text-brand-gold tracking-tight">
          404
        </h1>

        <h3 className="font-heading font-bold text-lg md:text-xl uppercase tracking-widest text-white">
          Structural Error: Page Not Found
        </h3>

        <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-light">
          The drawing directory or site path you are searching for does not exist or has been archived. Check coordinates or return to home portal.
        </p>

        <div className="mt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold hover:bg-white text-brand-bg font-heading font-bold uppercase tracking-widest text-xs rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-brand-bg" />
            <span>Back to Home Portal</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
