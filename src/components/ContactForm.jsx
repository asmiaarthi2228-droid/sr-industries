import React, { useState, useRef } from 'react'
import { Send, Upload, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'

const services = [
  'Heavy Structural Fabrication',
  'Industrial Trolleys & Pallets',
  'MS & SS Custom Fabrication',
  'Roofing Sheets & Sheds',
  'Machine Frames & Bases',
  'Mezzanine Flooring',
  'Custom Fabrication',
  'Other Engineering Support',
]

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState({ type: null, message: '' }) // { type: 'success' | 'error' | 'loading', message: '' }
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setStatus({ type: 'error', message: 'Attachment file size exceeds 10MB limit.' })
        setFile(null)
      } else {
        setFile(selectedFile)
        setStatus({ type: null, message: '' })
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Frontend validations
    if (!formData.name || !formData.phone || !formData.email || !formData.service || !formData.message) {
      setStatus({ type: 'error', message: 'Please complete all required fields.' })
      return
    }

    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      setStatus({ type: 'error', message: 'Please enter a valid 10-digit Indian mobile number.' })
      return
    }

    setStatus({ type: 'loading', message: 'Submitting engineering request...' })

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('phone', formData.phone)
      data.append('email', formData.email)
      data.append('service', formData.service)
      data.append('message', formData.message)
      if (file) {
        data.append('attachment', file)
      }

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        body: data,
      })

      // Robust check: verify the response content-type is json before parsing to prevent HTML parsing crashes
      const contentType = response.headers.get('content-type')
      let result = {}
      if (contentType && contentType.includes('application/json')) {
        result = await response.json()
      } else {
        throw new Error('Server returned non-JSON response.')
      }

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Inquiry submitted successfully. Our engineering desk will revert within 24 hours. A verification email has been sent.',
        })
        // Reset form
        setFormData({ name: '', phone: '', email: '', service: '', message: '' })
        setFile(null)
      } else {
        setStatus({
          type: 'error',
          message: result.errors ? result.errors.map(err => err.msg).join(', ') : result.message || 'Submission failed.',
        })
      }
    } catch (err) {
      console.error('Contact Form Submit Error:', err)
      setStatus({
        type: 'error',
        message: 'Could not connect to the backend API. Please verify the server is active.',
      })
    }
  }

  if (status.type === 'success') {
    return (
      <div className="glass-panel p-8 md:p-12 rounded-2xl border border-brand-gold/30 text-center flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
        <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-brand-gold" />
        </div>
        <div className="relative z-10">
          <h3 className="font-heading font-bold text-2xl text-white tracking-wider uppercase">Submission Confirmed</h3>
          <p className="text-sm text-brand-muted mt-4 leading-relaxed font-light">
            {status.message}
          </p>
        </div>
        <button
          onClick={() => setStatus({ type: null, message: '' })}
          className="mt-4 px-6 py-3 border border-white/10 hover:border-brand-gold/30 rounded-lg text-xs font-heading font-bold tracking-widest uppercase transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-2xl border border-white/5 flex flex-col gap-6 relative shadow-2xl">
      <div className="absolute inset-0 technical-grid opacity-15 pointer-events-none" />

      <h3 className="font-heading font-bold text-xl text-white tracking-widest uppercase border-b border-white/5 pb-4">
        Engineering Inquiry Form
      </h3>

      {status.type === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-950/40 border border-red-500/20 rounded-lg text-red-400 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <p className="leading-relaxed font-light">{status.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs uppercase font-heading font-bold tracking-widest text-brand-muted">
            Full Name <span className="text-brand-gold">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            disabled={status.type === 'loading'}
            placeholder="e.g. G. Rengaraj"
            className="w-full bg-brand-bg border border-white/10 focus:border-brand-gold rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors"
          />
        </div>

        {/* Telephone Mobile */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xs uppercase font-heading font-bold tracking-widest text-brand-muted">
            Mobile Number <span className="text-brand-gold">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleInputChange}
            disabled={status.type === 'loading'}
            placeholder="10-digit number"
            className="w-full bg-brand-bg border border-white/10 focus:border-brand-gold rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Corporate Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs uppercase font-heading font-bold tracking-widest text-brand-muted">
            Email Address <span className="text-brand-gold">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            disabled={status.type === 'loading'}
            placeholder="e.g. rengraj19@gmail.com"
            className="w-full bg-brand-bg border border-white/10 focus:border-brand-gold rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors"
          />
        </div>

        {/* Required Service Dropdown */}
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className="text-xs uppercase font-heading font-bold tracking-widest text-brand-muted">
            Fabrication Service <span className="text-brand-gold">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleInputChange}
            disabled={status.type === 'loading'}
            className="w-full bg-brand-bg border border-white/10 focus:border-brand-gold rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled className="text-white/20">Select Service Stream</option>
            {services.map((svc) => (
              <option key={svc} value={svc} className="bg-brand-surface text-white">{svc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message Text area */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs uppercase font-heading font-bold tracking-widest text-brand-muted">
          Project Requirements & Scope <span className="text-brand-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          value={formData.message}
          onChange={handleInputChange}
          disabled={status.type === 'loading'}
          placeholder="Brief details about dimensions, load limits, materials (MS/SS), quantity, and timelines..."
          className="w-full bg-brand-bg border border-white/10 focus:border-brand-gold rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none transition-colors"
        />
      </div>

      {/* File Upload drag-and-drop simulated block */}
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase font-heading font-bold tracking-widest text-brand-muted">
          Attach Design blueprints / drawings <span className="text-white/25">(Optional)</span>
        </span>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.dxf,.dwg"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onClick={status.type !== 'loading' ? triggerFileInput : undefined}
          className={`border-2 border-dashed border-white/10 hover:border-brand-gold/40 rounded-xl p-6 text-center cursor-pointer transition-colors bg-brand-bg/30 ${
            file ? 'bg-brand-gold/5 border-brand-gold/30' : ''
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className={`w-6 h-6 ${file ? 'text-brand-gold animate-bounce' : 'text-brand-muted'}`} />
            {file ? (
              <div className="text-sm font-semibold text-white">
                Selected: <span className="text-brand-gold font-mono">{file.name}</span>
                <span className="text-xs text-brand-muted block font-light mt-1">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            ) : (
              <div className="text-xs text-brand-muted">
                <span className="text-white font-semibold">Click to select files</span> (PDF, DOCX, PNG, CAD DXF/DWG files)
                <span className="block mt-1 font-light opacity-50">Max File Size: 10MB</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status.type === 'loading'}
        className="w-full py-4 rounded-lg bg-brand-gold hover:bg-white text-brand-bg font-heading font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 disabled:bg-brand-surface disabled:text-brand-muted disabled:cursor-not-allowed select-none active:scale-[0.98]"
      >
        {status.type === 'loading' ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin text-brand-muted" />
            <span>Processing Application...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-brand-bg transition-transform group-hover:translate-x-1" />
            <span>Dispatch Inquiry</span>
          </>
        )}
      </button>
    </form>
  )
}
