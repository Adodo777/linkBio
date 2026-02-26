"use client"

import { ICON_OPTIONS, ICON_MAP } from "@/lib/icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface IconSelectProps {
  value: string
  onValueChange: (value: string) => void
}

export function IconSelect({ value, onValueChange }: IconSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Icone">
          {value && ICON_MAP[value] ? (
            <span className="flex items-center gap-2">
              {(() => {
                const Icon = ICON_MAP[value]
                return <Icon className="h-4 w-4 text-gold" />
              })()}
              <span>{value}</span>
            </span>
          ) : (
            "Choisir une icone"
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {ICON_OPTIONS.map((name) => {
          const Icon = ICON_MAP[name]
          return (
            <SelectItem key={name} value={name}>
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{name}</span>
              </span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
