import '@styles/globals.css'
import 'leaflet/dist/leaflet.css';
import type { Metadata } from 'next'
import { Sora } from 'next/font/google';

// components
import { Provider, MusicPlayer, Nav, Header, TopLeftImg } from '@components'
import { playlist } from '@utils';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});


export const metadata: Metadata = {
  title: 'Jonathan Concepcion',
  description: 'Web developer and Gamer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={`page scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-h-6 bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}>
          <MusicPlayer playlist={playlist} />
          <TopLeftImg />
          <Nav />
          <Header />
          <Provider>
            {children}
          </Provider>
        </div>
      </body>
    </html>
  )
}
