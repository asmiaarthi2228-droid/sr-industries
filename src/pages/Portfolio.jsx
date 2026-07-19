import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { MapPin, Eye, Filter, ArrowUpRight, Layers } from 'lucide-react'
import ProjectLightbox from '../components/ProjectLightbox'
import axios from 'axios'
import { normalizeImage } from '../utils/imageHelper'

// Swiper.js React Integrations
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Import local project images
import staircase1 from '../assets/projects/project1/stairs-1.jpg';
import staircase2 from '../assets/projects/project1/stairs-2.jpg';
import birdnet1 from '../assets/projects/project2/birdnet-1.jpg';
import barbed1 from '../assets/projects/project3/barbed-1.jpg';
import partition1 from '../assets/projects/project4/partition-1.jpg';
import handrails1 from '../assets/projects/project6/handrails-1.jpg';
import roofing1 from '../assets/projects/project7/roofing-1.jpg';


// Fallback static data in case backend API is unreachable
const fallbackProjects = [
  {
    _id: 'fallback-p1',
    title: 'External MS Staircase with Handrails',
    category: 'Structural Fabrication',
    location: 'Vagai Towers, Ambattur',
    description: 'Fabricated and installed a heavy-duty four-floor external MS staircase complete with precision-engineered safety handrails. Built for durability, structural stability, and safe emergency access while maintaining a clean industrial finish.',
    features: ['Four Floor Staircase', 'MS Fabrication', 'Handrails', 'Heavy Duty Structure', 'Precision Welding'],
    images: [staircase1, staircase2],
    featured: true,
    displayOrder: 1
  },
  {
    _id: 'fallback-p2',
    title: 'Bird Net Protection System',
    category: 'Safety Installation',
    location: 'Alsa Garden',
    description: 'Installed a complete bird net protection system around the spiral staircase to prevent bird intrusion while maintaining ventilation, visibility, and architectural appearance.',
    features: ['Bird Net Installation', 'UV Resistant Net', 'Safety Solution', 'Long Life'],
    images: [birdnet1],
    featured: true,
    displayOrder: 2
  },
  {
    _id: 'fallback-p3',
    title: 'GI Barbed Wire Fencing',
    category: 'Security Fencing',
    location: 'Padappai',
    description: 'Installed heavy-duty galvanized barbed wire fencing to enhance perimeter security using corrosion-resistant materials designed for industrial and commercial environments.',
    features: ['GI Barbed Wire', 'Security Fencing', 'Corrosion Resistant', 'Industrial Installation'],
    images: [barbed1],
    featured: true,
    displayOrder: 3
  },
  {
    _id: 'fallback-p4',
    title: 'Aluminium Room Partition',
    category: 'Aluminium Fabrication',
    location: 'Nabati Warehouse',
    description: 'Designed and installed modular aluminium room partitions inside the warehouse, creating functional office spaces with a modern appearance and durable construction.',
    features: ['Aluminium Fabrication', 'Office Partition', 'Modular Design', 'Warehouse Installation'],
    images: [partition1],
    featured: false,
    displayOrder: 4
  },
  {
    _id: 'fallback-p5',
    title: 'MS Staircase Handrails',
    category: 'MS Fabrication',
    location: 'Vallam',
    description: 'Fabricated and installed premium MS staircase handrails designed for maximum safety, structural strength, and a clean architectural appearance.',
    features: ['Staircase Handrails', 'MS Fabrication', 'Precision Welding', 'Durable Finish'],
    images: [handrails1],
    featured: false,
    displayOrder: 5
  },
  {
    _id: 'fallback-p6',
    title: 'MS Handrails with Roofing Sheet Enclosure',
    category: 'MS Fabrication',
    location: 'New Perungalathur',
    description: 'Designed and fabricated MS handrails along with plain roofing sheet side enclosures to provide improved safety, weather protection, and an aesthetically clean finish using precision fabrication techniques.',
    features: ['MS Handrails', 'Roofing Sheet Enclosure', 'Weather Protection', 'Heavy Duty Fabrication'],
    images: [roofing1],
    featured: false,
    displayOrder: 6
  }
]

// Animated Counter Sub-Component
function CounterItem({ value, label, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const isNumeric = !isNaN(parseInt(value, 10))

  useEffect(() => {
    if (isInView && isNumeric) {
      let start = 0
      const end = parseInt(value, 10)
      const duration = 1.8 // total duration in seconds
      const totalMiliseconds = duration * 1000
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 12)

      const timer = setInterval(() => {
        start += Math.ceil(end / (totalMiliseconds / incrementTime))
        if (start >= end) {
          clearInterval(timer)
          setCount(end)
        } else {
          setCount(start)
        }
      }, incrementTime)

      return () => clearInterval(timer)
    }
  }, [isInView, value, isNumeric])

  return (
    <div
      ref={ref}
      className="glass-panel rounded-xl p-8 border border-white/5 hover:border-brand-gold/20 hover:shadow-[0_8px_30px_rgba(212,175,55,0.05)] transition-all duration-500 flex flex-col items-center text-center justify-center min-h-[160px] relative overflow-hidden group"
    >
      {/* Decorative background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <span className="text-3xl md:text-5xl font-heading font-black text-brand-gold tracking-tight mb-2">
        {isNumeric ? `${prefix}${count}${suffix}` : value}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-brand-muted font-heading font-semibold group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </div>
  )
}

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')

  // Lightbox control state
  const [selectedProject, setSelectedProject] = useState(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

  const filterCategories = [
    'All',
    'Structural Fabrication',
    'MS Fabrication',
    'Aluminium Fabrication',
    'Security',
    'Safety Installation'
  ]

  // Fetch projects on load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects')
        const json = response.data
        if (json.success && json.data && json.data.length > 0) {
          const normalized = json.data.map((proj) => ({
            ...proj,
            images: Array.isArray(proj.images) ? proj.images.map(normalizeImage) : []
          }))
          setProjects(normalized)
        } else {
          setProjects(fallbackProjects)
        }
      } catch (err) {
        setProjects(fallbackProjects)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  // Filter logic
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true

    // Safety check if category is empty
    const pCat = project.category || ''

    // Flexible mapping for security filters
    if (activeFilter === 'Security') {
      return pCat.toLowerCase().includes('security') || pCat.toLowerCase().includes('fence')
    }

    return pCat.toLowerCase() === activeFilter.toLowerCase()
  })

  // Open Lightbox gallery
  const openGallery = (project, imgIdx = 0) => {
    setSelectedProject(project)
    setLightboxImageIndex(imgIdx)
    setLightboxOpen(true)
  }

  // Pre-filtering check for UI
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <div className="bg-[#0B0B0B] text-white flex flex-col gap-12 md:gap-24 py-16">

      {/* Decorative Technical grid backgrounds */}
      <div className="fixed inset-0 technical-grid opacity-[0.03] pointer-events-none z-0" />
      <div className="fixed inset-0 metal-dot-grid opacity-[0.02] pointer-events-none z-0" />

      {/* 1. SECTION HEADER */}
      <section className="relative px-6 md:px-12 text-center max-w-5xl mx-auto pt-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-brand-gold font-heading font-black mb-3 bg-brand-gold/10 px-4 py-1.5 rounded-full border border-brand-gold/20">
            Precision Portfolios
          </span>
          <h1 className="text-4xl md:text-7xl font-heading font-black uppercase tracking-wide text-white mt-2">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold">Projects</span>
          </h1>
          <div className="w-16 h-[2px] bg-brand-gold mt-6 mb-8" />
          <p className="text-sm md:text-lg text-brand-muted max-w-3xl mx-auto font-light leading-relaxed">
            Delivering precision fabrication solutions across industrial, commercial, and residential sectors with unmatched quality, engineering excellence, and customer satisfaction.
          </p>
        </motion.div>
      </section>

      {/* 2. ANIMATED COUNTERS SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <CounterItem value="500" label="Projects Completed" suffix="+" />
          <CounterItem value="100" label="Client Satisfaction" suffix="%" />
          <CounterItem value="20" label="Years of Experience" suffix="+" />
          <CounterItem value="Pan India" label="Service Coverage" />
        </div>
      </section>

      {/* 3. FILTERS BAR */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center justify-center gap-4 z-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-heading font-bold text-brand-muted shrink-0">
          <Filter className="w-4 h-4 text-brand-gold" />
          <span>Filters:</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-5 py-2.5 rounded-lg text-[10px] font-heading font-bold uppercase tracking-wider transition-all duration-300 ${activeFilter === cat
                ? 'text-brand-bg bg-brand-gold shadow-[0_4px_20px_rgba(212,175,55,0.25)]'
                : 'bg-brand-surface text-brand-muted border border-white/5 hover:border-brand-gold/30 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4. PROJECT GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-16 z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
            <span className="text-xs uppercase tracking-widest text-brand-muted font-mono animate-pulse">Loading Projects logs...</span>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const imagesCount = project.images?.length || 0
                return (
                  <motion.div
                    key={project._id || idx}
                    variants={cardVariants}
                    layout
                    className="relative p-[1px] rounded-xl overflow-hidden group hover:shadow-[0_12px_40px_rgba(212,175,55,0.08)] transition-all duration-500 bg-white/5 border border-white/5"
                  >
                    {/* Glowing gold border on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent group-hover:from-brand-gold/30 group-hover:via-brand-bronze/40 group-hover:to-brand-gold/30 transition-all duration-700 opacity-0 group-hover:opacity-100 pointer-events-none" />

                    {/* Inner Content Surface */}
                    <div className="relative bg-brand-surface rounded-xl overflow-hidden h-full flex flex-col justify-between z-10">

                      {/* Top Media Gallery (Swiper or Static) */}
                      <div className="aspect-[4/3] w-full overflow-hidden relative bg-black/40 group/img">
                        {imagesCount > 1 ? (
                          <div className="w-full h-full cursor-pointer relative z-0">
                            <Swiper
                              modules={[Autoplay, Pagination]}
                              pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet bg-white/30' }}
                              autoplay={{ delay: 4000, disableOnInteraction: false }}
                              className="w-full h-full"
                            >
                              {project.images.map((img, imgIdx) => (
                                <SwiperSlide
                                  key={imgIdx}
                                  onClick={() => openGallery(project, imgIdx)}
                                >
                                  <img
                                    src={img}
                                    alt={`${project.title} - View ${imgIdx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    loading="lazy"
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                        ) : (
                          <div
                            className="w-full h-full cursor-pointer"
                            onClick={() => openGallery(project, 0)}
                          >
                            <img
                              src={project.images?.[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                          </div>
                        )}

                        {/* View Gallery Overlay Hover Icon */}
                        <div
                          className="absolute inset-0 bg-brand-bg/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10"
                        >
                          <div className="w-10 h-10 rounded-full bg-brand-gold/90 text-brand-bg flex items-center justify-center scale-90 group-hover/img:scale-100 transition-transform duration-300">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Category tag */}
                        <span className="absolute top-4 left-4 z-20 text-[9px] uppercase tracking-widest font-heading font-black text-brand-gold bg-[#0B0B0B]/90 backdrop-blur-sm border border-brand-gold/20 px-3 py-1.5 rounded-md">
                          {project.category}
                        </span>
                      </div>

                      {/* Card Body Information */}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          {/* Location */}
                          <div className="flex items-center gap-1.5 text-[10px] text-brand-muted uppercase font-mono tracking-wider mb-2">
                            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                            <span>{project.location}</span>
                          </div>

                          {/* Title */}
                          <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider mb-3 group-hover:text-brand-gold transition-colors duration-300">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-brand-muted leading-relaxed font-light mb-6 line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        {/* Feature Badges list */}
                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.features?.slice(0, 4).map((feat, featIdx) => (
                              <span
                                key={featIdx}
                                className="text-[9px] font-mono bg-white/5 border border-white/5 text-brand-muted px-2 py-1 rounded"
                              >
                                {feat}
                              </span>
                            ))}
                            {(project.features?.length || 0) > 4 && (
                              <span className="text-[9px] font-mono bg-brand-gold/10 border border-brand-gold/20 text-brand-gold px-2 py-1 rounded">
                                +{(project.features?.length || 0) - 4} More
                              </span>
                            )}
                          </div>

                          {/* View Gallery Link */}
                          <button
                            onClick={() => openGallery(project, 0)}
                            className="w-full py-3 rounded-lg bg-brand-surface border border-white/10 hover:border-brand-gold/40 hover:bg-brand-gold hover:text-brand-bg text-[10px] tracking-widest font-heading font-bold uppercase flex items-center justify-center gap-2 group/btn transition-all duration-300"
                          >
                            <span>View Gallery</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-24 glass-panel rounded-2xl border border-white/5 max-w-lg mx-auto">
            <Layers className="w-12 h-12 text-brand-gold/40 mx-auto mb-4" />
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-white">No projects found</h4>
            <p className="text-xs text-brand-muted mt-2 font-light max-w-xs mx-auto">
              We haven't uploaded any projects under the "{activeFilter}" category yet. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* 5. LIGHTBOX OVERLAY */}
      <ProjectLightbox
        isOpen={lightboxOpen}
        project={selectedProject}
        initialImageIndex={lightboxImageIndex}
        onClose={() => setLightboxOpen(false)}
      />

    </div>
  )
}
