import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work Zone OS',
  description: 'Work Zone operations management platform'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  )
}
