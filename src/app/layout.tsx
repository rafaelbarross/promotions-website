import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "./components/layout/ui-demo/header";
import { ThemeProvider } from "./components/theme-provider";
import { AuthContextProvider } from "./contexts/authContext/authContext";
import { GlobalContextProvider } from "./contexts/globalContext/globalContext";
import { ProductContextProvider } from "./contexts/productContext/productContext";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { Spinner } from "./components/layout/ui-demo/spinner";

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

export const metadata: Metadata = {
  publisher: "CoyPromo",
  title: "CoyPromo",
  description: "As melhores promoções você encontra aqui!",
  openGraph: {
    title: "CoyPromo",
    type: "website",
    url: "https://coypromo.vercel.app/",
    description: "As melhores promoções você encontra aqui!",
    siteName: "CoyPromo",
    images: [
      {
        url: "https://coypromo.vercel.app/icon.png",
        alt: "Imagem de destaque para o CoyPromo",
        protocol: "https",
        pathname: "https://coypromo.vercel.app/icon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Spinner className="fixed left-[50%] top-[50%]" />}>
          <ProductContextProvider>
            <GlobalContextProvider>
              <AuthContextProvider>
                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                  <Analytics />
                  <Toaster />
                  <Header />
                  <main className="container mx-auto ">
                    {/* <NavBarMenu/> */}
                    {/* <Outlet /> */}

                    {children}
                  </main>
                </ThemeProvider>
              </AuthContextProvider>
            </GlobalContextProvider>
          </ProductContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
