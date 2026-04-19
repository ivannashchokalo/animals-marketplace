import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { Metadata } from "next";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Animals marketplace",
  description:
    "Buy healthy animals online from trusted breeders. Discover different breeds, compare options, and choose the perfect pet for your home.",
  openGraph: {
    title: "Animals marketplace",
    description:
      "Buy healthy animals online from trusted breeders. Discover different breeds, compare options, and choose the perfect pet for your home.",
    url: "",
    siteName: "Animals marketplace",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "Animals marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
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
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TanstackQueryProvider>
          <AuthProvider>
            <Header />
            <main style={{ flexGrow: 1 }}>{children}</main>
            <Toaster />
            <Footer />
          </AuthProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
