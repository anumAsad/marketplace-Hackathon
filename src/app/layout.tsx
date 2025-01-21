import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import { CartProvider } from "@/context/CartContext";

// Define local fonts
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

// Metadata for the application
export const metadata: Metadata = {
  title: "Shop.co - Your Online Store",
  description: "Shop for the best products at unbeatable prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Wrap the entire app with ReduxProvider */}
        
          {/* Cart Context Provider */}
          <CartProvider>
            {/* Announcement Banner */}
            <Announcement />

            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content */}
            <main>{children}</main>

            {/* Newsletter Section */}
            <Newsletter />

            {/* Footer */}
            <Footer />
          </CartProvider>
        
      </body>
    </html>
  );
}
