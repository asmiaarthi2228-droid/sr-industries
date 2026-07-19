import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectLightbox({ isOpen, project, initialImageIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex)
  const [isZoomed, setIsZoomed] = useState(false)

  // Reset to initial index when project or lightbox changes
  useEffect(() => {
    setCurrentIndex(initialImageIndex)
    setIsZoomed(false)
  }, [project, initialImageIndex, isOpen])

  // Handle keys (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen || !project) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      
      const imagesCount = project.images?.length || 0
      if (imagesCount <= 1) return

      if (e.key === 'ArrowLeft') {
        setIsZoomed(false)
        setCurrentIndex((prev) => (prev === 0 ? imagesCount - 1 : prev - 1))
      }
      if (e.key === 'ArrowRight') {
        setIsZoomed(false)
        setCurrentIndex((prev) => (prev === imagesCount - 1 ? 0 : prev + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, project, onClose])

  if (!isOpen || !project) return null

  const images = project.images || []
  const currentImage = images[currentIndex]
  const hasMultipleImages = images.length > 1

  const handlePrev = (e) => {
    e?.stopPropagation()
    setIsZoomed(false)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e?.stopPropagation()
    setIsZoomed(false)
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Handle mobile swipe drag
  const handleDragEnd = (event, info) => {
    if (!hasMultipleImages) return
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      handlePrev()
    } else if (info.offset.x < -swipeThreshold) {
      handleNext()
    }
  }

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-md select-none"
        onClick={onClose}
      >
        {/* Decorative Grid Lines to match S R Industries theme */}
        <div className="absolute inset-0 technical-grid opacity-5 pointer-events-none" />

        {/* Top Header bar with category, title and controls */}
        <div 
          className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-1 pr-6">
            <span className="text-[10px] tracking-[0.25em] font-mono text-brand-gold uppercase font-semibold">
              {project.category} &bull; {project.location}
            </span>
            <h4 className="text-sm md:text-lg font-heading font-bold text-white uppercase tracking-wider">
              {project.title}
            </h4>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Zoom Action Toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2.5 rounded-lg bg-brand-surface border border-white/5 text-brand-muted hover:text-brand-gold hover:border-brand-gold/30 transition-all active:scale-95"
              title="Toggle Zoom"
              aria-label="Toggle Zoom"
            >
              {isZoomed ? <ZoomOut className="w-4.5 h-4.5" /> : <ZoomIn className="w-4.5 h-4.5" />}
            </button>

            {/* Close Lightbox */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-lg bg-brand-surface border border-white/5 text-brand-muted hover:text-white hover:border-white/20 transition-all active:scale-95"
              aria-label="Close Gallery"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Previous Image Control */}
        {hasMultipleImages && (
          <button
            onClick={handlePrev}
            className="absolute left-6 z-20 p-4 rounded-xl bg-brand-surface/40 border border-white/5 text-white/70 hover:text-brand-gold hover:border-brand-gold/30 transition-all active:scale-95 hidden md:block"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Main Content Area */}
        <div 
          className="relative max-w-5xl w-full max-h-[75vh] px-4 md:px-16 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            drag={hasMultipleImages && !isZoomed ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: isZoomed ? 1.4 : 1,
                cursor: isZoomed ? 'zoom-out' : 'zoom-in'
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              src={currentImage.startsWith('/') ? currentImage : currentImage}
              alt={`${project.title} - view ${currentIndex + 1}`}
              className="max-w-full max-h-[60vh] object-contain rounded-xl border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.8)] transition-shadow duration-300"
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </motion.div>
        </div>

        {/* Next Image Control */}
        {hasMultipleImages && (
          <button
            onClick={handleNext}
            className="absolute right-6 z-20 p-4 rounded-xl bg-brand-surface/40 border border-white/5 text-white/70 hover:text-brand-gold hover:border-brand-gold/30 transition-all active:scale-95 hidden md:block"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Bottom Details panel */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center gap-4 text-center z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Indicators (Pills) */}
          {hasMultipleImages && (
            <div className="flex gap-2 mb-1">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsZoomed(false)
                    setCurrentIndex(idx)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-6 bg-brand-gold' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Location info */}
          <div className="flex items-center gap-1.5 text-xs text-brand-muted font-light justify-center">
            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
            <span>{project.location}</span>
            <span className="mx-2 text-white/10">|</span>
            <span className="font-mono text-brand-gold font-medium">{currentIndex + 1} / {images.length}</span>
          </div>

          <p className="text-xs md:text-sm text-brand-muted max-w-2xl font-light leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </AnimatePresence>
  )
}
