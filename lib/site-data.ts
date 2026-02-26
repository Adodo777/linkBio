import fs from "fs"
import path from "path"

export interface Profile {
  name: string
  subtitle: string
  slogan: string
  bio: string
  avatarUrl: string
}

export interface LinkItem {
  id: string
  label: string
  href: string
  icon: string
  variant: "primary" | "secondary"
}

export interface TrustPoint {
  id: string
  icon: string
  text: string
}

export interface ThemeConfig {
  goldColor: string
  backgroundColor: string
  cardColor: string
  accentColor: string
}

export interface SiteData {
  profile: Profile
  links: LinkItem[]
  trustPoints: TrustPoint[]
  theme: ThemeConfig
}

const DATA_PATH = path.join(process.cwd(), "data", "site-data.json")

export function getSiteData(): SiteData {
  const raw = fs.readFileSync(DATA_PATH, "utf-8")
  return JSON.parse(raw) as SiteData
}

export function saveSiteData(data: SiteData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8")
}
