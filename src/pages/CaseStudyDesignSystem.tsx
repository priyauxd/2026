import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cursor from '../components/Cursor'

/* ─── DATA ────────────────────────────────────────────────── */

const OUTCOMES = [
  { n: '150+', l: 'Components built' },
  { n: '50%', l: 'Faster handoff' },
  { n: '3', l: 'Product teams unified' },
  { n: '6', l: 'Component categories' },
]

const STEPS = [
  { num: '01', title: 'Audit & Inventory', desc: 'Catalogued every existing component across three products — identified 87 unique elements, 40% of which were duplicates with inconsistent styling.' },
  { num: '02', title: 'Token Architecture', desc: 'Defined color, spacing, typography, and radius tokens as the foundational layer — ensuring every value had a single source of truth.' },
  { num: '03', title: 'Component Build', desc: 'Built components with variants, states, and accessibility baked in — from buttons with 8 hierarchy levels to complex data tables.' },
  { num: '04', title: 'Adoption & Docs', desc: 'Wrote usage guidelines, created Storybook stories, and ran workshops to drive adoption across all three product teams.' },
]

const BEFORE_ITEMS = [
  '8 different button styles across the product',
  'Developers rebuilding components from scratch each sprint',
  'No shared color tokens — hex values hardcoded everywhere',
  'Design reviews spent on pixel corrections, not UX decisions',
  'New designers onboarded with no single source of truth',
]

const AFTER_ITEMS = [
  'One button component, 8 variants, zero ambiguity',
  'Engineers consume components directly from Figma tokens',
  'Global color, spacing, and type tokens synced to code',
  'Design reviews focus on flow and experience',
  'New team members productive within their first week',
]

/* ── PRIMITIVES (from Figma Variables — Premitives.Mode) ── */
const PRIMITIVES = [
  {
    label: 'Primary (Magenta)',
    shades: [
      { grade: '900', hex: '#291b36' },
      { grade: '800', hex: '#661d47' },
      { grade: '700', hex: '#ad3278' },
      { grade: '600', hex: '#cd5197' },
      { grade: '300', hex: '#d598bb' },
      { grade: '200', hex: '#f1e1e9' },
      { grade: '100', hex: '#f8e6ef' },
      { grade: '50',  hex: '#f9eff5' },
    ],
  },
  {
    label: 'Purple',
    shades: [
      { grade: '900', hex: '#453261' },
      { grade: '800', hex: '#845ec2' },
      { grade: '700', hex: '#b576f3' },
      { grade: '300', hex: '#dcd6ff' },
      { grade: '200', hex: '#e6deed' },
      { grade: '100', hex: '#ebe8ff' },
      { grade: '50',  hex: '#f3f1ff' },
    ],
  },
  {
    label: 'Red',
    shades: [
      { grade: '900', hex: '#221a2b' },
      { grade: '800', hex: '#812c30' },
      { grade: '700', hex: '#e31b0c' },
      { grade: '600', hex: '#f44336' },
      { grade: '300', hex: '#f88078' },
      { grade: '200', hex: '#f9a09a' },
      { grade: '100', hex: '#feeceb' },
      { grade: '50',  hex: '#fff0ef' },
    ],
  },
  {
    label: 'Green',
    shades: [
      { grade: '900', hex: '#2f423e' },
      { grade: '800', hex: '#025d4b' },
      { grade: '700', hex: '#00906b' },
      { grade: '400', hex: '#4caf50' },
      { grade: '300', hex: '#66d188' },
      { grade: '200', hex: '#25d366' },
      { grade: '100', hex: '#d8f2cf' },
      { grade: '50',  hex: '#e0fbd6' },
    ],
  },
  {
    label: 'Blue',
    shades: [
      { grade: '900', hex: '#3b5998' },
      { grade: '800', hex: '#0b79d0' },
      { grade: '700', hex: '#76a7f2' },
      { grade: '600', hex: '#9bc4ff' },
      { grade: '100', hex: '#cee2ff' },
      { grade: '50',  hex: '#ddebff' },
    ],
  },
  {
    label: 'Water',
    shades: [
      { grade: '500', hex: '#2196f3' },
      { grade: '400', hex: '#64b6f7' },
      { grade: '300', hex: '#8fcaf8' },
      { grade: '200', hex: '#bee3ff' },
      { grade: '100', hex: '#dbf0ff' },
      { grade: '50',  hex: '#ecf7ff' },
    ],
  },
  {
    label: 'Orange',
    shades: [
      { grade: '900', hex: '#c77700' },
      { grade: '800', hex: '#ff844c' },
      { grade: '700', hex: '#ff9b24' },
      { grade: '600', hex: '#ffb547' },
      { grade: '500', hex: '#f5b580' },
      { grade: '50',  hex: '#fdf0e5' },
    ],
  },
  {
    label: 'Grey',
    shades: [
      { grade: '900', hex: '#212121' },
      { grade: '800', hex: '#424242' },
      { grade: '700', hex: '#616161' },
      { grade: '600', hex: '#7f7f7f' },
      { grade: '500', hex: '#9e9e9e' },
      { grade: '400', hex: '#bdbdbd' },
      { grade: '300', hex: '#e0e0e0' },
      { grade: '200', hex: '#eeeeee' },
      { grade: '100', hex: '#f5f5f5' },
      { grade: '50',  hex: '#fafafa' },
    ],
  },
  {
    label: 'Blurey (Dark)',
    shades: [
      { grade: '900', hex: '#2c3344' },
      { grade: '800', hex: '#374457' },
      { grade: '700', hex: '#263448' },
      { grade: '600', hex: '#0f172a' },
      { grade: '500', hex: '#1e2a3b' },
      { grade: '400', hex: '#2c3344' },
      { grade: '300', hex: '#22293b' },
      { grade: '200', hex: '#575c69' },
      { grade: '100', hex: '#878b95' },
      { grade: '50',  hex: '#b7b9bf' },
    ],
  },
]

/* ── SEMANTIC TOKENS (from Design Tokens Light / Dark) ── */
const SEMANTIC_TOKENS = [
  { category: 'Primary', role: 'Brand magenta — buttons, links, active states', light: '#ad3278', dark: '#cd5197' },
  { category: 'Error', role: 'Destructive actions, validation errors', light: '#f44336', dark: '#f44336' },
  { category: 'Warning', role: 'Caution states, pending actions', light: '#ff844c', dark: '#ff844c' },
  { category: 'Info', role: 'Informational alerts, help tooltips', light: '#2196f3', dark: '#2196f3' },
  { category: 'Success', role: 'Confirmations, completed states', light: '#4caf50', dark: '#4caf50' },
  { category: 'Lime', role: 'Secondary positive actions', light: '#78ae32', dark: '#78ae32' },
]

const SEMANTIC_BG = [
  { token: 'Paper primary', light: '#ffffff', dark: '#0f172a' },
  { token: 'Paper secondary', light: '#fafafa', dark: '#1e2a3b' },
  { token: 'Tertiary', light: '#f5f5f5', dark: '#263448' },
  { token: 'Quaternary', light: '#eeeeee', dark: '#374457' },
]

const SEMANTIC_TEXT = [
  { token: 'Primary', light: '#212121', dark: '#ffffff' },
  { token: 'Secondary', light: '#7f7f7f', dark: '#b7b9bf' },
  { token: 'Disabled', light: '#9e9e9e', dark: '#878b95' },
]

/* ── CORE TOKENS (from Figma Variables — Core.Mode 1) ── */
const CORE_SPACER = [
  { token: 'base', value: 0 }, { token: 'xxs', value: 4 }, { token: 'xs', value: 8 },
  { token: 's', value: 12 }, { token: 'r', value: 16 }, { token: 'm', value: 20 },
  { token: 'l', value: 24 }, { token: 'xl', value: 28 }, { token: '2xl', value: 32 },
  { token: '3xl', value: 40 }, { token: '4xl', value: 48 },
]

const CORE_MARGINS = [
  { token: '2x', value: 4 }, { token: 'xs', value: 8 }, { token: 'sm', value: 12 },
  { token: 'md', value: 16 }, { token: 'lg', value: 20 }, { token: 'xxl', value: 24 },
  { token: '2xl', value: 32 }, { token: '3xl', value: 40 }, { token: '4xl', value: 48 },
  { token: '5xl', value: 56 },
]

const CORE_SHAPE = [
  { token: 'xxs', value: 16 }, { token: 'xs', value: 20 }, { token: 'sm', value: 24 },
  { token: 'md', value: 32 }, { token: 'lg', value: 40 }, { token: 'xl', value: 48 },
  { token: '2xl', value: 56 }, { token: '3xl', value: 64 }, { token: '4xl', value: 76 },
]

const CORE_RADIUS = [
  { token: '2x', value: 0 }, { token: 'xs', value: 2 }, { token: 'sm', value: 4 },
  { token: 'md', value: 6 }, { token: 'lg', value: 10 }, { token: 'xl', value: 12 },
  { token: '2xl', value: 14 }, { token: '3xl', value: 16 },
]

/* ── STATUS & CHANNEL TOKENS ── */
const STATUS_TOKENS = [
  { token: 'Available', hex: '#66d188' },
  { token: 'On Break', hex: '#ff9b24' },
  { token: 'Meeting', hex: '#8b572a' },
  { token: 'On Call', hex: '#ad3278' },
  { token: 'Outgoing', hex: '#3b5998' },
  { token: 'Roaming', hex: '#0b79d0' },
  { token: 'After Call Work', hex: '#8eb29e' },
  { token: 'Logged Off', hex: '#f5f5f5' },
  { token: 'Eavesdrop', hex: '#b576f3' },
  { token: 'Conference', hex: '#0ac5cc' },
  { token: 'Abandoned', hex: '#845ec2' },
  { token: 'Timeout', hex: '#424242' },
]

const CHANNEL_TOKENS = [
  { token: 'WhatsApp', hex: '#25d366' },
  { token: 'Inbound', hex: '#76a7f2' },
  { token: 'Outbound', hex: '#845ec2' },
  { token: 'Notes', hex: '#f3df70' },
  { token: 'SMS', hex: '#0b79d0' },
]

const TAG_TOKENS = [
  { token: 'Indigo', hex: '#3b5998' },
  { token: 'Chili', hex: '#812c30' },
  { token: 'Fire', hex: '#f44336' },
  { token: 'Cool', hex: '#0b79d0' },
  { token: 'Nature', hex: '#025d4b' },
  { token: 'Sky', hex: '#2bc8ff' },
  { token: 'Royal', hex: '#b576f3' },
  { token: 'Gold', hex: '#ffb547' },
  { token: 'Coral', hex: '#f9a09a' },
  { token: 'Rose', hex: '#ee4f84' },
  { token: 'Water', hex: '#2196f3' },
  { token: 'Grass', hex: '#66d188' },
  { token: 'Jungle', hex: '#d4e257' },
  { token: 'Amber', hex: '#ff844c' },
  { token: 'Yale', hex: '#76a7f2' },
  { token: 'Untagged', hex: '#bdbdbd' },
]

const TYPE_SCALE = [
  { name: 'Heading 1', sample: 'The quick brown fox', size: '36px / 2.25rem' },
  { name: 'Heading 2', sample: 'The quick brown fox', size: '30px / 1.875rem' },
  { name: 'Heading 3', sample: 'The quick brown fox', size: '24px / 1.5rem' },
  { name: 'Body', sample: 'The quick brown fox jumps over the lazy dog', size: '16px / 1rem' },
  { name: 'Small', sample: 'The quick brown fox jumps over the lazy dog', size: '14px / 0.875rem' },
]

const SPACING = CORE_SPACER.filter(s => s.value > 0)

const RADII = CORE_RADIUS

/* ── BUTTON SYSTEM DATA (from Figma Core Components) ── */
const BTN_TYPES = ['Solid', 'Outlined', 'Text', 'Rounded'] as const
const BTN_SIZES = ['Large', 'Medium', 'Small'] as const
const BTN_COLORS = {
  primary:   { bg: '#ad3278', hover: '#cd5197', text: '#fff', border: '#ad3278' },
  secondary: { bg: '#291b36', hover: '#3a2750', text: '#fff', border: '#453261' },
  error:     { bg: '#e31b0c', hover: '#f44336', text: '#fff', border: '#e31b0c' },
}
const BTN_SIZE_MAP = { Large: { h: 40, px: 24, fs: '.82rem', r: 6 }, Medium: { h: 36, px: 20, fs: '.78rem', r: 6 }, Small: { h: 32, px: 16, fs: '.72rem', r: 4 } }
const BTN_STATES = ['Resting', 'Hover', 'Disabled'] as const

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
const SP: React.CSSProperties = {
  fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)',
}
const SECT: React.CSSProperties = {
  padding: '80px var(--pad)',
  borderBottom: '1px solid var(--bdr2)',
}
const CARD: React.CSSProperties = {
  background: 'var(--s2)',
  border: '1px solid var(--bdr2)',
  borderRadius: 3,
  padding: 32,
}

/* ─── PAGE ────────────────────────────────────────────────── */

export default function CaseStudyDesignSystem() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'theme' | 'components'>('theme')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Cursor />
      <main style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh', cursor: 'none' }}>

        {/* ── BACK NAV ── */}
        <div style={{ padding: '24px var(--pad)', borderBottom: '1px solid var(--bdr2)' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontSize: '1rem' }}>←</span> Back to Projects
          </button>
        </div>

        {/* ── HERO ── */}
        <section style={{ padding: '0 var(--pad)', borderBottom: '1px solid var(--bdr2)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 680, gap: 0 }}>
            {/* Left — Title */}
            <div style={{ padding: '80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(130deg, rgba(201,168,76,.06) 0%, var(--s1) 50%, rgba(201,168,76,.02) 100%)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, right: '50%', width: 256, height: 256, borderRadius: '50%', background: 'rgba(201,168,76,.04)', filter: 'blur(64px)' }} />
              <p style={{ ...SL, marginBottom: 32 }}>Case Study · Design System</p>
              <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2.4rem,5vw,4.5rem)', fontWeight: 300, lineHeight: .95, letterSpacing: '-.02em', marginBottom: 32 }}>
                One System.<br />
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Zero</em> Chaos.
              </h1>
              <p style={{ ...SP, maxWidth: 420, marginBottom: 56 }}>
                How I unified design across three product teams, reduced developer rework, and built a component library that became the foundation of our entire platform.
              </p>
              <div style={{ display: 'flex', gap: 48 }}>
                {[['150', '+', 'Components'], ['50', '%', 'Faster Handoff'], ['3', '', 'Product Teams']].map(([n, sup, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '2.8rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
                      {n}<sup style={{ fontSize: '1.4rem', verticalAlign: 'super' }}>{sup}</sup>
                    </div>
                    <div style={{ fontSize: '.62rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 8 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Quote & Challenge */}
            <div style={{ padding: '80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(130deg, var(--s2) 0%, var(--s1) 50%, var(--s2) 100%)', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 384, height: 384, borderRadius: '50%', background: 'rgba(201,168,76,.03)', filter: 'blur(64px)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '3.6rem', color: 'rgba(201,168,76,.3)', lineHeight: 1 }}>"</span>
                <p style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.2rem,1.8vw,1.5rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, color: 'var(--white)', marginBottom: 32, maxWidth: 420 }}>
                  Two designers, three product teams, and one question: 'What shade of magenta should this button be?'
                </p>
                <p style={{ ...SP, maxWidth: 420, marginBottom: 40 }}>
                  The company was growing fast, but design inconsistencies were slowing down development and eroding user trust. Each team built components from scratch — duplicated effort, fragmented experiences.
                </p>
                <div style={{ background: 'rgba(201,168,76,.04)', border: '1px solid rgba(201,168,76,.15)', borderRadius: 10, padding: 25 }}>
                  <p style={{ fontSize: '.62rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>The Challenge</p>
                  <p style={{ fontSize: '.92rem', lineHeight: 1.65, color: 'var(--white)' }}>
                    How might we unify design across three product teams while reducing developer rework and accelerating delivery?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ROLE STRIP ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid var(--bdr2)' }}>
          {[['My Role', 'Design System Lead'], ['Timeline', '10 months'], ['Team', '3 Designers, 4 Frontend Engineers, 1 PM'], ['Tools', 'Figma, Storybook, React, TypeScript']].map(([k, v], i) => (
            <div key={k} style={{ padding: '32px var(--pad)', borderRight: i < 3 ? '1px solid var(--bdr2)' : 'none' }}>
              <div style={{ ...SL, marginBottom: 6 }}>{k}</div>
              <div style={{ fontSize: '.85rem', color: 'var(--white)' }}>{v}</div>
            </div>
          ))}
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

        {/* ── TAB BAR ── */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--bdr2)', position: 'sticky', top: 0, zIndex: 50, background: 'var(--black)' }}>
          {(['theme', 'components'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '18px 0', cursor: 'none',
                background: 'none', border: 'none', borderBottom: tab === t ? '2px solid var(--gold)' : '2px solid transparent',
                fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase',
                color: tab === t ? 'var(--gold)' : 'var(--muted)',
                transition: 'color .25s, border-color .25s',
              }}
            >
              {t === 'theme' ? 'Theme' : 'Components'}
            </button>
          ))}
        </div>

        {/* ── THEME TAB ── */}
        {tab === 'theme' && <>

        {/* ── BEFORE VS AFTER ── */}
        <section style={SECT}>
          <p style={{ ...SL, marginBottom: 12 }}>The Transformation</p>
          <h2 style={{ ...SH, marginBottom: 48 }}>Before the System</h2>
          <p style={{ ...SP, maxWidth: 640, marginBottom: 48 }}>
            Without a shared language, every team made its own design decisions. The result? Inconsistent UX, wasted engineering hours, and a product that felt like three different apps stitched together.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {/* Before */}
            <div style={{ ...CARD, borderColor: 'rgba(220,38,38,.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <span style={{ fontSize: '1.1rem', color: '#f87171' }}>✕</span>
                <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.3rem', fontWeight: 300, color: 'var(--white)' }}>Before — Fragmented</h3>
              </div>
              {/* Simulated fragmented buttons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {[
                  { bg: '#7c3aed', r: 6 }, { bg: '#2563eb', r: 20 },
                  { bg: '#6366f1', r: 0 }, { bg: '#8b5cf6', r: 12 },
                  { bg: '#94a3b8', r: 6, outline: true }, { bg: '#64748b', r: 20, outline: true },
                  { bg: '#475569', r: 0, outline: true }, { bg: '#334155', r: 8, outline: true },
                ].map((b, i) => (
                  <span key={i} style={{
                    display: 'inline-block', padding: '6px 16px', fontSize: '.72rem', fontWeight: 500,
                    borderRadius: b.r, color: b.outline ? b.bg : '#fff',
                    background: b.outline ? 'transparent' : b.bg,
                    border: b.outline ? `1px solid ${b.bg}` : 'none',
                  }}>
                    {i < 4 ? 'Submit' : 'Cancel'}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {BEFORE_ITEMS.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#f87171', fontSize: '.8rem', flexShrink: 0, marginTop: 2 }}>⊘</span>
                    <span style={{ fontSize: '.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div style={{ ...CARD, borderColor: 'rgba(34,197,94,.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <span style={{ fontSize: '1.1rem', color: '#4ade80' }}>✓</span>
                <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.3rem', fontWeight: 300, color: 'var(--white)' }}>After — Unified System</h3>
              </div>
              {/* Unified buttons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {[
                  { text: 'Primary', bg: '#7c3aed', color: '#fff' },
                  { text: 'Secondary', bg: 'transparent', color: '#e2e8f0', border: '1px solid rgba(255,255,255,.15)' },
                  { text: 'Ghost', bg: 'transparent', color: '#e2e8f0' },
                  { text: 'Danger', bg: '#dc2626', color: '#fff' },
                  { text: 'Disabled', bg: 'rgba(255,255,255,.06)', color: '#64748b' },
                  { text: 'CTA', bg: 'var(--gold)', color: 'var(--black)' },
                  { text: 'Success', bg: '#059669', color: '#fff' },
                  { text: 'Premium', bg: 'linear-gradient(135deg,#7c3aed,#2563eb)', color: '#fff' },
                ].map((b, i) => (
                  <span key={i} style={{
                    display: 'inline-block', padding: '6px 16px', fontSize: '.72rem', fontWeight: 500,
                    borderRadius: 6, color: b.color,
                    background: b.bg,
                    border: (b as any).border || 'none',
                  }}>
                    {b.text}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {AFTER_ITEMS.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#4ade80', fontSize: '.8rem', flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: '.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW I BUILT IT ── */}
        <section style={SECT}>
          <p style={{ ...SL, marginBottom: 12 }}>My Approach</p>
          <h2 style={{ ...SH, marginBottom: 12 }}>How I Built It</h2>
          <p style={{ ...SP, maxWidth: 640, marginBottom: 48 }}>
            I didn't start with components. I started with the conversations that were slowing us down — then worked backwards to the system that would eliminate them.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} style={CARD}>
                <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '2rem', fontWeight: 300, color: 'var(--gold)', display: 'block', marginBottom: 16 }}>{num}</span>
                <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.15rem', fontWeight: 400, color: 'var(--white)', marginBottom: 12 }}>{title}</h3>
                <p style={{ fontSize: '.78rem', lineHeight: 1.7, color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Design Tokens is in theme tab — rendered below after Component Library in source order but conditionally shown */}

        </>}

        {/* ── COMPONENTS TAB ── */}
        {tab === 'components' && <>

        {/* Components intro note */}
        <div style={{ padding: '28px var(--pad)', borderBottom: '1px solid var(--bdr2)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '.72rem', color: 'var(--muted)', fontStyle: 'italic' }}>
            Displaying a curated selection from the 150+ component library. Full system available under NDA.
          </span>
        </div>

        {/* ── BUTTONS COMPONENT ── */}
        <section style={SECT}>
          <p style={{ ...SL, marginBottom: 12 }}>Core Components</p>
          <h2 style={{ ...SH, marginBottom: 12 }}>Button System</h2>
          <p style={{ ...SP, maxWidth: 640, marginBottom: 48 }}>
            A comprehensive button component with 4 types, 3 sizes, 3 color roles, and full state coverage — Solid, Outlined, Text, and Rounded variants built for dark-mode enterprise interfaces.
          </p>

          {/* Button type tabs */}
          {BTN_TYPES.map(type => {
            const isRounded = type === 'Rounded'
            return (
              <div key={type} style={{ ...CARD, borderRadius: 16, padding: '36px 36px 28px', marginBottom: 24 }}>
                <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.35rem', fontWeight: 300, color: '#ad3278', marginBottom: 32 }}>{type}</h3>

                {BTN_SIZES.map(size => {
                  const s = BTN_SIZE_MAP[size]
                  const colorEntries = isRounded
                    ? ([['primary', BTN_COLORS.primary], ['secondary', BTN_COLORS.secondary]] as const)
                    : ([['primary', BTN_COLORS.primary], ['secondary', BTN_COLORS.secondary], ['error', BTN_COLORS.error]] as const)

                  return (
                    <div key={size} style={{ marginBottom: 32 }}>
                      <p style={{ fontSize: '.68rem', fontWeight: 600, color: 'var(--white)', marginBottom: 16, letterSpacing: '.1em' }}>{size}</p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {colorEntries.map(([role, c]) => (
                          <div key={role} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                            <span style={{ fontSize: '.62rem', color: 'var(--muted)', width: 70, flexShrink: 0, textTransform: 'capitalize' }}>{role}</span>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                              {BTN_STATES.map(state => {
                                const disabled = state === 'Disabled'
                                const hover = state === 'Hover'
                                const bg = type === 'Solid' || type === 'Rounded'
                                  ? (disabled ? `${c.bg}55` : hover ? c.hover : c.bg)
                                  : 'transparent'
                                const border = type === 'Outlined'
                                  ? `1.5px solid ${disabled ? `${c.border}44` : hover ? c.hover : c.border}`
                                  : type === 'Rounded'
                                    ? `1.5px solid ${disabled ? `${c.border}44` : hover ? c.hover : c.border}`
                                    : 'none'
                                const color = type === 'Solid' || type === 'Rounded'
                                  ? (disabled ? 'rgba(255,255,255,.4)' : c.text)
                                  : (disabled ? `${c.bg}55` : hover ? c.hover : c.bg)
                                const radius = isRounded ? 50 : s.r

                                return (
                                  <div key={state} style={{ textAlign: 'center' }}>
                                    <span style={{
                                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                      height: s.h, padding: `0 ${s.px}px`,
                                      fontSize: s.fs, fontWeight: 500, cursor: 'none',
                                      borderRadius: radius, background: bg, color, border,
                                      opacity: disabled ? .7 : 1,
                                    }}>
                                      {size}
                                    </span>
                                    <p style={{ fontSize: '.52rem', color: 'var(--muted)', marginTop: 4 }}>{state}</p>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}

          {/* Design considerations */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {[
              { title: '4 Types', desc: 'Solid, Outlined, Text, and Rounded — each with a clear hierarchy role', accent: '#ad3278' },
              { title: '3 Sizes', desc: 'Large (40px), Medium (36px), Small (32px) — consistent touch targets', accent: '#ad3278' },
              { title: '3 Colors', desc: 'Primary (magenta), Secondary (dark), Error (red) — role-based semantics', accent: 'var(--gold)' },
              { title: '3 States', desc: 'Resting, Hover, and Disabled — clear interactive feedback', accent: 'var(--gold)' },
            ].map(({ title, desc, accent }) => (
              <div key={title} style={{ ...CARD, borderLeft: `3px solid ${accent}`, borderRadius: 14 }}>
                <h4 style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>{title}</h4>
                <p style={{ fontSize: '.76rem', lineHeight: 1.5, color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── AVATARS COMPONENT ── */}
        <section style={SECT}>
          <p style={{ ...SL, marginBottom: 12 }}>Core Components</p>
          <h2 style={{ ...SH, marginBottom: 12 }}>Avatar System</h2>
          <p style={{ ...SP, maxWidth: 640, marginBottom: 48 }}>
            A unified avatar component covering 7 types, 8 sizes, badge support, and multi-color group variants — designed for contact center and enterprise communication interfaces.
          </p>

          {/* Sizes showcase */}
          <div style={{ ...CARD, borderRadius: 16, padding: '36px 36px 28px', marginBottom: 24 }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.35rem', fontWeight: 300, color: '#ad3278', marginBottom: 32 }}>Sizes</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {([['4xl',76],['3xl',64],['2xl',56],['xl',48],['lg',40],['md',32],['sm',24],['xs',16]] as const).map(([label, size]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: size, height: size, borderRadius: '50%',
                    background: '#ad3278', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: size * .32, fontWeight: 600, color: '#fff', margin: '0 auto 8px',
                  }}>H</div>
                  <p style={{ fontSize: '.58rem', color: 'var(--muted)' }}>{label}</p>
                  <p style={{ fontSize: '.52rem', color: 'var(--dim)', fontFamily: 'monospace' }}>{size}px</p>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar types */}
          <div style={{ ...CARD, borderRadius: 16, padding: '36px 36px 28px', marginBottom: 24 }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.35rem', fontWeight: 300, color: '#ad3278', marginBottom: 32 }}>Types</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* Members - Initial */}
              {([
                { type: 'Members', desc: 'Text initial', bg: '#ad3278', content: 'H', icon: false },
                { type: 'Contact', desc: 'Silhouette', bg: '#cd5197', content: '', icon: true },
                { type: 'Agent', desc: 'Headset icon', bg: '#f8e6ef', content: '', icon: true },
                { type: 'Unknown', desc: 'Fallback', bg: '#291b36', content: '?', icon: false },
                { type: 'Chatbot', desc: 'Bot avatar', bg: '#ad3278', content: '', icon: true },
              ] as const).map(({ type, desc, bg, content, icon }) => (
                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <span style={{ fontSize: '.68rem', color: 'var(--muted)', width: 80, flexShrink: 0 }}>{type}</span>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    {[48, 40, 32, 24].map(s => (
                      <div key={s} style={{
                        width: s, height: s, borderRadius: '50%', background: bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: s * .32, fontWeight: 600, color: type === 'Agent' ? '#ad3278' : '#fff',
                        border: type === 'Unknown' ? '1px solid rgba(255,255,255,.08)' : 'none',
                      }}>
                        {icon ? (
                          <svg width={s * .45} height={s * .45} viewBox="0 0 16 16" fill="none">
                            <path d="M8 8C9.66 8 11 6.66 11 5C11 3.34 9.66 2 8 2C6.34 2 5 3.34 5 5C5 6.66 6.34 8 8 8ZM8 9.5C5.33 9.5 2 10.84 2 13.5V14H14V13.5C14 10.84 10.67 9.5 8 9.5Z" fill={type === 'Agent' ? '#ad3278' : 'currentColor'} />
                          </svg>
                        ) : content}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: '.6rem', color: 'var(--dim)', fontStyle: 'italic' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badge & Status */}
          <div style={{ ...CARD, borderRadius: 16, padding: '36px 36px 28px', marginBottom: 24 }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.35rem', fontWeight: 300, color: '#ad3278', marginBottom: 32 }}>Badge &amp; Status</h3>
            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              {/* Without badge */}
              <div>
                <p style={{ fontSize: '.62rem', color: 'var(--muted)', marginBottom: 12 }}>Without badge</p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {[56, 48, 40, 32].map(s => (
                    <div key={s} style={{ width: s, height: s, borderRadius: '50%', background: '#ad3278', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s * .32, fontWeight: 600, color: '#fff' }}>H</div>
                  ))}
                </div>
              </div>
              {/* With badge */}
              <div>
                <p style={{ fontSize: '.62rem', color: 'var(--muted)', marginBottom: 12 }}>With badge (online)</p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {[56, 48, 40, 32].map(s => {
                    const dot = Math.max(s * .22, 8)
                    return (
                      <div key={s} style={{ position: 'relative' }}>
                        <div style={{ width: s, height: s, borderRadius: '50%', background: '#ad3278', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s * .32, fontWeight: 600, color: '#fff' }}>H</div>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: dot, height: dot, borderRadius: '50%', background: '#22c55e', border: '2px solid var(--s2)' }} />
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Dark mode */}
              <div>
                <p style={{ fontSize: '.62rem', color: 'var(--muted)', marginBottom: 12 }}>Dark theme</p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {[56, 48, 40, 32].map(s => (
                    <div key={s} style={{ position: 'relative' }}>
                      <div style={{ width: s, height: s, borderRadius: '50%', background: '#291b36', border: '1px solid rgba(173,50,120,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s * .32, fontWeight: 600, color: '#cd5197' }}>H</div>
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: Math.max(s * .22, 8), height: Math.max(s * .22, 8), borderRadius: '50%', background: '#22c55e', border: '2px solid var(--s2)' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Group colors */}
          <div style={{ ...CARD, borderRadius: 16, padding: '36px 36px 28px', marginBottom: 24 }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.35rem', fontWeight: 300, color: '#ad3278', marginBottom: 32 }}>Group Colors</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {([
                { color: 'Blue', hex: '#5b9bd5' },
                { color: 'Purple', hex: '#845ec2' },
                { color: 'Coral', hex: '#e07a5f' },
                { color: 'Amber', hex: '#d4a03c' },
                { color: 'Teal', hex: '#2a9d8f' },
                { color: 'Green', hex: '#4caf50' },
              ] as const).map(({ color, hex }) => (
                <div key={color} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: '.62rem', color: 'var(--muted)', width: 54, flexShrink: 0 }}>{color}</span>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {[48, 40, 32, 24, 16].map(s => (
                      <div key={s} style={{
                        width: s, height: s, borderRadius: '50%', background: hex,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width={s * .45} height={s * .45} viewBox="0 0 16 16" fill="none">
                          <path d="M8 8C9.66 8 11 6.66 11 5C11 3.34 9.66 2 8 2C6.34 2 5 3.34 5 5C5 6.66 6.34 8 8 8ZM8 9.5C5.33 9.5 2 10.84 2 13.5V14H14V13.5C14 10.84 10.67 9.5 8 9.5Z" fill="rgba(255,255,255,.85)" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: '.58rem', color: 'var(--dim)', fontFamily: 'monospace' }}>{hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {[
              { title: '7 Types', desc: 'Members, Contact, Agent, Unknown, Image, Group, Chatbot', accent: '#ad3278' },
              { title: '8 Sizes', desc: '4xl (76px) down to xs (16px) — consistent scaling', accent: '#ad3278' },
              { title: '6 Group Colors', desc: 'Blue, Purple, Coral, Amber, Teal, Green for team differentiation', accent: 'var(--gold)' },
              { title: 'Badge Support', desc: 'Online status indicator with theme-aware border', accent: 'var(--gold)' },
            ].map(({ title, desc, accent }) => (
              <div key={title} style={{ ...CARD, borderLeft: `3px solid ${accent}`, borderRadius: 14 }}>
                <h4 style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>{title}</h4>
                <p style={{ fontSize: '.76rem', lineHeight: 1.5, color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        </>}

        {/* ── DESIGN TOKENS ── */}
        {tab === 'theme' && <>
        <section style={SECT}>
          <p style={{ ...SL, marginBottom: 12 }}>Token System</p>
          <h2 style={{ ...SH, marginBottom: 12 }}>Design Tokens</h2>
          <p style={{ ...SP, maxWidth: 640, marginBottom: 48 }}>
            A three-layer token architecture — primitives define raw values, semantic tokens map meaning, and core tokens govern spacing and shape. Exported directly from Figma Variables.
          </p>

          {/* ── Primitive Colors ── */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--white)' }}>Primitive Palette</h3>
              <span style={{ fontSize: '.62rem', color: 'var(--muted)', fontFamily: 'monospace' }}>Premitives.Mode.tokens.json</span>
            </div>
            <p style={{ ...SP, marginBottom: 24, fontSize: '.8rem' }}>Raw hex values — the foundation every semantic token references.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {PRIMITIVES.map(({ label, shades }) => (
                <div key={label} style={CARD}>
                  <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.08em' }}>{label}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {shades.map(({ grade, hex }) => (
                      <div key={grade} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 4, background: hex, border: '1px solid rgba(255,255,255,.06)', flexShrink: 0 }} />
                        <span style={{ fontSize: '.66rem', color: 'var(--white)', width: 28 }}>{grade}</span>
                        <span style={{ fontSize: '.62rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Semantic Tokens ── */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--white)' }}>Semantic Tokens</h3>
              <span style={{ fontSize: '.62rem', color: 'var(--muted)', fontFamily: 'monospace' }}>Design Tokens.Light / Dark</span>
            </div>
            <p style={{ ...SP, marginBottom: 24, fontSize: '.8rem' }}>Purpose-driven aliases that swap between light and dark mode — no hardcoded hex in components.</p>

            {/* Semantic color roles */}
            <div style={{ ...CARD, marginBottom: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 80px', gap: 0, marginBottom: 12, padding: '0 0 8px', borderBottom: '1px solid var(--bdr2)' }}>
                <span style={{ fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Role</span>
                <span style={{ fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Usage</span>
                <span style={{ fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center' }}>Light</span>
                <span style={{ fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center' }}>Dark</span>
              </div>
              {SEMANTIC_TOKENS.map(({ category, role, light, dark }) => (
                <div key={category} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 80px', gap: 0, padding: '10px 0', borderBottom: '1px solid var(--bdr2)', alignItems: 'center' }}>
                  <span style={{ fontSize: '.78rem', fontWeight: 500, color: 'var(--white)' }}>{category}</span>
                  <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{role}</span>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: light, border: '1px solid rgba(255,255,255,.06)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: dark, border: '1px solid rgba(255,255,255,.06)' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Background + Text tokens side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={CARD}>
                <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.08em' }}>Background</p>
                {SEMANTIC_BG.map(({ token, light, dark }) => (
                  <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 4, background: light, border: '1px solid rgba(0,0,0,.1)', flexShrink: 0 }} />
                    <div style={{ width: 24, height: 24, borderRadius: 4, background: dark, border: '1px solid rgba(255,255,255,.1)', flexShrink: 0 }} />
                    <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>{token}</span>
                  </div>
                ))}
              </div>
              <div style={CARD}>
                <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.08em' }}>Text</p>
                {SEMANTIC_TEXT.map(({ token, light, dark }) => (
                  <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 4, background: light, border: '1px solid rgba(0,0,0,.1)', flexShrink: 0 }} />
                    <div style={{ width: 24, height: 24, borderRadius: 4, background: dark, border: '1px solid rgba(255,255,255,.1)', flexShrink: 0 }} />
                    <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>{token}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Status, Channel & Tags ── */}
          <div style={{ marginBottom: 56 }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--white)', marginBottom: 24 }}>Domain Tokens</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
              {/* Status */}
              <div style={CARD}>
                <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.08em' }}>Status</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {STATUS_TOKENS.map(({ token, hex }) => (
                    <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: hex, border: '1px solid rgba(255,255,255,.06)', flexShrink: 0 }} />
                      <span style={{ fontSize: '.68rem', color: 'var(--muted)' }}>{token}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Channels */}
              <div style={CARD}>
                <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.08em' }}>Channels</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {CHANNEL_TOKENS.map(({ token, hex }) => (
                    <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 4, background: hex, flexShrink: 0 }} />
                      <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{token}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tags */}
              <div style={CARD}>
                <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.08em' }}>Tags</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {TAG_TOKENS.map(({ token, hex }) => (
                    <span key={token} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 12, background: `${hex}20`, border: `1px solid ${hex}40`, fontSize: '.62rem', color: hex, fontWeight: 500 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: hex }} />{token}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Core Tokens ── */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--white)' }}>Core Tokens</h3>
              <span style={{ fontSize: '.62rem', color: 'var(--muted)', fontFamily: 'monospace' }}>Core.Mode 1.tokens.json</span>
            </div>
            <p style={{ ...SP, marginBottom: 24, fontSize: '.8rem' }}>Numeric values governing spacing, margins, shape, and radius across every component.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
              {/* Spacer */}
              <div style={CARD}>
                <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.08em' }}>Spacer</p>
                {SPACING.map(({ token, value }) => (
                  <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: '.66rem', color: 'var(--white)', width: 28, flexShrink: 0 }}>{token}</span>
                    <div style={{ width: Math.min(value * 2, 96), height: 6, background: 'rgba(201,168,76,.3)', borderRadius: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: '.62rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{value}px</span>
                  </div>
                ))}
              </div>
              {/* Margins */}
              <div style={CARD}>
                <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.08em' }}>Margins</p>
                {CORE_MARGINS.map(({ token, value }) => (
                  <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: '.66rem', color: 'var(--white)', width: 28, flexShrink: 0 }}>{token}</span>
                    <div style={{ width: Math.min(value * 2, 96), height: 6, background: 'rgba(201,168,76,.2)', borderRadius: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: '.62rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{value}px</span>
                  </div>
                ))}
              </div>
              {/* Shape */}
              <div style={CARD}>
                <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.08em' }}>Shape</p>
                {CORE_SHAPE.map(({ token, value }) => (
                  <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: '.66rem', color: 'var(--white)', width: 28, flexShrink: 0 }}>{token}</span>
                    <div style={{ width: value / 2, height: value / 2, borderRadius: 2, background: 'rgba(201,168,76,.15)', border: '1px solid rgba(201,168,76,.25)', flexShrink: 0 }} />
                    <span style={{ fontSize: '.62rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{value}px</span>
                  </div>
                ))}
              </div>
              {/* Radius */}
              <div style={CARD}>
                <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.08em' }}>Radius</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {RADII.map(({ token, value }) => (
                    <div key={token} style={{ textAlign: 'center' }}>
                      <div style={{ width: 44, height: 44, borderRadius: value, background: 'rgba(201,168,76,.12)', border: '1px solid rgba(201,168,76,.25)', marginBottom: 6 }} />
                      <div style={{ fontSize: '.62rem', color: 'var(--white)' }}>{token}</div>
                      <div style={{ fontSize: '.58rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{value}px</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--white)', marginBottom: 24 }}>Typography</h3>
            <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {TYPE_SCALE.map(({ name, sample, size }, i) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < TYPE_SCALE.length - 1 ? '1px solid var(--bdr2)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, flex: 1 }}>
                    <span style={{ fontSize: '.68rem', fontWeight: 500, color: 'var(--gold)', width: 80, flexShrink: 0 }}>{name}</span>
                    <span style={{ fontSize: name === 'Heading 1' ? '2rem' : name === 'Heading 2' ? '1.6rem' : name === 'Heading 3' ? '1.3rem' : name === 'Small' ? '.82rem' : '.92rem', color: 'var(--white)', fontWeight: 300 }}>
                      {sample}
                    </span>
                  </div>
                  <span style={{ fontSize: '.68rem', color: 'var(--muted)', fontFamily: 'monospace', flexShrink: 0 }}>{size}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        </>}

        {/* ── TABLE COMPONENT ── */}
        {tab === 'components' && <>
        <section style={SECT}>
          <p style={{ ...SL, marginBottom: 12 }}>Complex Components</p>
          <h2 style={{ ...SH, marginBottom: 12 }}>Table Component</h2>
          <p style={{ ...SP, maxWidth: 640, marginBottom: 48 }}>
            A high-density data table component featuring sortable columns, row selection, status badges, and pagination — designed for enterprise dashboards.
          </p>
          <div style={{ ...CARD, overflow: 'hidden', padding: 0 }}>
            {/* Table toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--bdr2)' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['All Users', 'Active', 'Archived'].map((tab, i) => (
                  <span key={tab} style={{ fontSize: '.7rem', fontWeight: 500, padding: '5px 14px', borderRadius: 20, background: i === 0 ? 'rgba(201,168,76,.1)' : 'transparent', color: i === 0 ? 'var(--gold)' : 'var(--muted)', border: `1px solid ${i === 0 ? 'rgba(201,168,76,.2)' : 'var(--bdr2)'}` }}>
                    {tab}
                  </span>
                ))}
              </div>
              <div style={{ background: 'var(--s3)', border: '1px solid var(--bdr2)', borderRadius: 6, padding: '6px 14px', fontSize: '.75rem', color: 'rgba(255,255,255,.3)', width: 200 }}>
                Search users...
              </div>
            </div>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '32px 2fr 1fr 80px 1fr 1fr 40px', gap: 0, padding: '10px 24px', borderBottom: '1px solid var(--bdr2)', background: 'rgba(201,168,76,.02)' }}>
              {['', 'User', 'License', 'Status', 'Role', 'Last Login', ''].map((h, i) => (
                <span key={i} style={{ fontSize: '.62rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {i === 0 ? <span style={{ width: 14, height: 14, borderRadius: 3, border: '1px solid var(--bdr2)', display: 'inline-block' }} /> : h}
                </span>
              ))}
            </div>
            {/* Table rows */}
            {[
              { init: 'RZ', name: 'Rachel Zane', email: 'rachel@gmail.com', license: 'Contact Center', status: 'Booked', statusColor: '#fbbf24', role: 'Admin Desk', login: 'Yesterday, 11:42 PM' },
              { init: 'HS', name: 'Harvey Specter', email: 'harvey@pearson.com', license: 'Enterprise', status: 'Available', statusColor: '#4ade80', role: 'Managing Partner', login: 'Today, 09:15 AM' },
              { init: 'DP', name: 'Donna Paulsen', email: 'donna@pearson.com', license: 'Contact Center', status: 'Booked', statusColor: '#fbbf24', role: 'Admin Desk', login: 'Today, 08:30 AM' },
              { init: 'MR', name: 'Mike Ross', email: 'mike@pearson.com', license: 'Enterprise', status: 'Away', statusColor: '#f87171', role: 'Associate', login: 'Yesterday, 06:45 PM' },
              { init: 'LL', name: 'Louis Litt', email: 'louis@pearson.com', license: 'Enterprise', status: 'Available', statusColor: '#4ade80', role: 'Senior Partner', login: 'Today, 10:00 AM' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 2fr 1fr 80px 1fr 1fr 40px', gap: 0, padding: '12px 24px', borderBottom: '1px solid var(--bdr2)', alignItems: 'center' }}>
                <span style={{ width: 14, height: 14, borderRadius: 3, border: '1px solid var(--bdr2)', display: 'inline-block' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(201,168,76,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.62rem', fontWeight: 600, color: 'var(--gold)' }}>{row.init}</div>
                  <div>
                    <div style={{ fontSize: '.78rem', color: 'var(--white)', fontWeight: 500 }}>{row.name}</div>
                    <div style={{ fontSize: '.66rem', color: 'var(--muted)' }}>{row.email}</div>
                  </div>
                </div>
                <span style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{row.license}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: row.statusColor }} />
                  <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{row.status}</span>
                </div>
                <span style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{row.role}</span>
                <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{row.login}</span>
                <span style={{ fontSize: '.85rem', color: 'var(--muted)' }}>⋯</span>
              </div>
            ))}
            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px' }}>
              <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>Showing 1-5 of 124 users</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontSize: '.68rem', padding: '4px 12px', border: '1px solid var(--bdr2)', borderRadius: 4, color: 'var(--muted)' }}>Previous</span>
                <span style={{ fontSize: '.68rem', padding: '4px 12px', border: '1px solid var(--bdr2)', borderRadius: 4, color: 'var(--muted)' }}>Next</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CARD COMPONENT VARIATIONS ── */}
        <section style={SECT}>
          <h2 style={{ ...SH, textAlign: 'center', marginBottom: 12 }}>Card Component Variations</h2>
          <p style={{ ...SP, textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            Additional card states showcasing profile avatars, selection modes, and extended information displays
          </p>

          {/* Card images — row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 24 }}>
            {[
              { img: 'card-avatar-checkbox.png', label: 'Avatar with Checkbox' },
              { img: 'card-selected-no-avatar.png', label: 'Selected State - No Avatar' },
              { img: 'card-default-no-avatar.png', label: 'Default - No Avatar' },
            ].map(({ img, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: 25, marginBottom: 16 }}>
                  <img src={`${import.meta.env.BASE_URL}images/${img}`} alt={label} style={{ width: '100%', borderRadius: 8, display: 'block' }} />
                </div>
                <span style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--muted)' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Card images — row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24, maxWidth: 740, marginBottom: 48 }}>
            {[
              { img: 'card-extended-selected.png', label: 'Extended Info - Selected' },
              { img: 'card-extended-default.png', label: 'Extended Info - Default' },
            ].map(({ img, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: 25, marginBottom: 16 }}>
                  <img src={`${import.meta.env.BASE_URL}images/${img}`} alt={label} style={{ width: '100%', borderRadius: 8, display: 'block' }} />
                </div>
                <span style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--muted)' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Design Considerations */}
          <div style={{ ...CARD, borderRadius: 16 }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--white)', marginBottom: 32 }}>Design Considerations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {[
                { title: 'Progressive Disclosure', desc: 'Cards can expand to reveal additional information like last login time without cluttering the default view' },
                { title: 'Visual Hierarchy', desc: 'Consistent use of color, spacing, and typography maintains clear information architecture across all variations' },
                { title: 'Flexible Avatars', desc: 'Support for both profile images and fallback initials ensures the component works with any user data' },
                { title: 'Selection Feedback', desc: 'Clear visual indicators (purple accent and filled checkbox) communicate selection state immediately' },
              ].map(({ title, desc }) => (
                <div key={title}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                    <span style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--gold)' }}>{title}</span>
                  </div>
                  <p style={{ fontSize: '.8rem', lineHeight: 1.65, color: 'var(--muted)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOGGLE SWITCH COMPONENT ── */}
        <section style={SECT}>
          <h2 style={{ ...SH, textAlign: 'center', marginBottom: 12 }}>Toggle Switch Component</h2>
          <p style={{ ...SP, textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            Comprehensive toggle switch component with multiple sizes, states, and icon support
          </p>

          {/* Toggle showcase */}
          <div style={{ ...CARD, borderRadius: 16, padding: '48px 48px 40px', marginBottom: 32 }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.5rem', fontWeight: 300, color: '#ad3278', marginBottom: 40 }}>Toggle Switch</h3>

            {/* LG size */}
            {(['LG', 'SM'] as const).map(size => {
              const h = size === 'LG' ? 26 : 20
              const w = size === 'LG' ? 48 : 38
              const knob = size === 'LG' ? 20 : 16
              const pad = (h - knob) / 2
              const mag = '#ad3278'
              const grey = '#2c3344'
              const hoverMag = '#c43d8c'
              const hoverGrey = '#374457'
              const disabledBg = 'rgba(173,50,120,.25)'
              const disabledGrey = 'rgba(44,51,68,.5)'

              const Toggle = ({ active, disabled, focused, hover, icon }: { active: boolean; disabled?: boolean; focused?: boolean; hover?: boolean; icon?: boolean }) => {
                const trackBg = disabled
                  ? (active ? disabledBg : disabledGrey)
                  : hover
                    ? (active ? hoverMag : hoverGrey)
                    : (active ? mag : grey)
                const knobFill = disabled ? 'rgba(255,255,255,.45)' : '#fff'
                const knobSize = icon ? (size === 'LG' ? { w: 18, h: 20 } : { w: 14.83, h: 16.18 }) : { w: knob, h: knob }
                return (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    {focused && <div style={{ position: 'absolute', inset: -4, borderRadius: h + 8, border: `2px solid ${active ? mag : 'rgba(255,255,255,.15)'}`, opacity: .5 }} />}
                    <div style={{
                      width: w, height: h, borderRadius: h,
                      background: trackBg,
                      position: 'relative',
                    }}>
                      <div style={{
                        width: knobSize.w, height: knobSize.h,
                        position: 'absolute',
                        top: (h - knobSize.h) / 2,
                        left: active ? w - knobSize.w - pad : pad,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {icon ? (
                          <svg width="100%" height="100%" viewBox={size === 'LG' ? '0 0 18 20' : '0 0 14.8332 16.1817'} fill="none" xmlns="http://www.w3.org/2000/svg">
                            {size === 'LG' ? (
                              <path d="M6.80401 20C6.80401 20 6.51506 19.6629 6.42025 19.5461C5.75659 18.7506 5.03875 17.9731 4.34799 17.1956C4.17192 16.9979 4.00036 16.8091 3.8288 16.6159C3.5218 16.2743 3.20125 15.9237 2.85813 15.5283C0.636887 13.1598 -0.247999 10.7869 0.0590021 8.06786C0.564652 3.63656 4.35702 0.167025 8.87627 0.00523286C9.55348 -0.0172382 10.2352 0.0321982 10.9034 0.16253C14.0682 0.76925 16.2669 2.5984 17.4317 5.60503C18.1947 7.57349 18.1902 9.60937 17.4136 11.6587C16.4339 14.2519 14.61 16.081 11.9869 17.1057C11.0479 17.4743 10.0727 17.6765 9.08394 17.7124C8.42479 17.7349 7.74307 17.6855 7.06135 17.5596C7.0162 17.5507 6.9846 17.5507 6.95299 17.5507C6.90333 17.5507 6.8627 17.5686 6.83109 17.6001C6.78595 17.645 6.78143 17.7124 6.78595 17.8023C6.81304 18.1034 6.80401 20 6.80401 20ZM12.6641 11.1239C12.5197 11.6453 12.2127 12.0857 11.7251 12.4677C11.0298 13.0205 10.1765 13.3306 9.1923 13.4025C9.12006 13.407 9.04783 13.4115 8.97559 13.416C7.874 13.4564 6.95299 13.2003 6.1584 12.6385C5.63921 12.2699 5.31415 11.8205 5.17419 11.2632C5.09292 10.9486 4.84913 10.7509 4.54664 10.7599C4.50601 10.7599 4.46086 10.7689 4.41571 10.7779C4.06808 10.8588 3.86492 11.1913 3.94167 11.5509C4.05905 12.1216 4.33896 12.6385 4.76786 13.0969C5.56246 13.9463 6.59633 14.4407 7.92366 14.6159C8.29838 14.6654 8.6731 14.6833 9.03428 14.6699C9.95077 14.6384 10.8131 14.4137 11.6754 13.9867C12.7318 13.4295 13.4271 12.7014 13.7928 11.7486C13.8244 11.6632 13.856 11.5688 13.8831 11.4745C13.9915 11.0835 13.8334 10.7509 13.4903 10.6475C13.4181 10.6251 13.3458 10.6161 13.2736 10.6206C12.9847 10.6251 12.7454 10.8273 12.6641 11.1239Z" fill={knobFill} />
                            ) : (
                              <path d="M5.60695 16.1817C5.60695 16.1817 5.36885 15.909 5.29072 15.8144C4.74381 15.1708 4.15226 14.5417 3.58304 13.9127C3.43794 13.7527 3.29656 13.6 3.15519 13.4436C2.9022 13.1673 2.63805 12.8836 2.35529 12.5637C0.524838 10.6474 -0.204368 8.72747 0.0486216 6.52757C0.465311 2.94228 3.59048 0.135137 7.31463 0.00423382C7.8727 -0.0139472 8.43449 0.026051 8.98511 0.131501C11.5931 0.622387 13.405 2.10232 14.3649 4.53493C14.9936 6.12759 14.9899 7.77478 14.35 9.43289C13.5426 11.531 12.0396 13.0109 9.87802 13.84C9.10416 14.1381 8.30055 14.3018 7.48577 14.3308C6.94259 14.349 6.3808 14.309 5.81902 14.2072C5.78181 14.1999 5.75577 14.1999 5.72973 14.1999C5.6888 14.1999 5.65532 14.2145 5.62928 14.2399C5.59207 14.2763 5.58835 14.3308 5.59207 14.4036C5.61439 14.6472 5.60695 16.1817 5.60695 16.1817ZM10.4361 9.00018C10.317 9.42198 10.064 9.77833 9.66223 10.0874C9.08928 10.5347 8.38612 10.7856 7.57507 10.8437C7.51554 10.8474 7.45601 10.851 7.39648 10.8546C6.4887 10.8874 5.72973 10.6801 5.07493 10.2256C4.64708 9.92741 4.37921 9.56379 4.26388 9.11291C4.19691 8.85837 3.996 8.69838 3.74674 8.70565C3.71325 8.70565 3.67605 8.71292 3.63884 8.72019C3.35237 8.78565 3.18495 9.05473 3.2482 9.34562C3.34493 9.80742 3.5756 10.2256 3.92904 10.5965C4.58383 11.2837 5.43581 11.6837 6.52962 11.8255C6.83842 11.8655 7.14722 11.88 7.44485 11.8691C8.2001 11.8437 8.9107 11.6619 9.62131 11.3164C10.4919 10.8656 11.0648 10.2765 11.3662 9.50561C11.3922 9.43653 11.4183 9.36017 11.4406 9.28381C11.5299 8.96746 11.3997 8.69838 11.1169 8.61475C11.0574 8.59656 10.9979 8.58929 10.9383 8.59293C10.7002 8.59656 10.503 8.76019 10.4361 9.00018Z" fill={knobFill} />
                            )}
                          </svg>
                        ) : (
                          <svg width="100%" height="100%" viewBox={size === 'LG' ? '0 0 18 18' : '0 0 16 16'} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx={size === 'LG' ? '9' : '8'} cy={size === 'LG' ? '9' : '8'} r={size === 'LG' ? '9' : '8'} fill={knobFill} />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div key={size} style={{ marginBottom: size === 'LG' ? 48 : 0 }}>
                  <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--white)', marginBottom: 16, letterSpacing: '.1em' }}>{size}</p>

                  {/* Basic active / inactive */}
                  <div style={{ display: 'flex', gap: 32, marginBottom: 28 }}>
                    <div>
                      <p style={{ fontSize: '.62rem', color: 'var(--muted)', marginBottom: 8 }}>Active</p>
                      <Toggle active />
                    </div>
                    <div>
                      <p style={{ fontSize: '.62rem', color: 'var(--muted)', marginBottom: 8 }}>Inactive</p>
                      <Toggle active={false} />
                    </div>
                  </div>

                  {/* States row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 28 }}>
                    <div>
                      <p style={{ fontSize: '.66rem', fontWeight: 500, color: 'var(--white)', marginBottom: 12 }}>Active</p>
                      <div style={{ display: 'flex', gap: 28 }}>
                        {(['Default', 'Hover', 'Focused', 'Disabled'] as const).map(state => (
                          <div key={state}>
                            <p style={{ fontSize: '.58rem', color: 'var(--muted)', marginBottom: 6 }}>{state}</p>
                            <Toggle active hover={state === 'Hover'} focused={state === 'Focused'} disabled={state === 'Disabled'} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: '.66rem', fontWeight: 500, color: 'var(--white)', marginBottom: 12 }}>Inactive</p>
                      <div style={{ display: 'flex', gap: 28 }}>
                        {(['Default', 'Hover', 'Focused', 'Disabled'] as const).map(state => (
                          <div key={state}>
                            <p style={{ fontSize: '.58rem', color: 'var(--muted)', marginBottom: 6 }}>{state}</p>
                            <Toggle active={false} hover={state === 'Hover'} focused={state === 'Focused'} disabled={state === 'Disabled'} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* With icon */}
                  <div>
                    <p style={{ fontSize: '.66rem', fontWeight: 500, color: 'var(--white)', marginBottom: 12 }}>With icon</p>
                    <div style={{ display: 'flex', gap: 28 }}>
                      {(['Default', 'Hover', 'Focused', 'Disabled'] as const).map(state => (
                        <div key={state}>
                          <p style={{ fontSize: '.58rem', color: 'var(--muted)', marginBottom: 6 }}>{state}</p>
                          <Toggle active icon hover={state === 'Hover'} focused={state === 'Focused'} disabled={state === 'Disabled'} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {[
              { title: 'Active State', desc: 'Brand color indicates enabled features', accent: 'var(--gold)' },
              { title: 'Inactive State', desc: 'Neutral gray for disabled features', accent: 'var(--gold)' },
              { title: 'Interactive', desc: 'Hover, focused, and disabled states', accent: 'var(--muted)' },
              { title: 'Icon Support', desc: 'Optional icons for enhanced confirmation', accent: 'var(--muted)' },
            ].map(({ title, desc, accent }) => (
              <div key={title} style={{ ...CARD, borderLeft: `3px solid ${accent}`, borderRadius: 14 }}>
                <h3 style={{ fontSize: '.92rem', fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: '.78rem', lineHeight: 1.5, color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        </>}

        {/* ── RESULTS ── */}
        <section style={SECT}>
          <p style={{ ...SL, marginBottom: 12 }}>The Results</p>
          <h2 style={{ ...SH, marginBottom: 12 }}>Measurable Impact</h2>
          <p style={{ ...SP, maxWidth: 640, marginBottom: 48 }}>
            The system didn't just look better — it made the whole organisation faster, more consistent, and more confident in what they shipped.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              { n: '150+', title: 'Components', desc: 'Components built across 6 categories — buttons, forms, tables, cards, avatars, and data visualisation.' },
              { n: '50%', title: 'Reduction in developer handoff time', desc: 'Reduction in developer handoff time. Engineers went from interpreting screenshots to consuming structured specs with tokens.' },
              { n: '3×', title: 'Product teams now using a single source', desc: 'Product teams now using a single source of truth — eliminating duplicated effort and design drift.' },
            ].map(({ n, title, desc }) => (
              <div key={n} style={CARD}>
                <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '3rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, display: 'block', marginBottom: 12 }}>{n}</span>
                <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.1rem', fontWeight: 400, color: 'var(--white)', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: '.78rem', lineHeight: 1.7, color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <div style={{ padding: '32px var(--pad)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontSize: '1rem' }}>←</span> Back to Projects
          </button>
          <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>Core Design System</span>
        </div>

      </main>
    </>
  )
}
