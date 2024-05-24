import localFont from 'next/font/local'
import '@/styles/globals.css';
import config from "@/config.json";

const custom = localFont({
  src: './fonts/IranianSans.ttf',
  display: 'swap',
})


export const metadata = {
  title: config.app_name,
  description: config.site_description,
}

export default function RootLayout({ children }) {
  return (
    <html className={custom.className} lang="en">
      <body>{children}</body>
    </html>
  )
}
