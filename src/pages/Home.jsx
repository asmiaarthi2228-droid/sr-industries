import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Crosshair, Award, ThumbsUp, Wrench, Settings, ArrowRight, Eye, ShieldAlert, Cpu } from 'lucide-react'
import LogoSlider from '../components/LogoSlider'
import InteractiveMap from '../components/InteractiveMap'
import BrandLogo from '../components/BrandLogo'
import paintingImg from '../assets/painting.jpg'

// Framer Motion presets for clean animations
const revealVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
}

const staggeredContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

// Custom Counter Component for Statistics
function StatCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(target)
    if (start === end) return

    let totalMiliseconds = duration
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end))
    if (incrementTime < 10) incrementTime = 10

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [target, duration])

  return <span>{count}{suffix}</span>
}

export default function Home() {
  return (
    <div className="flex flex-col gap-24 md:gap-32 bg-[#0B0B0B] text-white">
      
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 md:px-12">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-bronze/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surface border border-brand-gold/30 text-xs font-mono tracking-widest text-brand-gold uppercase"
          >
            <Settings className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
            <span>Heavy Industrial Metal Engineering</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[1.05] max-w-5xl"
          >
            PRECISION METAL <br />
            <span className="text-stroke-gold text-brand-gold">FABRICATION</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-brand-muted max-w-2xl font-light leading-relaxed px-4"
          >
            Custom structural fabrication solutions built to exceed international quality metrics. Serving manufacturing, automotive, and logistics hubs since 2019.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link
              to="/services"
              className="px-8 py-4 bg-brand-gold hover:bg-white text-brand-bg font-heading font-bold uppercase tracking-widest text-xs rounded-md transition-all flex items-center gap-2 active:scale-95 shadow-[0_4px_25px_rgba(212,175,55,0.2)]"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-brand-bg" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-white/10 hover:border-brand-gold/50 bg-brand-surface/40 backdrop-blur text-white hover:text-brand-gold font-heading font-bold uppercase tracking-widest text-xs rounded-md transition-all active:scale-95"
            >
              Consult an Engineer
            </Link>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-widest uppercase text-white/30 font-mono">
          <span>Scroll To Explore</span>
          <div className="w-1.5 h-6 rounded-full bg-white/10 relative overflow-hidden">
            <div className="w-full h-2 bg-brand-gold rounded-full absolute top-0 animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. Client Logo Slider Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <span className="text-[10px] uppercase font-mono tracking-widest text-brand-muted">TRUSTED BY MANUFACTURING LEADERS</span>
        </div>
        <LogoSlider />
      </section>

      {/* 3. Core USP Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-heading font-bold">Why S R Industries</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-wide leading-tight uppercase">
              Engineering Trust Through Quality Workmanship
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed font-light mt-2">
              Founded in 2019 by G. Rengaraj, S R Industries has rapidly grown into a prominent name in Chennai's metal fabrication sector by focusing on detail, structural durability, and timeline commitments.
            </p>
            <div className="mt-4">
              <Link to="/about" className="inline-flex items-center gap-2 text-brand-gold hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors">
                <span>Discover our origins</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="glass-panel p-8 rounded-xl border border-white/5 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center">
                <Crosshair className="w-5 h-5 text-brand-gold" />
              </div>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider">Requirements First</h4>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                We sit down with clients to map exact load-bearing, material grades, and specifications before launching welding.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-white/5 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-brand-gold" />
              </div>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider">Precision Workmanship</h4>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Employing skilled tradespeople and utilizing precise alignment rigs to make sure every square edge fits perfectly.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-white/5 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-brand-gold" />
              </div>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider">Superior Quality</h4>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Only using verified grade steel (MS/SS) with industrial anti-corrosion chemical painting and clean welding roots.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-white/5 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-brand-gold" />
              </div>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider">Client Satisfaction</h4>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Creating long term partnerships with Tier-1 automotive and FMCG brands by executing orders with minimal turnaround.
              </p>
            </div>

          </div>

        </div>
      </section>



      {/* 5. Animated Counter Section */}
      <section className="bg-brand-surface/20 border-y border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col gap-2">
            <span className="font-heading text-4xl md:text-5xl font-black text-brand-gold tracking-tight">
              <StatCounter target="2019" duration={1500} />
            </span>
            <span className="text-[10px] tracking-widest text-brand-muted uppercase font-mono">ESTABLISHED YEAR</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-heading text-4xl md:text-5xl font-black text-brand-gold tracking-tight">
              <StatCounter target="100" suffix="%" duration={1800} />
            </span>
            <span className="text-[10px] tracking-widest text-brand-muted uppercase font-mono">QUALITY INSPECTION PASS</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-heading text-4xl md:text-5xl font-black text-brand-gold tracking-tight">
              <StatCounter target="500" suffix="+" duration={1600} />
            </span>
            <span className="text-[10px] tracking-widest text-brand-muted uppercase font-mono">PROJECTS SHIPPED</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-heading text-4xl md:text-5xl font-black text-brand-gold tracking-tight">
              <StatCounter target="100" suffix="%" duration={1900} />
            </span>
            <span className="text-[10px] tracking-widest text-brand-muted uppercase font-mono">SAFETY STANDARD RATING</span>
          </div>
        </div>
      </section>

      {/* 6. Cinematic Workshop Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-heading font-bold">State-of-the-Art facility</span>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-white tracking-wide uppercase">
            Modern Workshop Operations
          </h2>
          <p className="text-sm text-brand-muted max-w-xl font-light leading-relaxed">
            Take a cinematic inside look into our production cells where raw drawings are turned into heavy engineering systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Welding */}
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden group border border-white/5 shadow-xl bg-brand-surface">
            <img
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80"
              alt="Heavy Welding Station"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
              <span className="text-[10px] font-mono text-brand-gold tracking-widest uppercase">PRECISION ARC</span>
              <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">Heavy Welding</h4>
              <p className="text-xs text-brand-muted font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Highly skilled MIG & TIG welding operations verified via penetrant examinations. Durable joints designed for dynamic load bearings.
              </p>
            </div>
          </div>

          {/* Card 2: Painting */}
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden group border border-white/5 shadow-xl bg-brand-surface">
            <img
              src={paintingImg}
              alt="Industrial Painting"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
              <span className="text-[10px] font-mono text-brand-gold tracking-widest uppercase">PROTECTION COAT</span>
              <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">Industrial Painting</h4>
              <p className="text-xs text-brand-muted font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Triple-coat anti-rust primer and epoxy top coating to shield steel structures against extreme humidity and industrial chemical fumes.
              </p>
            </div>
          </div>

          {/* Card 3: Quality Control */}
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden group border border-white/5 shadow-xl bg-brand-surface">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
              alt="Quality Control Station"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
              <span className="text-[10px] font-mono text-brand-gold tracking-widest uppercase">TOLERANCE METRICS</span>
              <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">Quality Inspection</h4>
              <p className="text-xs text-brand-muted font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Pre-dispatch checks validating length tolerances within +/- 1mm, sheet thickness grades, and mechanical structural alignments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Geographic Map Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <InteractiveMap />
      </section>

      {/* 8. Call To Action section */}
      <section className="max-w-5xl mx-auto px-6 pb-24 text-center">
        <div className="glass-panel p-12 md:p-16 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col items-center gap-6">
          <div className="absolute inset-0 technical-grid opacity-15 pointer-events-none" />
          <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mb-2">
            <Cpu className="w-5 h-5 text-brand-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase tracking-wide">
            Ready to Begin Fabrication?
          </h2>
          <p className="text-sm text-brand-muted max-w-xl font-light leading-relaxed">
            Get comprehensive site measurements, materials cost sheets, and design blueprint validation from our engineering leads.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-brand-gold hover:bg-white text-brand-bg font-heading font-bold uppercase tracking-widest text-xs rounded-md transition-colors"
            >
              Submit Project Brief
            </Link>
            <a
              href="https://wa.me/918610235094"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/10 hover:border-brand-gold/50 bg-brand-surface rounded-md text-xs font-heading font-bold uppercase tracking-widest text-white hover:text-brand-gold transition-colors flex items-center justify-center gap-2"
            >
              WhatsApp Engineering
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
