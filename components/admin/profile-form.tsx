"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import Image from "next/image"
import type { Profile } from "@/lib/site-data"
import { useRef, useState } from "react"

interface ProfileFormProps {
  profile: Profile
  onChange: (profile: Profile) => void
}

export function ProfileForm({ profile, onChange }: ProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  function update(field: keyof Profile, value: string) {
    onChange({ ...profile, [field]: value })
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        const { url } = await res.json()
        update("avatarUrl", url)
      }
    } catch {
      // Upload error handled silently
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Avatar */}
      <div className="flex flex-col gap-3">
        <Label className="text-foreground/80">Photo de profil</Label>
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gold/40">
            <Image
              src={profile.avatarUrl}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="h-4 w-4" />
              {uploading ? "Envoi..." : "Changer"}
            </Button>
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="profile-name" className="text-foreground/80">
          Nom
        </Label>
        <Input
          id="profile-name"
          value={profile.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>

      {/* Subtitle */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="profile-subtitle" className="text-foreground/80">
          Sous-titre
        </Label>
        <Input
          id="profile-subtitle"
          value={profile.subtitle}
          onChange={(e) => update("subtitle", e.target.value)}
        />
      </div>

      {/* Slogan */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="profile-slogan" className="text-foreground/80">
          Slogan
        </Label>
        <Input
          id="profile-slogan"
          value={profile.slogan}
          onChange={(e) => update("slogan", e.target.value)}
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="profile-bio" className="text-foreground/80">
          Bio
        </Label>
        <Textarea
          id="profile-bio"
          value={profile.bio}
          onChange={(e) => update("bio", e.target.value)}
          rows={3}
        />
      </div>
    </div>
  )
}
