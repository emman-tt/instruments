import { useEffect, useState, useRef } from 'react'
import { gsap } from '../utils/gsap'

export default function Loader ({ finishLoading }) {
  const [counter, setCounter] = useState(0)
  const loaderRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // Simulate initial progress while waiting for window.onload
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev < 90) {
          return prev + Math.floor(Math.random() * 5) + 1
        }
        return prev
      })
    }, 100)

    const handleLoad = () => {
      // clearInterval(interval)
      // Force 100% when everything is loaded
      setCounter(100)
      clearInterval(interval)

      // Animate out
      const tl = gsap.timeline({
        onComplete: () => finishLoading()
      })

      tl.to(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: 'power2.in'
      }).to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut'
      })
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', handleLoad)
    }
  }, [finishLoading])

  return (
    <div
      ref={loaderRef}
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] text-[#b09958]'
    >
      <div ref={textRef} className='text-center'>
        <h1 className='font-elegant text-8xl md:text-9xl mb-4 font-light'>
          {counter}%
        </h1>
        <p className='uppercase tracking-[0.5em] text-xs md:text-sm font-light opacity-60'>
          Tuning the Instruments
        </p>
      </div>
    </div>
  )
}
