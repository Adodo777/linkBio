import { NextRequest, NextResponse } from "next/server"
import { checkCredentials, createSession, destroySession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password } = body

    if (action === "logout") {
      await destroySession()
      return NextResponse.json({ success: true })
    }

    // Login
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Adresse email requise" },
        { status: 400 }
      )
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Mot de passe requis" },
        { status: 400 }
      )
    }

    if (!checkCredentials(email, password)) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      )
    }

    await createSession()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    )
  }
}
