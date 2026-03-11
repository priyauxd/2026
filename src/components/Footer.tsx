export default function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--bdr2)',padding:'32px var(--pad)',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
      <span style={{ fontFamily:'"Cormorant Garamond",Georgia,serif',fontSize:'.95rem',fontWeight:600,letterSpacing:'.04em',color:'var(--white)' }}>
        PRIYAMVADA <span style={{ color:'var(--gold)' }}>·</span> UX
      </span>
      <span style={{ fontSize:'.68rem',color:'var(--muted)',letterSpacing:'.05em' }}>
        © 2026 Priyamvada Khanolkar — Financial UX Design Portfolio
      </span>
      <div style={{ display:'flex',gap:26 }}>
        {[['https://www.linkedin.com/in/sarvopriya/','LinkedIn'],['mailto:priyamvada.s.m@gmail.com','Email'],['tel:+971528926463','+971 52 892 6463']].map(([href,label])=>(
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{ fontSize:'.66rem',color:'var(--muted)',textDecoration:'none',letterSpacing:'.12em',textTransform:'uppercase',transition:'color .2s',cursor:'none' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--muted)'}
          >{label}</a>
        ))}
      </div>
    </footer>
  )
}
