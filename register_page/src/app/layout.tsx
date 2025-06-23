import type { Metadata } from 'next'
import localFont from "next/font/local"
import './globals.css'

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins_regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins_medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins_bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins_black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>{children}</body>
    </html>
  )
}
