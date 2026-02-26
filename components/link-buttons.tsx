import type { LinkItem } from "@/lib/site-data"
import { getIcon } from "@/lib/icons"

interface LinkButtonsProps {
  links: LinkItem[]
}

export function LinkButtons({ links }: LinkButtonsProps) {
  return (
    <nav className="flex w-full flex-col gap-3.5" aria-label="Liens principaux">
      {links.map((link) => {
        const Icon = getIcon(link.icon)
        return (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-medium tracking-wide transition-all duration-300 ${
              link.variant === "primary"
                ? "border border-gold/40 bg-secondary text-foreground hover:border-gold/70 hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(201,169,110,0.15)]"
                : "border border-border bg-transparent text-muted-foreground hover:border-gold/40 hover:text-foreground"
            }`}
          >
            <span
              className={`transition-colors duration-300 ${
                link.variant === "primary"
                  ? "text-gold group-hover:text-gold-light"
                  : "text-muted-foreground group-hover:text-gold"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span>{link.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
