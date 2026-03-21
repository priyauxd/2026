import { useTheme } from '../hooks/useTheme'

const scrollTo = (id: string, e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Navigation() {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
        background: 'var(--nav-bg)',
      }}
      aria-label="Main navigation"
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '20px var(--pad)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <a
        href="#/"
        style={{
          fontFamily: '"Cormorant Garamond",Georgia,serif',
          fontSize: '1.25rem', fontWeight: 600, color: 'var(--white)',
          textDecoration: 'none', letterSpacing: '.04em', cursor: 'none',
        }}
        onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
      >
        PRIYAMVADA <span style={{ color: 'var(--gold)' }}>·</span> UX
      </a>

      <ul style={{ display: 'flex', gap: 40, listStyle: 'none' }}>
        {([['work', 'Work'], ['process', 'Process'], ['about', 'About']] as [string, string][]).map(([id, label]) => (
          <li key={label}>
            <a
              href="#"
              onClick={e => scrollTo(id, e)}
              style={{
                fontSize: '.72rem', fontWeight: 400, letterSpacing: '.14em', textTransform: 'uppercase',
                color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s', cursor: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >{label}</a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '.68rem', color: 'var(--muted)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0, display: 'inline-block', animation: 'glow 2.5s ease-in-out infinite' }} />
          Available for strategic consulting
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: '50%',
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--gold)',
            cursor: 'none',
            transition: 'background .2s, border-color .2s',
            flexShrink: 0,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,168,76,.1)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          {isLight ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
      </div>
    </nav>
  )
}
