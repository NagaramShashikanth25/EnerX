import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EnerX — Turn Your Solar Into Real Value',
  description: "India's first green energy intelligence platform. Convert rooftop solar into verified carbon credits, ESG reports, and real rewards.",
  keywords: 'solar energy, carbon credits, ESG, BRSR, green energy, India, rooftop solar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ background:'#F7F4EE', margin:0, padding:0 }}>{children}</body>
    </html>
  )
}
