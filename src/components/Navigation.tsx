const S: Record<string, React.CSSProperties> = {
  nav: {
    position:'fixed',top:0,left:0,right:0,zIndex:300,
    display:'flex',alignItems:'center',justifyContent:'space-between',
    padding:'20px var(--pad)',
    background:'linear-gradient(180deg,rgba(8,8,15,.97) 0%,transparent 100%)',
  },
  logo: {
    fontFamily:'"Cormorant Garamond",Georgia,serif',
    fontSize:'1.25rem',fontWeight:600,color:'var(--white)',
    textDecoration:'none',letterSpacing:'.04em',cursor:'none',
  },
  navList: { display:'flex',gap:40,listStyle:'none' },
  navLink: {
    fontSize:'.72rem',fontWeight:400,letterSpacing:'.14em',textTransform:'uppercase' as const,
    color:'var(--muted)',textDecoration:'none',transition:'color .2s',cursor:'none',
  },
  navR: { display:'flex',alignItems:'center',gap:20 },
  avail: { display:'flex',alignItems:'center',gap:7,fontSize:'.68rem',color:'var(--muted)' },
  dot: { width:6,height:6,borderRadius:'50%',background:'#22c55e',flexShrink:0,display:'inline-block',animation:'glow 2.5s ease-in-out infinite' },
  hire: {
    fontSize:'.7rem',fontWeight:500,letterSpacing:'.13em',textTransform:'uppercase' as const,
    color:'var(--gold)',border:'1px solid var(--border)',padding:'9px 22px',
    textDecoration:'none',transition:'background .2s,color .2s',cursor:'none',
  },
}

export default function Navigation() {
  return (
    <nav style={S.nav} aria-label="Main navigation">
      <a href="#" style={S.logo}>
        PRIYAMVADA <span style={{color:'var(--gold)'}}>·</span> UX
      </a>

      <ul style={S.navList}>
        {([['#work','Work'],['#process','Process'],['#about','About']] as [string,string][]).map(([href,label]) => (
          <li key={label}>
            <a
              href={href}
              style={S.navLink}
              onMouseEnter={e=>(e.currentTarget.style.color='var(--gold)')}
              onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}
            >{label}</a>
          </li>
        ))}
      </ul>

      <div style={S.navR}>
        <div style={S.avail}>
          <span style={S.dot} />
          Available for strategic consulting
        </div>
      </div>
    </nav>
  )
}
