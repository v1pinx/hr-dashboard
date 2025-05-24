"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, LayoutDashboard, Menu, PieChart, X } from "lucide-react";

const routes = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Bookmarks",
    path: "/bookmarks",
    icon: Bookmark,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: PieChart,
  },
];

function clsx(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-zinc-950/80 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        
        {/* Logo/Brand - Always visible */}
        <Link href="/" className="flex items-center space-x-2 z-10">
          <div className="flex items-center">
            <LayoutDashboard className="h-6 w-6" />
            <span className="ml-2 font-bold text-lg text-zinc-900 dark:text-zinc-100">
              HR Dashboard
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={clsx(
                "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                pathname === route.path
                  ? " bg-zinc-800 text-white "
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              )}
            >
              <route.icon className="h-4 w-4" />
              <span>{route.name}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors z-10"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </button>

        {/* Mobile Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Slide-out Menu */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw]  shadow-2xl transform transition-transform duration-300 ease-out">
              
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 bg-black">
                <div className="flex items-center space-x-2">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    HR Dashboard
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-zinc-800 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5 text-zinc-400" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 bg-black shadow-2xl rounded-lg">
                <div className="space-y-2">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={() => setMenuOpen(false)}
                      className={clsx(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        pathname === route.path
                          ? "bg-zinc-800 "
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                      )}
                    >
                      <route.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{route.name}</span>
                      {pathname === route.path && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                      )}
                    </Link>
                  ))}
                </div>
              </nav>

        
            </div>
          </div>
        )}
      </div>
    </header>
  );
}