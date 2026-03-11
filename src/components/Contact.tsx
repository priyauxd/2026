import { useEffect, useRef } from 'react'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.07})
    el.querySelectorAll('.rv').forEach(r=>io.observe(r))
    return ()=>io.disconnect()
  },[])

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="rv"
      style={{
        margin:'0 var(--pad) 60px',
        padding:80,
        background:'var(--s2)',
        border:'1px solid var(--border)',
        display:'grid',
        gridTemplateColumns:'1fr 1fr',
        gap:60,
        alignItems:'center',
        position:'relative',
        overflow:'hidden',
      }}
    >
      <div aria-hidden="true" style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 80% at 0% 50%,rgba(201,168,76,.04) 0%,transparent 70%)',pointerEvents:'none' }} />

      <h2 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'clamp(2.2rem,4vw,4.2rem)',fontWeight:300,lineHeight:.96,letterSpacing:'-.01em',position:'relative' }}>
        Let's build<br />something<br /><em style={{ fontStyle:'italic',color:'var(--gold)' }}>exceptional.</em>
      </h2>

      <div style={{ display:'flex',flexDirection:'column',gap:20,position:'relative' }}>
        <p style={{ fontSize:'.88rem',color:'var(--muted)',lineHeight:1.75 }}>
          Looking for a Lead Product Designer who knows financial products at depth? I'm open to new roles in the UAE and available now.
        </p>
        <div style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
          <a
            href="mailto:priyamvada.s.m@gmail.com"
            style={{ display:'inline-flex',alignItems:'center',gap:8,background:'var(--gold)',color:'var(--black)',fontSize:'.72rem',fontWeight:600,letterSpacing:'.13em',textTransform:'uppercase',padding:'13px 26px',textDecoration:'none',transition:'background .2s',cursor:'none' }}
            onMouseEnter={e=>e.currentTarget.style.background='var(--gold2)'}
            onMouseLeave={e=>e.currentTarget.style.background='var(--gold)'}
          >Get In Touch ↗</a>
          <a
            href="https://www.linkedin.com/in/sarvopriya/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display:'inline-flex',alignItems:'center',gap:8,border:'1px solid var(--border)',color:'var(--white)',fontSize:'.72rem',fontWeight:400,letterSpacing:'.13em',textTransform:'uppercase',padding:'12px 26px',textDecoration:'none',transition:'border-color .2s,color .2s',cursor:'none' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--white)'}}
          >LinkedIn →</a>
        </div>
      </div>
    </section>
  )
}
