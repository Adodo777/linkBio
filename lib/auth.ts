import { cookies } from "next/headers"

const COOKIE_NAME = "admin_session"
const SESSION_VALUE = "authenticated"
const MAX_AGE = 60 * 60 * 24 // 24 hours

function getSecret(): string {
  const password = process.env.ADMIN_PASSWORD
  if (!password) throw new Error("ADMIN_PASSWORD is not set")
  return password
}

async function sign(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  )
  const hex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  return `${payload}.${hex}`
}

async function verify(token: string, secret: string): Promise<boolean> {
  const parts = token.split(".")
  if (parts.length !== 2) return false
  const [payload, providedSig] = parts
  const expected = await sign(payload, secret)
  return expected === token && payload === SESSION_VALUE
}

export async function createSession(): Promise<void> {
  const secret = getSecret()
  const token = await sign(SESSION_VALUE, secret)
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const secret = getSecret()
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return false
    return verify(token, secret)
  } catch {
    return false
  }
}

export function checkPassword(password: string): boolean {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) return false
  return password === secret
}

export function checkEmail(email: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return false
  return email === adminEmail
}

export function checkCredentials(email: string, password: string): boolean {
  return checkEmail(email) && checkPassword(password)
}
