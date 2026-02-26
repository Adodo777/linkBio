import { ProfileHeader } from "@/components/profile-header"
import { LinkButtons } from "@/components/link-buttons"
import { TrustSection } from "@/components/trust-section"
import { getSiteData } from "@/lib/site-data"

export const dynamic = "force-dynamic"

export default function Home() {
  const data = getSiteData()
  const { profile, links, trustPoints, theme } = data

  // Build CSS custom properties from theme
  const themeStyles: React.CSSProperties = {
    "--gold": theme.goldColor,
    "--gold-light": `color-mix(in srgb, ${theme.goldColor} 80%, white)`,
    "--gold-dark": `color-mix(in srgb, ${theme.goldColor} 70%, black)`,
    "--background": theme.backgroundColor,
    "--secondary": theme.cardColor,
    "--card": theme.cardColor,
    "--indigo-deep": theme.accentColor,
  } as React.CSSProperties

  return (
    <div className="relative flex min-h-screen items-start justify-center overflow-hidden" style={themeStyles}>
      {/* Subtle gradient background overlay */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse at top, ${theme.accentColor} 0%, transparent 60%)`,
          contain: "paint",
          willChange: "transform",
        }}
      />

      {/* Decorative star dots */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 20% 15%, ${theme.goldColor}99 0%, transparent 100%), radial-gradient(1px 1px at 70% 25%, ${theme.goldColor}66 0%, transparent 100%), radial-gradient(1px 1px at 45% 60%, ${theme.goldColor}4D 0%, transparent 100%), radial-gradient(1.5px 1.5px at 85% 45%, ${theme.goldColor}80 0%, transparent 100%), radial-gradient(1px 1px at 10% 80%, ${theme.goldColor}4D 0%, transparent 100%), radial-gradient(1px 1px at 60% 90%, ${theme.goldColor}66 0%, transparent 100%)`,
          contain: "paint",
          willChange: "transform",
        }}
      />

      <main className="relative z-10 flex w-full max-w-md flex-col items-center gap-8 px-5 py-12 md:py-16">
        <ProfileHeader profile={profile} />
        <LinkButtons links={links} />
        <TrustSection trustPoints={trustPoints} />

        {/* Footer */}
        <footer className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-px w-6" style={{ backgroundColor: `${theme.goldColor}33` }} />
            <span className="text-[10px]" style={{ color: `${theme.goldColor}66` }}>&#10022;</span>
            <span className="h-px w-6" style={{ backgroundColor: `${theme.goldColor}33` }} />
          </div>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} {profile.name} &mdash; {profile.subtitle}
          </p>
        </footer>
      </main>
    </div>
  )
}
