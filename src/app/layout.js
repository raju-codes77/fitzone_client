import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import NavbarPage from "@/components/NavbarPage";
import FitZoneChatbot from "@/components/chatbot/FitZoneChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitZone",
  description: "AI powered gym management platform.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">

        <NavbarPage />

        <main>
          {children}
        </main>
        
        <FitZoneChatbot />
        
        <Footer></Footer>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
