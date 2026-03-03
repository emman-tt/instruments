import { MotionPathPlugin } from '../utils/gsap'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../utils/gsap'

export default function Testpage ({ headerRef }) {
  const trumpet = useRef(null)
  const container = useRef(null)
  const leftSide = useRef(null)
  const box = useRef(null)
  const first = useRef(null)
  const toolsBox = useRef(null)
  const wheelRef = useRef(null)
  const deviceArray = [1, 2, 3]
  const [activeIndex, setActiveIndex] = useState(0)
  const itemsRef = useRef([])
  useGSAP(
    () => {
      // 2. We use a selector or ref to ensure the path exists
      const items = itemsRef.current.filter(Boolean) // Remove nulls

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true
        }
      })

      items.forEach((item, i) => {
        // Space them out: 0, 0.1, 0.2...
        const startProp = i / (items.length * 2)

        tl.to(
          item,
          {
            motionPath: {
              path: '#svg-path', // Use the ID we set below
              align: '#svg-path',
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: startProp,
              end: startProp + 0.5
            },
            ease: 'none'
          },
          0
        )
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className='h-[300vh] bg-amber-300 relative overflow-hidden'
    >
      {/* 3. Cleaned SVG from Figma */}
      <svg
        className='absolute inset-0 w-full h-full pointer-events-none opacity-100' // Keep opacity-100 to debug first!
        viewBox='0 0 971 338'
        preserveAspectRatio='xMidYMid slice' // This helps it stay centered
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          id='svg-path'
          d='M0.39366 335.992C376.093 -143.801 588.898 -77.9917 970.383 337.133'
          stroke='red' // Red so you can see the track
          strokeWidth='3'
          fill='none'
        />
      </svg>

      {/* Your items mapping here */}
    </section>
  )
}
