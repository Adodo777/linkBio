"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconSelect } from "@/components/admin/icon-select"
import { ArrowUp, ArrowDown, Plus, Trash2 } from "lucide-react"
import type { LinkItem } from "@/lib/site-data"

interface LinksFormProps {
  links: LinkItem[]
  onChange: (links: LinkItem[]) => void
}

export function LinksForm({ links, onChange }: LinksFormProps) {
  function updateLink(index: number, field: keyof LinkItem, value: string) {
    const updated = [...links]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  function addLink() {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      label: "Nouveau lien",
      href: "#",
      icon: "ExternalLink",
      variant: "primary",
    }
    onChange([...links, newLink])
  }

  function removeLink(index: number) {
    onChange(links.filter((_, i) => i !== index))
  }

  function moveLink(index: number, direction: -1 | 1) {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= links.length) return
    const updated = [...links]
    const [item] = updated.splice(index, 1)
    updated.splice(newIndex, 0, item)
    onChange(updated)
  }

  return (
    <div className="flex flex-col gap-6">
      {links.map((link, index) => (
        <div
          key={link.id}
          className="flex flex-col gap-3 rounded-lg border border-border/60 bg-secondary/30 p-4"
        >
          {/* Header row with move/delete */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {"Lien "}{index + 1}
            </span>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => moveLink(index, -1)}
                disabled={index === 0}
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span className="sr-only">Monter</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => moveLink(index, 1)}
                disabled={index === links.length - 1}
              >
                <ArrowDown className="h-3.5 w-3.5" />
                <span className="sr-only">Descendre</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeLink(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="sr-only">Supprimer</span>
              </Button>
            </div>
          </div>

          {/* Label */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-foreground/70">Libelle</Label>
            <Input
              value={link.label}
              onChange={(e) => updateLink(index, "label", e.target.value)}
            />
          </div>

          {/* URL */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-foreground/70">URL</Label>
            <Input
              value={link.href}
              onChange={(e) => updateLink(index, "href", e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* Icon + Variant row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-foreground/70">Icone</Label>
              <IconSelect
                value={link.icon}
                onValueChange={(v) => updateLink(index, "icon", v)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-foreground/70">Style</Label>
              <Select
                value={link.variant}
                onValueChange={(v) => updateLink(index, "variant", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Principal</SelectItem>
                  <SelectItem value="secondary">Secondaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addLink}
        className="border-dashed border-gold/40 text-gold hover:bg-gold/10 hover:text-gold-light"
      >
        <Plus className="h-4 w-4" />
        Ajouter un lien
      </Button>
    </div>
  )
}
