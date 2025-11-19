import "./globals.css"
import { NavBar } from "@/components/NavBar"

export const metadata = {
  title: "Work Zone OS",
  description: "Road crew productivity and safety platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <NavBar />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
