import React from 'react'

const clientLogos = [
  { name: 'Tenneco Clean Air', type: 'auto', detail: 'TENNECO' },
  { name: 'Nabati', type: 'food', detail: 'nabati' },
  { name: 'IBPL', type: 'energy', detail: 'IBPL' },
  { name: 'Alsa Garden', type: 'const', detail: 'ALSA GARDEN' },
  { name: 'Mekins Industrial', type: 'eng', detail: 'MEKINS' },
  { name: 'Britannia', type: 'food', detail: 'BRITANNIA' },
  { name: 'Vaagai Towers', type: 'const', detail: 'VAAGAI' },
]

export default function LogoSlider() {
  // Duplicate logos list to ensure seamless looping transition
  const extendedLogos = [...clientLogos, ...clientLogos, ...clientLogos]

  return (
    <div className="w-full overflow-hidden bg-brand-surface/40 py-10 border-y border-white/5 relative">
      {/* Side fades for premium slider look */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

      {/* Sliding Marquee Wrapper */}
      <div className="flex w-[300%] items-center animate-marquee hover:[animation-play-state:paused]">
        {extendedLogos.map((client, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center justify-center min-w-[200px] px-8 transition-all duration-300 group"
          >
            {/* Logo Graphic Simulation */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border border-white/10 group-hover:border-brand-gold/50 flex items-center justify-center bg-brand-bg/50 transition-colors duration-300">
                <svg
                  viewBox="0 0 100 100"
                  className="w-4 h-4 fill-brand-muted group-hover:fill-brand-gold transition-colors duration-300"
                >
                  {client.type === 'auto' && (
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="10" fill="none" />
                  )}
                  {client.type === 'food' && (
                    <path d="M 50 15 L 85 80 L 15 80 Z" />
                  )}
                  {client.type === 'energy' && (
                    <path d="M 30 15 L 70 15 L 50 85 Z" />
                  )}
                  {client.type === 'const' && (
                    <rect x="25" y="25" width="50" height="50" rx="4" />
                  )}
                  {client.type === 'eng' && (
                    <path d="M 50 10 L 90 50 L 50 90 L 10 50 Z" />
                  )}
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-sm tracking-[0.15em] text-brand-muted group-hover:text-brand-gold transition-colors duration-300">
                  {client.detail}
                </span>
                <span className="text-[7.5px] uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                  {client.name.includes('Pvt') || client.name.includes('India') ? 'Enterprise Partner' : 'Client Profile'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
