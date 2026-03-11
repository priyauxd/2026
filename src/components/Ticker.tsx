const ITEMS = [
  'Mobile Banking','Fintech UX','Design Systems','B2B SaaS',
  'AI Interfaces','Enterprise Dashboards','MENA Market','WhatsApp Banking',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="ticker">
      <div className="t-track">
        {doubled.map((item, i) => (
          <div key={i} className="t-item">{item}</div>
        ))}
      </div>
    </div>
  )
}
