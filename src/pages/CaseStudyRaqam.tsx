import { useEffect } from 'react'
import Cursor from '../components/Cursor'

const OUTCOMES = [
  { n: '+20%', l: 'Transfer completion rate' },
  { n: '−30%', l: 'Time to complete a transfer' },
  { n: '40%+', l: 'AI insights engagement' },
  { n: '88%', l: 'Expat population served' },
]

const SECTIONS = [
  {
    tag: '01 — Challenge',
    title: 'Banking for a nation of expats',
    body: `UAE's 88% expat population sends billions overseas monthly, yet existing banking apps treated international transfers as an afterthought — hidden fees, opaque rates, and multi-step flows that eroded trust at every touchpoint.\n\nRaqam Bank needed a mobile-first product that would feel human, transparent, and genuinely built for people whose primary financial concern is keeping money moving across borders.`,
  },
  {
    tag: '02 — Research',
    title: 'Understanding the transfer anxiety loop',
    body: `We ran 24 contextual interviews with expats across salary brackets — from construction workers sending AED 500 monthly to finance professionals moving AED 50,000+. Three core pain points emerged:\n\n1. Fee opacity: Users couldn't tell the true cost until the last screen.\n2. Trust deficit: No clear audit trail once money left the app.\n3. Insight blindspot: No spending awareness, leading to "month-end panic."`,
  },
  {
    tag: '03 — Design System',
    title: 'Financial-grade components, Arabic-aware',
    body: `We built a 150+ component system supporting both LTR and RTL layouts from day one — not as an afterthought. Every number format, date pattern, and currency display was tested against Central Bank of UAE guidelines.\n\nColour semantics were redefined for financial context: green only signals success, amber surfaces warnings, red is reserved for errors — never decoration.`,
  },
  {
    tag: '04 — Key Flows',
    title: 'Transparent transfers & AI spending insights',
    body: `The transfer flow was collapsed from 7 screens to 4, with the total cost (fee + FX margin) visible on the first screen. A live rate ticker gave users confidence without requiring them to switch apps.\n\nThe AI insights module surfaced one actionable observation per week — not a dashboard of charts, but a single sentence like "You spent 40% more on dining this month vs. your 3-month average." Engagement hit 40%+ within 60 days of launch.`,
  },
]

export default function CaseStudyRaqam() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Cursor />
      <div style={{ background: 'var(--black)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontWeight: 300, minHeight: '100vh' }}>

        {/* NAV */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px var(--pad)', background: 'linear-gradient(180deg,rgba(8,8,15,.97) 0%,transparent 100%)' }}>
          <a href="/" style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--white)', textDecoration: 'none', letterSpacing: '.04em', cursor: 'none' }}>
            PRIYAMVADA <span style={{ color: 'var(--gold)' }}>·</span> UX
          </a>
          <a href="/#work" style={{ fontSize: '.72rem', fontWeight: 400, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', cursor: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← Back to Work
          </a>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px var(--pad) 0', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--bdr2)', textAlign: 'center' }}>
          {/* bg */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 75% 15%,#082018 0%,transparent 55%),linear-gradient(145deg,#040e0a 0%,#081a12 55%,#040c09 100%)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.02) 1px,transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)', pointerEvents: 'none' }} />

          {/* TEXT */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
            <span style={{ fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, display: 'block' }}>
              Case Study · Mobile Banking · Fintech · UAE
            </span>
            <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2.4rem,4.8vw,5.6rem)', fontWeight: 300, lineHeight: .95, letterSpacing: '-.01em', marginBottom: 28 }}>
              Raqam Bank —<br />
              Digital Banking,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>the Human Touch</em>
            </h1>
            <p style={{ fontSize: '.95rem', lineHeight: 1.75, color: 'var(--muted)', maxWidth: 520, margin: '0 auto 48px' }}>
              Reimagining mobile banking for UAE's expat majority — transparent international transfers, AI-powered spending insights, and an enterprise operations dashboard.
            </p>

            {/* meta row */}
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', paddingTop: 32, borderTop: '1px solid var(--bdr2)', marginBottom: 64 }}>
              {[['Role', 'Lead Product Designer'], ['Platform', 'iOS · Android · Web'], ['Timeline', '14 months'], ['Market', 'UAE · MENA']].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5 }}>{k}</div>
                  <div style={{ fontSize: '.85rem', color: 'var(--white)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MOCKUP IMAGE */}
          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 900, margin: '0 auto' }}>
            <img
              src="/images/raqam-mockup.png"
              alt="Raqam Bank app screens — home dashboard, splash screen, and send money flow"
              style={{ width: '100%', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,.8))' }}
            />
          </div>
        </section>

        {/* OUTCOMES STRIP */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid var(--bdr2)' }}>
          {OUTCOMES.map(({ n, l }, i) => (
            <div key={l} style={{ padding: '40px var(--pad)', borderRight: i < OUTCOMES.length - 1 ? '1px solid var(--bdr2)' : 'none', textAlign: 'center' }}>
              <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2rem,3.5vw,3.2rem)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, display: 'block', marginBottom: 8 }}>{n}</span>
              <span style={{ fontSize: '.63rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>{l}</span>
            </div>
          ))}
        </section>

        {/* MAIN CONTENT */}
        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad)' }}>

          {/* SECTIONS */}
          {SECTIONS.map(({ tag, title, body }, idx) => (
            <div key={tag} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64, marginBottom: 96, paddingBottom: 96, borderBottom: idx < SECTIONS.length - 1 ? '1px solid var(--bdr2)' : 'none', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>{tag}</span>
              </div>
              <div>
                <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 24, color: 'var(--white)' }}>{title}</h2>
                {body.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 16 }}>{para}</p>
                ))}
              </div>
            </div>
          ))}

          {/* SCREENS PLACEHOLDER */}
          <div style={{ marginBottom: 96 }}>
            <span style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: 32 }}>05 — Screens</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {[
                { label: 'Onboarding & KYC', tag: 'Identity & Compliance' },
                { label: 'International Transfer', tag: 'Transparent FX + Fees' },
                { label: 'AI Spending Insights', tag: 'Personalised Intelligence' },
              ].map(({ label, tag }) => (
                <div key={label} style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 3, aspectRatio: '9/16', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24, textAlign: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontSize: '1.2rem' }}>✦</div>
                  <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.1rem', fontWeight: 300, color: 'var(--white)' }}>{label}</div>
                  <div style={{ fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>{tag}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '.75rem', color: 'var(--dim)', textAlign: 'center', marginTop: 16, letterSpacing: '.08em' }}>NDA — hi-fidelity screens available on request</p>
          </div>

          {/* LEARNINGS */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64, alignItems: 'start' }}>
            <span style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>06 — Learnings</span>
            <div>
              <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 24, color: 'var(--white)' }}>What shipped, what we'd change</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  ["Trust is earned at edge cases", "The failure states — network errors, transfer holds, FX rate expiry — were where we won or lost users. We spent 30% of design time on flows most PMs consider secondary."],
                  ["AI needs a voice, not a dashboard", "Early prototypes showed charts. Users ignored them. A single sentence in plain English drove 3× more action than any visualisation."],
                  ["Arabic-first isn't just RTL", "Date formats, number grouping, and even the meaning of colours differ. We embedded a native Arabic speaker in every user testing session from sprint 2."],
                ].map(([b, t]) => (
                  <div key={b} style={{ paddingLeft: 20, borderLeft: '2px solid var(--border)' }}>
                    <div style={{ fontSize: '.82rem', fontWeight: 500, color: 'var(--white)', marginBottom: 6 }}>{b}</div>
                    <div style={{ fontSize: '.82rem', lineHeight: 1.75, color: 'var(--muted)' }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER CTA */}
        <section style={{ borderTop: '1px solid var(--bdr2)', padding: '72px var(--pad)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Next steps</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--white)' }}>
              Want to see hi-fi screens or the full prototype?
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a
              href="mailto:priyamvada.s.m@gmail.com"
              style={{ display: 'inline-block', fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--black)', background: 'var(--gold)', padding: '13px 28px', textDecoration: 'none', cursor: 'none', transition: 'background .25s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold2)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold)')}
            >
              Get in touch →
            </a>
            <a
              href="/#work"
              style={{ display: 'inline-block', fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--border)', padding: '13px 28px', textDecoration: 'none', cursor: 'none', transition: 'border-color .25s,color .25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
            >
              ← All Work
            </a>
          </div>
        </section>

      </div>
    </>
  )
}
