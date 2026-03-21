import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FILTERS = ['All','Fintech','Mobile','AI','B2B','Design Systems'] as const
type Filter = typeof FILTERS[number]

const PROJECT_TAGS: Record<string,Filter[]> = {
  raqam:  ['Fintech','Mobile'],
  aicall: ['AI','B2B'],
  ai:     ['AI','B2B'],
  wa:     ['AI','Mobile'],
  ds:     ['Design Systems','B2B'],
  pet:    ['Design Systems'],
  oslo:   ['Design Systems','Mobile'],
}

function useReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) } }),
      { threshold: 0.07 }
    )
    el.querySelectorAll('.rv').forEach(r => io.observe(r))
    return () => io.disconnect()
  }, [])
  return ref
}

function matches(cardKey: string, filter: Filter) {
  if (filter === 'All') return true
  return PROJECT_TAGS[cardKey]?.includes(filter) ?? false
}

export default function Work() {
  const sectionRef = useReveal() as React.RefObject<HTMLElement>
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('All')

  return (
    <section
      className="work-sec"
      id="work"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{ padding: '80px var(--pad) 0' }}
    >
      {/* header */}
      <div className="rv" style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:44 }}>
        <div style={{ display:'flex',alignItems:'baseline',gap:18 }}>
          <span style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'clamp(1rem,1.6vw,1.4rem)',fontWeight:300,color:'var(--gold)',lineHeight:1 }}>01</span>
          <h2 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'clamp(1.9rem,3.8vw,3.2rem)',fontWeight:300,lineHeight:1 }}>
            Selected <em style={{ fontStyle:'italic',color:'var(--gold)' }}>work</em>
          </h2>
        </div>
        <p style={{ fontSize:'.78rem',color:'var(--muted)',maxWidth:240,lineHeight:1.65,textAlign:'right' }}>
          Each project is a real design challenge — research through shipped product.
        </p>
      </div>

      {/* filter bar */}
      <div className="rv d2" style={{ display:'flex',gap:8,marginBottom:28,flexWrap:'wrap' }}>
        {FILTERS.map(f=>(
          <button
            key={f}
            onClick={()=>setFilter(f)}
            style={{
              fontSize:'.62rem',fontWeight:500,letterSpacing:'.16em',textTransform:'uppercase',
              padding:'6px 16px',borderRadius:20,cursor:'none',
              border: f===filter ? '1px solid var(--gold)' : '1px solid var(--bdr2)',
              background: f===filter ? 'rgba(201,168,76,.1)' : 'transparent',
              color: f===filter ? 'var(--gold)' : 'var(--muted)',
              transition:'all .25s ease',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bento">

        {/* 01 RAQAM */}
        <article
          className="card b-raqam rv d1"
          style={{cursor:'none',opacity:matches('raqam',filter)?1:.15,transition:'opacity .35s ease'}}
          onClick={()=>navigate('/case-study/raqam')}
        >
          <div className="cl" /><div className="cn">01</div>
          <div className="cimg bg-raqam">
            <img src={`${import.meta.env.BASE_URL}images/rq.png`} alt="Raqam Bank mobile banking app" />
          </div>
          <div className="cib">
            <div>
              <span className="ctag">Mobile Banking · Fintech · UAE</span>
              <h2 className="ctitle">Raqam Bank — Digital Banking,<br />the Human Touch</h2>
              <p className="cdesc">Reimagining mobile banking for UAE's 88% expat population — transparent international transfers, AI-powered spending insights, enterprise operations dashboard.</p>
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end' }}>
              <div className="cms">
                <div className="cm"><b>+20%</b>transfer completion</div>
                <div className="cm"><b>−30%</b>time to transfer</div>
                <div className="cm"><b>40%+</b>insights engagement</div>
              </div>
              <button
                onClick={e=>{e.stopPropagation();navigate('/case-study/raqam')}}
                className="ca"
                aria-label="Raqam case study"
                style={{position:'static',border:'1px solid rgba(201,168,76,.16)',background:'rgba(201,168,76,.07)',cursor:'none',flexShrink:0}}
              >↗</button>
            </div>
          </div>
        </article>

        {/* 02 OMNICHANNEL */}
        <article
          className="card b-wa rv d1"
          style={{cursor:'none',opacity:matches('wa',filter)?1:.15,transition:'opacity .35s ease'}}
          onClick={()=>navigate('/case-study/omnichannel')}
        >
          <div className="cl" /><div className="cn">02</div>
          <div className="cimg bg-wa">
            <img src={`${import.meta.env.BASE_URL}images/wa-thumb.png`} alt="Omnichannel WhatsApp & Voice platform" />
          </div>
          <div className="cib">
            <div>
              <span className="ctag">Conversational AI · Mobile · B2B</span>
              <h2 className="ctitle">Omnichannel Platform —<br />WhatsApp &amp; Voice, Unified</h2>
              <p className="cdesc">Unified agent workspace bringing WhatsApp Business and voice conversations together — eliminating context-switching that was adding 60% to response times.</p>
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end' }}>
              <div className="cms">
                <div className="cm"><b>60%</b>faster responses</div>
                <div className="cm"><b>70%</b>template savings</div>
              </div>
              <button
                onClick={e=>{e.stopPropagation();navigate('/case-study/omnichannel')}}
                className="ca"
                aria-label="Omnichannel case study"
                style={{position:'static',border:'1px solid rgba(201,168,76,.16)',background:'rgba(201,168,76,.07)',cursor:'none',flexShrink:0}}
              >↗</button>
            </div>
          </div>
        </article>

        {/* 03 AI CALL CENTER */}
        <article
          className="card b-aicall rv d1"
          style={{cursor:'none',opacity:matches('aicall',filter)?1:.15,transition:'opacity .35s ease'}}
          onClick={()=>navigate('/case-study/ai-call-center')}
        >
          <div className="cl" /><div className="cn">03</div>
          <div className="cimg bg-aicall">
            <img src={`${import.meta.env.BASE_URL}images/aicall-thumb.png`} alt="AI Call Center intelligence dashboard" />
          </div>
          <div className="cib">
            <div>
              <span className="ctag">Enterprise SaaS · AI · B2B</span>
              <h2 className="ctitle">AI-Powered Call Center<br />Intelligence</h2>
              <p className="cdesc">Enterprise AI intelligence dashboard with real-time call transcription, NLP sentiment analysis, automated scoring, and conversation analytics across 100K+ daily interactions.</p>
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end' }}>
              <div className="cms">
                <div className="cm"><b>50+</b>enterprise clients</div>
                <div className="cm"><b>100K+</b>daily users</div>
                <div className="cm"><b>60%</b>efficiency gain</div>
              </div>
              <button
                onClick={e=>{e.stopPropagation();navigate('/case-study/ai-call-center')}}
                className="ca"
                aria-label="AI Call Center case study"
                style={{position:'static',border:'1px solid rgba(201,168,76,.16)',background:'rgba(201,168,76,.07)',cursor:'none',flexShrink:0}}
              >↗</button>
            </div>
          </div>
        </article>

        {/* 04 DESIGN SYSTEM */}
        <article
          className="card b-ds rv d1"
          style={{cursor:'none',opacity:matches('ds',filter)?1:.15,transition:'opacity .35s ease'}}
          onClick={()=>navigate('/case-study/design-system')}
        >
          <div className="cl" /><div className="cn">04</div>
          <div className="cimg bg-ds">
            <img src={`${import.meta.env.BASE_URL}images/ds-thumb.png`} alt="Core Design System components" />
          </div>
          <div className="cib">
            <div>
              <span className="ctag">Design Systems · B2B Finance</span>
              <h2 className="ctitle">Core Design System —<br />150+ Components</h2>
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end' }}>
              <div className="cms">
                <div className="cm"><b>150+</b>components</div>
                <div className="cm"><b>50%</b>dev efficiency</div>
              </div>
              <button
                onClick={e=>{e.stopPropagation();navigate('/case-study/design-system')}}
                className="ca"
                aria-label="Design System case study"
                style={{position:'static',border:'1px solid rgba(201,168,76,.16)',background:'rgba(201,168,76,.07)',cursor:'none',flexShrink:0}}
              >↗</button>
            </div>
          </div>
        </article>

        {/* 06 PET PROTECT */}
        <article
          className="card b-pet rv d1"
          style={{cursor:'none',opacity:matches('pet',filter)?1:.15,transition:'opacity .35s ease'}}
          onClick={()=>navigate('/case-study/pet-protect')}
        >
          <div className="cl" style={{background:'#5BB9C4'}} /><div className="cn">05</div>
          <div className="cimg bg-pet" />
          <div className="cib">
            <div>
              <span className="ctag" style={{color:'#5BB9C4'}}>Design System · Pet Insurance · Oslo</span>
              <h2 className="ctitle" style={{fontSize:'clamp(1.05rem,1.3vw,1.5rem)'}}>Pet Protect — Design System for Oslo Pet Insurance</h2>
              <p className="cdesc">Token-first design system with 35+ components, dual-mode theming, 7-level shadow library, and a full type scale — from Figma Variables to shipped product.</p>
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end' }}>
              <div className="cms">
                {[['35+','components'],['2','theme modes'],['60+','tokens']].map(([b,l])=>(
                  <div key={l} className="cm"><b style={{color:'#5BB9C4'}}>{b}</b>{l}</div>
                ))}
              </div>
              <button
                onClick={e=>{e.stopPropagation();navigate('/case-study/pet-protect')}}
                className="ca"
                aria-label="Pet Protect case study"
                style={{position:'static',border:'1px solid rgba(91,185,196,.2)',background:'rgba(91,185,196,.07)',color:'rgba(91,185,196,.6)',cursor:'none',flexShrink:0}}
              >↗</button>
            </div>
          </div>
        </article>

        {/* 07 OSLO PET */}
        <article
          className="card b-oslo rv d2"
          style={{cursor:'none',opacity:matches('oslo',filter)?1:.15,transition:'opacity .35s ease'}}
          onClick={()=>navigate('/case-study/oslo-pet')}
        >
          <div className="cl" style={{background:'#5BB9C4'}} /><div className="cn">06</div>
          <div className="cimg bg-oslo" />
          <div className="cib">
            <div>
              <span className="ctag" style={{color:'#5BB9C4'}}>Web App · Pet Insurance · Oslo</span>
              <h2 className="ctitle">Oslo Pet Insurance —<br />Pet Cloud Portal</h2>
              <p className="cdesc">Customer-facing web portal for policy management, multi-pet tracking, real-time claims, and vet access — shipped to oslopetinsurance.pet.</p>
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end' }}>
              <div className="cms">
                <div className="cm"><b style={{color:'#5BB9C4'}}>6</b>core flows</div>
                <div className="cm"><b style={{color:'#5BB9C4'}}>35+</b>components</div>
                <div className="cm"><b style={{color:'#5BB9C4'}}>2</b>platforms</div>
              </div>
              <button
                onClick={e=>{e.stopPropagation();navigate('/case-study/oslo-pet')}}
                className="ca"
                aria-label="Oslo Pet Insurance case study"
                style={{position:'static',border:'1px solid rgba(91,185,196,.2)',background:'rgba(91,185,196,.07)',color:'rgba(91,185,196,.6)',cursor:'none',flexShrink:0}}
              >↗</button>
            </div>
          </div>
        </article>

        {/* ── PERSONAL CARDS ── */}

        {/* ABOUT */}
        <article className="card b-about bg-about rv d2">
          <div style={{ position:'absolute',inset:0,padding:30,display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:'.6rem',fontWeight:500,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--gold)',marginBottom:12 }}>About me</div>
              <div style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'1.85rem',fontWeight:300,color:'var(--white)',lineHeight:1.08 }}>
                Lead Product<br /><em style={{ fontStyle:'italic',color:'var(--gold)' }}>Designer</em>
              </div>
            </div>
            <div>
              <p style={{ fontSize:'.77rem',lineHeight:1.7,color:'var(--muted)',marginBottom:13 }}>
                13 years designing financial and enterprise software. NN/g certified. CUA. Based in Dubai, specialised in MENA market fintech.
              </p>
              <div style={{ display:'flex',flexWrap:'wrap',gap:5 }}>
                {['Figma','UX Research','Design Systems','Fintech','B2B SaaS','AI UX'].map(c=>(
                  <span key={c} style={{ fontSize:'.56rem',fontWeight:500,letterSpacing:'.1em',textTransform:'uppercase',padding:'4px 9px',border:'1px solid rgba(201,168,76,.16)',color:'var(--muted)',borderRadius:20 }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* AVAILABILITY */}
        <article className="card b-avail bg-avail rv d2">
          <div style={{ position:'absolute',inset:0,padding:28,display:'flex',flexDirection:'column',justifyContent:'center',gap:13 }}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:7,padding:'5px 12px',background:'rgba(34,197,94,.07)',border:'1px solid rgba(34,197,94,.16)',borderRadius:20,width:'fit-content' }}>
              <span style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',display:'inline-block',animation:'glow 2.5s ease-in-out infinite' }} />
              <span style={{ fontSize:'.6rem',fontWeight:500,letterSpacing:'.13em',textTransform:'uppercase',color:'#4ade80' }}>Available now</span>
            </div>
            <div style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'1.4rem',fontWeight:300,color:'var(--white)',lineHeight:1.2 }}>
              Open to Lead &amp;<br />Senior Designer roles
            </div>
            <p style={{ fontSize:'.73rem',color:'var(--muted)',lineHeight:1.6 }}>UAE-based · Fintech, banking, enterprise B2B.</p>
            <a href="mailto:priyamvada.s.m@gmail.com" style={{ fontSize:'.66rem',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--gold)',textDecoration:'none',borderBottom:'1px solid rgba(201,168,76,.3)',paddingBottom:2,width:'fit-content',cursor:'none' }}>
              Get in touch →
            </a>
          </div>
        </article>

        {/* CREDENTIALS */}
        <article className="card b-creds bg-creds rv d2">
          <div style={{ position:'absolute',inset:0,padding:28,display:'flex',flexDirection:'column',justifyContent:'flex-end',gap:14,overflowY:'auto' }}>
            <div style={{ fontSize:'.6rem',fontWeight:500,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--gold)' }}>Credentials</div>
            <div style={{ display:'flex',flexDirection:'column',gap:13 }}>
              {[
                { icon:'🏅', title:'NN/g — UX Certification', sub:'Nielsen Norman Group · UX research, interaction design & best practices' },
                { icon:'🏅', title:'HFI — Certified Usability Analyst (CUA)', sub:'Human Factors International · Usability engineering & human-centered design' },
                { icon:'🎓', title:'B.Com, Distinction', sub:'Savitribai Phule Pune University · Business, finance & org. management' },
                { icon:'📊', title:'ICWA (Inter)', sub:'Institute of Cost Accountants of India · Financial analysis & strategic insights' },
              ].map(({ icon, title, sub }) => (
                <div key={title} style={{ display:'flex',gap:10,alignItems:'flex-start' }}>
                  <span style={{ fontSize:'.85rem',flexShrink:0,marginTop:1 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize:'.74rem',fontWeight:500,color:'var(--white)',marginBottom:2 }}>{title}</div>
                    <div style={{ fontSize:'.68rem',color:'var(--muted)',lineHeight:1.5 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* STAT */}
        <article className="card b-stat bg-stat rv d3">
          <div style={{ position:'absolute',inset:0,padding:28,display:'flex',flexDirection:'column',justifyContent:'flex-end' }}>
            <div style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'3.2rem',fontWeight:300,color:'var(--gold)',lineHeight:1,marginBottom:5 }}>150+</div>
            <div style={{ fontSize:'.62rem',fontWeight:500,letterSpacing:'.16em',textTransform:'uppercase',color:'rgba(201,168,76,.55)' }}>Components built</div>
            <div style={{ fontSize:'.7rem',color:'var(--muted)',marginTop:6 }}>Financial-grade design system<br />50% dev efficiency gain</div>
          </div>
        </article>

      </div>
    </section>
  )
}
