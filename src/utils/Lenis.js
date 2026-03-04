// components/LenisProvider.jsx
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export default function LenisProvider ({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Check if mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window
    
    const lenis = new Lenis({
      // Mobile vs Desktop settings
      ...(isMobile ? {
        // MOBILE: Keep it natural, just slightly enhanced
        duration: 1.2,           // Normal scroll duration
        lerp: 0.15,               // Responsive feel
        smoothTouch: false,       // 👈 CRITICAL - use native touch
        touchMultiplier: 1,       // Normal touch speed
        wheelMultiplier: 0.8,     // Slightly slower if wheel attached
      } : {
        // DESKTOP: Full smooth experience
        duration: 2,
        lerp: 0.05,
        smoothWheel: true,
        smoothTouch: false,       // Keep false even on desktop for trackpad
        wheelMultiplier: 1,
      }),
      
      // Common settings
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    })

    lenisRef.current = lenis

    function raf (time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, []) // Remove windowSize dependency

  return children
}