import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Edit, Trash2, LogOut, ArrowUp, ArrowDown, Move, Eye, 
  CheckCircle, ShieldAlert, Image as ImageIcon, X, Trash 
} from 'lucide-react'
import { normalizeImage } from '../utils/imageHelper'
import { API_URL } from '../utils/api'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Inquiries states
  const [inquiries, setInquiries] = useState([])
  const [inquiriesLoading, setInquiriesLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('projects')

  // Form modal states
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  
  // Form fields states
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [featured, setFeatured] = useState(false)
  const [displayOrder, setDisplayOrder] = useState(0)
  const [featuresList, setFeaturesList] = useState([])
  const [newFeature, setNewFeature] = useState('')
  
  // Image handling states
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const [existingImages, setExistingImages] = useState([]) // For editing
  
  // Status feedback states
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState('success') // success or error

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('sri_admin_token')
    if (token) {
      setIsAuthenticated(true)
      fetchProjects(token)
      fetchInquiries(token)
    } else {
      setLoading(false)
      setInquiriesLoading(false)
    }
  }, [])

  // Show status notification alert
  const showFeedback = (msg, type = 'success') => {
    setStatusMessage(msg)
    setStatusType(type)
    setTimeout(() => {
      setStatusMessage('')
    }, 4000)
  }

  // Fetch inquiries from backend
  const fetchInquiries = async (authToken) => {
    setInquiriesLoading(true)
    const token = authToken || localStorage.getItem('sri_admin_token')
    try {
      const res = await fetch(`${API_URL}/api/admin/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.status === 401) {
        handleLogout()
        return
      }
      const json = await res.json()
      if (json.success) {
        setInquiries(json.data)
      }
    } catch (err) {
      showFeedback('Failed to fetch contact inquiries', 'error')
    } finally {
      setInquiriesLoading(false)
    }
  }

  // Fetch projects from backend
  const fetchProjects = async (authToken) => {
    setLoading(true)
    const token = authToken || localStorage.getItem('sri_admin_token')
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.status === 401) {
        handleLogout()
        return
      }
      const json = await res.json()
      if (json.success) {
        const normalized = json.data.map((proj) => ({
          ...proj,
          images: Array.isArray(proj.images) ? proj.images.map(normalizeImage) : []
        }))
        setProjects(normalized)
      }
    } catch (err) {
      showFeedback('Failed to connect to backend service', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Admin login handler
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password })
      })
      const data = await res.json()
      if (data.success && data.token) {
        localStorage.setItem('sri_admin_token', data.token)
        setIsAuthenticated(true)
        fetchProjects(data.token)
        fetchInquiries(data.token)
      } else {
        setLoginError(data.message || 'Invalid administrator password')
      }
    } catch (err) {
      setLoginError('Server error authenticating admin')
    }
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('sri_admin_token')
    setIsAuthenticated(false)
    setProjects([])
    setInquiries([])
    setActiveTab('projects')
  }

  // Delete Contact Inquiry handler
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) {
      return
    }
    const token = localStorage.getItem('sri_admin_token')
    try {
      const res = await fetch(`${API_URL}/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await res.json()
      if (json.success) {
        showFeedback('Inquiry deleted successfully', 'success')
        fetchInquiries(token)
      } else {
        showFeedback(json.message || 'Error deleting inquiry', 'error')
      }
    } catch (err) {
      showFeedback('Server connection error during inquiry deletion', 'error')
    }
  }


  // Image Selection previewing
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles((prev) => [...prev, ...files])

    // Generate previews
    const filePreviews = files.map(file => URL.createObjectURL(file))
    setPreviewUrls((prev) => [...prev, ...filePreviews])
  }

  // Remove pending file from upload list
  const removePendingImage = (index) => {
    const updatedFiles = [...selectedFiles]
    updatedFiles.splice(index, 1)
    setSelectedFiles(updatedFiles)

    // Revoke object URL to avoid leak
    URL.revokeObjectURL(previewUrls[index])
    const updatedUrls = [...previewUrls]
    updatedUrls.splice(index, 1)
    setPreviewUrls(updatedUrls)
  }

  // Remove existing image from editing project
  const removeExistingImage = (index) => {
    const updatedImages = [...existingImages]
    updatedImages.splice(index, 1)
    setExistingImages(updatedImages)
  }

  // Add tag feature
  const handleAddFeature = () => {
    if (newFeature.trim() && !featuresList.includes(newFeature.trim())) {
      setFeaturesList([...featuresList, newFeature.trim()])
      setNewFeature('')
    }
  }

  // Remove tag feature
  const handleRemoveFeature = (index) => {
    const updated = [...featuresList]
    updated.splice(index, 1)
    setFeaturesList(updated)
  }

  // Open Form Modal for Create or Edit
  const openModal = (project = null) => {
    // Clear preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url))
    setPreviewUrls([])
    setSelectedFiles([])
    
    if (project) {
      // Setup editing states
      setEditingProject(project)
      setTitle(project.title || '')
      setCategory(project.category || '')
      setLocation(project.location || '')
      setDescription(project.description || '')
      setFeatured(!!project.featured)
      setDisplayOrder(project.displayOrder || 0)
      setFeaturesList(project.features || [])
      setExistingImages(project.images || [])
    } else {
      // Setup creating states
      setEditingProject(null)
      setTitle('')
      setCategory('')
      setLocation('')
      setDescription('')
      setFeatured(false)
      // Suggest order at end of list
      setDisplayOrder(projects.length + 1)
      setFeaturesList([])
      setExistingImages([])
    }
    setModalOpen(true)
  }

  // Close Form Modal
  const closeModal = () => {
    setModalOpen(false)
    setEditingProject(null)
  }

  // Save Project Form Submit (Create or Update)
  const handleSaveProject = async (e) => {
    e.preventDefault()
    
    if (!title || !category || !location || !description) {
      showFeedback('Please fill out all required fields', 'error')
      return
    }

    const token = localStorage.getItem('sri_admin_token')
    
    // Setup FormData for file uploads
    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('location', location)
    formData.append('description', description)
    formData.append('featured', featured)
    formData.append('displayOrder', displayOrder)
    
    // Append features array
    formData.append('features', JSON.stringify(featuresList))
    
    // Append existing images to keep
    formData.append('existingImages', JSON.stringify(existingImages))

    // Append newly uploaded files
    selectedFiles.forEach(file => {
      formData.append('images', file)
    })

    const isEdit = !!editingProject
    const url = isEdit ? `${API_URL}/api/projects/${editingProject._id}` : `${API_URL}/api/projects`
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData // Must send raw FormData (no Content-Type header to let boundary set)
      })

      const json = await res.json()
      if (json.success) {
        showFeedback(isEdit ? 'Project updated successfully' : 'Project created successfully', 'success')
        closeModal()
        fetchProjects(token)
      } else {
        showFeedback(json.message || 'Error saving project details', 'error')
      }
    } catch (err) {
      showFeedback('Server connection error during save', 'error')
    }
  }

  // Delete Project handler
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this project? This deletes its uploaded images on disk and cannot be undone.')) {
      return
    }

    const token = localStorage.getItem('sri_admin_token')
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await res.json()
      if (json.success) {
        showFeedback('Project deleted successfully', 'success')
        fetchProjects(token)
      } else {
        showFeedback(json.message || 'Error deleting project', 'error')
      }
    } catch (err) {
      showFeedback('Server connection error during deletion', 'error')
    }
  }

  // HTML5 Native Drag & Drop Reordering handlers
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index)
  }

  const handleDragOver = (e) => {
    e.preventDefault() // Required to allow drop
  }

  const handleDrop = async (e, targetIndex) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return

    const token = localStorage.getItem('sri_admin_token')
    const reorderedList = [...projects]
    const [movedItem] = reorderedList.splice(sourceIndex, 1)
    reorderedList.splice(targetIndex, 0, movedItem)

    // Re-assign displayOrder numbers
    const updatedProjects = reorderedList.map((item, idx) => ({
      ...item,
      displayOrder: idx + 1
    }))

    // Instantly update local UI
    setProjects(updatedProjects)

    // Persist reordered values in backend
    try {
      showFeedback('Saving new project order...', 'success')
      
      // Update each project's order on the backend
      const promises = updatedProjects.map((item) => {
        return fetch(`${API_URL}/api/projects/${item._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ displayOrder: item.displayOrder })
        })
      })

      await Promise.all(promises)
      showFeedback('Display order saved successfully', 'success')
    } catch (err) {
      showFeedback('Failed to persist project display order', 'error')
      fetchProjects(token)
    }
  }

  // Change order manually via Up/Down buttons (alternative for non-desktop devices)
  const moveItem = async (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= projects.length) return

    const token = localStorage.getItem('sri_admin_token')
    const reorderedList = [...projects]
    const temp = reorderedList[index]
    reorderedList[index] = reorderedList[targetIndex]
    reorderedList[targetIndex] = temp

    // Re-assign displayOrder numbers
    const updatedProjects = reorderedList.map((item, idx) => ({
      ...item,
      displayOrder: idx + 1
    }))

    setProjects(updatedProjects)

    try {
      const promises = updatedProjects.map((item) => {
        return fetch(`${API_URL}/api/projects/${item._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ displayOrder: item.displayOrder })
        })
      })
      await Promise.all(promises)
      showFeedback('Display order updated successfully', 'success')
    } catch (err) {
      showFeedback('Error saving display order', 'error')
      fetchProjects(token)
    }
  }

  return (
    <div className="bg-[#0B0B0B] text-white min-h-[80vh] py-16 px-6 md:px-12 relative">
      <div className="absolute inset-0 technical-grid opacity-[0.03] pointer-events-none" />

      {/* Floating Status Notification Alerts */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 right-6 z-50 px-6 py-4 rounded-xl border flex items-center gap-3 backdrop-blur-md shadow-2xl ${
              statusType === 'success' 
                ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-950/80 border-rose-500/30 text-rose-300'
            }`}
          >
            {statusType === 'success' ? <CheckCircle className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
            <span className="text-xs uppercase tracking-widest font-heading font-black">{statusMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* ==============================================
            A. GATEWAY LOCKSCREEN (AUTHENTICATION FORM)
           ============================================== */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-20 flex flex-col justify-center min-h-[50vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 rounded-xl border border-white/5 shadow-[0_15px_50px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-col items-center text-center mb-8">
                <span className="text-[9px] uppercase tracking-[0.3em] font-heading font-black text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded border border-brand-gold/20 mb-3">
                  System Administration
                </span>
                <h2 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">
                  S R Industries
                </h2>
                <p className="text-xs text-brand-muted mt-1 font-light">
                  Authorization required to modify project show logs.
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-mono text-brand-muted">
                    Secret Key
                  </label>
                  <input
                    type="password"
                    placeholder="Enter administrator password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg p-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-brand-gold transition-all"
                    required
                  />
                </div>

                {loginError && (
                  <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 text-center">
                    ⚠️ {loginError}
                  </span>
                )}

                <button
                  type="submit"
                  className="w-full p-3.5 rounded-lg bg-brand-gold text-brand-bg hover:bg-white text-xs font-heading font-black uppercase tracking-widest transition-all duration-300"
                >
                  Verify Credentials
                </button>
              </form>
            </motion.div>
          </div>
        ) : (

          /* ==============================================
              B. FULL ADMINISTRATOR CONTROL DASHBOARD
             ============================================== */
          <div className="flex flex-col gap-8">
            
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-widest font-heading font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded border border-brand-gold/20 self-start">
                  Control Desk
                </span>
                <div className="flex items-center gap-6 mt-1">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className={`text-2xl md:text-4xl font-heading font-black uppercase tracking-wide transition-all ${
                      activeTab === 'projects' ? 'text-white border-b-2 border-brand-gold pb-1' : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`text-2xl md:text-4xl font-heading font-black uppercase tracking-wide transition-all ${
                      activeTab === 'inquiries' ? 'text-white border-b-2 border-brand-gold pb-1' : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    Inquiries
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {activeTab === 'projects' && (
                  <button
                    onClick={() => openModal()}
                    className="px-5 py-3 rounded-lg bg-brand-gold text-brand-bg hover:bg-white text-[10px] font-heading font-bold uppercase tracking-widest flex items-center gap-2 transition-all"
                  >
                    <Plus className="w-4 h-4 shrink-0" />
                    <span>Add Project</span>
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="px-4 py-3 rounded-lg bg-brand-surface border border-white/5 hover:border-rose-500/30 hover:text-rose-400 text-[10px] font-heading font-bold uppercase tracking-widest flex items-center gap-2 transition-all"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {activeTab === 'projects' ? (
              <>
                {/* List & Drag instruction banner */}
                <div className="flex items-center justify-between text-xs text-brand-muted font-light bg-brand-surface/40 p-4 rounded-lg border border-white/5">
                  <span>Display Order changes instantly save in drag-and-drop mode.</span>
                  <span className="hidden md:flex items-center gap-2 font-mono text-[10px] text-brand-gold">
                    <Move className="w-3.5 h-3.5" /> DRAG ITEMS TO REORDER
                  </span>
                </div>

                {/* Projects list container */}
                {loading ? (
                  <div className="flex flex-col items-center py-20 gap-4">
                    <div className="w-10 h-10 border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
                    <span className="text-[10px] tracking-widest uppercase font-mono text-brand-muted">Fetching project list...</span>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-20 glass-panel rounded-xl border border-white/5">
                    <span className="text-xs text-brand-muted">No projects found. Add your first project above!</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {projects.map((project, index) => (
                      <div
                        key={project._id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className="glass-panel p-5 rounded-xl border border-white/5 hover:border-brand-gold/10 hover:shadow-[0_4px_25px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center justify-between gap-5 transition-all duration-300 group cursor-move select-none"
                      >
                        
                        {/* Drag indicator icon and image thumbnail */}
                        <div className="flex items-center gap-5 w-full md:w-auto">
                          <div className="text-white/20 group-hover:text-brand-gold transition-colors hidden md:block">
                            <Move className="w-5 h-5 cursor-move" />
                          </div>

                          {/* Display Order Counter badge */}
                          <span className="w-7 h-7 rounded bg-[#1C1C1C] border border-white/10 text-brand-gold font-mono font-semibold flex items-center justify-center text-xs">
                            {project.displayOrder}
                          </span>

                          {/* Image Thumbnail */}
                          <div className="w-14 h-14 rounded-lg bg-black border border-white/10 overflow-hidden shrink-0">
                            <img 
                              src={project.images?.[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'} 
                              alt="" 
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Meta Info */}
                          <div className="flex flex-col gap-1 pr-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                                {project.title}
                              </h3>
                              {project.featured && (
                                <span className="text-[8px] bg-brand-gold/10 border border-brand-gold/30 text-brand-gold px-2 py-0.5 rounded font-heading font-black uppercase tracking-wider">
                                  Featured
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-brand-muted uppercase">
                              {project.category} &bull; {project.location}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons controls */}
                        <div className="flex items-center justify-end gap-3 w-full md:w-auto border-t border-white/5 pt-4 md:pt-0 md:border-0 shrink-0">
                          
                          {/* Order shift controls for touch/mobile devices */}
                          <div className="flex items-center border border-white/10 rounded overflow-hidden mr-2">
                            <button
                              onClick={() => moveItem(index, -1)}
                              disabled={index === 0}
                              className="p-2 hover:bg-[#1C1C1C] text-brand-muted hover:text-white disabled:opacity-20 transition-colors"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => moveItem(index, 1)}
                              disabled={index === projects.length - 1}
                              className="p-2 border-l border-white/10 hover:bg-[#1C1C1C] text-brand-muted hover:text-white disabled:opacity-20 transition-colors"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Edit Button */}
                          <button
                            onClick={() => openModal(project)}
                            className="p-2.5 rounded-lg bg-brand-surface border border-white/5 hover:border-brand-gold/30 hover:text-brand-gold flex items-center justify-center transition-all"
                            title="Edit Project"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteProject(project._id)}
                            className="p-2.5 rounded-lg bg-brand-surface border border-white/5 hover:border-rose-500/30 hover:text-rose-400 flex items-center justify-center transition-all"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Inquiries panel */
              <>
                {inquiriesLoading ? (
                  <div className="flex flex-col items-center py-20 gap-4">
                    <div className="w-10 h-10 border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
                    <span className="text-[10px] tracking-widest uppercase font-mono text-brand-muted">Fetching inquiries...</span>
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="text-center py-20 glass-panel rounded-xl border border-white/5">
                    <span className="text-xs text-brand-muted">No inquiries found. Contact submissions will populate here automatically.</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {inquiries.map((inquiry) => (
                      <div
                        key={inquiry._id}
                        className="glass-panel p-5 rounded-xl border border-white/5 hover:border-brand-gold/10 hover:shadow-[0_4px_25px_rgba(0,0,0,0.4)] flex flex-col gap-4 transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                          <div>
                            <span className="text-[10px] font-mono text-brand-gold uppercase font-bold bg-brand-gold/10 px-2.5 py-1 rounded border border-brand-gold/20 mr-2">
                              {inquiry.service}
                            </span>
                            <span className="text-[10px] font-mono text-brand-muted">
                              {new Date(inquiry.createdAt).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteInquiry(inquiry._id)}
                            className="px-3 py-1.5 rounded-lg bg-brand-surface border border-white/5 hover:border-rose-500/30 hover:text-rose-400 text-[10px] font-heading font-bold uppercase tracking-widest flex items-center gap-1.5 self-end transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase font-mono text-brand-muted">Customer Name</span>
                            <span className="font-bold text-white">{inquiry.name}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase font-mono text-brand-muted">Contact Info</span>
                            <span className="text-white">
                              Phone: <a href={`tel:${inquiry.phone}`} className="hover:text-brand-gold font-semibold underline">{inquiry.phone}</a>
                            </span>
                            <span className="text-white">
                              Email: <a href={`mailto:${inquiry.email}`} className="hover:text-brand-gold font-semibold underline">{inquiry.email}</a>
                            </span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase font-mono text-brand-muted">Attachment File</span>
                            {inquiry.attachment ? (
                              <a
                                href={inquiry.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-gold hover:underline font-semibold flex items-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5" /> View Uploaded Attachment
                              </a>
                            ) : (
                              <span className="text-brand-muted font-light italic">No attachment provided</span>
                            )}
                          </div>
                        </div>

                        <div className="text-xs pt-1">
                          <span className="text-[9px] uppercase font-mono text-brand-muted block mb-1">Project Scope / Message</span>
                          <p className="text-brand-muted bg-[#121212]/60 p-3 rounded-lg border border-white/5 leading-relaxed font-light whitespace-pre-wrap">
                            {inquiry.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>
        )}

      </div>

      {/* ==============================================
          C. EDIT / CREATE POPUP DIALOG MODAL
         ============================================== */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto">
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-brand-surface border border-white/10 rounded-2xl w-full max-w-4xl p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-2xl z-10"
            >
              
              {/* Close X */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 p-2 rounded-lg bg-[#1C1C1C] border border-white/5 hover:border-white/20 text-brand-muted hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-xl md:text-3xl font-heading font-black uppercase tracking-wider text-white border-b border-white/5 pb-4 mb-6">
                {editingProject ? 'Edit Project Logs' : 'Create Project Record'}
              </h2>

              <form onSubmit={handleSaveProject} className="flex flex-col gap-6">
                
                {/* 2-column structure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column Fields */}
                  <div className="flex flex-col gap-4">
                    
                    {/* Project Title */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-widest uppercase font-mono text-brand-gold font-bold">
                        Project Title (Required)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. GI Barbed Wire Fencing"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-gold transition-all"
                        required
                      />
                    </div>

                    {/* Project Category */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-widest uppercase font-mono text-brand-gold font-bold">
                        Project Category (Required)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Security Fencing"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-gold transition-all"
                        required
                      />
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-widest uppercase font-mono text-brand-gold font-bold">
                        Location (Required)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Padappai, Chennai"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-gold transition-all"
                        required
                      />
                    </div>

                    {/* displayOrder and featured */}
                    <div className="grid grid-cols-2 gap-4">
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] tracking-widest uppercase font-mono text-brand-gold font-bold">
                          Display order index
                        </label>
                        <input
                          type="number"
                          value={displayOrder}
                          onChange={(e) => setDisplayOrder(parseInt(e.target.value || 0, 10))}
                          className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-gold transition-all"
                          min="0"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          id="featured-ch"
                          checked={featured}
                          onChange={(e) => setFeatured(e.target.checked)}
                          className="w-4.5 h-4.5 accent-brand-gold rounded border border-white/10 bg-[#1C1C1C] cursor-pointer"
                        />
                        <label 
                          htmlFor="featured-ch"
                          className="text-[10px] tracking-widest uppercase font-mono text-brand-muted cursor-pointer"
                        >
                          Mark Featured
                        </label>
                      </div>

                    </div>

                  </div>

                  {/* Right Column Description and tags */}
                  <div className="flex flex-col gap-4">
                    
                    {/* Description */}
                    <div className="flex flex-col gap-1.5 h-full">
                      <label className="text-[9px] tracking-widest uppercase font-mono text-brand-gold font-bold">
                        Description (Required)
                      </label>
                      <textarea
                        placeholder="Provide details about structural integrity, materials, scopes, safety features, etc..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-gold transition-all flex-grow min-h-[140px] leading-relaxed resize-none"
                        required
                      />
                    </div>

                    {/* Features Tags list */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-widest uppercase font-mono text-brand-gold font-bold">
                        Feature Highlights & Specs
                      </label>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add detail (e.g. Heavy Duty Structure)"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              handleAddFeature()
                            }
                          }}
                          className="flex-grow bg-[#1C1C1C] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-gold transition-all"
                        />
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="px-4 py-3 rounded-lg bg-brand-surface border border-white/10 hover:border-brand-gold hover:text-brand-gold text-xs font-bold uppercase transition-all"
                        >
                          Add
                        </button>
                      </div>

                      {/* Tag preview box */}
                      <div className="flex flex-wrap gap-1.5 p-3 bg-black/40 rounded-lg border border-white/5 min-h-[60px]">
                        {featuresList.length === 0 ? (
                          <span className="text-[10px] text-brand-muted/40 font-light italic">No highlight tags added.</span>
                        ) : (
                          featuresList.map((feat, idx) => (
                            <span 
                              key={idx} 
                              className="text-[9px] font-mono bg-white/5 border border-white/10 text-white pl-2.5 pr-1 py-1 rounded-md flex items-center gap-1.5"
                            >
                              <span>{feat}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFeature(idx)}
                                className="w-4 h-4 rounded-full bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 flex items-center justify-center transition-colors"
                              >
                                &times;
                              </button>
                            </span>
                          ))
                        )}
                      </div>

                    </div>

                  </div>

                </div>

                {/* ==============================================
                    D. IMAGES UPLOADER AND PREVIEW SECTION
                   ============================================== */}
                <div className="border-t border-white/5 pt-6 mt-2 flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-[10px] tracking-widest uppercase font-mono text-brand-gold font-bold">
                        Project Media Gallery
                      </h4>
                      <p className="text-[10px] text-brand-muted font-light mt-1">
                        Select multiple images to create a swiping carousel portfolio card. Allowed formats: PNG, JPG, JPEG, WEBP.
                      </p>
                    </div>

                    <label className="cursor-pointer px-5 py-3 rounded-lg bg-brand-surface border border-white/10 hover:border-brand-gold hover:text-brand-gold text-[10px] font-heading font-bold uppercase tracking-wider flex items-center gap-2 transition-all shrink-0">
                      <ImageIcon className="w-4 h-4" />
                      <span>Choose Images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Thumbnail Previews grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4 bg-black/40 rounded-xl border border-white/5 min-h-[100px]">
                    
                    {/* EXISTING IMAGES (For Edit mode) */}
                    {existingImages.map((imgUrl, idx) => (
                      <div key={`existing-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-brand-gold/30 group">
                        <img 
                          src={imgUrl} 
                          alt="" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeExistingImage(idx)}
                            className="p-1.5 rounded bg-rose-950 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                            title="Remove image"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="absolute top-1 left-1 text-[8px] bg-brand-gold/80 text-brand-bg px-1.5 py-0.5 rounded font-mono uppercase font-bold">
                          Saved
                        </span>
                      </div>
                    ))}

                    {/* NEW PENDING UPLOADS IMAGES */}
                    {previewUrls.map((url, idx) => (
                      <div key={`new-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group">
                        <img 
                          src={url} 
                          alt="" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removePendingImage(idx)}
                            className="p-1.5 rounded bg-rose-950 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="absolute top-1 left-1 text-[8px] bg-emerald-500/90 text-white px-1.5 py-0.5 rounded font-mono uppercase font-bold">
                          New
                        </span>
                      </div>
                    ))}

                    {existingImages.length === 0 && previewUrls.length === 0 && (
                      <div className="col-span-full flex flex-col items-center justify-center text-center p-6 text-brand-muted/40 font-light italic">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                        <span>No images selected for this portfolio card yet.</span>
                      </div>
                    )}

                  </div>

                </div>

                {/* Form Toolbar Footer */}
                <div className="border-t border-white/5 pt-6 flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-3 rounded-lg bg-brand-surface border border-white/5 hover:border-white/20 text-xs font-heading font-bold uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-brand-gold text-brand-bg hover:bg-white text-xs font-heading font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
                  >
                    <span>Save Project</span>
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
