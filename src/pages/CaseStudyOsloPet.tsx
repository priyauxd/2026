import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Cursor from '../components/Cursor'

/* ─── COLOUR TOKENS ───────────────────────────────────── */
const TEAL  = '#5BB9C4'
const RUBY  = '#E84F6B'
const DARK  = '#1a2436'

/* ─── SCREEN MOCKUPS ───────────────────────────────────── */

function BrowserFrame({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,.35)', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#f5f5f5', borderBottom: '1px solid #e0e0e0', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ flex: 1, background: '#e8e8e8', borderRadius: 6, padding: '4px 12px', fontSize: '.68rem', color: '#888', textAlign: 'center' }}>{url}</div>
      </div>
      {children}
    </div>
  )
}


function LoginScreen() {
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,.35)', maxWidth: 340, margin: '0 auto' }}>
      <div style={{ height: 480, overflow: 'hidden' }}>
        <img
          src={`${import.meta.env.BASE_URL}images/oslo-login.png`}
          alt="Pet Cloud login"
          style={{ display: 'block', width: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}

function DashboardScreen() {
  return (
    <BrowserFrame url="cloud.oslopetinsurance.pet / home">
      <img
        src={`${import.meta.env.BASE_URL}images/oslo-dashboard.png`}
        alt="Pet Cloud dashboard"
        style={{ display: 'block', width: '100%' }}
      />
    </BrowserFrame>
  )
}

function MyPetsScreen() {
  return (
    <BrowserFrame url="cloud.oslopetinsurance.pet / my-pets">
      <img
        src={`${import.meta.env.BASE_URL}images/oslo-mypets.png`}
        alt="My Pets screen"
        style={{ display: 'block', width: '100%' }}
      />
    </BrowserFrame>
  )
}

function ClaimsScreen() {
  return (
    <BrowserFrame url="cloud.oslopetinsurance.pet / my-claims">
      <img
        src={`${import.meta.env.BASE_URL}images/oslo-claims.png`}
        alt="Pet Cloud claims"
        style={{ display: 'block', width: '100%' }}
      />
    </BrowserFrame>
  )
}

/* ─── REVEAL HOOK ──────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) } }),
      { threshold: 0.05 }
    )
    el.querySelectorAll('.rv').forEach(r => io.observe(r))
    return () => io.disconnect()
  }, [])
  return ref
}

/* ─── PAGE ─────────────────────────────────────────────── */
export default function CaseStudyOsloPet() {
  const sectionRef = useReveal() as React.RefObject<HTMLElement>
  const navigate = useNavigate()

  const s: Record<string, React.CSSProperties> = {
    page:  { background: 'var(--black)', color: 'var(--white)', fontFamily: 'Outfit, sans-serif', fontWeight: 300, minHeight: '100vh' },
    wrap:  { maxWidth: 1120, margin: '0 auto', padding: '0 var(--pad)' },
    label: { fontSize: '.6rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: TEAL },
    h2:    { fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.9rem,3.5vw,3rem)', fontWeight: 300, lineHeight: 1.1 },
    muted: { fontSize: '.82rem', color: 'var(--muted)', lineHeight: 1.75 },
    card:  { background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: 28 },
  }

  return (
    <div style={s.page}>
      <Cursor />

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px var(--pad)', borderBottom: '1px solid var(--bdr2)', background: 'rgba(8,8,15,.92)', backdropFilter: 'blur(12px)' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--white)', fontFamily: 'Outfit, sans-serif', fontSize: '.82rem', cursor: 'none', opacity: .75 }}>
          ← Back to portfolio
        </button>
        <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Oslo Pet Insurance — Pet Cloud
        </div>
      </nav>

      <main ref={sectionRef} style={{ paddingTop: 80 }}>

        {/* ── CASE STUDY HEADER ── */}
        <section style={{ padding: '80px var(--pad) 72px', borderBottom: '1px solid var(--bdr2)' }}>
          <div style={{ ...s.wrap }}>
            <div className="rv" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
              {['Customer Portal','Pet Insurance','UAE · Norway','UX + UI Design'].map(tag => (
                <span key={tag} style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', padding: '5px 13px', border: `1px solid ${TEAL}33`, color: TEAL, borderRadius: 20 }}>{tag}</span>
              ))}
            </div>
            <h1 className="rv" style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2.4rem,6vw,5.2rem)', fontWeight: 300, lineHeight: .95, letterSpacing: '-.02em', marginBottom: 28 }}>
              Pet Cloud —<br />
              <em style={{ fontStyle: 'italic', color: TEAL }}>a home for every pet family</em>
            </h1>
            <p className="rv d2" style={{ ...s.muted, maxWidth: 620, marginBottom: 48 }}>
              End-to-end design of the Pet Cloud customer portal for Oslo Pet Insurance — giving pet owners a personalised, self-service space to manage policies, track their pets, submit claims, and access vet care in one warm, friendly interface.
            </p>
            <div className="rv d3" style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
              {[['Role','Lead Product Designer'],['Platform','Web + Mobile Responsive'],['Client','Oslo Pet Insurance, UAE & Norway'],['Live','oslopetinsurance.pet']].map(([k, v]) => (
                <div key={k}>
                  <div style={{ ...s.label, marginBottom: 5 }}>{k}</div>
                  <div style={{ fontSize: '.88rem', color: 'var(--white)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUTCOMES ── */}
        <section style={{ background: 'var(--s1)', borderBottom: '1px solid var(--bdr2)' }}>
          <div style={{ ...s.wrap, padding: '44px var(--pad)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 32 }}>
              {[['3,000+','Pet parents onboarded'],['6','Core flows designed'],['3 days','Avg claim close time'],['35+','UI components'],['2','Theme modes']].map(({ 0: n, 1: l }) => (
                <div className="rv" key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '2.6rem', fontWeight: 300, color: TEAL, lineHeight: 1, marginBottom: 6 }}>{n}</div>
                  <div style={{ fontSize: '.65rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section style={{ padding: '80px var(--pad)', borderBottom: '1px solid var(--bdr2)' }}>
          <div style={{ ...s.wrap }}>
            <div className="rv" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <div style={{ ...s.label, marginBottom: 14 }}>01 — Problem</div>
                <h2 style={{ ...s.h2, marginBottom: 20 }}>
                  Pet insurance with no<br /><em style={{ fontStyle: 'italic', color: TEAL }}>digital home</em>
                </h2>
                <p style={{ ...s.muted, marginBottom: 16 }}>
                  Oslo Pet Insurance had a strong product but no self-service portal. After purchasing, customers had no way to view their policy, track claims, or manage multiple pets — every query went to the call centre.
                </p>
                <p style={{ ...s.muted }}>
                  The brief: design a portal that eliminates the call centre as the default support channel, while making pet owners feel genuinely at home.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['📞', 'Every claim status query went to the call centre'],
                  ['📄', 'Policy documents were PDFs with no live status view'],
                  ['🐾', 'Multi-pet households had no unified management'],
                  ['⏱', 'No transparency on claim timelines post-submission'],
                ].map(([icon, text]) => (
                  <div key={text} style={{ ...s.card, display: 'flex', gap: 14, alignItems: 'center', borderLeft: `3px solid ${TEAL}` }}>
                    <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{icon}</span>
                    <span style={{ fontSize: '.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RESEARCH ── */}
        <section style={{ padding: '80px var(--pad)', background: 'var(--s1)', borderBottom: '1px solid var(--bdr2)' }}>
          <div style={{ ...s.wrap }}>
            <div className="rv" style={{ marginBottom: 48 }}>
              <div style={{ ...s.label, marginBottom: 14 }}>02 — Research</div>
              <h2 style={{ ...s.h2, marginBottom: 16 }}>
                What pet owners actually<br /><em style={{ fontStyle: 'italic', color: TEAL }}>needed</em>
              </h2>
              <p style={{ ...s.muted, maxWidth: 600 }}>
                Interviews with 14 existing customers in Dubai and Abu Dhabi. One question drove the research: what do you wish you could do yourself, without calling us?
              </p>
            </div>
            <div className="rv d2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 48 }}>
              {[
                { n: '01', title: 'Claims are a black box', body: 'After submission, customers heard nothing. "I submitted a claim 2 weeks ago and still don\'t know if it\'s being processed." Real-time status was the #1 request.' },
                { n: '02', title: 'Multi-pet is messy', body: 'Families with 2–4 pets had different renewal dates, coverage levels, and claim histories — impossible to track without a dedicated view per pet.' },
                { n: '03', title: 'Policy feels abstract', body: 'Users couldn\'t answer "what is my pet covered for today?" A coverage status card — not a PDF — was what they needed.' },
                { n: '04', title: 'Emotional connection matters', body: 'Pet owners see their pets as family. A cold dashboard kills trust. Warmth, personality, and using pet names throughout the interface drove engagement.' },
              ].map(({ n, title, body }) => (
                <div key={n} style={{ ...s.card, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '2.8rem', fontWeight: 300, color: `${TEAL}18`, lineHeight: 1 }}>{n}</div>
                  <div style={{ ...s.label, marginBottom: 10 }}>{n}</div>
                  <div style={{ fontSize: '.9rem', fontWeight: 500, color: 'var(--white)', marginBottom: 10 }}>{title}</div>
                  <p style={{ ...s.muted, fontSize: '.78rem', margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>

            {/* Personas */}
            <div className="rv d3">
              <div style={{ ...s.label, marginBottom: 18 }}>User Personas</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
                {[
                  { name: 'Sarah, 34', role: 'Busy professional · 2 cats', needs: ['Check claim status on mobile','Get renewal alerts before expiry','See coverage summary at a glance'], pain: 'Calls the call centre 3× per claim — no self-service status tracking.' },
                  { name: 'Ahmed, 41', role: 'Family man · 3 dogs', needs: ['Multi-pet household at a glance','Download claim documents','Separate policy tracking per pet'], pain: 'Each pet has a different expiry date — impossible to track without spreadsheets.' },
                ].map(({ name, role, needs, pain }) => (
                  <div key={name} style={{ ...s.card }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${TEAL}22`, border: `1px solid ${TEAL}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>👤</div>
                      <div>
                        <div style={{ fontSize: '.9rem', fontWeight: 500, color: 'var(--white)' }}>{name}</div>
                        <div style={{ fontSize: '.7rem', color: 'var(--muted)' }}>{role}</div>
                      </div>
                    </div>
                    <div style={{ ...s.label, marginBottom: 8 }}>Needs</div>
                    <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 14 }}>
                      {needs.map(n => (
                        <li key={n} style={{ display: 'flex', gap: 8, fontSize: '.78rem', color: 'var(--muted)', marginBottom: 5, alignItems: 'flex-start' }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL, display: 'inline-block', flexShrink: 0, marginTop: 6 }} />
                          {n}
                        </li>
                      ))}
                    </ul>
                    <div style={{ background: 'var(--s3)', borderRadius: 8, padding: '11px 13px', borderLeft: `3px solid ${RUBY}` }}>
                      <div style={{ fontSize: '.6rem', fontWeight: 500, color: RUBY, marginBottom: 4, letterSpacing: '.1em', textTransform: 'uppercase' }}>Pain Point</div>
                      <p style={{ fontSize: '.76rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{pain}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── LOGIN ── */}
        <section style={{ padding: '80px var(--pad)', borderBottom: '1px solid var(--bdr2)' }}>
          <div style={{ ...s.wrap }}>
            <div className="rv" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
              <div>
                <div style={{ ...s.label, marginBottom: 14 }}>03 — Entry Point</div>
                <h2 style={{ ...s.h2, marginBottom: 20 }}>
                  A login that feels like<br /><em style={{ fontStyle: 'italic', color: TEAL }}>coming home</em>
                </h2>
                <p style={{ ...s.muted, marginBottom: 20 }}>
                  The login screen sets the tone for the entire portal. Warm cream background, a pet collar decorative motif, and copy that says "Welcome to your pet cloud" — not "Sign in to your account."
                </p>
                {['"Pet Cloud" — named to feel personal, not transactional', 'Warm cream (#f9f0e8) carries brand warmth from day one', '"Get in" CTA — friendly tone, not clinical "Login"', 'Decorative collar ring reinforces the pet brand identity'].map(p => (
                  <div key={p} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL, flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
              <LoginScreen />
            </div>
          </div>
        </section>

        {/* ── DASHBOARD ── */}
        <section style={{ padding: '80px var(--pad)', background: 'var(--s1)', borderBottom: '1px solid var(--bdr2)' }}>
          <div style={{ ...s.wrap }}>
            <div className="rv" style={{ marginBottom: 36 }}>
              <div style={{ ...s.label, marginBottom: 14 }}>04 — Dashboard</div>
              <h2 style={{ ...s.h2, marginBottom: 16 }}>
                Everything at a glance —<br /><em style={{ fontStyle: 'italic', color: TEAL }}>no drilling required</em>
              </h2>
              <p style={{ ...s.muted, maxWidth: 620 }}>
                The dashboard surfaces what customers called most: claim ratio, coverage used, policy status, recent activity, and all their pets — in one view. Quick-action CTAs (Talk to Vet, Send a Claim) live in the header.
              </p>
            </div>
            <div className="rv d2">
              <DashboardScreen />
            </div>
            <div className="rv d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 20 }}>
              {[
                ['Per-pet stats', 'Tab switcher shows stats scoped to each pet — Oslo, Blah, Luna — individually.'],
                ['Live activity feed', 'Real-time events (Claim Submitted, Policy Renewed) replace the call centre update call.'],
                ['Persistent CTAs', '"Send a Claim" and "Talk to Vet" always accessible in the header — zero navigation required.'],
              ].map(([t, d]) => (
                <div key={t} style={{ ...s.card, borderLeft: `3px solid ${TEAL}` }}>
                  <div style={{ fontSize: '.82rem', fontWeight: 500, color: 'var(--white)', marginBottom: 6 }}>{t}</div>
                  <p style={{ ...s.muted, fontSize: '.76rem', margin: 0 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MY PETS ── */}
        <section style={{ padding: '80px var(--pad)', borderBottom: '1px solid var(--bdr2)' }}>
          <div style={{ ...s.wrap }}>
            <div className="rv" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
              <MyPetsScreen />
              <div>
                <div style={{ ...s.label, marginBottom: 14 }}>05 — My Pets</div>
                <h2 style={{ ...s.h2, marginBottom: 20 }}>
                  Every pet has their<br /><em style={{ fontStyle: 'italic', color: TEAL }}>own story</em>
                </h2>
                <p style={{ ...s.muted, marginBottom: 20 }}>
                  Each pet profile is personalised — photo, bio, microchip ID, and physical stats (age, weight, color, neutered). An "Oslo's Favorites" section gives the interface warmth. Policy actions (Renew, Manage) sit inline with the profile.
                </p>
                {['Inline Renew Plan + Manage Policy CTAs', 'Visual status badges: Expires / Active / Expired', 'Microchip ID visible for vet visits', 'Add a Pet shortcut always visible in the sidebar'].map(p => (
                  <div key={p} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL, flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CLAIMS ── */}
        <section style={{ padding: '80px var(--pad)', background: 'var(--s1)', borderBottom: '1px solid var(--bdr2)' }}>
          <div style={{ ...s.wrap }}>
            <div className="rv" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
              {/* 06 — Claims */}
              <div>
                <div style={{ ...s.label, marginBottom: 14 }}>06 — Claims</div>
                <h2 style={{ ...s.h2, marginBottom: 20 }}>
                  Transparent claims,<br /><em style={{ fontStyle: 'italic', color: TEAL }}>real-time status</em>
                </h2>
                <p style={{ ...s.muted, marginBottom: 20 }}>
                  The module that eliminated the #1 call centre driver. A split layout lets users select which pet's claims to view, then browse by status (All / In Progress / Completed) with instant PDF document access.
                </p>
                {['Pet-scoped claim view — one pet at a time', 'Tab filter: All, In Progress, Completed', 'Claim #, status, billed amount, date, PDF download', 'Colour-coded section backgrounds (blue = processing, green = complete)'].map(p => (
                  <div key={p} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL, flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
                <div style={{ marginTop: 32 }}>
                  <ClaimsScreen />
                </div>
              </div>

              {/* 07 — Mobile Experience */}
              <div>
                <div style={{ ...s.label, marginBottom: 14 }}>07 — Mobile Experience</div>
                <h2 style={{ ...s.h2, marginBottom: 20 }}>
                  Designed for<br /><em style={{ fontStyle: 'italic', color: TEAL }}>every screen</em>
                </h2>
                <img
                  src={`${import.meta.env.BASE_URL}images/oslo-mobile-screens.png`}
                  alt="Pet Cloud mobile screens"
                  style={{ display: 'block', width: '100%', marginTop: 32 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── LEARNINGS ── */}
        <section style={{ padding: '80px var(--pad)', borderBottom: '1px solid var(--bdr2)' }}>
          <div style={{ ...s.wrap }}>
            <div className="rv" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
              <div>
                <div style={{ ...s.label, marginBottom: 14 }}>08 — Learnings</div>
                <h2 style={{ ...s.h2, marginBottom: 24 }}>
                  What this<br /><em style={{ fontStyle: 'italic', color: TEAL }}>project taught me</em>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    ['Emotion-first design scales', 'A warm, pet-centric identity — not generic insurance UI — drove genuine engagement. Users described the portal as "friendly" and "not intimidating."'],
                    ['Multi-entity UX is hard', 'Designing for households with multiple pets at different policy stages required careful information architecture. The pet-as-anchor pattern solved it.'],
                    ['Claims UX = trust building', 'Real-time claim status transparency was the single highest-impact feature. Reducing uncertainty reduced call centre load by removing the reason to call.'],
                  ].map(([title, body]) => (
                    <div key={title} style={{ ...s.card, borderLeft: `3px solid ${TEAL}` }}>
                      <div style={{ fontSize: '.82rem', fontWeight: 500, color: 'var(--white)', marginBottom: 6 }}>{title}</div>
                      <p style={{ ...s.muted, fontSize: '.76rem', margin: 0 }}>{body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ ...s.label, marginBottom: 14 }}>Live Product</div>
                <h2 style={{ ...s.h2, marginBottom: 20 }}>
                  Shipped to<br /><em style={{ fontStyle: 'italic', color: TEAL }}>production</em>
                </h2>
                <p style={{ ...s.muted, marginBottom: 28 }}>
                  Pet Cloud is live — a fully responsive web application serving pet owners across the UAE and Norway with self-service policy management, claims tracking, and vet access.
                </p>
                <a href="https://oslopetinsurance.pet" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 24px', background: TEAL, color: DARK, borderRadius: 8, fontSize: '.78rem', fontWeight: 600, textDecoration: 'none', cursor: 'none', letterSpacing: '.04em' }}>
                  Visit oslopetinsurance.pet ↗
                </a>
                <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[['6','Core flows designed'],['35+','UI components'],['3,000+','Pet parents onboarded'],['∞','Pets protected 🐾']].map(([n, l]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--bdr2)' }}>
                      <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{l}</span>
                      <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.5rem', fontWeight: 300, color: TEAL }}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: '80px var(--pad)' }}>
          <div style={{ ...s.wrap, textAlign: 'center' }}>
            <div className="rv">
              <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2rem,4vw,3.6rem)', fontWeight: 300, lineHeight: 1, marginBottom: 20 }}>
                Interested in working<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>together?</em>
              </h2>
              <p style={{ ...s.muted, maxWidth: 480, margin: '0 auto 36px' }}>
                I design products people love to use. If you're building in fintech, insurtech, or enterprise SaaS — let's talk.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
                <a href="mailto:priyamvada.s.m@gmail.com" style={{ padding: '12px 28px', background: 'var(--gold)', color: 'var(--black)', borderRadius: 8, fontSize: '.78rem', fontWeight: 600, textDecoration: 'none', cursor: 'none', letterSpacing: '.04em' }}>
                  Get in touch →
                </a>
                <button onClick={() => navigate('/')} style={{ padding: '12px 28px', background: 'transparent', border: '1px solid var(--bdr2)', color: 'var(--white)', borderRadius: 8, fontSize: '.78rem', cursor: 'none', fontFamily: 'Outfit, sans-serif' }}>
                  ← Back to portfolio
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
