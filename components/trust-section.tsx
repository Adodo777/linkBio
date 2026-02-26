import type { TrustPoint } from "@/lib/site-data"
import { getIcon } from "@/lib/icons"

interface TrustSectionProps {
  trustPoints: TrustPoint[]
}

export function TrustSection({ trustPoints }: TrustSectionProps) {
  return (
    <section className="w-full" aria-labelledby="trust-heading">
      {/* Section heading */}
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        <h2
          id="trust-heading"
          className="text-xs font-medium uppercase tracking-[0.2em] text-gold/80"
        >
          Pourquoi me faire confiance ?
        </h2>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      {/* Trust points */}
      <ul className="flex flex-col gap-3.5">
        {trustPoints.map((point) => {
          const Icon = getIcon(point.icon)
          return (
            <li
              key={point.id}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-secondary/50 px-4 py-3"
            >
              <span className="flex-shrink-0" aria-hidden="true">
                <Icon className="h-4 w-4 text-gold" />
              </span>
              <span className="text-sm text-foreground/80">{point.text}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
