"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { IconSelect } from "@/components/admin/icon-select"
import { Plus, Trash2 } from "lucide-react"
import type { TrustPoint } from "@/lib/site-data"

interface TrustFormProps {
  trustPoints: TrustPoint[]
  onChange: (trustPoints: TrustPoint[]) => void
}

export function TrustForm({ trustPoints, onChange }: TrustFormProps) {
  function updatePoint(index: number, field: keyof TrustPoint, value: string) {
    const updated = [...trustPoints]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  function addPoint() {
    const newPoint: TrustPoint = {
      id: Date.now().toString(),
      icon: "Star",
      text: "Nouveau point de confiance",
    }
    onChange([...trustPoints, newPoint])
  }

  function removePoint(index: number) {
    onChange(trustPoints.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-5">
      {trustPoints.map((point, index) => (
        <div
          key={point.id}
          className="flex flex-col gap-3 rounded-lg border border-border/60 bg-secondary/30 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {"Point "}{index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => removePoint(index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only">Supprimer</span>
            </Button>
          </div>

          <div className="grid grid-cols-[140px_1fr] gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-foreground/70">Icone</Label>
              <IconSelect
                value={point.icon}
                onValueChange={(v) => updatePoint(index, "icon", v)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-foreground/70">Texte</Label>
              <Input
                value={point.text}
                onChange={(e) => updatePoint(index, "text", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addPoint}
        className="border-dashed border-gold/40 text-gold hover:bg-gold/10 hover:text-gold-light"
      >
        <Plus className="h-4 w-4" />
        Ajouter un point
      </Button>
    </div>
  )
}
