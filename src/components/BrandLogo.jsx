import React from 'react'
import logoImg from '../assets/logo.png'

export default function BrandLogo({ mode = 'logo', className = '', size = 50 }) {
  return (
    <img
      src={logoImg}
      alt="S R Industries Logo"
      className={`object-contain select-none pointer-events-none ${className}`}
      style={{ 
        width: size,
        height: 'auto',
        aspectRatio: '222/191'
      }}
    />
  )
}
