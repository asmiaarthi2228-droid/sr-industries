import React, { useState } from 'react'
import { MapPin, Globe, Compass, Navigation } from 'lucide-react'
import { motion } from 'framer-motion'

const regions = {
  chennai: {
    title: 'Chennai Hub',
    scope: 'Local Core Suburb Operations',
    description: 'Same-day site measurements, rapid prototype fabrication, and local delivery in Sriperumbudur, Oragadam, OMR, and Guindy industrial corridors. Headquartered in Padappai.',
    hubs: ['Padappai (Workshop)', 'Sriperumbudur', 'Oragadam', 'Guindy'],
    coordinates: { cx: '250', cy: '460' }
  },
  tamilnadu: {
    title: 'Tamil Nadu Scope',
    scope: 'State-wide Construction Projects',
    description: 'Full-scale structural framing, heavy mezzanine assemblies, and industrial shed setups for factories in Coimbatore, Trichy, Madurai, and Salem.',
    hubs: ['Chennai HQ', 'Coimbatore', 'Trichy', 'Madurai'],
    coordinates: { cx: '240', cy: '480' }
  },
  southindia: {
    title: 'South India Operations',
    scope: 'Regional Logistics & Supply',
    description: 'Supply of heavy duty platform trolleys, warehouse storage racks, and custom material handling units to Karnataka, Andhra Pradesh, Telangana, and Kerala.',
    hubs: ['Bengaluru Office', 'Hyderabad Depot', 'Kochi Port Circle'],
    coordinates: { cx: '220', cy: '440' }
  },
  panindia: {
    title: 'Pan India Dispatch',
    scope: 'National Shipping & Projects',
    description: 'Bulk production of custom pallets, machine frame bases, and modular structural parts dispatched to manufacturing hubs across India.',
    hubs: ['Gujarat Zone', 'Maharashtra Auto Clusters', 'NCR Logistics Bases'],
    coordinates: { cx: '180', cy: '250' }
  }
}

export default function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState('chennai')

  return (
    <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-12 relative">
      <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

      {/* Region Information - Left Side */}
      <div className="lg:col-span-5 flex flex-col justify-between relative z-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-gold font-heading font-bold flex items-center gap-2">
            <Compass className="w-4 h-4 animate-spin-slow" />
            Geographic Coverage
          </span>
          <h3 className="text-3xl font-heading font-bold text-white tracking-wide mt-2">
            Service Distribution
          </h3>
          <p className="text-sm text-brand-muted mt-4 font-light leading-relaxed">
            Operating from Chennai's primary manufacturing corridor, we supply structural and custom fabrication products locally and nationally.
          </p>

          {/* Region Tabs */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {Object.keys(regions).map((key) => {
              const active = selectedRegion === key
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRegion(key)}
                  className={`px-4 py-3 rounded-lg border text-xs tracking-widest font-heading font-bold uppercase transition-all duration-300 ${
                    active
                      ? 'bg-brand-gold text-brand-bg border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'bg-brand-surface text-brand-muted border-white/5 hover:border-brand-gold/30 hover:text-white'
                  }`}
                >
                  {key === 'tamilnadu' ? 'Tamil Nadu' : key === 'southindia' ? 'South India' : key === 'panindia' ? 'Pan India' : 'Chennai'}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Region Card Details */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-ping" />
            <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
              {regions[selectedRegion].title}
            </h4>
          </div>
          <div className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
            {regions[selectedRegion].scope}
          </div>
          <p className="text-sm text-brand-muted leading-relaxed font-light">
            {regions[selectedRegion].description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {regions[selectedRegion].hubs.map((hub, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-brand-surface rounded text-xs text-white/70 border border-white/5 font-mono">
                {hub}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Styled Interactive SVG Map of India - Right Side */}
      <div className="lg:col-span-7 flex items-center justify-center relative min-h-[400px]">
        {/* Glow backdrop behind map */}
        <div className="absolute w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <svg
          viewBox="0 0 450 550"
          className="w-full max-w-[400px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          {/* Abstract background vector paths indicating boundaries / grid points */}
          <g stroke="rgba(255, 255, 255, 0.05)" fill="none" strokeWidth="1">
            <circle cx="225" cy="275" r="100" strokeDasharray="3 3" />
            <circle cx="225" cy="275" r="200" strokeDasharray="5 5" />
            <line x1="225" y1="20" x2="225" y2="530" />
            <line x1="20" y1="275" x2="430" y2="275" />
          </g>

          {/* India Outline Mock SVG Path (Stylized Technical Design) */}
          <path
            d="M 180 50 L 220 70 L 250 50 L 260 100 L 300 120 L 340 180 L 320 220 L 370 230 L 320 260 L 320 300 L 290 320 L 280 370 L 260 420 L 245 490 L 240 510 L 235 490 L 225 450 L 200 400 L 190 380 L 180 340 L 150 330 L 110 320 L 80 310 L 60 270 L 70 240 L 110 230 L 130 180 L 140 140 L 160 110 L 160 80 Z"
            fill="rgba(20, 20, 20, 0.6)"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
            className="transition-colors duration-500"
          />

          {/* Regional Highlights */}
          {/* Highlight Tamil Nadu/South Area */}
          {(selectedRegion === 'tamilnadu' || selectedRegion === 'southindia' || selectedRegion === 'chennai') && (
            <path
              d="M 245 490 L 240 510 L 235 490 L 225 450 L 200 400 L 245 410 L 255 450 Z"
              fill={selectedRegion === 'chennai' ? 'rgba(214, 175, 55, 0.15)' : 'rgba(214, 175, 55, 0.25)'}
              stroke="rgba(214, 175, 55, 0.4)"
              strokeWidth="1.5"
            />
          )}

          {/* Highlight South India Zone */}
          {selectedRegion === 'southindia' && (
            <path
              d="M 260 420 L 245 490 L 240 510 L 235 490 L 225 450 L 200 400 L 190 380 L 180 340 L 250 350 Z"
              fill="rgba(214, 175, 55, 0.15)"
              stroke="rgba(214, 175, 55, 0.3)"
              strokeWidth="1.5"
            />
          )}

          {/* Highlight Pan India Node Points with glowing connecting vectors */}
          {selectedRegion === 'panindia' && (
            <g stroke="rgba(214, 175, 55, 0.2)" strokeWidth="1.5" fill="none">
              <line x1="250" y1="460" x2="180" y2="250" strokeDasharray="4 4" />
              <line x1="250" y1="460" x2="280" y2="370" strokeDasharray="4 4" />
              <line x1="250" y1="460" x2="140" y2="140" strokeDasharray="4 4" />
            </g>
          )}

          {/* Glowing node for Chennai HQ */}
          <g>
            <circle cx="250" cy="460" r="12" fill="rgba(214, 175, 55, 0.2)" />
            <circle cx="250" cy="460" r="6" fill="#D4AF37" className="animate-pulse" />
            <circle cx="250" cy="460" r="1.5" fill="#FFFFFF" />
          </g>

          {/* Region indicator circles with pulses */}
          {selectedRegion === 'chennai' && (
            <circle cx="250" cy="460" r="18" fill="none" stroke="#D4AF37" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '250px 460px' }} />
          )}

          {selectedRegion === 'tamilnadu' && (
            <>
              <circle cx="240" cy="480" r="14" fill="rgba(214, 175, 55, 0.3)" />
              <circle cx="240" cy="480" r="4" fill="#D4AF37" />
            </>
          )}

          {selectedRegion === 'southindia' && (
            <>
              <circle cx="220" cy="440" r="14" fill="rgba(214, 175, 55, 0.3)" />
              <circle cx="220" cy="440" r="4" fill="#D4AF37" />
            </>
          )}

          {selectedRegion === 'panindia' && (
            <>
              <circle cx="180" cy="250" r="14" fill="rgba(214, 175, 55, 0.3)" />
              <circle cx="180" cy="250" r="4" fill="#D4AF37" />
            </>
          )}

          {/* Chennai HQ Tooltip Flag */}
          <g transform="translate(260, 435)">
            <rect width="85" height="22" rx="4" fill="#141414" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <text x="8" y="14" fill="#FFFFFF" fontSize="9" fontFamily="Space Grotesk" fontWeight="bold" letterSpacing="1">S R IND HQ</text>
          </g>
        </svg>
      </div>
    </div>
  )
}
