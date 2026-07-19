import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Truck, Layers, Grid, Hammer, ShieldCheck, Warehouse, 
  Settings, Lock, HelpCircle, ArrowUpRight, AlignCenter, LayoutGrid 
} from 'lucide-react'

const servicesData = [
  {
    title: 'Industrial Trolley Fabrication',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    description: 'Custom material handling trolleys, cage trolleys, and platform units. Built with heavy-duty castors and structural reinforcements for warehouse dispatch grids.',
  },
  {
    title: 'Roofing Sheet Fabrication',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    description: 'High-tensile profile sheets, industrial gutters, and heat insulation sheets tailored for chemical plants, warehouses, and commercial spaces.',
  },
  {
    title: 'Heavy Structural Fabrication',
    icon: Grid,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    description: 'Industrial columns, heavy truss assemblies, utility gantries, and bridge girders designed to comply with rigorous structural load ratings.',
  },
  {
    title: 'MS Fabrication',
    icon: Hammer,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    description: 'Mild steel assemblies, including frames, brackets, partition works, and mechanical mounting bases with anti-rust chemical primes.',
  },
  {
    title: 'SS Fabrication',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80',
    description: 'Precision Stainless Steel (Grades 304, 316) fabrication for food industries, medical labs, and corrosive chemical environment layouts.',
  },
  {
    title: 'Industrial Shed Fabrication',
    icon: Warehouse,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    description: 'Turnkey factory shed setups, warehouse expansions, structural roofing trusses, and perimeter walls designed for high wind load tolerances.',
  },
  {
    title: 'Machine Frames',
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    description: 'Heavy machinery chassis, motor mountings, assembly line frames, and hydraulic cylinder support blocks with precise mechanical alignment.',
  },
  {
    title: 'Industrial Gates',
    icon: Lock,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Motorized heavy slide gates, security barriers, perimeter gates, and swing barriers built with reinforced MS beams for high-security sites.',
  },
  {
    title: 'Industrial Grills',
    icon: LayoutGrid,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    description: 'Heavy protection meshes, windows panels, partition barriers, and ventilations louvers built for high security operations.',
  },
  {
    title: 'Staircases',
    icon: AlignCenter,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    description: 'Fire escape staircases, spiral stair structures, safety cat-ladders, and handrails constructed to meet corporate safety regulations.',
  },
  {
    title: 'Mezzanine Floors',
    icon: Grid,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    description: 'Steel platform flooring, structural columns, and modular floor expansion blocks. Safely doubles warehouse floor usage layouts.',
  },
  {
    title: 'Custom Fabrication',
    icon: HelpCircle,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Special purpose fabrications tailored to unique blueprint designs, including prototype parts and localized assembly brackets.',
  },
]

export default function Services() {
  return (
    <div className="bg-[#0B0B0B] text-white flex flex-col gap-24 py-16">
      
      {/* Header */}
      <section className="relative px-6 md:px-12 text-center max-w-5xl mx-auto pt-8">
        <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
        <span className="text-xs uppercase tracking-widest text-brand-gold font-heading font-bold">Capabilities Matrix</span>
        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-wide text-white mt-4">
          Fabrication Services
        </h1>
        <p className="text-base md:text-xl text-brand-muted mt-6 max-w-3xl mx-auto font-light leading-relaxed">
          From heavy civil structures to high-precision stainless machine components, S R Industries offers a comprehensive range of fabrication capabilities.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((svc, idx) => {
            const Icon = svc.icon
            return (
              <div
                key={idx}
                className="glass-panel group rounded-xl overflow-hidden border border-white/5 flex flex-col justify-between hover:border-brand-gold/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)] transition-all duration-500"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-surface">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent" />
                    
                    {/* Floating Service Icon */}
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-gold" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex flex-col gap-3">
                    <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider group-hover:text-brand-gold transition-colors duration-300">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed font-light">
                      {svc.description}
                    </p>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    to="/contact"
                    state={{ service: svc.title }}
                    className="w-full py-3 border border-white/10 group-hover:border-brand-gold/40 group-hover:bg-brand-gold group-hover:text-brand-bg rounded-lg text-[10px] font-heading font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <span>Request Quotation</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-brand-bg transition-colors" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
