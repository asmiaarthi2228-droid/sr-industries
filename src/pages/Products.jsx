import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Scale, Layers, Settings, Wrench } from 'lucide-react'

const productsData = [
  {
    title: 'Platform Trolleys',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    description: 'Heavy duty platform trolleys designed for bulk material dispatch. Engineered with high-strength MS chassis and silent polyurethane wheels.',
    specs: {
      load: '500 kg – 2 Tons',
      material: 'Mild Steel IS 2062 Grade',
      wheels: 'PU Castors with Double Bearings',
      finish: 'Industrial Epoxy Powder Coating'
    }
  },
  {
    title: 'Cage Trolleys',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    description: 'Secured cage structures with customizable mesh density, drop-down doors, and locking latches to prevent material loss during transport.',
    specs: {
      load: '300 kg – 1 Ton',
      material: 'MS Mesh + Angle Framework',
      wheels: 'Nylon / Cast Iron Wheels',
      finish: 'Anti-Rust Oxide Primer + Spray Finish'
    }
  },
  {
    title: 'Material Handling Trolleys',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    description: 'Multi-deck, hand-push utility trolleys optimized for component sorting on automobile assembly lines or shipping bays.',
    specs: {
      load: '200 kg – 800 kg',
      material: 'SS 304 / MS Composite',
      wheels: 'Non-marking Rubber Swivel Castors',
      finish: 'Electropolished SS / Painted MS'
    }
  },
  {
    title: 'Storage Racks',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    description: 'High-density industrial storage racks, pallet racking columns, and modular shelving units customized for heavy industrial storage.',
    specs: {
      load: '500 kg – 3 Tons / Level',
      material: 'Cold Rolled Steel Sheets',
      wheels: 'Stationary Bolt-Down Footpads',
      finish: 'Electrostatic Powder Spray Coat'
    }
  },
  {
    title: 'Pallets',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    description: 'All-metal heavy duty pallets. Durable alternative to wooden pallets. Fireproof, termite-proof, and optimized for heavy forklifts.',
    specs: {
      load: '1 Ton – 4 Tons Static',
      material: 'Reinforced Corrugated MS Sheet',
      wheels: 'Forklift Entry 2-Way / 4-Way',
      finish: 'Hot Dip Galvanized / Painted'
    }
  },
  {
    title: 'Work Tables',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    description: 'Heavy duty workshop benches, packing tables, and testing tables equipped with drawers, component bin boards, and leveling footpads.',
    specs: {
      load: '250 kg – 1.5 Tons',
      material: 'SS 304 Food Grade / MS Top Plate',
      wheels: 'Adjustable Heavy leveling Jacks',
      finish: 'Brushed Satin SS / Painted MS'
    }
  },
  {
    title: 'Custom Fabrication Products',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Tailor-made industrial containers, tooling chests, control panel cabinets, and structural brackets engineered from specialized design blueprints.',
    specs: {
      load: 'To Custom Blueprint Specifications',
      material: 'MS, SS 304/316, or Aluminum Alloys',
      wheels: 'Suspended Castors or Skid Plates',
      finish: 'Custom Finish to Client Mandate'
    }
  }
]

export default function Products() {
  return (
    <div className="bg-[#0B0B0B] text-white flex flex-col gap-24 py-16">
      
      {/* Header */}
      <section className="relative px-6 md:px-12 text-center max-w-5xl mx-auto pt-8">
        <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
        <span className="text-xs uppercase tracking-widest text-brand-gold font-heading font-bold">Catalog Showcase</span>
        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-wide text-white mt-4">
          Industrial Products
        </h1>
        <p className="text-base md:text-xl text-brand-muted mt-6 max-w-3xl mx-auto font-light leading-relaxed">
          Explore S R Industries' range of structural components, heavy duty trolleys, storage pallets, and packing benches designed for continuous plant operations.
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-16">
        <div className="flex flex-col gap-16">
          {productsData.map((prod, idx) => {
            const isEven = idx % 2 === 0
            return (
              <div
                key={idx}
                className={`glass-panel rounded-2xl overflow-hidden border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 hover:border-brand-gold/25 transition-all duration-300 relative`}
              >
                <div className="absolute inset-0 technical-grid opacity-5 pointer-events-none" />
                
                {/* Product Image Section */}
                <div className={`lg:col-span-5 h-[280px] lg:h-auto rounded-xl overflow-hidden bg-brand-surface relative ${!isEven && 'lg:order-2'}`}>
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 to-transparent" />
                </div>

                {/* Specs & Description Section */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-6 relative z-10">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wider">
                      {prod.title}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed font-light">
                      {prod.description}
                    </p>

                    {/* Specification Table */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center gap-3">
                        <Scale className="w-4 h-4 text-brand-gold shrink-0" />
                        <div className="text-xs">
                          <span className="text-brand-muted block font-light">Loading Capacity</span>
                          <span className="font-bold text-white font-mono">{prod.specs.load}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4 text-brand-gold shrink-0" />
                        <div className="text-xs">
                          <span className="text-brand-muted block font-light">Steel Alloys</span>
                          <span className="font-bold text-white font-mono">{prod.specs.material}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Settings className="w-4 h-4 text-brand-gold shrink-0" />
                        <div className="text-xs">
                          <span className="text-brand-muted block font-light">Wheel Base Configuration</span>
                          <span className="font-bold text-white font-mono">{prod.specs.wheels}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Wrench className="w-4 h-4 text-brand-gold shrink-0" />
                        <div className="text-xs">
                          <span className="text-brand-muted block font-light">Surface Coating Finish</span>
                          <span className="font-bold text-white font-mono">{prod.specs.finish}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quote Trigger */}
                  <div className="pt-4 border-t border-white/5 flex justify-end">
                    <Link
                      to="/contact"
                      state={{ product: prod.title }}
                      className="px-6 py-3 bg-brand-gold hover:bg-white text-brand-bg text-xs font-heading font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 transition-all"
                    >
                      <span>Request Production Quote</span>
                      <ArrowUpRight className="w-4 h-4 text-brand-bg" />
                    </Link>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
