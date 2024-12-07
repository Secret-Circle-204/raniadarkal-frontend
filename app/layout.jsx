import localFont from "next/font/local";
import "./globals.css";

import Header from '@/components/header'
import Footer from '@/components/footer'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: 'rania-darkal || interior design',
  description: 'powered by hamza bahaa and xtream-communication',
  charset: 'UTF-8',
  name: 'rania-darkal || INTERIOR DESIGN',
  author: 'hamza bahaa',
  keywords:
    'interior design, design, rania-darkal, interior, decoration, decoration, hamza bahaa, xtream-communication',
  robots: 'index, follow',
  category: 'design, development',
  // url: 'https://rania-darkal.com',
  // url: 'https://www.rania-darkal.com',
  // image: 'https://www.rania-darkal.com/favicon.ico',
  // type: 'website',
  // icon: './fav-icon.svg',
  language: 'en',
  publisher: 'hamza bahaa',
  creator: 'hamza bahaa with xtream-communication',
  date: '2023-12-12',
  format: 'website'
  // twitter: {
  //   card: 'summary',
  //   site: '@xtream-communication',
  //   creator: '@xtream-communication',
  //   // title: 'prestige-design || interior design',
  //   description: 'powered by hamza-bahaa and xtream-communication',
  //   image: 'http://localhost:3000/favicon.ico'
  //   // image: 'https://www.rania-darkal.com/favicon.ico',
  // }
}
export const revalidate = 60000 // revalidate at most 1800 seconds

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
