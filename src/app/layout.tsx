import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Das Tailors",
  description: "Sleek and easy receipts and invoices management app for Das Tailors.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="text-tailor-text flex justify-center h-screen overflow-hidden bg-gray-300">
        <div className="w-full max-w-md h-full bg-tailor-bg relative shadow-2xl overflow-hidden flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
