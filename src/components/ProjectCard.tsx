interface ProjectCardProps {
  index: number
  title: string
  description: string
  tags: string[]
  year: string
  color: string
  featured?: boolean
}

export default function ProjectCard({
  index,
  title,
  description,
  tags,
  year,
  color,
  featured = false,
}: ProjectCardProps) {
  return (
    <article
      className={`group relative rounded-2xl overflow-hidden gradient-border transition-all duration-500 ease-smooth
        bg-card hover:bg-card-hover cursor-pointer
        ${featured ? 'md:col-span-2' : ''}
      `}
      aria-label={`Project: ${title}`}
    >
      {/* Image placeholder */}
      <div
        className={`relative overflow-hidden ${featured ? 'h-80 md:h-96' : 'h-56'}`}
        style={{ background: color }}
      >
        {/* Decorative noise texture overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Project number */}
        <div className="absolute top-6 left-6">
          <span className="text-xs font-semibold text-white/50 tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Arrow on hover */}
        <div
          aria-hidden="true"
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
            flex items-center justify-center
            translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100
            transition-all duration-300 ease-smooth"
        >
          <svg className="w-4 h-4 text-white -rotate-45" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Hover overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-h3 font-semibold text-white group-hover:text-accent-light transition-colors duration-300">
            {title}
          </h3>
          <span className="text-xs text-ink-muted shrink-0 mt-1">{year}</span>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
