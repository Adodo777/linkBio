import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import fs from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non supporte. Utilisez JPG, PNG, WebP ou GIF." },
        { status: 400 }
      )
    }

    // Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Le fichier est trop volumineux (max 5 Mo)" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = file.name.split(".").pop() || "jpg"
    const filename = `elena-avatar-${Date.now()}.${ext}`
    const uploadDir = path.join(process.cwd(), "public", "images")

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filePath = path.join(uploadDir, filename)
    fs.writeFileSync(filePath, buffer)

    const publicUrl = `/images/${filename}`
    return NextResponse.json({ url: publicUrl })
  } catch {
    return NextResponse.json(
      { error: "Erreur lors du telechargement" },
      { status: 500 }
    )
  }
}
