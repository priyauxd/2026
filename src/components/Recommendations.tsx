const RECS = [
  {
    initials: 'TM',
    name: 'Tamer Marshoud',
    title: 'Customer Success & CX Leader · SaaS & Enterprise Portfolio Leadership',
    headline: '"Looking to connect my network with a great talent!"',
    quote: 'I\'m happy to recommend my ex-colleague Priyamvada Khanolkar, a highly skilled Senior Product Designer with strong experience in user research, UI/UX design, and end-to-end product delivery.',
  },
  {
    initials: 'DR',
    name: "Dana Ra'ef",
    title: 'Senior Data Scientist · Product Analyst · Data Analyst · GenAI',
    headline: null,
    quote: "All the best, Priya! You're incredibly talented and would be a great addition to any team ❤️👍",
  },
]

export default function Recommendations() {
  return (
    <section className="recs-sec" style={{ padding: '100px var(--pad) 0' }}>
      {/* header */}
      <div className="rv" style={{ textAlign: 'center', marginBottom: 56 }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.9rem,3.8vw,3.2rem)', fontWeight: 300, lineHeight: 1, marginBottom: 14 }}>
          Recom<em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>mendations</em>
        </h2>
        <p style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.65 }}>
          Trusted by industry leaders and colleagues in enterprise SaaS and data science.
        </p>
      </div>

      {/* cards */}
      <div className="rv d2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
        {RECS.map(({ initials, name, title, headline, quote }) => (
          <div key={name} style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 14, padding: '32px 32px', position: 'relative', overflow: 'hidden' }}>
            {/* quote mark */}
            <div aria-hidden="true" style={{ position: 'absolute', top: 28, right: 28, fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '3.5rem', fontWeight: 300, lineHeight: 1, color: 'var(--border)', userSelect: 'none' }}>"</div>

            {/* person */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--s3)', border: '1px solid var(--bdr2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '.72rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '.05em' }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: '.88rem', fontWeight: 500, color: 'var(--white)', marginBottom: 3 }}>{name}</div>
                <div style={{ fontSize: '.68rem', color: 'var(--muted)', lineHeight: 1.5 }}>{title}</div>
              </div>
            </div>

            {/* headline (optional) */}
            {headline && (
              <div style={{ fontSize: '.82rem', fontWeight: 500, color: 'var(--gold)', marginBottom: 10, lineHeight: 1.5 }}>{headline}</div>
            )}

            {/* quote */}
            <p style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1rem,1.4vw,1.15rem)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.7, color: 'var(--white)', margin: 0 }}>
              "{quote}"
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
