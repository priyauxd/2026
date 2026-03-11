import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

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

export default function Work() {
  const sectionRef = useReveal() as React.RefObject<HTMLElement>
  const navigate = useNavigate()

  return (
    <section
      className="work-sec"
      id="work"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{ padding: '80px var(--pad) 0' }}
    >
      {/* header */}
      <div className="rv" style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:44 }}>
        <h2 style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'clamp(1.9rem,3.8vw,3.2rem)',fontWeight:300,lineHeight:1 }}>
          Selected <em style={{ fontStyle:'italic',color:'var(--gold)' }}>work</em>
        </h2>
        <p style={{ fontSize:'.78rem',color:'var(--muted)',maxWidth:240,lineHeight:1.65,textAlign:'right' }}>
          Each project is a real design challenge — research through shipped product.
        </p>
      </div>

      <div className="bento">
        {/* 01 RAQAM */}
        <article className="card b-raqam bg-raqam rv d1" style={{cursor:'none'}} onClick={()=>navigate('/case-study/raqam')}>
          <div className="cl" /><div className="cn">01</div>
          <button onClick={e=>{e.stopPropagation();navigate('/case-study/raqam')}} className="ca" aria-label="Raqam case study" style={{zIndex:2,border:'none',background:'transparent',cursor:'none'}}>↗</button>
          <div className="ci" style={{zIndex:1,pointerEvents:'none'}}>
            <span className="ctag">Mobile Banking · Fintech · UAE</span>
            <h2 className="ctitle">Raqam Bank — Digital Banking,<br />the Human Touch</h2>
            <p className="cdesc">Reimagining mobile banking for UAE's 88% expat population — transparent international transfers, AI-powered spending insights, enterprise operations dashboard.</p>
            <div className="cms">
              <div className="cm"><b>+20%</b>transfer completion</div>
              <div className="cm"><b>−30%</b>time to transfer</div>
              <div className="cm"><b>40%+</b>insights engagement</div>
            </div>
          </div>
        </article>

        {/* ABOUT CARD */}
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

        {/* 02 BNPL */}
        <article className="card b-bnpl bg-bnpl rv d1">
          <div className="cl" /><div className="cn">02</div>
          <a href="#" className="ca">↗</a>
          <div className="ci">
            <span className="ctag">Fintech · Mobile</span>
            <h2 className="ctitle">Buy Now Pay Later —<br />UAE Retail Banking</h2>
            <p className="cdesc">Reduced application drop-off by 38% through clarity-first onboarding and transparent credit decisioning flows.</p>
            <div className="cms">
              <div className="cm"><b>38%</b>drop-off reduction</div>
              <div className="cm"><b>4.8★</b>app store</div>
              <div className="cm"><b>B2C</b>retail finance</div>
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
            <p style={{ fontSize:'.73rem',color:'var(--muted)',lineHeight:1.6 }}>UAE-based · AED 32–38K · Fintech, banking, enterprise B2B.</p>
            <a href="mailto:priyamvada.s.m@gmail.com" style={{ fontSize:'.66rem',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--gold)',textDecoration:'none',borderBottom:'1px solid rgba(201,168,76,.3)',paddingBottom:2,width:'fit-content',cursor:'none' }}>
              Get in touch →
            </a>
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

        {/* 03 CRYPTO */}
        <article className="card b-crypto bg-crypto rv d1">
          <div className="cl" /><div className="cn">03</div>
          <a href="#" className="ca">↗</a>
          <div className="ci">
            <span className="ctag">Investment &amp; Wealth</span>
            <h2 className="ctitle">Crypto Portfolio Tracker<br />for Private Wealth</h2>
            <div className="cms">
              <div className="cm"><b>UHNW</b>segment</div>
              <div className="cm"><b>Web + iOS</b></div>
            </div>
          </div>
        </article>

        {/* 04 AI */}
        <article className="card b-ai bg-ai rv d2">
          <div className="cl" /><div className="cn">04</div>
          <a href="#" className="ca">↗</a>
          <div className="ci">
            <span className="ctag">AI · B2B Banking</span>
            <h2 className="ctitle">AI-Powered Compliance<br />Scorecard Platform</h2>
            <div className="cms">
              <div className="cm"><b>60%</b>faster analyst review</div>
            </div>
          </div>
        </article>

        {/* 05 WHATSAPP */}
        <article className="card b-wa bg-wa rv d3">
          <div className="cl" /><div className="cn">05</div>
          <a href="#" className="ca">↗</a>
          <div className="ci">
            <span className="ctag">Conversational AI · Mobile</span>
            <h2 className="ctitle">WhatsApp Business Banking<br />for the MENA Market</h2>
            <div className="cms">
              <div className="cm"><b>MENA</b>first design</div>
              <div className="cm"><b>Conversational</b>UX</div>
            </div>
          </div>
        </article>

        {/* 06 ENTERPRISE */}
        <article className="card b-ent bg-ent rv d1">
          <div className="cl" /><div className="cn">06</div>
          <a href="#" className="ca">↗</a>
          <div className="ci">
            <span className="ctag">B2B · Enterprise Banking</span>
            <h2 className="ctitle">Voice Campaign Management for<br />Financial Contact Centers</h2>
            <p className="cdesc">Unified platform for 50+ enterprise banks — call analytics, agent performance, compliance tracking, and campaign orchestration in one interface.</p>
            <div className="cms">
              <div className="cm"><b>50+</b>enterprise clients</div>
              <div className="cm"><b>100K+</b>daily users</div>
              <div className="cm"><b>B2B SaaS</b></div>
            </div>
          </div>
        </article>

        {/* CREDENTIALS */}
        <article className="card b-creds bg-creds rv d2">
          <div style={{ position:'absolute',inset:0,padding:28,display:'flex',flexDirection:'column',justifyContent:'flex-end',gap:14 }}>
            <div style={{ fontSize:'.6rem',fontWeight:500,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--gold)' }}>Credentials</div>
            <div style={{ display:'flex',flexDirection:'column',gap:9 }}>
              {[
                ['NN/g Certified','Nielsen Norman Group UX'],
                ['CUA','Certified Usability Analyst'],
                ['13 Years','Lead Product Designer'],
                ['UAE-based','MENA market expertise'],
              ].map(([b,t])=>(
                <div key={b} style={{ display:'flex',alignItems:'center',gap:10 }}>
                  <div style={{ width:4,height:4,borderRadius:'50%',background:'var(--gold)',flexShrink:0 }} />
                  <div style={{ fontSize:'.74rem',color:'var(--muted)' }}><b style={{ color:'var(--white)',fontWeight:500 }}>{b}</b> — {t}</div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* 07 DESIGN SYSTEM strip */}
        <article className="card b-ds bg-ds rv d1">
          <div className="cl" /><div className="cn">07</div>
          <a href="#" className="ca">↗</a>
          <div style={{ position:'absolute',inset:0,padding:'28px 36px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:40 }}>
            <div>
              <span className="ctag">Design Systems · B2B Finance</span>
              <h2 className="ctitle" style={{ marginBottom:0,fontSize:'clamp(1.1rem,1.4vw,1.6rem)' }}>
                Financial-Grade Design System — 150+ Components, Built from Scratch
              </h2>
            </div>
            <div style={{ display:'flex',gap:32,flexShrink:0,alignItems:'center' }}>
              {[['150+','components'],['50%','dev efficiency'],['Figma','+ tokens']].map(([b,l])=>(
                <div key={l} style={{ fontSize:'.72rem',color:'var(--muted)' }}>
                  <b style={{ fontSize:'1.3rem',fontFamily:'"Cormorant Garamond",Georgia,serif',fontWeight:300,color:'var(--gold)',display:'block',lineHeight:1,marginBottom:3 }}>{b}</b>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
