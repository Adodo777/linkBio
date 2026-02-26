import Image from "next/image"
import { Sparkles } from "lucide-react"
import type { Profile } from "@/lib/site-data"

interface ProfileHeaderProps {
  profile: Profile
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-5">
      {/* Avatar with gold ring */}
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark opacity-80 blur-sm" />
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-gold/60">
          <Image
            src={profile.avatarUrl}
            alt={`${profile.name} - ${profile.subtitle}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Name */}
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
        <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground md:text-3xl">
          {profile.name}
        </h1>
        <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
      </div>

      {/* Subtitle */}
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
        {profile.subtitle}
      </p>

      {/* Divider */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="h-px w-8 bg-gold/30" />
        <span className="text-xs text-gold/60">&#10022;</span>
        <span className="h-px w-8 bg-gold/30" />
      </div>

      {/* Slogan */}
      <p className="text-balance text-center font-serif text-sm italic leading-relaxed text-muted-foreground md:text-base">
        {`"${profile.slogan}"`}
      </p>

      {/* Bio */}
      <p className="max-w-xs text-center text-sm leading-relaxed text-muted-foreground">
        {profile.bio}
      </p>
    </header>
  )
}
