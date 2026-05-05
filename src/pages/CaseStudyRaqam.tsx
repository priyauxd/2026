import React, { useEffect } from 'react'
import Cursor from '../components/Cursor'

/* ─── DATA ────────────────────────────────────────────────── */

const OUTCOMES = [
  { n: '+20%', l: 'Transfer completion rate' },
  { n: '−30%', l: 'Time to complete a transfer' },
  { n: '40%+', l: 'AI insights engagement' },
  { n: '88%', l: 'Expat population served' },
]

const EARLY_SECTIONS = [
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
]

const COMPETITORS = [
  {
    name: 'RAKBank',
    category: 'Retail-focused UAE Banking',
    strengths: ['Clean, user-friendly interface consistently praised in app reviews', 'Smooth core banking — balance checks, transfers, bill payments without friction', 'AI-powered transformation — reduced compliance processing and AI assistant in-app'],
    gaps: ["Card management is weak — users can't see or manage multiple debit cards or set priority", 'No meaningful spending insights or financial wellness tools', 'Limited features compared to larger UAE banks'],
  },
  {
    name: 'ADCB',
    category: 'Full-Service Banking',
    strengths: ['Good expense categorization', 'Comprehensive features'],
    gaps: ['Overwhelming UI', 'Poor information hierarchy'],
  },
  {
    name: 'Wise / Revolut',
    category: 'Global Fintech',
    strengths: ['Best-in-class transfer UX', 'Transparent pricing'],
    gaps: ['Not UAE-banking integrated', 'Limited local features'],
  },
  {
    name: 'FAB',
    category: "UAE's Largest Full-Service Bank",
    strengths: ["Consistently ranked safest bank in UAE and Middle East by Global Finance", '2026 app refresh — faster login, better biometrics, Quick Actions dashboard', 'Strong institutional trust and widest product range in market'],
    gaps: ['Charges lack transparency — unexplained deductions with no breakdown in-app', 'Supplementary cards not visible in the app — a basic feature gap frustrating users', 'Weak spending intelligence and no proactive financial insights'],
  },
]

const LATE_SECTIONS = [
  {
    tag: '08 — Design System',
    title: 'Financial-grade components, Arabic-aware',
    body: `We built a 150+ component system supporting both LTR and RTL layouts from day one — not as an afterthought. Every number format, date pattern, and currency display was tested against Central Bank of UAE guidelines.\n\nColour semantics were redefined for financial context: green only signals success, amber surfaces warnings, red is reserved for errors — never decoration.`,
  },
  {
    tag: '09 — Key Flows',
    title: 'Transparent transfers & AI spending insights',
    body: `The transfer flow was collapsed from 7 screens to 4, with the total cost (fee + FX margin) visible on the first screen. A live rate ticker gave users confidence without requiring them to switch apps.\n\nThe AI insights module surfaced one actionable observation per week — not a dashboard of charts, but a single sentence like "You spent 40% more on dining this month vs. your 3-month average." Engagement hit 40%+ within 60 days of launch.`,
  },
]

const JOURNEY = [
  {
    stage: 'Trigger',
    action: 'Salary credited — decides to send monthly remittance',
    thought: `"Need to send before rates change."`,
    emotion: 'Anxious',
    emo_color: '#f59e0b',
    opp: 'Rate-change push alert at salary credit moment',
  },
  {
    stage: 'App Open',
    action: `Opens Raqam, taps "Send Money"`,
    thought: `"Let me check what the rate is today."`,
    emotion: 'Cautious',
    emo_color: '#f59e0b',
    opp: 'One-tap resume for recent transfers',
  },
  {
    stage: 'Rate Check',
    action: 'Sees live FX rate + 0.3% fee on screen 1',
    thought: `"Fee is clear upfront — that's fair."`,
    emotion: 'Reassured',
    emo_color: '#4ade80',
    opp: 'Live rate ticker before user commits',
  },
  {
    stage: 'Fill Details',
    action: 'Enters amount, selects saved recipient',
    thought: `"Auto-fill worked — saved time."`,
    emotion: 'Confident',
    emo_color: '#4ade80',
    opp: 'Smart autocomplete for frequent recipients',
  },
  {
    stage: 'Review',
    action: 'Reviews full cost breakdown before confirming',
    thought: `"AED 1,047.50 total — no surprises."`,
    emotion: 'Trusting',
    emo_color: '#4ade80',
    opp: 'Full cost shown on screen 1, not confirmation',
  },
  {
    stage: 'Post-Send',
    action: 'Receives PDF receipt + push notification',
    thought: `"Done. Sharing the receipt on WhatsApp."`,
    emotion: 'Relieved',
    emo_color: '#4ade80',
    opp: 'Auto-share receipt via WhatsApp',
  },
]

const IA_TABS = [
  { label: 'Home',     items: ['Dashboard', 'Quick Send', 'AI Insight', 'Recent Activity', 'Rate Ticker'] },
  { label: 'Transfer', items: ['Send Money', 'Schedule', 'Recipients', 'Rate Alert', 'History'] },
  { label: 'Insights', items: ['Monthly Summary', 'Categories', 'Weekly Insight', 'Savings Tips', 'Export'] },
  { label: 'Cards',    items: ['Virtual Card', 'Physical Card', 'Controls', 'Statements', 'Freeze'] },
  { label: 'Profile',  items: ['KYC Status', 'Documents', 'Security', 'Notifications', 'Support'] },
]

/* ─── SHARED STYLES ───────────────────────────────────────── */

const SL: React.CSSProperties = {
  fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em',
  textTransform: 'uppercase', color: 'var(--gold)',
}
const SH: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond",Georgia,serif',
  fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300,
  lineHeight: 1.1, marginBottom: 20, color: 'var(--white)',
}
const ROW: React.CSSProperties = {
  display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64,
  marginBottom: 96, paddingBottom: 96,
  borderBottom: '1px solid var(--bdr2)', alignItems: 'start',
}

/* ─── COMPONENT ───────────────────────────────────────────── */

export default function CaseStudyRaqam() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Cursor />
      <div style={{ background: 'var(--black)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontWeight: 300, minHeight: '100vh' }}>

        {/* NAV */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px var(--pad)', background: 'linear-gradient(180deg,rgba(8,8,15,.97) 0%,transparent 100%)' }}>
          <a href="https://priyauxd.github.io/2026/" style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--white)', textDecoration: 'none', letterSpacing: '.04em', cursor: 'none' }}>
            PRIYAMVADA <span style={{ color: 'var(--gold)' }}>·</span> UX
          </a>
          <a href="https://priyauxd.github.io/2026/" style={{ fontSize: '.72rem', fontWeight: 400, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', cursor: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >← Back to Work</a>
        </nav>

        {/* ── HERO ── */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px var(--pad) 0', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--bdr2)', textAlign: 'center' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 75% 15%,#082018 0%,transparent 55%),linear-gradient(145deg,#040e0a 0%,#081a12 55%,#040c09 100%)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.02) 1px,transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
            <span style={{ fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, display: 'block' }}>
              Case Study · Mobile Banking · Fintech · UAE
            </span>
            <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2.4rem,4.8vw,5.6rem)', fontWeight: 300, lineHeight: .95, letterSpacing: '-.01em', marginBottom: 28 }}>
              Raqam Bank —<br />Digital Banking,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>the Human Touch</em>
            </h1>
            <p style={{ fontSize: '.95rem', lineHeight: 1.75, color: 'var(--muted)', maxWidth: 520, margin: '0 auto 48px' }}>
              Reimagining mobile banking for UAE's expat majority — transparent international transfers, AI-powered spending insights, and an enterprise operations dashboard.
            </p>
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', paddingTop: 32, borderTop: '1px solid var(--bdr2)', marginBottom: 64 }}>
              {[['Role','Lead Product Designer'],['Platform','iOS · Android · Web'],['Timeline','14 months'],['Market','UAE · MENA']].map(([k,v]) => (
                <div key={k}>
                  <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5 }}>{k}</div>
                  <div style={{ fontSize: '.85rem', color: 'var(--white)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 900, margin: '0 auto' }}>
            <img
              src={`${import.meta.env.BASE_URL}images/raqam-mockup.png`}
              alt="Raqam Bank app screens"
              style={{ width: '100%', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,.8))' }}
            />
          </div>
        </section>

        {/* ── OUTCOMES STRIP ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid var(--bdr2)' }}>
          {OUTCOMES.map(({ n, l }, i) => (
            <div key={l} style={{ padding: '40px var(--pad)', borderRight: i < OUTCOMES.length - 1 ? '1px solid var(--bdr2)' : 'none', textAlign: 'center' }}>
              <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2rem,3.5vw,3.2rem)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, display: 'block', marginBottom: 8 }}>{n}</span>
              <span style={{ fontSize: '.63rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>{l}</span>
            </div>
          ))}
        </section>

        {/* ── MAIN CONTENT ── */}
        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad)' }}>

          {/* 01 CHALLENGE · 02 RESEARCH */}
          {EARLY_SECTIONS.map(({ tag, title, body }) => (
            <div key={tag} style={ROW}>
              <div><span style={SL}>{tag}</span></div>
              <div>
                <h2 style={SH}>{title}</h2>
                {body.split('\n\n').map((p, i) => (
                  <p key={i} style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 16 }}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              03 — COMPETITOR ANALYSIS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>03 — Competitor Analysis</span></div>
            <div>
              <h2 style={SH}>What the market got right — and left open</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                Audited 4 banking products used by UAE expats. Every competitor addressed part of the problem — none addressed all of it.
              </p>

              {/* 2×2 card grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, background: 'var(--bdr2)', marginBottom: 2 }}>
                {COMPETITORS.map(({ name, category, strengths, gaps }) => (
                  <div key={name} style={{ background: 'var(--s2)', display: 'flex', flexDirection: 'column' }}>

                    {/* Card header */}
                    <div style={{ padding: '22px 24px', borderBottom: '1px solid var(--bdr2)' }}>
                      <div style={{ fontSize: '.55rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{category}</div>
                      <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.4rem', fontWeight: 400, color: 'var(--white)', lineHeight: 1 }}>{name}</div>
                    </div>

                    {/* Strengths */}
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--bdr2)', flex: 1 }}>
                      <div style={{ fontSize: '.55rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: '#4ade80', marginBottom: 10 }}>What works</div>
                      {strengths.map(s => (
                        <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0, marginTop: 5, display: 'inline-block' }} />
                          <span style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{s}</span>
                        </div>
                      ))}
                    </div>

                    {/* Gaps */}
                    <div style={{ padding: '16px 24px', flex: 1 }}>
                      <div style={{ fontSize: '.55rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: '#f87171', marginBottom: 10 }}>Gaps found</div>
                      {gaps.map(g => (
                        <div key={g} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
                          <span style={{ color: '#f87171', flexShrink: 0, fontSize: '.75rem', lineHeight: 1, marginTop: 3 }}>✕</span>
                          <span style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{g}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

              {/* Raqam opportunity callout */}
              <div style={{ background: 'linear-gradient(135deg,rgba(201,168,76,.05) 0%,var(--s2) 100%)', border: '1px solid var(--border)', padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 2, background: 'var(--gold)', alignSelf: 'stretch', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '.58rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Raqam's opportunity</div>
                  <div style={{ fontSize: '.88rem', color: 'var(--white)', lineHeight: 1.75 }}>
                    No product combined transparent pricing (Wise's strength), UAE banking integration, and proactive spending intelligence in one experience. Raqam's brief was to close all three gaps simultaneously.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              04 — PERSONA
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>04 — Persona</span></div>
            <div>
              <h2 style={SH}>Designing for Omar — the mobile-first expat</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                Composite persona built from 24 contextual interviews. Represents UAE's largest banking segment — salary-earning expats aged 28–42 sending regular remittances home.
              </p>

              <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)' }}>

                {/* Header row */}
                <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--bdr2)', display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--s3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.2rem', color: 'var(--gold)', fontWeight: 400 }}>OA</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.55rem', fontWeight: 400, color: 'var(--white)', lineHeight: 1, marginBottom: 7 }}>
                      Omar Al-Rashidi
                    </div>
                    <div style={{ fontSize: '.68rem', color: 'var(--gold)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 5 }}>
                      Finance Analyst · 34 · Dubai, UAE
                    </div>
                    <div style={{ fontSize: '.78rem', color: 'var(--muted)' }}>
                      Mumbai → Dubai · 6 years in UAE · Sends AED 3,000–8,000/month home
                    </div>
                  </div>
                  <div style={{ padding: '14px 20px', borderLeft: '2px solid var(--border)', maxWidth: 290 }}>
                    <div style={{ fontSize: '.8rem', fontStyle: 'italic', color: 'var(--muted)', lineHeight: 1.7 }}>
                      "I don't trust an app that shows me the fee only at the last step. I've lost money that way."
                    </div>
                  </div>
                </div>

                {/* 3-column attributes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
                  {[
                    {
                      label: 'Goals', marker: '→', mc: 'var(--gold)',
                      items: [
                        'Send money home without surprises',
                        'See exact total cost before confirming',
                        'Track spending without extra apps',
                      ],
                    },
                    {
                      label: 'Frustrations', marker: '✕', mc: '#f87171',
                      items: [
                        'Hidden FX margin revealed at confirmation',
                        'No receipt or audit trail after transfer',
                        'App crashes mid-flow on 4G networks',
                      ],
                    },
                    {
                      label: 'Behaviours', marker: '◦', mc: 'rgba(201,168,76,.5)',
                      items: [
                        'Checks 3 apps before choosing to send',
                        'Screenshots confirmation screens manually',
                        'WhatsApps family to confirm money arrived',
                      ],
                    },
                  ].map(({ label, marker, mc, items }, ci) => (
                    <div key={label} style={{ padding: '22px 26px', borderRight: ci < 2 ? '1px solid var(--bdr2)' : 'none' }}>
                      <div style={{ fontSize: '.58rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>{label}</div>
                      {items.map(item => (
                        <div key={item} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', marginBottom: 9 }}>
                          <span style={{ color: mc, flexShrink: 0, marginTop: 2, lineHeight: 1, fontSize: '.85rem' }}>{marker}</span>
                          <span style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              05 — USER JOURNEY MAP
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>05 — Journey Map</span></div>
            <div>
              <h2 style={SH}>From transfer anxiety to earned trust</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                End-to-end map of an international transfer — revealing the 30% drop-off at the review screen caused by fee disclosure coming too late in the flow.
              </p>

              <div style={{ overflowX: 'auto' }}>
                <div style={{ minWidth: 800 }}>

                  {/* Stage headers */}
                  <div style={{ display: 'grid', gridTemplateColumns: '104px repeat(6,1fr)', gap: 1, background: 'var(--bdr2)', marginBottom: 1 }}>
                    <div style={{ background: 'var(--s3)', padding: '10px 12px' }} />
                    {JOURNEY.map(({ stage }) => (
                      <div key={stage} style={{ background: 'var(--s3)', padding: '10px 12px', textAlign: 'center' }}>
                        <span style={{ fontSize: '.62rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--white)' }}>{stage}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '104px repeat(6,1fr)', gap: 1, background: 'var(--bdr2)', marginBottom: 1 }}>
                    <div style={{ background: 'var(--s2)', padding: '14px 12px', display: 'flex', alignItems: 'center' }}>
                      <span style={SL}>Action</span>
                    </div>
                    {JOURNEY.map(({ action, stage }) => (
                      <div key={stage} style={{ background: 'var(--s2)', padding: '14px 12px' }}>
                        <span style={{ fontSize: '.74rem', color: 'var(--muted)', lineHeight: 1.55, display: 'block' }}>{action}</span>
                      </div>
                    ))}
                  </div>

                  {/* Thinking row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '104px repeat(6,1fr)', gap: 1, background: 'var(--bdr2)', marginBottom: 1 }}>
                    <div style={{ background: 'var(--s2)', padding: '14px 12px', display: 'flex', alignItems: 'center' }}>
                      <span style={SL}>Thinking</span>
                    </div>
                    {JOURNEY.map(({ thought, stage }) => (
                      <div key={stage} style={{ background: 'var(--s2)', padding: '14px 12px' }}>
                        <span style={{ fontSize: '.74rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.55, display: 'block' }}>{thought}</span>
                      </div>
                    ))}
                  </div>

                  {/* Emotion row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '104px repeat(6,1fr)', gap: 1, background: 'var(--bdr2)', marginBottom: 1 }}>
                    <div style={{ background: 'var(--s2)', padding: '14px 12px', display: 'flex', alignItems: 'center' }}>
                      <span style={SL}>Emotion</span>
                    </div>
                    {JOURNEY.map(({ emotion, emo_color, stage }) => (
                      <div key={stage} style={{ background: 'var(--s2)', padding: '14px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: emo_color, boxShadow: `0 0 8px ${emo_color}66` }} />
                        <span style={{ fontSize: '.64rem', color: emo_color, fontWeight: 500, textAlign: 'center' }}>{emotion}</span>
                      </div>
                    ))}
                  </div>

                  {/* Opportunity row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '104px repeat(6,1fr)', gap: 1, background: 'var(--bdr2)' }}>
                    <div style={{ background: 'var(--s2)', padding: '14px 12px', display: 'flex', alignItems: 'center' }}>
                      <span style={SL}>Opportunity</span>
                    </div>
                    {JOURNEY.map(({ opp, stage }) => (
                      <div key={stage} style={{ background: 'var(--s2)', padding: '14px 12px' }}>
                        <span style={{ fontSize: '.7rem', color: 'rgba(201,168,76,.7)', lineHeight: 1.55, display: 'block' }}>
                          {opp ? `↑ ${opp}` : '—'}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              06 — INFORMATION ARCHITECTURE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>06 — Information Architecture</span></div>
            <div>
              <h2 style={SH}>Flat, task-first navigation</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                The original app buried key features 4 levels deep. We restructured to a 2-level flat hierarchy — every core task is reachable in 2 taps or fewer. Five tab bar sections map directly to user mental models.
              </p>

              {/* Tab bar */}
              <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                {IA_TABS.map(tab => (
                  <div key={tab.label} style={{ flex: 1, background: 'var(--s3)', border: '1px solid var(--border)', borderBottom: '2px solid var(--gold)', padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '.72rem', fontWeight: 500, color: 'var(--gold)', letterSpacing: '.1em' }}>{tab.label}</div>
                  </div>
                ))}
              </div>

              {/* Child items */}
              <div style={{ display: 'flex', gap: 2, marginBottom: 28 }}>
                {IA_TABS.map((tab) => (
                  <div key={tab.label} style={{ flex: 1, background: 'var(--s2)', border: '1px solid var(--bdr2)', borderTop: 'none', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {tab.items.map(item => (
                      <div key={item} style={{ fontSize: '.7rem', color: 'var(--muted)', padding: '6px 9px', background: 'var(--s3)', borderLeft: '2px solid var(--bdr2)', lineHeight: 1.3 }}>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                {[
                  ['2 levels max', 'No buried navigation'],
                  ['≤ 2 taps', 'Core tasks reachable'],
                  ['5 sections', 'Matches user mental models'],
                  ['RTL ready', 'Full Arabic support'],
                ].map(([b, l]) => (
                  <div key={b}>
                    <div style={{ fontSize: '.82rem', fontWeight: 500, color: 'var(--white)', marginBottom: 3 }}>{b}</div>
                    <div style={{ fontSize: '.7rem', color: 'var(--muted)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              07 — WIREFRAMES
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>07 — Wireframes</span></div>
            <div>
              <h2 style={SH}>Low-fidelity flows before pixels</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 48 }}>
                Two critical paths mapped as lo-fi wireframes before any visual design. The 5-step transfer flow and the AI insights surface drove the most iteration — each screen refined through 3+ rounds of user testing.
              </p>

              {/* ── Transfer Flow ── */}
              <div style={{ marginBottom: 52 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid var(--bdr2)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: '.62rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Transfer Flow</span>
                  <span style={{ fontSize: '.62rem', color: 'var(--muted)', letterSpacing: '.08em' }}>5 screens · Dashboard → Recipient → Amount → Review → Success</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
                  {[
                    { img: 'wf-transfer-1-dashboard',  label: 'Dashboard' },
                    { img: 'wf-transfer-2-recipient',  label: 'Select Recipient' },
                    { img: 'wf-transfer-3-amount',     label: 'Enter Amount' },
                    { img: 'wf-transfer-4-review',     label: 'Review' },
                    { img: 'wf-transfer-5-success',    label: 'Success' },
                  ].map(({ img, label }, i, arr) => (
                    <React.Fragment key={img}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <div style={{ width: '100%', aspectRatio: '9/19', background: 'var(--s3)', border: '1px solid var(--bdr2)', borderRadius: 10, overflow: 'hidden' }}>
                          <img
                            src={`${import.meta.env.BASE_URL}images/wireframes/${img}.png`}
                            alt={label}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                        <span style={{ fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.4 }}>{label}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 28, flexShrink: 0, padding: '0 4px', paddingTop: '20%' }}>
                          <span style={{ color: 'rgba(201,168,76,.35)', fontSize: '.85rem' }}>›</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* ── Smart Insights Flow ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid var(--bdr2)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: '.62rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Smart Insights Flow</span>
                  <span style={{ fontSize: '.62rem', color: 'var(--muted)', letterSpacing: '.08em' }}>3 screens · Overview → Category → AI Recommendation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, maxWidth: '62%' }}>
                  {[
                    { img: 'wf-insights-1-overview',  label: 'Insights Overview' },
                    { img: 'wf-insights-2-category',  label: 'Category Details' },
                    { img: 'wf-insights-3-ai',        label: 'AI Recommendation' },
                  ].map(({ img, label }, i, arr) => (
                    <React.Fragment key={img}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <div style={{ width: '100%', aspectRatio: '9/19', background: 'var(--s3)', border: '1px solid var(--bdr2)', borderRadius: 10, overflow: 'hidden' }}>
                          <img
                            src={`${import.meta.env.BASE_URL}images/wireframes/${img}.png`}
                            alt={label}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                        <span style={{ fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.4 }}>{label}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, padding: '0 4px', paddingTop: '20%' }}>
                          <span style={{ color: 'rgba(201,168,76,.35)', fontSize: '.85rem' }}>›</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 08 DESIGN SYSTEM · 09 KEY FLOWS */}
          {LATE_SECTIONS.map(({ tag, title, body }) => (
            <div key={tag} style={ROW}>
              <div><span style={SL}>{tag}</span></div>
              <div>
                <h2 style={SH}>{title}</h2>
                {body.split('\n\n').map((p, i) => (
                  <p key={i} style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 16 }}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          {/* 10 — SCREENS */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64, alignItems: 'start', marginBottom: 96, paddingBottom: 96, borderBottom: '1px solid var(--bdr2)' }}>
            <span style={SL}>10 — Screens</span>
            <div>
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
              <p style={{ fontSize: '.75rem', color: 'var(--muted)', textAlign: 'center', marginTop: 16, letterSpacing: '.08em', opacity: .6 }}>NDA — hi-fidelity screens available on request</p>
            </div>
          </div>

          {/* 11 — LEARNINGS */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64, alignItems: 'start' }}>
            <span style={SL}>11 — Learnings</span>
            <div>
              <h2 style={SH}>What shipped, what we would change</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  ["Trust is earned at edge cases", "The failure states — network errors, transfer holds, FX rate expiry — were where we won or lost users. We spent 30% of design time on flows most PMs consider secondary."],
                  ["AI needs a voice, not a dashboard", "Early prototypes showed charts. Users ignored them. A single sentence in plain English drove 3x more action than any visualisation."],
                  ["Arabic-first is not just RTL", "Date formats, number grouping, and even the meaning of colours differ. We embedded a native Arabic speaker in every user testing session from sprint 2."],
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
            <a href="mailto:priyamvada.s.m@gmail.com"
              style={{ display: 'inline-block', fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--black)', background: 'var(--gold)', padding: '13px 28px', textDecoration: 'none', cursor: 'none', transition: 'background .25s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold2)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold)')}
            >Get in touch →</a>
            <a href="https://priyauxd.github.io/2026/"
              style={{ display: 'inline-block', fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--border)', padding: '13px 28px', textDecoration: 'none', cursor: 'none', transition: 'border-color .25s,color .25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
            >← All Work</a>
          </div>
        </section>

      </div>
    </>
  )
}
