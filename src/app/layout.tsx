// File: app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Navbar from '@/components/navbar'; // Import the Navbar

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Verfolia - Join the Waitlist',
  description: 'The best way to build your resume.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar /> {/* This is the correct placement */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}