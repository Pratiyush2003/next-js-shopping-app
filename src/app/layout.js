"use client";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from '@/components/Navbar/page'
import Footer from '@/components/Footer/page'
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Suspense } from "react";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="m-2">
          <Navbar />
        </div>
        <Provider store={store}>
          <Suspense>
            {children}
          </Suspense>
        </Provider>
        <div className="m-2">
          <Footer />
        </div>
      </body>
    </html>
  );
}
