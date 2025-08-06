// File: src/components/navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

// NOTE: The 'useAuth' import has been removed.

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // NOTE: All authentication state and logic have been removed.

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-50 w-full">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className="flex items-center justify-between rounded-full py-3 px-4"
            style={{
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">V</span>
                </div>
                <span className="text-foreground text-xl font-bold tracking-tight">
                  Verfolia
                </span>
              </Link>
            </div>

            {/* Desktop Nav Links (Centered) */}
            <div className="hidden md:flex items-center space-x-6 mx-auto">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions - Static */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/login"
                className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
              >
                Sign in
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
              >
                Sign up for free
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden size-8 flex items-center justify-center text-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-lg md:hidden"
        >
          <div className="relative h-full flex flex-col p-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">V</span>
                </div>
                <span className="text-foreground text-xl font-bold tracking-tight">
                  Verfolia
                </span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="size-9 flex items-center justify-center text-foreground"><X className="h-5 w-5" /></button>
            </div>
            
            <nav className="flex-1 flex flex-col justify-center items-center space-y-8">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-2xl font-semibold text-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="p-6">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full py-3 text-center bg-primary text-primary-foreground rounded-md text-lg font-semibold hover:bg-primary/90 transition-colors">
                Sign up
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}