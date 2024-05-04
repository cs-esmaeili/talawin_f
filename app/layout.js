import localFont from 'next/font/local'
import '@/styles/globals.css';


const custom = localFont({
  src: './fonts/IranianSans.ttf',
  display: 'swap',
})


export const metadata = {
  title: "News",
  description: 'Created by Javad Esmaeili',
}

export default function RootLayout({ children }) {
  return (
    <html className={custom.className} lang="en">
      <body>{children}</body>
    </html>
  )
}
