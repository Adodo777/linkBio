import {
  CalendarHeart,
  Flower2,
  Send,
  Star,
  Heart,
  Shield,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Instagram,
  Youtube,
  Music,
  Sparkles,
  Eye,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react"

export const ICON_MAP: Record<string, LucideIcon> = {
  CalendarHeart,
  Flower2,
  Send,
  Star,
  Heart,
  Shield,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Instagram,
  Youtube,
  Music,
  Sparkles,
  Eye,
  Moon,
  Sun,
}

export const ICON_OPTIONS = Object.keys(ICON_MAP)

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Star
}
