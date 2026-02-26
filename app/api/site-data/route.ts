import { NextResponse } from "next/server"
import { getSiteData, saveSiteData, type SiteData } from "@/lib/site-data"
import { isAuthenticated } from "@/lib/auth"

export async function GET() {
  try {
    const data = getSiteData()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "Impossible de charger les donnees" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const body = (await request.json()) as SiteData

    // Basic validation
    if (!body.profile || !body.links || !body.trustPoints || !body.theme) {
      return NextResponse.json(
        { error: "Donnees incompletes" },
        { status: 400 }
      )
    }

    saveSiteData(body)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la sauvegarde" },
      { status: 500 }
    )
  }
}
