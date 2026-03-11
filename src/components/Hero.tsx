export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight:'100vh',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:'80px var(--pad) 0',
        position:'relative',
        overflow:'hidden',
        textAlign:'center',
      }}
    >
      {/* grid texture */}
      <div aria-hidden="true" style={{
        position:'absolute',inset:0,pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(201,168,76,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.025) 1px,transparent 1px)',
        backgroundSize:'72px 72px',
        maskImage:'radial-gradient(ellipse 90% 90% at 50% 50%,black 0%,transparent 100%)',
        WebkitMaskImage:'radial-gradient(ellipse 90% 90% at 50% 50%,black 0%,transparent 100%)',
      }} />
      {/* ambient glow */}
      <div aria-hidden="true" style={{
        position:'absolute',inset:0,pointerEvents:'none',
        background:'radial-gradient(ellipse 60% 50% at 50% 40%,rgba(201,168,76,.045) 0%,transparent 65%)',
      }} />

      {/* EYEBROW */}
      <span style={{position:'relative',zIndex:1,fontSize:'.68rem',fontWeight:500,letterSpacing:'.24em',textTransform:'uppercase',color:'var(--gold)',marginBottom:24,display:'block',opacity:0,animation:'rise .8s .1s forwards'}}>
        Lead Product Designer · Financial UX · 13 Years · Dubai, UAE
      </span>

      {/* H1 */}
      <h1 style={{position:'relative',zIndex:1,fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'clamp(2.2rem,4.2vw,5rem)',fontWeight:300,lineHeight:.95,letterSpacing:'-.01em',marginBottom:32,opacity:0,animation:'rise .9s .22s forwards'}}>
        Designing Experiences That<br />
        <em style={{fontStyle:'italic',color:'var(--gold)'}}>Convert</em> &amp; <em style={{fontStyle:'italic',color:'var(--gold)'}}>Retain</em>
      </h1>

      {/* DESCRIPTION */}
      <p style={{position:'relative',zIndex:1,fontSize:'.95rem',lineHeight:1.8,color:'var(--muted)',maxWidth:500,marginBottom:56,opacity:0,animation:'rise .8s .38s forwards'}}>
        Strategic UX for digital banking &amp; fintech — turning complex financial workflows into trusted products for the MENA market.
      </p>

      {/* KPIs */}
      <div style={{position:'relative',zIndex:1,display:'flex',gap:0,borderTop:'1px solid var(--bdr2)',borderBottom:'1px solid var(--bdr2)',width:'100%',maxWidth:760,marginBottom:48,opacity:0,animation:'rise .8s .52s forwards'}}>
        {([['13','Years in Financial UX'],['150+','Design system components'],['100K+','Daily active users'],['50%','Dev handoff efficiency gain']] as [string,string][]).map(([n,l],i,arr)=>(
          <div key={l} style={{flex:1,padding:'28px 0',borderRight:i<arr.length-1?'1px solid var(--bdr2)':'none'}}>
            <span style={{fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'2.6rem',fontWeight:300,color:'var(--gold)',lineHeight:1,display:'block',marginBottom:6}}>{n}</span>
            <span style={{fontSize:'.63rem',letterSpacing:'.14em',textTransform:'uppercase',color:'var(--muted)'}}>{l}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{position:'relative',zIndex:1,opacity:0,animation:'rise .7s .64s forwards'}}>
        <a
          href="#work"
          style={{
            display:'inline-block',
            fontSize:'.75rem',fontWeight:500,letterSpacing:'.16em',textTransform:'uppercase',
            color:'var(--black)',background:'var(--gold)',
            padding:'14px 36px',textDecoration:'none',cursor:'none',
            transition:'background .25s,transform .2s',
          }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='var(--gold2)'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='var(--gold)'}}
        >
          View Work →
        </a>
      </div>

      <div aria-hidden="true" style={{position:'absolute',bottom:0,left:'var(--pad)',right:'var(--pad)',height:1,background:'var(--border)',opacity:.5}} />
    </section>
  )
}
