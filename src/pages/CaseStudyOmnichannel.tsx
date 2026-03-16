import { useEffect } from 'react'
import Cursor from '../components/Cursor'

/* ─── IMAGES (Figma assets) ──────────────────────────────── */

const IMG_HERO        = 'https://www.figma.com/api/mcp/asset/b583811a-529a-4693-a949-59014186daee'
const IMG_WORKSPACE   = 'https://www.figma.com/api/mcp/asset/a978faf3-bfdf-400d-8840-ed38e5590ff0'
const IMG_VOICE       = 'https://www.figma.com/api/mcp/asset/c469d8d4-757d-442e-865d-a60901a4530b'
const IMG_INBOX       = 'https://www.figma.com/api/mcp/asset/8224d701-5854-4316-9376-67d2658c9acc'
const IMG_SORTING     = 'https://www.figma.com/api/mcp/asset/eca310c5-54af-47bc-be9c-4d880629a3dc'
const IMG_EMPTY       = 'https://www.figma.com/api/mcp/asset/b21d7fb8-dd93-4eb4-a466-6b964b304e26'
const IMG_TEMPLATES   = 'https://www.figma.com/api/mcp/asset/12533344-72fa-43e0-9fa8-41392bdf90cd'
const IMG_WA_TMPLS    = 'https://www.figma.com/api/mcp/asset/ac879b75-213a-414c-8108-77eb8e4e6d4d'
const IMG_STATUSES    = 'https://www.figma.com/api/mcp/asset/537e306a-7b4c-4b59-bee4-d97042535817'
const IMG_MEDIA       = 'https://www.figma.com/api/mcp/asset/5c2066f9-6b59-4d3a-95db-7dbb31f558f4'
const IMG_TAGS        = 'https://www.figma.com/api/mcp/asset/cafd80df-32d9-4c3a-9dd6-278ea00162c4'
const IMG_NOTES       = 'https://www.figma.com/api/mcp/asset/f40503b9-2ef5-4f79-a4f2-86557ab8f1c9'
const IMG_PROFILE     = 'https://www.figma.com/api/mcp/asset/4898c20f-ddaa-47bb-b97f-0609936c4ac7'
const IMG_TIMELINE    = 'https://www.figma.com/api/mcp/asset/7e48cd00-bca6-478c-8a10-c369f0efc2c3'
const IMG_DOCS        = 'https://www.figma.com/api/mcp/asset/56661c90-b5c8-43f8-9365-5d7aa1ff3d5f'
const IMG_FILTER_1    = 'https://www.figma.com/api/mcp/asset/90d4d38e-89b8-486f-88ab-970c84ad3364'
const IMG_FILTER_2    = 'https://www.figma.com/api/mcp/asset/fdbe58fb-92de-4bac-a23e-8cc67dd1f3a3'
const IMG_FILTER_3    = 'https://www.figma.com/api/mcp/asset/b6df5536-e242-4728-ae92-d0f49dcbdffe'
const IMG_FILTER_4    = 'https://www.figma.com/api/mcp/asset/577f2208-fe9b-4742-96c8-55828e25e9b9'
const IMG_FILTER_5    = 'https://www.figma.com/api/mcp/asset/2d97063d-c3cb-404c-a66a-739c31835deb'

/* ─── DATA ────────────────────────────────────────────────── */

const OUTCOMES = [
  { n: '60%', l: 'Faster Response Times' },
  { n: '5 Mo', l: 'Design to Launch' },
  { n: '70%', l: 'Template Time Savings' },
  { n: '35+', l: 'Agent Relationships' },
]

const PAIN_POINTS = [
  { n: '1', t: 'No Enterprise WhatsApp Tools', d: 'Contact centers had no tools to manage WhatsApp Business conversations at scale — agents handled messages manually through personal phones with no oversight.' },
  { n: '2', t: 'Lost Conversation Context', d: 'Agents struggled to track conversation history across channels. Switching between voice and messaging meant critical context was lost at every handoff.' },
  { n: '3', t: 'No Intelligent Routing', d: 'Impossible to route conversations to specialised teams — every agent handled everything regardless of expertise, slowing resolution and frustrating customers.' },
  { n: '4', t: 'No Service Quality Metrics', d: 'There was no way to measure response times, first-contact resolution, or service quality on WhatsApp — a blind spot in every enterprise SLA report.' },
]

/* ─── IA DATA ─────────────────────────────────────────────── */

const IA_AUTH_FLOW = ['Splash Screen', 'Onboarding', 'SSO Login', 'Set Permissions', 'Home Screen']

const IA_SECTIONS = [
  {
    label: 'Home',
    color: '#C9A84C',
    children: ['News', 'Recent Calls', 'My Activity', 'Currency', 'Call History'],
  },
  {
    label: 'Conversations',
    color: '#7C6FCD',
    children: [
      'Single Convo per Channel',
      'Latest Conversations',
      'My Conversations',
      'Filters: New · Open · Resolved · Broadcast',
      'Voice Call Card',
      'WhatsApp Card',
      'SMS Card',
      'Notes Card',
      'Email Card',
    ],
  },
  {
    label: 'Contacts',
    color: '#5BB9C4',
    children: [
      'Search & Filter',
      'Add New Contact',
      'Contact Profile',
      'Communication Timeline',
      'History',
      'Notes',
      'Files & Media',
    ],
  },
  {
    label: 'Statistics',
    color: '#E47C6E',
    children: [
      'Inbound Calls',
      'Outbound Calls',
      'Missed Calls',
      'Agent Stats',
      'Call Type Breakdown',
    ],
  },
  {
    label: 'Settings',
    color: '#90A1B9',
    children: ['Account', 'Appearance', 'Notifications', 'Language', 'Help & Resources', 'Logout'],
  },
]

const IA_CONV_CHANNELS = [
  {
    name: 'Voice Call',
    color: '#7C6FCD',
    items: ['Name & Profile Image', 'Call Direction', 'Recording Player', 'Call Notes', 'Call Tags', 'CDR'],
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    items: ['Contact Profile', 'Message Content', 'Delivery Status', 'Images / Video / Doc', 'Location', 'Voice Note'],
  },
  {
    name: 'SMS',
    color: '#C9A84C',
    items: ['Contact Profile', 'SMS Content', 'Delivery Report', 'Char Count / Segments', 'Timestamp'],
  },
  {
    name: 'Notes',
    color: '#E47C6E',
    items: ['Note Content', 'Note Icon', 'Timestamp', 'Attachments', 'Review Flag'],
  },
  {
    name: 'Email',
    color: '#5BB9C4',
    items: ['From / To / Subject', 'Email Body', 'Attachments', 'Reply / Reply All', 'Send Status', 'Thread View'],
  },
]

const RESEARCH_INSIGHTS = [
  'Customers expected 5-minute response times on WhatsApp vs 24 hours for email — SLA requirements demanded a fundamental rethink of agent tooling',
  'Rich media (images, documents, receipts) was essential for customer support — agents needed to view and share files without leaving the conversation',
  'Agents needed quick access to pre-approved responses without losing the personal touch — templates must feel conversational, not corporate',
  'Conversation threading was critical for complex, multi-day issues — losing context between sessions was the #1 agent frustration',
]

const SOLUTION_FEATURES = [
  {
    title: 'Conversational Agent Workspace',
    desc: 'Unified inbox for WhatsApp conversations with a context panel showing full customer history, smart suggestions, and quick actions — everything an agent needs without switching tabs.',
    img: IMG_WORKSPACE,
  },
  {
    title: 'Voice and Call Features',
    desc: 'Integrated voice alongside WhatsApp so agents manage both channels from one workspace. Conversation context persists across a WhatsApp thread, a voice call, and an SMS follow-up.',
    img: IMG_VOICE,
  },
  {
    title: 'Smart Inbox Management',
    desc: 'Dynamic inbox with filtering by conversation status — All, New, Open, Resolved — letting agents immediately see what needs attention without manually scanning every thread.',
    img: IMG_INBOX,
  },
  {
    title: 'Advanced Sorting & Organisation',
    desc: 'Flexible sorting (Newest, Oldest, Unread) combined with assignment filters (Assigned to me, All Assigned) so agents structure their day around priority, not arrival order.',
    img: IMG_SORTING,
  },
  {
    title: 'Delightful Empty States',
    desc: "Thoughtfully designed empty states with encouraging messages transform quiet periods into a positive experience — 'No New Conversations' feels like a win, not a bug.",
    img: IMG_EMPTY,
  },
  {
    title: 'Quick Response Templates',
    desc: 'Searchable template library with customisable placeholders reduces response time by 70%. Agents preview and personalise before sending — speed without sacrificing tone.',
    img: IMG_TEMPLATES,
  },
  {
    title: 'WhatsApp Business Templates',
    desc: 'Official pre-approved templates with variable placeholders for loyalty offers, promotions, and time-sensitive outreach — compliant with WhatsApp Business API guidelines.',
    img: IMG_WA_TMPLS,
  },
  {
    title: 'Custom Agent Statuses',
    desc: 'Agent presence management with statuses — Available, On Break, Training, Meeting, Outgoing — integrated with call statistics so supervisors see real-time availability without interrupting agents.',
    img: IMG_STATUSES,
  },
]

const CONTACTS_SCREENS = [
  { label: 'Media Gallery View', img: IMG_MEDIA },
  { label: 'Tag Organisation', img: IMG_TAGS },
  { label: 'Chronological Notes', img: IMG_NOTES },
  { label: 'Detailed Profile Fields', img: IMG_PROFILE },
  { label: 'Communication Timeline', img: IMG_TIMELINE },
  { label: 'Document Management', img: IMG_DOCS },
]

const FILTER_SCREENS = [IMG_FILTER_1, IMG_FILTER_2, IMG_FILTER_3, IMG_FILTER_4, IMG_FILTER_5]

const LEARNINGS = [
  { title: 'Omnichannel Must Feel Seamless, Not Stitched', desc: 'The biggest UX risk was making the product feel like two separate tools bolted together. Designing conversation continuity across WhatsApp and voice — shared history, persistent context — was the core UX challenge. Every design decision was evaluated: does this feel like one product?' },
  { title: 'Speed Matters More on Messaging Than Any Other Channel', desc: 'A 5-minute SLA on WhatsApp forced us to radically rethink the agent workspace. Every interaction — finding a contact, pulling up history, sending a template — had to be achievable in seconds, not clicks. Template search, keyboard shortcuts, and context panels were all optimised for speed.' },
  { title: 'Enterprise Features Must Not Sanitise the Conversational Feel', desc: 'WhatsApp feels personal. Routing rules, SLA timers, and compliance templates risk making it feel corporate and cold. Designing templates that feel conversational, empty states that feel human, and status flows that respect agent autonomy preserved the channel\'s warmth at enterprise scale.' },
  { title: 'Contacts Management is the Unsung Hero of CX Quality', desc: 'Agents who could see the full communication timeline — every message, call, note, and document — resolved issues 40% faster in usability testing. The contact management feature, often treated as a database view, became one of the most valued screens in the product.' },
]

/* ─── COMPONENT ───────────────────────────────────────────── */

export default function CaseStudyOmnichannel() {
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
          <a href="/" style={{ fontSize: '.72rem', fontWeight: 400, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', cursor: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >← Back to Work</a>
        </nav>

        {/* ── HERO ── */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px var(--pad) 0', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--bdr2)', textAlign: 'center' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 30% 15%,#0a1a0a 0%,transparent 55%),linear-gradient(145deg,#060f06 0%,#0a1a0a 55%,#06080f 100%)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.02) 1px,transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
            <span style={{ fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, display: 'block' }}>
              Case Study · Mobile &amp; Messaging · B2B SaaS
            </span>
            <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2.4rem,4.8vw,5.6rem)', fontWeight: 300, lineHeight: .95, letterSpacing: '-.01em', marginBottom: 28 }}>
              Omnichannel
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}> Platform</em>
            </h1>
            <p style={{ fontSize: 'clamp(.85rem,1.1vw,1rem)', lineHeight: 1.75, color: 'var(--muted)', maxWidth: 560, margin: '0 auto 48px' }}>
              Designing a unified agent workspace that brings WhatsApp Business and voice conversations together — eliminating the context-switching that was adding 60% to response times.
            </p>
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', paddingTop: 32, borderTop: '1px solid var(--bdr2)', marginBottom: 64 }}>
              {[['Role','Lead Product Designer'],['Platform','Web · SaaS'],['Timeline','5 months'],['Team','1 PM · 3 Engineers · 1 QA']].map(([k,v]) => (
                <div key={k}>
                  <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5 }}>{k}</div>
                  <div style={{ fontSize: '.85rem', color: 'var(--white)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1000, margin: '0 auto' }}>
            <img
              src={IMG_HERO}
              alt="Omnichannel Platform — unified agent workspace"
              style={{ width: '100%', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,.8))', borderRadius: 12 }}
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

        {/* ── PROJECT OVERVIEW ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 24, color: 'var(--white)' }}>
            Project Overview
          </h2>
          <p style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 48, maxWidth: 860 }}>
            Contact centers were asking their agents to handle WhatsApp Business messages and voice calls in completely separate tools — creating fragmented customer records, 60% longer response times, and a support experience that felt disjointed on both sides. I designed an omnichannel agent workspace that unifies both channels in a single, fast, context-aware interface.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: 32, marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>My Role</div>
              <div style={{ fontSize: '.88rem', color: 'var(--white)', marginBottom: 28 }}>Lead Product Designer — end-to-end, from research through shipped product</div>
              <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Timeline</div>
              <div style={{ fontSize: '.88rem', color: 'var(--white)' }}>5 months</div>
            </div>
            <div>
              <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Team</div>
              <div style={{ fontSize: '.88rem', color: 'var(--white)', marginBottom: 28 }}>1 Product Manager · 3 Engineers · 1 QA</div>
              <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Tools</div>
              <div style={{ fontSize: '.88rem', color: 'var(--white)' }}>Figma · Principle · UserTesting</div>
            </div>
          </div>

          {/* challenge callout */}
          <div style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderLeft: '3px solid var(--gold)', borderRadius: 12, padding: '32px 36px', marginBottom: 48 }}>
            <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>The Design Challenge</div>
            <p style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.1rem,1.8vw,1.5rem)', fontWeight: 300, lineHeight: 1.5, color: 'var(--white)', margin: 0 }}>
              "Agents needed to handle WhatsApp and voice conversations separately — creating 60% longer response times and fragmented customer experiences. How might we enable agents to handle both channels in a single workspace while maintaining conversation continuity and fast response times?"
            </p>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px var(--pad) 0' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
            The Problem
          </h2>
          <p style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 40, maxWidth: 780 }}>
            Customers increasingly preferred WhatsApp for business communication, but contact centers couldn't provide the same level of service quality they offered through traditional channels.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {PAIN_POINTS.map(({ n, t, d }) => (
              <div key={n} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '.72rem', fontWeight: 600, color: 'var(--black)' }}>{n}</div>
                <div>
                  <div style={{ fontSize: '.85rem', fontWeight: 500, color: 'var(--white)', marginBottom: 5 }}>{t}</div>
                  <div style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--muted)' }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESEARCH ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px var(--pad) 0' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
            Research &amp; Discovery
          </h2>
          <p style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 40, maxWidth: 780 }}>
            Analysed customer messaging patterns, interviewed contact center agents handling WhatsApp manually, and studied successful WhatsApp Business implementations across MENA enterprise clients.
          </p>
          <div style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '32px 36px' }}>
            <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Key Research Insights</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {RESEARCH_INSIGHTS.map((insight, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}>→</span>
                  <p style={{ fontSize: '.87rem', lineHeight: 1.75, color: 'var(--muted)', margin: 0 }}>{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PERSONA ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px var(--pad) 0' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 36, color: 'var(--white)' }}>
            Primary Persona — Sarah
          </h2>
          <div style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '40px 40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'start' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,var(--s3),var(--s2))', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>👩‍💼</div>
              <div>
                <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Senior Customer Success Agent</div>
                <blockquote style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1rem,1.6vw,1.3rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, color: 'var(--white)', borderLeft: '2px solid var(--border)', paddingLeft: 24, margin: '0 0 24px' }}>
                  "My customers don't care which channel they're using — they just want their problems solved without repeating themselves. I need to see our entire history, regardless of whether we spoke on the phone yesterday or are texting today."
                </blockquote>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ fontSize: '.87rem', lineHeight: 1.75, color: 'var(--muted)', margin: 0 }}>
                    Sarah manages approximately <strong style={{ color: 'var(--white)' }}>35 ongoing VIP customer relationships</strong> and needs to be responsive even when away from her desk.
                  </p>
                  <p style={{ fontSize: '.87rem', lineHeight: 1.75, color: 'var(--muted)', margin: 0 }}>
                    She frequently starts conversations via <strong style={{ color: 'var(--white)' }}>WhatsApp</strong>, escalates to a <strong style={{ color: 'var(--white)' }}>voice call</strong> for complex issues, then follows up with confirmation details via <strong style={{ color: 'var(--white)' }}>SMS</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INFORMATION ARCHITECTURE ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px var(--pad) 0' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
            Information Architecture
          </h2>
          <p style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 48, maxWidth: 780 }}>
            Mapping the complete product structure — from authentication through every section and channel type — to ensure every agent workflow had a clear, logical home before a single screen was designed.
          </p>

          {/* Auth Flow */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Authentication Flow</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' }}>
              {IA_AUTH_FLOW.map((node, i) => (
                <div key={node} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    padding: '10px 18px',
                    background: i === IA_AUTH_FLOW.length - 1 ? 'rgba(201,168,76,.15)' : 'var(--s2)',
                    border: `1px solid ${i === IA_AUTH_FLOW.length - 1 ? 'var(--gold)' : 'var(--bdr2)'}`,
                    borderRadius: 8,
                    fontSize: '.75rem',
                    fontWeight: i === IA_AUTH_FLOW.length - 1 ? 500 : 400,
                    color: i === IA_AUTH_FLOW.length - 1 ? 'var(--gold)' : 'var(--white)',
                    whiteSpace: 'nowrap',
                  }}>{node}</div>
                  {i < IA_AUTH_FLOW.length - 1 && (
                    <div style={{ padding: '0 10px', color: 'var(--muted)', fontSize: '.85rem' }}>→</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main IA sections */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Main Navigation Sections</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
              {IA_SECTIONS.map(({ label, color, children }) => (
                <div key={label} style={{ background: 'var(--s1)', border: `1px solid var(--bdr2)`, borderTop: `3px solid ${color}`, borderRadius: 10, padding: '18px 16px' }}>
                  <div style={{ fontSize: '.78rem', fontWeight: 500, color: 'var(--white)', marginBottom: 12 }}>{label}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {children.map(c => (
                      <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color, fontSize: '.65rem', flexShrink: 0, marginTop: 3 }}>▸</span>
                        <span style={{ fontSize: '.72rem', color: 'var(--muted)', lineHeight: 1.45 }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation channel detail */}
          <div>
            <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Conversation Channel Cards</div>
            <div style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: '28px 28px' }}>
              <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: 24, margin: '0 0 24px' }}>
                Each channel within a conversation surfaces contextually relevant data. A voice call shows recording controls; a WhatsApp thread shows rich media; an email shows threading. Same workspace, channel-appropriate detail.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
                {IA_CONV_CHANNELS.map(({ name, color, items }) => (
                  <div key={name} style={{ background: 'var(--s2)', border: `1px solid var(--bdr2)`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: '14px 14px' }}>
                    <div style={{ fontSize: '.72rem', fontWeight: 500, color, marginBottom: 10 }}>{name}</div>
                    {items.map(item => (
                      <div key={item} style={{ fontSize: '.68rem', color: 'var(--muted)', lineHeight: 1.8 }}>· {item}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SOLUTION ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px var(--pad) 0' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
            The Solution
          </h2>
          <p style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 60, maxWidth: 780 }}>
            A WhatsApp Business integration that brings contact center capabilities — routing, templates, analytics — to WhatsApp while preserving its conversational nature. The agent interface balances enterprise efficiency with the personal touch the channel demands.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {SOLUTION_FEATURES.map(({ title, desc, img }, i) => (
              <div key={title} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 48, alignItems: 'center' }}>
                {i % 2 === 0 ? (
                  <>
                    <div>
                      <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Feature {String(i + 1).padStart(2, '0')}</div>
                      <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.2rem,2vw,1.8rem)', fontWeight: 300, lineHeight: 1.2, color: 'var(--white)', marginBottom: 16 }}>{title}</h3>
                      <p style={{ fontSize: '.87rem', lineHeight: 1.8, color: 'var(--muted)', margin: 0 }}>{desc}</p>
                    </div>
                    <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--bdr2)', background: 'var(--s1)' }}>
                      <img src={img} alt={title} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--bdr2)', background: 'var(--s1)' }}>
                      <img src={img} alt={title} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Feature {String(i + 1).padStart(2, '0')}</div>
                      <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.2rem,2vw,1.8rem)', fontWeight: 300, lineHeight: 1.2, color: 'var(--white)', marginBottom: 16 }}>{title}</h3>
                      <p style={{ fontSize: '.87rem', lineHeight: 1.8, color: 'var(--muted)', margin: 0 }}>{desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACTS MANAGEMENT ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
              Contacts Management
            </h2>
            <p style={{ fontSize: '.9rem', lineHeight: 1.75, color: 'var(--muted)', maxWidth: 600, margin: '0 auto' }}>
              A complete contact management interface designed for seamless customer interaction tracking and profile management across all channels.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {CONTACTS_SCREENS.map(({ label, img }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--bdr2)', background: 'var(--s1)' }}>
                  <img src={img} alt={label} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── ADVANCED FILTERS ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
              Advanced Filters
            </h2>
            <p style={{ fontSize: '.9rem', lineHeight: 1.75, color: 'var(--muted)', maxWidth: 600, margin: '0 auto' }}>
              Multi-criteria filtering lets agents quickly surface the right conversations — by status, channel, agent, tag, date range, and priority.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {FILTER_SCREENS.slice(0, 3).map((img, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--bdr2)', background: 'var(--s1)' }}>
                <img src={img} alt={`Filter view ${i + 1}`} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20, maxWidth: 740, margin: '20px auto 0' }}>
            {FILTER_SCREENS.slice(3).map((img, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--bdr2)', background: 'var(--s1)' }}>
                <img src={img} alt={`Filter view ${i + 4}`} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── LEARNINGS ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 48, color: 'var(--white)' }}>
            What I Learned
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {LEARNINGS.map(({ title, desc }) => (
              <div key={title} style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '28px 28px' }}>
                <div style={{ width: 28, height: 3, background: 'var(--gold)', borderRadius: 2, marginBottom: 18 }} />
                <h3 style={{ fontSize: '.88rem', fontWeight: 500, color: 'var(--white)', marginBottom: 10, lineHeight: 1.4 }}>{title}</h3>
                <p style={{ fontSize: '.82rem', lineHeight: 1.75, color: 'var(--muted)', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ maxWidth: 1100, margin: '100px auto 0', padding: '80px var(--pad)', textAlign: 'center', borderTop: '1px solid var(--bdr2)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.6rem,3vw,2.8rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 16, color: 'var(--white)' }}>
            Interested in this case study?
          </h2>
          <p style={{ fontSize: '.9rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
            Let's discuss how we can build high-trust experiences together.
          </p>
          <a
            href="mailto:priyamvada.s.m@gmail.com"
            style={{ display: 'inline-block', padding: '16px 36px', background: 'var(--gold)', color: 'var(--black)', fontWeight: 600, fontSize: '.75rem', letterSpacing: '.16em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 8, cursor: 'none', transition: 'background .2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
          >
            Start a Conversation →
          </a>
        </section>

        {/* footer space */}
        <div style={{ height: 80 }} />
      </div>
    </>
  )
}
