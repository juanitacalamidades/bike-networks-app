import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { MapProvider } from "@/context/MapContext";
import MapboxMap from "@/components/map/MapboxMap";

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})


export const metadata: Metadata = {
  title: 'Bicycle Networks',
  description: 'Find bike stations, availability, and network information.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
       <MapProvider>
          {/**
           * Layout de dos columnas:
           * - Panel izquierdo: contenido de la ruta activa (children)
           * - Panel derecho: mapa persistente, nunca se desmonta
           */}
          <div className="flex h-screen overflow-hidden">
            <aside className="w-[40%] shrink-0 overflow-y-auto">
              {children}
            </aside>
            <main className="flex-1 lg:w-[60%]">
              <MapboxMap />
            </main>
          </div>
        </MapProvider>
      </body>
    </html>
  );
}
