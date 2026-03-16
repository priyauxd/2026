import { useEffect } from 'react'
import Cursor from '../components/Cursor'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Work from '../components/Work'
import Process from '../components/Process'
import About from '../components/About'
import Recommendations from '../components/Recommendations'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  // Global reveal observer for top-level .rv elements
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) } }),
      { threshold: 0.07 }
    )
    document.querySelectorAll('.rv').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div style={{ background:'var(--black)',color:'var(--white)',fontFamily:'Outfit,sans-serif',fontWeight:300 }}>
      <Cursor />
      <Navigation />
      <main>
        <Hero />
        <Ticker />
        <Work />
        <Process />
        <About />
        <Recommendations />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
