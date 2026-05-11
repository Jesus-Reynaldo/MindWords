import type { Metadata } from 'next'
import './globals.css'
import MuiThemeRegistry from '@/lib/MuiThemeRegistry'

export const metadata: Metadata = {
  title: 'MindWords',
  description: 'Spaced repetition vocabulary learning',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MuiThemeRegistry>{children}</MuiThemeRegistry>
      </body>
    </html>
  )
}
