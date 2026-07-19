import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import BrandLogo from './BrandLogo'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Projects', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Track page scroll to compress navbar height and adjust transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Framer Motion Animation Variants for sequential staging
  const navContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 1.6
      }
    }
  }

  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'py-3 bg-[#0B0B0B]/80 backdrop-blur-md border-brand-gold/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'py-5 bg-[#0B0B0B]/75 backdrop-blur-sm border-brand-gold/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* BRAND IDENTITY - LOGO & TYPOGRAPHY */}
        {/* 0.3s - 1.2s entrance scale/fade + 1.2s-1.6s shine sweep */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <Link to="/" className="flex items-center gap-3 focus:outline-none">
            <BrandLogo 
              mode="logo" 
              size={isScrolled ? 50 : 58} 
              className="shrink-0 transition-all duration-300" 
            />
            
            {/* Elegant Luxury Typography */}
            <div className="flex flex-col">
              <span className="font-heading font-black text-base md:text-lg tracking-[0.25em] text-white group-hover:text-brand-gold transition-colors duration-300">
                S R <span className="text-brand-gold">INDUSTRIES</span>
              </span>
              <span className="text-[8px] tracking-[0.45em] text-brand-muted uppercase font-light -mt-1">
                Engineering Excellence
              </span>
            </div>
          </Link>
        </motion.div>

        {/* DESKTOP STAGGERED NAVIGATION LINKS */}
        <motion.nav 
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <motion.div key={link.path} variants={navLinkVariants}>
                <Link
                  to={link.path}
                  className="relative px-4 py-2 text-xs uppercase tracking-widest font-heading font-bold text-brand-muted hover:text-white transition-colors duration-300"
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-brand-surface border border-brand-gold/10 rounded-md -z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </motion.nav>

        {/* CALL TO ACTION BUTTON (Fades in at the end of the sequence) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.4 }}
          className="hidden md:block"
        >
          <Link
            to="/contact"
            className="relative inline-flex items-center justify-center px-6 py-2.5 text-[10px] font-heading font-bold uppercase tracking-widest text-brand-bg bg-brand-gold rounded-md group overflow-hidden transition-all duration-300 active:scale-95 shadow-[0_4px_15px_rgba(212,175,55,0.15)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] border border-brand-gold/20"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-10" />
            <span className="z-10 group-hover:text-brand-bg transition-colors duration-300">Request Quote</span>
          </Link>
        </motion.div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2.5 rounded-lg border border-white/10 hover:border-brand-gold/30 hover:bg-brand-surface/40 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-[#0B0B0B]/95 backdrop-blur-lg border-b border-brand-gold/15 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-lg text-xs uppercase tracking-widest font-heading font-bold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-brand-surface text-brand-gold border-l-2 border-brand-gold'
                        : 'text-brand-muted hover:bg-brand-surface hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />}
                  </Link>
                )
              })}
            </div>
            
            <Link
              to="/contact"
              className="w-full text-center py-4 bg-brand-gold text-brand-bg text-xs font-heading font-bold uppercase tracking-widest rounded-lg shadow-lg hover:bg-white transition-colors duration-300"
            >
              Request Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
