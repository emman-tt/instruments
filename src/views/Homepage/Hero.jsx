import { ChevronRight, Pause, Play } from 'lucide-react'
import { gsap } from '../../utils/gsap'
import { useEffect, useRef, useState } from 'react'

import homecoming from '../../assets/songs/homecoming.mp3'
import clouded from '../../assets/songs/clouded.mp3'
import gimme from '../../assets/songs/gimme.mp3'
import ghost from '../../assets/songs/ghost.mp3'
import marvins from '../../assets/songs/marvins.mp3'
import tooDeep from '../../assets/songs/too-deep.mp3'
import virginia from '../../assets/songs/virginia.mp3'

export default function Hero () {
  const middleCord = useRef(null)
  const [play, setPlay] = useState(false)
  const [current, setCurrent] = useState(1)
  const audioRef = useRef(null)
  const musicArray = [
    {
      id: 1,
      title: 'Too Deep For The Intro - J.cole',
      file: tooDeep
    },
    {
      id: 2,
      title: 'Ghost Town - Kanye West/PND',
      file: ghost
    },
    {
      id: 3,
      title: "Marvin's Room - Drake ",
      file: marvins
    },
    {
      id: 4,
      title: 'Virginia Beach - Drake',
      file: virginia
    },
    {
      id: 5,
      title: 'Gimme a Hug - Drake',
      file: gimme
    },
    {
      id: 6,
      title: 'Clouded - Brent Faiyaz',
      file: clouded
    },
    {
      id: 7,
      title: 'Homecoming - Kanye West /Coldplay',
      file: homecoming
    }
  ]

  useEffect(() => {
    if (current >= musicArray.length) {
      // audioRef.current = new Audio(musicArray[0].file)
      // console.log('reached')
      return setCurrent(0)
    }
    // Create audio once and store in ref
    audioRef.current = new Audio(musicArray[current].file)
    audioRef.current.loop = true // Set if you want looping

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [current]) // Empty deps = runs once

  useEffect(() => {
    // Check if audio exists
    if (!audioRef.current) return

    if (play) {
      // Play audio (with browser autoplay handling)
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented:', error)
        })
      }
    } else {
      // Pause audio
      audioRef.current.pause()
    }
  }, [play, current])

  useEffect(() => {
    const lineArray = gsap.utils.toArray('.lines')
    const infoArray = gsap.utils.toArray('.info')
    const cordArray = gsap.utils.toArray('.cords')

    const windowSize = window.innerWidth

    const tl = gsap.timeline()
    lineArray.forEach((item, index) => {
      tl.to(
        item,
        {
          width: windowSize <= 500 ? 270 : windowSize <= 1100 ? 450 : 500,
          ease: 'none',
          delay: index === 0 ? 0.5 : 0.2,
          duration: 0.7
        },
        index === 0 ? '+=0' : '-=0.7'
      )
    })
    tl.to(middleCord.current, {
      height: 40,
      ease: 'none',
      duration: 2,
      opacity: 1
    })

    cordArray.forEach((item, index) => {
      gsap.to(item, {
        left: 3 + index * 10,
        ease: 'none',
        opacity: 1,
        duration: 3 + index,
        delay: 1.5,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.2
      })
    })

    infoArray.forEach(item => {
      gsap.to(item, {
        y: -60,
        delay: 0.8
      })
    })
  }, [])
  return (
    <section className='min-h-110 bg-none   flex text-white relative overflow-x-hidden items-center flex-col'>
      <section className='h-full w-full max-sm:pr-5  md:w-130 xl:w-150 '>
        <h2 className='text-lg max-sm:mt-10 pl-10 md:text-xl xl:text-3xl md:pl-20 xl:p-0 text-[#b09958]'>
          The
        </h2>

        <h3 className='font-elegant text-[5em] md:text-[7em]  max-sm:leading-30 pl-8  md:pl-20 xl:p-0 xl:text-[11em] font-medium   leading-40'>
          Tools
        </h3>

        <div className='flex w-full relative mt-5  justify-between'>
          <div className='flex items-center gap-2 sm:gap-7'>
            <div className='flex'>
              <div
                onClick={() => {
                  setPlay(e => !e)
                }}
                className='p-5 cursor-pointer md:p-3 xl:p-5 rounded-full justify-center items-center flex border-[#b09958] border px-7'
              >
                {play ? <Pause color='#b09958' /> : <Play color='#b09958' />}
              </div>
              <div
                onClick={() => {
                  setCurrent(e => e + 1)
                }}
                className='p-5 cursor-pointer md:p-3 xl:p-5 rounded-full justify-center items-center flex border-[#b09958] border px-7'
              >
                <ChevronRight color='#b09958' />
              </div>
            </div>

            <div className='relative h-max'>
              <div
                ref={middleCord}
                className='h-0 w-0.75 opacity-0  bg-[#b09958] z-1 font-bold absolute left-30 sm:left-60 inline-block top-0'
              ></div>
              <ul className='flex flex-col gap-4 md:gap-3 xl:gap-4 '>
                <li className='md:w-30 xl:w-40 lines h-0.5 relative bg-[#b09958]'></li>
                <li className='xl:w-40 relative lines h-0.5 bg-[#b09958]'>
                  <span className='absolute cords opacity-0 w-1.5 h-1.5 md:w-2 xl:w-3 md:h-2 xl:h-3 rounded-full bg-[#b09958] -top-6 -right-3'></span>
                  <span className='absolute md:w-2 xl:w-3 w-1.5 h-1.5 cords opacity-0 md:h-2 xl:h-3 rounded-full bg-[#b09958] -top-6 -right-25'></span>
                </li>
                <li className='md:w-30 xl:w-40 lines relative h-0.5 bg-[#b09958]'>
                  <span className='absolute md:w-2 xl:w-3 w-1.5 h-1.5 cords opacity-0 md:h-2 xl:h-3 rounded-full bg-[#b09958] -top-6 -right-1'></span>
                  <span className='absolute cords opacity-0 w-1.5 h-1.5 md:w-2 xl:w-3 md:h-2 xl:h-3 rounded-full bg-[#b09958] -top-6 -right-30'></span>
                  <span className='absolute md:w-2 xl:w-3 cords w-1.5 h-1.5 opacity-0 md:h-2 xl:h-3 rounded-full bg-[#b09958] -top-6 -right-9'></span>
                </li>
                <li className='md:w-30 xl:w-40 lines relative h-0.5 bg-[#b09958]'>
                  <span className='absolute md:w-2 xl:w-3 cords w-1.5 h-1.5 opacity-0 md:h-2 xl:h-3 rounded-full bg-[#b09958] -top-6 -right-10'></span>
                  <span className='absolute md:w-2 xl:w-3 cords w-1.5 h-1.5 opacity-0 md:h-2 xl:h-3 rounded-full bg-[#b09958] -top-6 -right-30'></span>
                  <span className='absolute cords opacity-0 md:w-2 w-1.5 h-1.5 xl:w-3 md:h-2 xl:h-3 rounded-full bg-[#b09958] -bottom-1 -right-1'></span>
                  <span className='absolute md:w-2 xl:w-3 cords w-1.5 h-1.5 opacity-0 md:h-2 xl:h-3 rounded-full bg-[#b09958] -bottom-1 -right-45'></span>
                </li>
              </ul>
            </div>
          </div>
          <div className='absolute -bottom-7 text-[#b09958] left-9'>
            {!audioRef ? 'Tap the play button' : musicArray[current]?.title}
          </div>
          <ul className='flex text-xs xl:text-sm self-center absolute right-0 top-0 items-end  font-semibold h-full  flex-col'>
            <li className='info '>Learn</li>
            <li className='info'>Play</li>
            <li className='info'>Discover</li>
          </ul>
        </div>

        <div className='flex w-full gap-5 justify-end mt-0 items-center '>
          <p className='text-[#b09958] text-xl font-light'>of</p>
          <h3 className='font-elegant font-light max-sm:pr-10 text-[4em] md:text-[5em] xl:text-[8em] leading-30'>
            Jazz
          </h3>
        </div>
      </section>
    </section>
  )
}
