// components/LenisProvider.jsx
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export default function LenisProvider ({ children }) {
  const lenisRef = useRef(null)
  const windowSize = window.innerWidth

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: windowSize <= 500 ? 5 : 2,
      lerp: 0.05,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1,
      wheelMultiplier: 1
    })

    lenisRef.current = lenis

    // RAF loop
    function raf (time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

  return children
}
