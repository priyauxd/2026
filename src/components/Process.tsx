import { useEffect, useRef } from 'react'

const steps = [
  { n:'01', ico:'🔍', title:'Discover', text:'Stakeholder interviews, user research, competitive analysis, and JTBD mapping to define the real problem — not the assumed one.' },
  { n:'02', ico:'🗺', title:'Define',   text:'Problem framing, success metrics, design principles, and information architecture before touching Figma. Strategy before pixels.' },
  { n:'03', ico:'✏️', title:'Design',  text:'Wireframes to hi-fi — accessibility-first, edge-case-aware, component-driven. Built for developer handoff from day one.' },
  { n:'04', ico:'🧪', title:'Test',    text:'Moderated usability sessions, tree testing, and A/B validation with real users. Data over assumptions.' },
  { n:'05', ico:'📈', title:'Measure', text:'Post-launch analytics, NPS tracking, and iterative refinement tied directly to business and user metrics.' },
]

export default function Process() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.07})
    el.querySelectorAll('.rv').forEach(r=>io.observe(r))
    return ()=>io.disconnect()
  },[])

  return (
    <section id="process" ref={ref as React.RefObject<HTMLElement>} style={{ padding:'0 var(--pad) 100px' }}>
      <div className="rv" style={{ background:'var(--s1)',border:'1px solid var(--bdr2)',padding:64 }}>
        <p style={{ fontSize:'.66rem',fontWeight:500,letterSpacing:'.24em',textTransform:'uppercase',color:'var(--gold)',marginBottom:12 }}>How I work</p>
        <h2 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'clamp(1.7rem,3vw,2.8rem)',fontWeight:300,lineHeight:1.08,marginBottom:52 }}>
          Design process built for<br /><em style={{ fontStyle:'italic',color:'var(--gold)' }}>financial products</em>
        </h2>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:0 }}>
          {steps.map((s, i) => (
            <div key={s.n} className={`rv d${i+1}`} style={{ paddingRight:28,borderRight:i<4?'1px solid var(--bdr2)':'none',paddingLeft:i>0?28:0 }}>
              <div style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'.78rem',fontWeight:300,color:'rgba(201,168,76,.3)',letterSpacing:'.1em',marginBottom:16 }}>{s.n}</div>
              <div style={{ fontSize:'1.2rem',marginBottom:12 }}>{s.ico}</div>
              <div style={{ fontSize:'.75rem',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--gold)',marginBottom:10 }}>{s.title}</div>
              <p style={{ fontSize:'.76rem',color:'var(--muted)',lineHeight:1.7 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
