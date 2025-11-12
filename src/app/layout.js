import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./providers";
import SessionGuard from "./components/SessionGuard";
import Footer from "./components/Footer";
// NOTE: your path had ".js.js" which can break the layout; fixed below:
import TaskProvider from "@/app/context/TaskContext.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://goziply.com"),
  title: {
    default: "GoZiply | Trusted Home, Moving & Repair Services in California",
    template: "%s | GoZiply",
  },
  description:
    "GoZiply connects you with trusted professionals across California for home repairs, moving, cleaning, plumbing, furniture assembly, landscaping, and more — fast, affordable, and on-demand.",
  keywords: [
    "GoZiply",
    "California home services",
    "cleaning services",
    "moving help",
    "plumber California",
    "electrician California",
    "furniture assembly",
    "appliance installation",
    "handyman California",
    "yard work",
    "smart home installation",
    "home repairs California",
  ],
  authors: [{ name: "GoZiply Team" }],
  creator: "GoZiply",
  publisher: "GoZiply Inc.",
  alternates: { canonical: "https://goziply.com" },
  openGraph: {
    title: "GoZiply – Reliable Local Services in California",
    description:
      "Book skilled professionals for cleaning, moving, furniture assembly, and repairs across California. GoZiply makes home services simple.",
    url: "https://goziply.com",
    siteName: "GoZiply",
    locale: "en_US",
    type: "website",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "GoZiply Logo - California's Service Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoZiply | Trusted Home, Moving & Cleaning Services in California",
    description:
      "Find reliable home service professionals in California with GoZiply. Book movers, cleaners, electricians, and more — all in one place.",
    images: ["/logo.webp"],
    creator: "@goziply",
  },
  icons: { icon: "/logo.webp", shortcut: "/logo.webp", apple: "/logo.webp" },
  category: "Services",
  manifest: "/site.webmanifest",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "GoZiply",
  image: "https://goziply.com/logo.webp",
  logo: "https://goziply.com/logo.webp",
  url: "https://goziply.com",
  telephone: "+1-800-555-0123",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Main Street",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    postalCode: "90001",
    addressCountry: "US",
  },
  priceRange: "$$",
  description:
    "GoZiply connects Californians with trusted local service professionals for moving, cleaning, repairs, and more.",
  sameAs: [
    "https://www.facebook.com/goziply",
    "https://twitter.com/goziply",
    "https://www.instagram.com/goziply",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* ✅ Allow data:/blob: images so base64 avatars render */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; connect-src 'self' https:; font-src 'self' data: https:; media-src 'self' data: blob: https:; frame-ancestors 'self';"
        />

        {/* Performance & fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Icons */}
        <link rel="icon" href="/logo.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />

        {/* SEO structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        <Providers>
          <SessionGuard>
            <TaskProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </TaskProvider>
          </SessionGuard>
        </Providers>
      </body>
    </html>
  );
}
