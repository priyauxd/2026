import { useEffect, useRef } from 'react'

const exp = [
  { yr:'2013 – Now', role:'Lead Product Designer',           co:'ZIWO — B2B SaaS, UAE' },
  { yr:'Certified',  role:'NN/g UX Certification',          co:'Nielsen Norman Group' },
  { yr:'Certified',  role:'Certified Usability Analyst',    co:'Human Factors International' },
  { yr:'Expertise',  role:'Digital Banking · Fintech · AI UX', co:'Design Systems · Arabic-aware · MENA' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.07})
    el.querySelectorAll('.rv').forEach(r=>io.observe(r))
    return ()=>io.disconnect()
  },[])

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="rv" style={{ padding:'0 var(--pad) 100px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:72,alignItems:'start' }}>
      <div>
        <div style={{ fontSize:'.66rem',fontWeight:500,letterSpacing:'.24em',textTransform:'uppercase',color:'var(--gold)',marginBottom:16,display:'flex',alignItems:'center',gap:10 }}>
          <span style={{ width:18,height:1,background:'var(--gold)',display:'inline-block' }} />
          About
        </div>
        <h2 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'clamp(1.7rem,2.8vw,2.6rem)',fontWeight:300,lineHeight:1.12,marginBottom:22 }}>
          Lead Product Designer<br />specialising in <em style={{ fontStyle:'italic',color:'var(--gold)' }}>Financial UX</em>
        </h2>
        <p style={{ fontSize:'.88rem',lineHeight:1.82,color:'var(--muted)' }}>
          13 years designing for fintech, digital banking, and enterprise B2B platforms — from call center software serving 100,000+ daily users to consumer apps built for the MENA market.
        </p>
        <p style={{ fontSize:'.88rem',lineHeight:1.82,color:'var(--muted)',marginTop:14 }}>
          I bridge the gap between business complexity and user clarity, with a track record in improving conversion, adoption, and developer efficiency across B2C and B2B financial products.
        </p>
      </div>

      <div style={{ border:'1px solid var(--bdr2)' }}>
        {exp.map((e, i) => (
          <div key={e.role} style={{ padding:'18px 22px',borderBottom:i<exp.length-1?'1px solid var(--bdr2)':'none',display:'grid',gridTemplateColumns:'86px 1fr',gap:14,alignItems:'start' }}>
            <span style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'.83rem',fontWeight:300,color:'var(--gold)' }}>{e.yr}</span>
            <div>
              <div style={{ fontSize:'.81rem',fontWeight:500,color:'var(--white)',marginBottom:2 }}>{e.role}</div>
              <div style={{ fontSize:'.72rem',color:'var(--muted)' }}>{e.co}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
