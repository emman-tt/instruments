import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../utils/gsap'
import { useRef } from 'react'



export default function Footer({ trumpet }) {
  const container = useRef(null)
  const instrumento = useRef(null)
  const windowSize = window.innerWidth
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: windowSize <= 500 ? 'top+=-60% top' : 'top+=-30% top',
          end: '+=30%',
          //   markers: true,

          toggleActions: 'play none play reverse'
        }
      })

      tl.from(instrumento.current, {
        scale: 0.2,
        x: -500,
        duration: 0.5
      })

      const allDevices = gsap.utils.toArray('.device')
      allDevices.forEach(item => {
        tl.from(
          item,
          {
            x: 500,
            scale: 0.5,
            opacity: 0,
            duration: 0.4,
            ease: 'ease'
          },
          {
            delay: 0
          }
        )
      })
    },
    {
      scope: container
    }
  )
  return (
    <section
      ref={container}
      className='h-120 md:h-160 xl:h-screen overflow-hidden mt-30 relative flex-col items-start  z-50   flex  '
    >
      <h2
        ref={instrumento}
        className='md:text-[7em] text-[4em] xl:text-[10em] flex items-center w-full justify-center leading-tight font-semibold font-elegant text-white'
      >
        Instrumento
      </h2>
      <p className='flex justify-center w-full font-light md:text-lg xl:text-xl font-body-text mt-0 text-white'>
        Made by Emmanuel Acquah
      </p>

      <section className='flex '>
        <img
          src={'https://res.cloudinary.com/drpnhajh9/image/upload/v1772670289/afroDrum_oa6djf.png'}
          className='w-auto device bottom-0 left-[0%] h-50    absolute z-20 md:h-70 xl:h-100 object-cover'
        />
        <img
          src={'https://res.cloudinary.com/drpnhajh9/image/upload/v1772670291/shakes_zflwpx.png'}
          className='w-auto bottom-0 max-sm:-right-10 device  rotate-10 h-50 absolute z-10 right-[20%]  md:h-70 xl:h-100 object-cover'
        />
        <img
          src={'https://res.cloudinary.com/drpnhajh9/image/upload/v1772670290/guitar_y7oaka.png'}
          className='w-auto bottom-0  device  rotate-40 h-50 absolute z-10 left-0 md:h-70 xl:h-100 object-cover'
        />
        <img
          src={'https://res.cloudinary.com/drpnhajh9/image/upload/v1772670292/trumpo_nqldfa.png'}
          className='w-auto bottom-0 device  rotate-40 h-50 absolute z-10 left-0 md:h-70 xl:h-100 object-cover'
        />

        <img
          src={'https://res.cloudinary.com/drpnhajh9/image/upload/v1772670293/drum_lwhzrh.png'}
          className='w-auto absolute device max-sm:right-[5%] bottom-0 h-50 z-8 right-[36%] md:h-70 xl:h-100 object-cover'
        />

        <img
          src={'https://res.cloudinary.com/drpnhajh9/image/upload/v1772670293/saxophone_cx0ovl.png'}
          className='w-auto absolute max-sm:hidden device right-[20%] h-50 rotate-0 bottom-0 z-9 md:h-150 object-cover'
        />

        <img
          src={'https://res.cloudinary.com/drpnhajh9/image/upload/v1772670290/piano_h3wp8x.png'}
          className='w-auto bottom-0 max-sm:hidden device z-10 absolute right-0 h-50 md:h-70 xl:h-100 object-cover'
        />
      </section>
    </section>
  )
}
