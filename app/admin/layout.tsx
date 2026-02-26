import { getSiteData } from "@/lib/site-data"
import type { Metadata } from "next"
import { Toaster } from "sonner"

const data = getSiteData()
  const { profile } = data


export const metadata: Metadata = {
  title: `Admin - ${profile.name}`,
  description: "Espace administration",
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          },
        }}
      />
    </>
  )
}
