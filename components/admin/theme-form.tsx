"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ThemeConfig } from "@/lib/site-data"

interface ThemeFormProps {
  theme: ThemeConfig
  onChange: (theme: ThemeConfig) => void
}

function ColorField({
  label,
  value,
  onChange,
  id,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  id: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-foreground/80">
        {label}
      </Label>
      <div className="flex items-center gap-3">
        <div
          className="h-9 w-9 flex-shrink-0 rounded-md border border-border"
          style={{ backgroundColor: value }}
        />
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#C9A96E"
          className="font-mono text-sm"
        />
      </div>
    </div>
  )
}

export function ThemeForm({ theme, onChange }: ThemeFormProps) {
  function update(field: keyof ThemeConfig, value: string) {
    onChange({ ...theme, [field]: value })
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        Personnalisez les couleurs de votre page. Utilisez des codes hexadecimaux (ex: #C9A96E).
      </p>

      <ColorField
        id="theme-gold"
        label="Couleur or (accents)"
        value={theme.goldColor}
        onChange={(v) => update("goldColor", v)}
      />

      <ColorField
        id="theme-bg"
        label="Couleur de fond"
        value={theme.backgroundColor}
        onChange={(v) => update("backgroundColor", v)}
      />

      <ColorField
        id="theme-card"
        label="Couleur des cartes"
        value={theme.cardColor}
        onChange={(v) => update("cardColor", v)}
      />

      <ColorField
        id="theme-accent"
        label="Couleur d'accent (fond haut)"
        value={theme.accentColor}
        onChange={(v) => update("accentColor", v)}
      />
    </div>
  )
}
