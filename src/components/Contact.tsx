import { useEffect, useRef } from 'react'

const CARDS = [
  {
    label: 'Email',
    icon: '📧',
    value: 'priyamvada.s.m@gmail.com',
    sub: "Drop me an email anytime, I'll get back to you within 24 hours!",
    href: 'mailto:priyamvada.s.m@gmail.com',
  },
  {
    label: 'Phone',
    icon: '📞',
    value: '+971 52 892 6463',
    sub: 'Available for calls Monday to Friday, 9 AM – 6 PM GST',
    href: 'tel:+971528926463',
  },
  {
    label: 'Location',
    icon: '📍',
    value: 'Available Remotely',
    sub: 'Open to remote opportunities worldwide and relocation for the right role',
    href: null,
  },
]

const OPPORTUNITIES = [
  'Fintech platforms',
  'Enterprise SaaS solutions',
  'AI-powered workflows',
  'Design leadership roles',
  'Design system manager',
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) } }), { threshold: .07 })
    el.querySelectorAll('.rv').forEach(r => io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: '100px var(--pad) 0' }}
    >
      {/* heading */}
      <div className="rv" style={{ textAlign: 'center', marginBottom: 56 }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2.8rem,5vw,5.6rem)', fontWeight: 300, lineHeight: .96, letterSpacing: '-.01em', marginBottom: 16 }}>
          Let's build something<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>exceptional.</em>
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
          Excited to dive into your next project? Let's chat and turn those brilliant ideas into reality.
        </p>
      </div>

      {/* contact cards grid */}
      <div className="rv d2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, maxWidth: 1100, margin: '0 auto 16px' }}>
        {CARDS.map(({ label, icon, value, sub, href }) => {
          const inner = (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                  background: 'var(--s2)', border: '1px solid var(--bdr2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem',
                }}>{icon}</div>
                <div>
                  <div style={{ fontSize: '.65rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--white)' }}>{value}</div>
                </div>
              </div>
              <p style={{ fontSize: '.88rem', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{sub}</p>
            </>
          )
          return href ? (
            <a
              key={label}
              href={href}
              style={{ display: 'block', background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '28px 28px', textDecoration: 'none', cursor: 'none', transition: 'border-color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--bdr2)')}
            >{inner}</a>
          ) : (
            <div key={label} style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '28px 28px' }}>{inner}</div>
          )
        })}

        {/* opportunities card */}
        <div style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '28px 28px' }}>
          <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--white)', marginBottom: 20 }}>Seeking Opportunities In</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
            {OPPORTUNITIES.map(o => (
              <div key={o} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontSize: '.88rem', color: 'var(--muted)' }}>{o}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
