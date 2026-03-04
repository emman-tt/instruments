import { useEffect, useMemo, useRef, useState } from 'react'
import trumpo from '../../assets/img/trumpo.png'
import {
  ScrollTrigger,
  SplitText,
  gsap,
  ScrollToPlugin
} from '../../utils/gsap'
import { useGSAP } from '@gsap/react'
import drum from '../../assets/img/drum.png'
import piano from '../../assets/img/piano.png'
import saxophone from '../../assets/img/saxophone.png'

const deviceArray = [
  {
    id: 3,
    year: 1924,
    name: 'Drums',
    title: 'PECURSSION FAMILY',
    features: ['UNPREDICTABLE', 'EPIC', 'UNIQUE']
  },
  {
    id: 2,
    year: 1906,
    name: 'Piano',
    title: 'STRING FAMILY',
    features: ['UNPREDICTABLE', 'ELEGANT', 'UNIQUE']
  },
  {
    id: 1,
    year: 1923,
    title: 'TRUMPO FAMILY',
    name: 'Trumpet',
    features: ['EPIC', 'MAJESTIC', 'SHINY']
  },
  {
    id: 4,
    year: 1940,
    name: 'Saxophone',
    title: 'LIGHT BRASS FAMILY',
    features: ['UNPREDICTABLE', 'EPIC', 'UNIQUE']
  }
]

export default function Tools ({ headerRef, trumpet }) {
  const container = useRef(null)
  const leftSide = useRef(null)
  const rightSide = useRef(null)
  const box = useRef(null)
  const first = useRef(null)
  const toolsBox = useRef(null)
  const wheelRef = useRef(null)
  const eclipse = useRef(null)
  const drumRef = useRef(null)
  const pianoRef = useRef(null)
  const saxoPhoneRef = useRef(null)
  const trumpetRef = useRef(null)

  const [active, setActive] = useState(0)
  const itemsRef = useRef([])
  const windowSize = window.innerWidth

  const boxes = [
    { id: 1, name: 'trumpet', ref: trumpetRef },
    { id: 2, name: 'piano', image: piano, ref: pianoRef },
    { id: 3, name: 'drum', image: drum, ref: drumRef },
    { id: 4, name: 'saxophone', image: saxophone, ref: saxoPhoneRef }
  ]

  useEffect(() => {
    gsap.set(trumpet.current, { y: '-20em' })
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: `top+=100 top`,
        // markers: true,
        end: '+=50%',
        scrub: 0.5,
        toggleActions: 'play pause resume reverse'
      }
    })

    tl.to(
      trumpet.current,
      {
        force3D: true,
        transformOrigin: '50% 50%',
        rotate: windowSize <= 500 ? '-90deg' : '-90deg',
        height: windowSize <= 500 ? 'auto' : '140vh',
        width: windowSize <= 500 ? '100vw' : 'auto',
        top: windowSize <= 500 && 30,
        right: windowSize <= 500 && 0,
        scale: windowSize <= 500 ? 1.6 : 0.6,
        y: windowSize <= 500 ? 180 : windowSize <= 1100 ? -200 : 0,
        x: windowSize <= 500 ? '30%' : windowSize <= 1100 ? '10%' : '20%'
      },
      { delay: 0 }
    )
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: windowSize <= 500 ? '+=190%' : '+=250%',
          // markers: true,
          pin: true,
          scrub: 0,
          pinSpacing: true,
          invalidateOnRefresh: true
        }
      })

      gsap.from(first.current, {
        scrollTrigger: {
          trigger: first.current,
          start: windowSize <= 500 ? 'top+=-10% top' : 'top+=10% top',
          end: '+=50%',
          // markers: true,
          toggleActions: 'play none play reverse'
        },
        rotate: 90,
        duration: 0.5,
        ease: 'none',
        opacity: 0,
        y: windowSize <= 500 ? 100 : 400,
        x: 40
      })

      gsap.from(toolsBox.current, {
        scrollTrigger: {
          trigger: first.current,
          start: windowSize <= 500 ? 'top+=10%' : 'top+=30% top',
          end: '+=30%',
          toggleActions: 'play none play reverse',
          markers: true
        },
        x: -1000,
        duration: 0.6,
        ease: 'none'
      })

      gsap.to(eclipse.current, {
        scrollTrigger: {
          trigger: first.current,
          start: 'top+=40% top',
          end: '+=30%',
          toggleActions: 'play none play reverse'
          // markers: true
        },
        width: 0,
        height: 0
      })
    },
    {
      scope: container
    }
  )

  useGSAP(
    () => {
      const devices = gsap.utils.toArray('.device')

      const deviceTextSplit = new SplitText('.device-text', {
        type: 'words,lines,chars'
      })

      function floatingText () {
        const tl = gsap.timeline()

        tl.to(deviceTextSplit.words, {
          x: 10,
          opacity: 1,
          duration: 0.3,
          ease: 'none',
          stagger: {
            from: 'start'
          }
        })
      }

      devices.forEach((item, i) => {
        const portion = 1 / deviceArray.length
        const spacing = 0.5
        const startAt =
          i * portion +
          (windowSize <= 500 ? 0.9 : windowSize <= 1100 ? 0.4 : 0.5) * spacing

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: first.current,
            start: 'top+=45% top',
            end: '+=100%',
            scrub: 2,
            // markers: true,
            toggleActions: 'play none play reverse'
          }
        })

        tl.set(item, {
          display: 'flex'
        })

        const path = windowSize <= 500 ? '#mobile-path' : '#svg-path'

        tl.to(item, {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            start: 1 - startAt,
            end: 1 - startAt - 1
          },
          ease: 'none',
          marginLeft: 50,
          onReverseComplete: function () {
            setActive(0)
          },
          onUpdate: function () {
            const progress = this.progress()

            if (progress < 0.1) {
              gsap.set(trumpet.current, {
                opacity: 1
              })
              setActive(1)
            }

            if (progress > 0.15 && progress < 0.28) {
              floatingText()
              setActive(2)
              gsap.set(trumpet.current, {
                opacity: 0
              })
            }
            if (progress > 0.45 && progress < 0.57) {
              floatingText()
              setActive(3)
            }
            if (progress > 0.7 && progress < 0.75) {
              floatingText()
              setActive(4)
            }

            if (progress > 0.86) {
              gsap.set(trumpet.current, {
                opacity: 1
              })
              setActive(1)
            }
          }
        })
      })
    },
    {
      scope: container
    }
  )

  useEffect(() => {
    boxes.map((item, i) => {
      item.id === active
        ? gsap.to(item.ref.current, {
            zIndex: 40,
            right: windowSize <= 500 ? -40 : 0,
            scale: windowSize <= 500 ? 2 : 1,
            ease: 'circ',
            overwrite: 'auto'
          })
        : gsap.to(item.ref.current, {
            zIndex: 10,
            right: -800,
            overwrite: 'auto'
          })
    })
  }, [active])

  useEffect(() => {
    const item = document.querySelector('.number')

    if (item) {
      gsap.fromTo(
        item,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.5,
          overwrite: 'auto'
        }
      )
    }
  }, [active])

  return (
    <section
      ref={container}
      className='xl:h-[140vh] md:h-[130vh]  overflow-visible  border-0   relative      '
    >
      <section
        ref={box}
        className='h-full border-0 border-white overflow-hidden relative flex w-full'
      >
        <section
          ref={first}
          className='text-white max-sm:pl-5  h-screen w-[70%] pt-30 pr-30  '
        >
          {/* max-sm:flex max-sm:items-end max-sm:flex-col h-[80vh]  bg-green-400 sm: */}
          <h2 className=' text-[4em] md:text-[5em] xl:text-[7em] font-elegant text-left sm:pl-25 leading-tight'>
            Choose
          </h2>
          <h2 className=' text-[4em] md:text-[5em] xl:text-[7em] font-elegant text-left sm:pl-25 leading-tight'>
            your tools
          </h2>
          <p className='text-center md:text-xl xl:text-2xl italic font-light'>
            and lets have pleusure
          </p>
          <div
            ref={eclipse}
            className='absolute  border-[#282828] max-sm:top-90 rounded-full h-250 w-250 md:w-300 md:h-300 xl:h-400 xl:w-400 border-3 -left-120 top-65'
          ></div>
        </section>

        <section
          ref={toolsBox}
          className='h-screen absolute overflow-hidden left-0  top-0 flex pt-10 z-50 flex-col gap-20 bg-white w-[60%] sm:w-[50%]'
        >
          <h2 className='text-[#ac5c5a] text-center font-semibold'>
            {deviceArray.find(tool => tool.id === active)?.title}
          </h2>

          <section
            ref={wheelRef}
            className='flex gap-0   relative w-full  h-full'
          >
            <svg
              width='971'
              height='158'
              viewBox='0 0 971 158'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className=' top-30  -left-100 w-screen hidden sm:block absolute overflow-visible  pointer-events-none opacity-0'
            >
              <path
                id='svg-path'
                d='M0.254915 355.927C375.652 -0.5353 588.498 -5.8553 1970.244 557.068'
                stroke='blue'
                strokeWidth='3'
                fill='none'
              />
            </svg>

            {/* mobile path */}
            <svg
              width='971'
              height='158'
              viewBox='0 0 971 158'
              fill=''
              xmlns='http://www.w3.org/2000/svg'
              className=' top-30   w-screen block  sm:hidden absolute overflow-visible  pointer-events-none opacity-0'
            >
              <path
                id='mobile-path'
                d='M0.254915 355.927C375.652 -0.5353 588.498 -5.8553 1970.244 557.068'
                stroke='red'
                strokeWidth='3'
                fill='none'
              />
            </svg>
            <div className='bg-white h-full z-22 absolute left-0 xl:w-33'></div>
            <div className='bg-white h-full z-22 absolute right-0 xl:w-45'></div>

            {deviceArray.map((item, i) => (
              <div
                key={i}
                className={`device hidden  absolute w-30  sm:w-10 h-full     z-20    items-center font-bold text-3xl text-black  border-black   flex-col pt-30`}
              >
                <p className='device-text text-sm md:text-xl xl:text-xl font-extralight font-music'>
                  {item.year}
                </p>

                <h2 className='device-text text-[1.3em] whitespace-nowrap break-keep md:text-[3em]   xl:text-[3em] mt-7 leading-tight font-tools font-extralight'>
                  {item.name}
                </h2>

                <ul className='flex flex-col w-full items-center gap-3 mt-15'>
                  {item.features.map((each, pos) => (
                    <li
                      className='device-text text-sm whitespace-nowrap break-keep font-extralight font-elegant sm:text-lg '
                      key={pos}
                    >
                      {each}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </section>

        {active === 0 ? null : (
          <div className='text-[3em] font-light leading-tight font-elegant top-0 opacity-100 w-[70%]  text-white  z-60'>
            0 <span className='number inline-block'>{active}</span>
          </div>
        )}

        {boxes.map(item => (
          <div
            key={item.id}
            ref={item.ref}
            className='h-full -right-200  w-[50%] absolute text-white flex   font-extrabold text-7xl border-white border-0   '
          >
            {item.id === 1 ? (
              <div></div>
            ) : (
              <img
                className='sm:w-full bg-black  h-full w-50 object-contain translate-y-0 sm:h-full  sm:object-contain sm:-translate-y-30'
                src={item.image}
              />
            )}
          </div>
        ))}

        <img
          ref={trumpet}
          src={trumpo}
          className='absolute z-20 overflow-visible  top-80 -rotate-35 sm:rotate-0  xl:top-0 xl:w-auto md:top-20 md:left-30 md:w-[80%] md:h-150 xl:h-max xl:left-0 '
          alt='trumpet'
        />
      </section>
    </section>
  )
}
