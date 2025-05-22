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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 max-w-7xl">
        {/* Left Section */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              HR Dashboard
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={clsx(
                  "transition-colors hover:text-foreground/80",
                  pathname === route.path
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mr-2 md:hidden border rounded p-2"
          onClick={() => setMenuOpen(true)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="bg-zinc-900 w-64 h-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">HR Dashboard</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close Menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col space-y-3">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setMenuOpen(false)}
                    className={clsx(
                      "flex items-center rounded-md px-2 py-1 text-sm font-medium",
                      pathname === route.path
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link
              href="/"
              className="mr-6 flex items-center space-x-2 md:hidden"
            >
              <span className="font-bold inline-block">HR Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
