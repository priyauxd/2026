import { useEffect } from 'react'
import Cursor from '../components/Cursor'

/* ─── DATA ────────────────────────────────────────────────── */

const OUTCOMES = [
  { n: '50+', l: 'Enterprise Clients' },
  { n: '100K+', l: 'Daily Active Users' },
  { n: '60%', l: 'Efficiency Increase' },
  { n: '4 Mo', l: 'Design to Launch' },
]

const PROBLEMS = [
  { title: 'Zero Call Visibility', desc: 'Managers had no way to understand what was actually happening on calls \u2014 no transcriptions, no summaries, no sentiment data. Insights were locked inside audio files nobody had time to replay.' },
  { title: 'No AI Layer', desc: 'Existing tools captured call recordings but offered no intelligence on top. No auto-transcription, no sentiment detection, no AI-generated summaries \u2014 just raw audio and manual notes.' },
  { title: 'Fragmented Agent Data', desc: 'Agent performance metrics lived across 5+ disconnected tools \u2014 CRM, call recorder, spreadsheets, coaching notes. No single dashboard tied it all together.' },
  { title: 'Blind Spot on Sentiment', desc: 'Customer frustration, hesitation, and urgency went completely undetected until escalation. There was no real-time or post-call sentiment analysis to flag at-risk conversations.' },
  { title: 'Coaching Without Data', desc: 'Supervisors coached agents based on gut feeling and anecdotal feedback. No AI scoring, no talk/listen ratios, no conversation pattern analysis to back up coaching decisions.' },
]

const INTERVIEW_FINDINGS = [
  'Teams wanted AI transcription that works in real-time \u2014 not batch processing hours after calls ended',
  'Sentiment detection was the #1 requested feature \u2014 managers needed to spot frustrated customers without listening to every call',
  'Auto-generated call summaries would save 60% of the time spent on post-call documentation and note-taking',
  'Biggest need: a unified AI dashboard that surfaces insights automatically, not another tool that requires manual digging',
]

const WORKFLOW_FINDINGS = [
  'Supervisors toggled between call recorder \u2192 CRM \u2192 spreadsheet \u2192 coaching notes \u2014 no single AI-powered view existed',
  'They manually transcribed key moments from calls into documents \u2014 a process AI transcription could eliminate entirely',
  'Talk/listen ratios, sentiment shifts, and conversation patterns were all tracked mentally \u2014 zero data-driven intelligence',
]

const COMPETITIVE_FINDINGS = [
  'Gap: Tools like Gong and Chorus.ai focused on sales calls. No platform offered AI intelligence tailored to support center operations with compliance and sentiment tracking',
  'Opportunity: Real-time AI transcription + automatic sentiment analysis + configurable AI scoring in one dashboard \u2014 no competitor combined all three',
  'UX Pattern: Competing dashboards showed 15+ raw metrics without AI prioritization \u2014 data overload without intelligence',
]

const DISCLOSURE_LAYERS = [
  { layer: '1. AI Dashboard', content: 'Real-time sentiment overview, AI scoring trends, agent performance heatmaps', purpose: 'Instant AI-powered intelligence pulse at a glance' },
  { layer: '2. Segment', content: 'Filtered by sentiment (negative/positive), AI score range, specific agents, time period', purpose: 'Pattern discovery \u2014 which agents, topics, or times trigger negative sentiment' },
  { layer: '3. Call Intelligence', content: 'Full AI transcription, auto-generated summary, sentiment timeline, AI scorecard', purpose: 'Deep-dive into any conversation with complete AI analysis' },
]

const WIREFRAME_LAYOUTS = [
  'Layout A: Horizontal metrics bar at top \u2192 large chart below \u2192 call list at bottom',
  'Layout B: Left sidebar with metrics \u2192 chart + call list in main area (selected)',
  'Layout C: Grid of metric cards \u2192 expandable chart sections',
]

const PROTOTYPE_FINDINGS = [
  'Users expected clicking the sentiment gauge to filter calls by emotion. Solution: Made every AI metric interactive \u2014 clicking any data point filters the call list instantly',
  'AI transcription needed to be scannable, not a wall of text. Solution: Added speaker labels, timestamps, and AI-highlighted key moments within transcripts',
  'Users wanted AI summaries front and center, not buried in detail views. Solution: Surfaced one-line AI summary in the call list itself, expandable on click',
  'Supervisors needed to export AI insights for coaching. Solution: Added one-click export of AI scores, sentiment data, and transcripts as CSV/PDF',
]

const DS_ITEMS = [
  'Components: Metric cards, sentiment gauges, data tables, line charts, filters, badges, loading states (150+ total)',
  'Documentation: Interaction states, responsive behavior, accessibility requirements, edge cases, code snippets',
  'Color System: Semantic colors (green=positive, red=alert, purple=neutral, blue=interactive) + accessibility-tested contrast ratios',
  'Impact: 50% reduction in developer questions, consistent UI across platform, reused for all features',
]

const DESIGN_PRINCIPLES = [
  'Prioritize Glanceability: Large numbers, color-coded indicators, trend arrows \u2014 users should understand status in <3 seconds',
  'Semantic Color: Green = good/passing, Red = needs attention, Purple = neutral metrics, Blue = interactive elements',
  'Context Over Precision: Show \u201Cpassing score: 80%\u201D not \u201C79.847%\u201D \u2014 precision creates false confidence',
  'Make Everything Clickable: Every data point becomes an entry point for investigation',
]

const FINAL_FEATURES = [
  { title: 'AI Sentiment Analysis', desc: 'Real-time sentiment detection powered by NLP. The circular gauge visualizes positive/negative/neutral ratios with trend arrows. Emoji-based indicators make emotional context instantly readable. Every element is clickable to drill into filtered call lists.' },
  { title: 'AI Call Scoring', desc: 'Automatic scoring of every call against configurable AI benchmarks. Dual metrics show passing rate and average score with color-coded thresholds. Comparison values surface whether current AI scores are trending up or down vs. historical baselines.' },
  { title: 'Performance Intelligence', desc: 'AI-powered trend analysis across time. Dual-line charts track AI score and passing rate over days/weeks/months. Vertical markers flag configuration changes, helping teams correlate AI model updates with performance shifts.' },
  { title: 'Talk/Listen Intelligence', desc: 'AI-analyzed conversation balance. Circular gauge shows agent talk vs. listen ratio, identifying agents who dominate conversations or fail to engage. Conversation pattern analysis surfaces coaching opportunities automatically.' },
  { title: 'AI-Enriched Call List', desc: 'Every call enriched with AI-generated sentiment badge, auto-score, transcription status, and one-line AI summary. Clicking any call opens the full AI analysis \u2014 transcription, sentiment timeline, scorecard, and AI-generated action items.' },
]

const CALL_DETAIL_FEATURES = [
  'AI-powered call transcription with speaker labels',
  'AI-generated call summary & key moments',
  'Automated scorecard with AI benchmarks',
  'Real-time sentiment timeline visualization',
]

const RESULTS = [
  { n: '60%', l: 'Faster Insights', desc: 'AI transcription + auto-summaries reduced time-to-insight from hours of manual listening to seconds' },
  { n: '100%', l: 'Call Intelligence', desc: 'Every call now has AI transcription, sentiment analysis, and automated scoring \u2014 not just the 2\u20135% sampled manually' },
  { n: '35%', l: 'Agent Performance', desc: 'AI-driven coaching insights improved agent scores through data-backed, personalized feedback loops' },
]

const BUSINESS_IMPACT = [
  'AI transcription eliminated manual note-taking \u2014 every call is automatically transcribed with 95%+ accuracy',
  'Sentiment analysis surfaces at-risk conversations in real-time, reducing escalations by flagging frustration early',
  'AI scoring replaced subjective reviews with consistent, configurable benchmarks across all enterprise clients',
  'Conversation intelligence (talk/listen ratios, key moment detection) enabled data-driven agent coaching at scale',
  'Unified AI dashboard consolidated 5+ fragmented tools into a single intelligence platform',
]

const LEARNINGS = [
  { title: 'AI Intelligence Must Be Surfaced, Not Buried', desc: 'Users don\u2019t want to hunt for AI insights. Auto-generated summaries, sentiment badges, and AI scores must be visible at the list level \u2014 not hidden behind clicks. The progressive disclosure model (Dashboard \u2192 Segment \u2192 Call Detail) reduced cognitive load by 75%.' },
  { title: 'Make Every AI Metric Interactive', desc: 'Users instinctively clicked sentiment percentages and AI scores expecting to filter. Converting every AI data point into an interactive filter transformed the dashboard from a passive report into an active exploration tool.' },
  { title: 'Context Over Precision in AI Scoring', desc: 'Managers preferred \u201CAI score: 80% (vs. 75% avg)\u201D over \u201C79.847%.\u201D Comparative context from the AI helped them understand significance. Precision without context creates false confidence.' },
  { title: 'Design Systems Accelerate AI Product Delivery', desc: 'Building 150+ components for data-dense AI interfaces upfront reduced developer questions by 50% and enabled consistent UI across 8+ features \u2014 sentiment gauges, transcript views, scoring cards all reusable.' },
]

/* ─── COMPONENT ───────────────────────────────────────────── */

export default function CaseStudyAICallCenter() {
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
          {/* bg gradient */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 75% 15%,#0c0828 0%,transparent 55%),linear-gradient(145deg,#060410 0%,#0e0826 55%,#060410 100%)', pointerEvents: 'none' }} />
          {/* grid overlay */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.02) 1px,transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
            <span style={{ fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, display: 'block' }}>
              Case Study · Enterprise SaaS · AI · B2B
            </span>
            <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2.4rem,4.8vw,5.6rem)', fontWeight: 300, lineHeight: .95, letterSpacing: '-.01em', marginBottom: 28 }}>
              AI-Powered Call<br />Center
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}> Intelligence</em>
            </h1>
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', paddingTop: 32, borderTop: '1px solid var(--bdr2)', marginBottom: 64, marginTop: 48 }}>
              {[['Role','Lead Product Designer'],['Platform','Web · SaaS'],['Timeline','4 months'],['Clients','50+ Enterprise']].map(([k,v]) => (
                <div key={k}>
                  <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5 }}>{k}</div>
                  <div style={{ fontSize: '.85rem', color: 'var(--white)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1000, margin: '0 auto' }}>
            <img
              src={`${import.meta.env.BASE_URL}images/ai-call-center-hero.png`}
              alt="AI-Powered Call Center Intelligence dashboard"
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
            An enterprise AI intelligence platform that brings real-time transcription, sentiment analysis, and automated scoring to every call. As Lead Product Designer, I designed the complete experience — from the AI-powered analytics dashboard to individual call intelligence views — giving managers instant AI-driven insights across 100,000+ daily interactions without listening to a single recording.
          </p>

          {/* info card */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: 32, marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>My Role</div>
              <div style={{ fontSize: '.88rem', color: 'var(--white)', marginBottom: 28 }}>Lead Product Designer (solo designer on this feature)</div>
              <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Timeline</div>
              <div style={{ fontSize: '.88rem', color: 'var(--white)' }}>4 months (August 2024 – December 2024)</div>
            </div>
            <div>
              <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Team</div>
              <div style={{ fontSize: '.88rem', color: 'var(--white)', marginBottom: 28 }}>Product Manager, Engineering Lead, Frontend Developer (Adrian), Backend Team</div>
              <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Platform</div>
              <div style={{ fontSize: '.88rem', color: 'var(--white)' }}>Web application (React), optimized for desktop use by call center managers</div>
            </div>
          </div>

          {/* challenge callout */}
          <div style={{ borderLeft: '3px solid var(--gold)', background: 'rgba(201,168,76,.04)', borderRadius: '0 14px 14px 0', padding: '32px 32px 32px 36px', marginBottom: 0 }}>
            <div style={{ fontSize: '.65rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>The Challenge</div>
            <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', fontStyle: 'italic' }}>
              This case study demonstrates my approach to designing AI-powered intelligence platforms — where the challenge isn't just surfacing AI data, but making transcription, sentiment, and scoring insights instantly actionable through thoughtful information architecture and progressive disclosure.
            </p>
          </div>
        </section>

        {/* ── THE PROBLEM ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0', borderTop: '1px solid var(--bdr2)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
            The Problem
          </h2>
          <p style={{ fontSize: '.88rem', lineHeight: 1.7, color: 'var(--muted)', marginBottom: 40 }}>
            Enterprise contact centers lacked any AI intelligence layer — creating critical visibility gaps:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PROBLEMS.map(({ title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: '24px 28px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(227,27,12,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <span style={{ color: '#e31b0c', fontWeight: 700, fontSize: '1rem' }}>!</span>
                </div>
                <div>
                  <div style={{ fontSize: '.92rem', fontWeight: 500, color: 'var(--white)', marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PHASE 1: RESEARCH & DISCOVERY ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0', borderTop: '1px solid var(--bdr2)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
            Phase 1: Research &amp; Discovery <span style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '.6em' }}>(3 weeks)</span>
          </h2>
          <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 48, maxWidth: 720 }}>
            I followed a research-driven, iterative design process spanning 4 months. The focus: understanding how managers currently extract insights from calls without AI, and designing an intelligence layer that surfaces transcription, sentiment, and scoring data where they need it most.
          </p>

          {/* Stakeholder Interviews + Research Image */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 40 }}>
            <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: 32 }}>
              <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.4rem', fontWeight: 300, color: 'var(--white)', marginBottom: 20 }}>
                Stakeholder Interviews
              </h3>
              <div style={{ background: 'var(--s3)', border: '1px solid var(--bdr2)', borderRadius: 10, padding: '14px 18px', marginBottom: 24, fontSize: '.78rem', lineHeight: 1.65, color: 'var(--muted)' }}>
                8 quality managers, 5 team leads, 12 agents across 5 enterprise clients (telecommunications, e-commerce, financial services)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {INTERVIEW_FINDINGS.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 8 }} />
                    <p style={{ fontSize: '.8rem', lineHeight: 1.7, color: 'var(--muted)' }}>{f}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--bdr2)' }}>
              <img
                src={`${import.meta.env.BASE_URL}images/ai-call-center-research.png`}
                alt="Research sessions with quality managers"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* Workflow Observation + Competitive Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: 32 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--s3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, fontSize: '1.1rem' }}>
                <span role="img" aria-label="observe">&#128065;</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--white)', marginBottom: 14 }}>
                Workflow Observation
              </h3>
              <p style={{ fontSize: '.8rem', lineHeight: 1.7, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 20 }}>
                I shadowed 3 quality managers for full workdays, observing their actual review process. This revealed critical insights that interviews missed:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {WORKFLOW_FINDINGS.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '.78rem', flexShrink: 0, marginTop: 1 }}>&bull;</span>
                    <p style={{ fontSize: '.78rem', lineHeight: 1.65, color: 'var(--muted)' }}>{f}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: 32 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--s3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, fontSize: '1.1rem' }}>
                <span role="img" aria-label="analyze">&#128202;</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--white)', marginBottom: 14 }}>
                Competitive Analysis
              </h3>
              <p style={{ fontSize: '.8rem', lineHeight: 1.7, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 20 }}>
                I analyzed 6 competing platforms (Gong, Chorus.ai, CallMiner, Observe.AI, Balto, Talkdesk) identifying:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {COMPETITIVE_FINDINGS.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '.78rem', flexShrink: 0, marginTop: 1 }}>&bull;</span>
                    <p style={{ fontSize: '.78rem', lineHeight: 1.65, color: 'var(--muted)' }}>{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PHASE 2: INFORMATION ARCHITECTURE ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0', borderTop: '1px solid var(--bdr2)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
            Phase 2: Information Architecture <span style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '.6em' }}>(2 weeks)</span>
          </h2>
          <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 48, maxWidth: 860 }}>
            I conducted card sorting sessions with 6 managers to understand how they mentally organize AI intelligence data. Participants grouped 40 different AI metrics into categories. Result: Three consistent groupings emerged: (1) AI sentiment &amp; emotion data, (2) AI scoring &amp; performance metrics, (3) Conversation intelligence (transcription, talk/listen, key moments).
          </p>

          {/* Progressive Disclosure Strategy */}
          <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: 40, marginBottom: 32 }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.4rem', fontWeight: 300, color: 'var(--white)', marginBottom: 10 }}>
              Progressive Disclosure Strategy
            </h3>
            <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--muted)', marginBottom: 28, maxWidth: 660 }}>
              The core design challenge: surface AI transcription, sentiment, and scoring insights without overwhelming users. I designed a three-layer intelligence architecture:
            </p>

            <div style={{ border: '1px solid var(--bdr2)', borderRadius: 12, overflow: 'hidden' }}>
              {DISCLOSURE_LAYERS.map(({ layer, content, purpose }, i) => (
                <div key={layer} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', borderBottom: i < DISCLOSURE_LAYERS.length - 1 ? '1px solid var(--bdr2)' : 'none' }}>
                  <div style={{ padding: '20px 22px', borderRight: '1px solid var(--bdr2)' }}>
                    <span style={{ fontSize: '.82rem', fontWeight: 500, color: 'var(--white)' }}>{layer}</span>
                  </div>
                  <div style={{ padding: '20px 22px', borderRight: '1px solid var(--bdr2)' }}>
                    <span style={{ fontSize: '.78rem', lineHeight: 1.6, color: 'var(--muted)' }}>{content}</span>
                  </div>
                  <div style={{ padding: '20px 22px' }}>
                    <span style={{ fontSize: '.78rem', lineHeight: 1.6, color: 'var(--muted)', fontStyle: 'italic' }}>{purpose}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* success callout */}
          <div style={{ borderLeft: '3px solid #22c55e', background: 'rgba(34,197,94,.04)', borderRadius: '0 12px 12px 0', padding: '24px 28px 24px 32px' }}>
            <p style={{ fontSize: '.84rem', lineHeight: 1.75, color: 'var(--muted)' }}>
              <span style={{ color: '#4ade80', marginRight: 8 }}>&#10003;</span>
              This approach tested extremely well — users could complete tasks <b style={{ color: 'var(--white)', fontWeight: 500 }}>60% faster</b> than with traditional all-at-once dashboards, and reported <b style={{ color: 'var(--white)', fontWeight: 500 }}>75% less cognitive overwhelm</b>.
            </p>
          </div>
        </section>

        {/* ── PHASE 3: WIREFRAMING & PROTOTYPING ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0', borderTop: '1px solid var(--bdr2)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 40, color: 'var(--white)' }}>
            Phase 3: Wireframing &amp; Prototyping <span style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '.6em' }}>(3 weeks)</span>
          </h2>

          {/* Low-fi wireframes + image */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 40 }}>
            <div>
              <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.4rem', fontWeight: 300, color: 'var(--white)', marginBottom: 16 }}>
                Low-Fidelity Wireframes
              </h3>
              <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--muted)', marginBottom: 20 }}>
                I started with paper sketches exploring different layouts for the AI intelligence dashboard. Key explorations:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, paddingLeft: 16 }}>
                {WIREFRAME_LAYOUTS.map((l, i) => (
                  <p key={i} style={{ fontSize: '.8rem', lineHeight: 1.65, color: 'var(--muted)' }}>{l}</p>
                ))}
              </div>
              <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Key Decision</div>
                <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--muted)' }}>
                  Layout B won testing because the left sidebar kept AI sentiment and scoring metrics visible while users explored the call list. This matched the natural workflow of monitoring AI intelligence while drilling into individual call transcriptions.
                </p>
              </div>
            </div>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--bdr2)' }}>
              <img src={`${import.meta.env.BASE_URL}images/ai-wireframes.png`} alt="Wireframing sketches" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          {/* Interactive Prototype Testing */}
          <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: 32 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--white)', marginBottom: 8 }}>Interactive Prototype Testing</h3>
            <p style={{ fontSize: '.8rem', lineHeight: 1.7, color: 'var(--muted)', marginBottom: 28 }}>
              Created medium-fidelity Figma prototypes of the AI intelligence dashboard and tested with 8 managers across 3 enterprise clients.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {PROTOTYPE_FINDINGS.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--s3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '.72rem', fontWeight: 600, color: 'var(--white)' }}>{i + 1}</div>
                  <p style={{ fontSize: '.78rem', lineHeight: 1.65, color: 'var(--muted)' }}>{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHASE 4: VISUAL DESIGN & DESIGN SYSTEM ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0', borderTop: '1px solid var(--bdr2)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 40, color: 'var(--white)' }}>
            Phase 4: Visual Design &amp; Design System <span style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '.6em' }}>(4 weeks)</span>
          </h2>

          {/* Design System + image */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 40 }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--white)', marginBottom: 14 }}>Design System for AI Interfaces</h3>
              <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--muted)', marginBottom: 24 }}>
                I built a 150+ component design system from scratch, optimized for AI-dense data interfaces — sentiment gauges, transcription views, scoring cards, and intelligence widgets.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {DS_ITEMS.map((item, i) => (
                  <div key={i} style={{ borderLeft: '2px solid var(--bdr2)', paddingLeft: 16 }}>
                    <p style={{ fontSize: '.8rem', lineHeight: 1.7, color: 'var(--muted)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--bdr2)' }}>
              <img src={`${import.meta.env.BASE_URL}images/ai-design-system.png`} alt="Design system components" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          {/* 4 design principle cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {DESIGN_PRINCIPLES.map((p, i) => (
              <div key={i} style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: '20px 18px' }}>
                <p style={{ fontSize: '.76rem', lineHeight: 1.65, color: 'var(--muted)' }}>{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL SOLUTION ── */}
        <section style={{ padding: '100px var(--pad) 80px', borderTop: '1px solid var(--bdr2)', marginTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
              Final Solution
            </h2>
            <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 48, maxWidth: 720 }}>
              The AI intelligence dashboard surfaces transcription, sentiment, scoring, and conversation analytics through five interconnected modules — each powered by AI, each interactive, each designed for instant comprehension.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
              {FINAL_FEATURES.map(({ title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: 24, background: 'rgba(240,237,230,.03)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '28px 32px' }}>
                  <div style={{ width: 200, flexShrink: 0 }}>
                    <h3 style={{ fontSize: '.92rem', fontWeight: 500, color: 'var(--white)', lineHeight: 1.3 }}>{title}</h3>
                  </div>
                  <p style={{ fontSize: '.82rem', lineHeight: 1.75, color: 'var(--muted)' }}>{desc}</p>
                </div>
              ))}
            </div>

            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--bdr2)', boxShadow: '0 25px 50px rgba(0,0,0,.4)' }}>
              <img src={`${import.meta.env.BASE_URL}images/ai-final-dashboard.png`} alt="Final dashboard design" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* ── CALL DETAILS VIEW ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0', borderTop: '1px solid var(--bdr2)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12, color: 'var(--white)' }}>
            Call Details View
          </h2>
          <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 40, maxWidth: 760 }}>
            Full AI analysis for any individual call — real-time transcription with speaker labels, AI-generated summary and key moments, automated scorecard, and sentiment timeline visualization.
          </p>

          <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--bdr2)', boxShadow: '0 20px 40px rgba(0,0,0,.35)', marginBottom: 32 }}>
            <img src={`${import.meta.env.BASE_URL}images/ai-call-details.png`} alt="Call details view" style={{ width: '100%', display: 'block' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {CALL_DETAIL_FEATURES.map(f => (
              <div key={f} style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: '20px 18px' }}>
                <p style={{ fontSize: '.8rem', lineHeight: 1.6, color: 'var(--muted)' }}>{f}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESULTS & IMPACT ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 0', borderTop: '1px solid var(--bdr2)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 40, color: 'var(--white)' }}>
            Results &amp; Impact
          </h2>

          {/* 3 metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
            {RESULTS.map(({ n, l, desc }) => (
              <div key={l} style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '32px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '2.4rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: 8 }}>{n}</div>
                <div style={{ fontSize: '.62rem', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: 12 }}>{l}</div>
                <p style={{ fontSize: '.78rem', lineHeight: 1.6, color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Business Impact */}
          <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '36px 40px', marginBottom: 40, textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--white)', marginBottom: 20 }}>Business Impact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {BUSINESS_IMPACT.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#4ade80', fontWeight: 600, fontSize: '.82rem', flexShrink: 0, marginTop: 1 }}>&#10003;</span>
                  <p style={{ fontSize: '.82rem', lineHeight: 1.65, color: 'var(--muted)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div style={{ background: 'linear-gradient(135deg, rgba(201,168,76,.12), rgba(201,168,76,.04))', border: '1px solid var(--border)', borderRadius: 14, padding: '48px 48px 40px', textAlign: 'center' }}>
            <p style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.1rem,1.8vw,1.5rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, color: 'var(--white)', marginBottom: 20, maxWidth: 720, margin: '0 auto 20px' }}>
              "The AI intelligence dashboard changed everything. We went from listening to random calls to having AI transcription, sentiment, and scoring on every single interaction — insights we never had before."
            </p>
            <div style={{ fontSize: '.6rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', opacity: .7 }}>
              Head of Operations, Enterprise Client
            </div>
          </div>
        </section>

        {/* ── KEY LEARNINGS ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad) 100px', borderTop: '1px solid var(--bdr2)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 40, color: 'var(--white)' }}>
            Key Learnings
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {LEARNINGS.map(({ title, desc }, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '28px 32px', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '2rem', fontWeight: 300, color: 'rgba(201,168,76,.15)', lineHeight: 1, flexShrink: 0, width: 40 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{ fontSize: '.92rem', fontWeight: 500, color: 'var(--white)', marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: '.82rem', lineHeight: 1.75, color: 'var(--muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: '1px solid var(--bdr2)', padding: '40px var(--pad)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>© 2024 Priyamvada Khanolkar</span>
          <a href="/" style={{ fontSize: '.66rem', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', cursor: 'none' }}>
            ← Back to Work
          </a>
        </footer>
      </div>
    </>
  )
}
