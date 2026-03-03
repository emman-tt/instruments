import { useRef } from 'react'
import Header from '../views/Homepage/Header'
import Hero from '../views/Homepage/Hero'
import Tools from '../views/Homepage/Tools'
import Footer from '../views/Homepage/Footer'
export default function Homepage () {
  const headerRef = useRef(null)
  const trumpet = useRef(null)
  return (
    <section className='bg-[#0a0a0a]'>
      <Header headerRef={headerRef} />
      <Hero />
      <Tools trumpet={trumpet} headerRef={headerRef} />
      <Footer trumpet={trumpet} />
    </section>
  )
}
