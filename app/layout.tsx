import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chainauth.xyz"), // Update to your domain
  title: {
    default: "ChainAuth - Decentralized Authentication",
    template: `%s | ChainAuth`,
  },
  description:
    "ChainAuth offers a decentralized authentication framework that eliminates the need for passwords, enhancing security and user control.",
  openGraph: {
    description:
      "ChainAuth provides a decentralized solution for secure identity management without passwords.",
    images: [
      "https://yourimageurl.com/image.png", // Update with your image URL
    ],
    url: "https://chainauth.xyz/", // Update to your domain
  },
  twitter: {
    card: "summary_large_image",
    title: "ChainAuth - Decentralized Authentication",
    description:
      "Enhancing security and user control with a passwordless authentication solution.",
    creator: "@yourtwitterhandle", // Update with your Twitter handle
    images: [
      "https://yourimageurl.com/image.png", // Update with your image URL
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="https://utfs.io/f/your-image-url-1.png" // Update with relevant image URLs
          as="image"
        />
        <link
          rel="preload"
          href="https://utfs.io/f/your-image-url-2.png" // Update with relevant image URLs
          as="image"
        />
      </head>
      <body className={GeistSans.className}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
