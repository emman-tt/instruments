import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'


gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText, MotionPathPlugin)

export { ScrollTrigger, SplitText, gsap, ScrollToPlugin, MotionPathPlugin }
