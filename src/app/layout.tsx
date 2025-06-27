import type { Metadata } from "next";
import Footer from "~/components/common/footer/Footer";
import ThemeProvider from "~/components/common/others/theme-provider";
import Navbar from "~/components/layout/navbar/navbar";
import { Toaster } from "~/components/ui/sonner";
import * as fonts from "~/lib/conf/font.conf";
import "../lib/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${fonts.fontBody.variable} ${fonts.fontDisplay.variable} flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Libris: Track, Discover, Share Your Favorite Books",
    template: "%s • Libris",
  },
  description:
    "Track, discover, and share your favorite books with Libris. Discover top-rated and popular books through reviews and recommendations. Sign up for free!",
  keywords:
    "libris, portfolio project, portfolio, portfolio site, book tracker, reading tracker, reading app, book app, reading website, book website, social media, social media app, social media site, social media website, web developer portfolio, developer portfolio, developer project, developer portfolio project, software project, software, software developer, nextjs, next.js, reactjs, react, react.js, javascript, typescript, prisma, mongodb, shadcn, shadcn ui, better auth, side project",
  robots: {
    follow: true,
    index: true,
    googleBot: { index: true, follow: true },
  },
  applicationName: "Libris",
  authors: [
    {
      name: "Ikram Hussain Siyam",
      url: "https://ikramhussainsiyam.vercel.app/",
    },
  ],
  openGraph: {
    type: "website",
    title: {
      default: "Libris: Track, Discover, Share Your Favorite Books",
      template: "%s • Libris",
    },
    description:
      "Track, discover, and share your favorite books with Libris. Discover top-rated and popular books through reviews and recommendations. Sign up for free!",
    url: "https://libris-app.netlify.app/",
    images: "/splash.jpg",
  },
};
