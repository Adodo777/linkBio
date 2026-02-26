"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ProfileForm } from "@/components/admin/profile-form"
import { LinksForm } from "@/components/admin/links-form"
import { TrustForm } from "@/components/admin/trust-form"
import { ThemeForm } from "@/components/admin/theme-form"
import {
  User,
  Link2,
  ShieldCheck,
  Palette,
  Save,
  LogOut,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"
import type { SiteData } from "@/lib/site-data"

export default function AdminPage() {
  const router = useRouter()
  const [data, setData] = useState<SiteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/site-data")
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch {
      toast.error("Impossible de charger les donnees")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function handleSave() {
    if (!data) return
    setSaving(true)
    try {
      const res = await fetch("/api/site-data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast.success("Modifications enregistrees")
      } else {
        toast.error("Erreur lors de la sauvegarde")
      }
    } catch {
      toast.error("Erreur de connexion")
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    })
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Impossible de charger les donnees.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-8">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-gold" />
          <h1 className="font-serif text-xl font-semibold text-foreground">
            Administration
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Voir le site</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Deconnexion</span>
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="flex flex-col gap-6">
        <TabsList className="w-full">
          <TabsTrigger value="profile">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="links">
            <Link2 className="h-4 w-4" />
            <span className="hidden sm:inline">Liens</span>
          </TabsTrigger>
          <TabsTrigger value="trust">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Confiance</span>
          </TabsTrigger>
          <TabsTrigger value="theme">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Apparence</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm
            profile={data.profile}
            onChange={(profile) => setData({ ...data, profile })}
          />
        </TabsContent>

        <TabsContent value="links">
          <LinksForm
            links={data.links}
            onChange={(links) => setData({ ...data, links })}
          />
        </TabsContent>

        <TabsContent value="trust">
          <TrustForm
            trustPoints={data.trustPoints}
            onChange={(trustPoints) => setData({ ...data, trustPoints })}
          />
        </TabsContent>

        <TabsContent value="theme">
          <ThemeForm
            theme={data.theme}
            onChange={(theme) => setData({ ...data, theme })}
          />
        </TabsContent>
      </Tabs>

      {/* Save button */}
      <div className="sticky bottom-0 mt-8 flex justify-end border-t border-border bg-background/80 py-4 backdrop-blur-sm">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gold text-primary-foreground hover:bg-gold-light"
        >
          <Save className="h-4 w-4" />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </div>
  )
}
