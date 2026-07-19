import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    q: 'What fabrication services does S R Industries specialize in?',
    a: 'We specialize in industrial heavy structural fabrication, MS & SS custom metalwork, heavy duty platform and cage trolleys, industrial warehouse sheds, roofing sheet installation, machine frame chassis, mezzanine flooring networks, and custom engineering assemblies.'
  },
  {
    q: 'Where is your factory located, and do you deliver PAN India?',
    a: 'Our modern workshop is located at Padappai (Manimangalam), Chennai, Tamil Nadu. While we perform site erections across Chennai and South India, we design and ship custom platform trolleys, steel storage pallets, and machinery frames PAN India.'
  },
  {
    q: 'Is S R Industries a registered corporate entity?',
    a: 'Yes, S R Industries was established in 2019 by G. Rengaraj. We are fully GST and MSME registered. We provide complete commercial invoice structures and follow standard corporate procurement cycles.'
  },
  {
    q: 'Can we submit custom CAD models or structural drawings?',
    a: 'Absolutely. We prefer engineering drawings (PDF, DWG, DXF, PNG, or JPG specifications) to ensure precision workmanship. You can submit these files directly through our Contact Desk upload form.'
  },
  {
    q: 'What quality inspection and safety standards do you follow?',
    a: 'Every project goes through rigorous inspection (weld testing, load rating, alignment accuracy, corrosion treatment checks) before dispatch. Our on-site installation crew is equipped with certified safety gear (PPE) and works under certified supervision.'
  },
  {
    q: 'What is the typical lead time for custom industrial fabrications?',
    a: 'Typical production runs for products like storage racks, table systems, or trolleys take 7 to 15 business days. Heavy civil structural projects (sheds, mezzanine flooring) are scheduled based on site analysis and engineering approvals.'
  }
]

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      {faqs.map((faq, idx) => {
        const isOpen = activeIndex === idx
        return (
          <div
            key={idx}
            className={`rounded-xl border transition-all duration-300 overflow-hidden ${
              isOpen 
                ? 'bg-brand-surface border-brand-gold/30 shadow-[0_4px_20px_rgba(212,175,55,0.05)]' 
                : 'bg-brand-surface/40 border-white/5 hover:border-white/10'
            }`}
          >
            {/* Question Bar */}
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full flex items-center justify-between p-6 text-left select-none focus:outline-none"
            >
              <div className="flex items-start gap-4">
                <HelpCircle className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${isOpen ? 'text-brand-gold' : 'text-brand-muted'}`} />
                <span className="font-heading font-bold text-sm md:text-base tracking-wide text-white">
                  {faq.q}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-brand-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-gold' : ''}`}
              />
            </button>

            {/* Answer Box */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 pl-14 text-sm text-brand-muted leading-relaxed font-light border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
