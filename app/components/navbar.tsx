"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MessageSquare,
  User,
  LogIn,
  UserPlus,
  ShoppingBag,
  LayoutDashboard,
  Menu,
  X,
  Home,
  Mail
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
    setIsMenuOpen(false);
  };

  // Navigation items
  const navItems = [
    { name: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Message Sender", href: "/bulk", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Buy Credits", href: "/buy", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Login", href: "/login", icon: <LogIn className="w-5 h-5" />, showWhenLoggedOut: true },
    { name: "Signup", href: "/signup", icon: <UserPlus className="w-5 h-5" />, showWhenLoggedOut: true },
  ];

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">BulkSender</h1>
                <p className="text-xs text-emerald-100">Professional Messaging</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems
              .filter(item => !item.showWhenLoggedOut || !isLoggedIn)
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg mx-1 transition-all ${
                    pathname === item.href
                      ? "bg-white text-emerald-700"
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            
            {/* User Profile when logged in */}
            {isLoggedIn && (
              <div className="ml-4 pl-4 border-l border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-700 border-t border-emerald-500">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems
              .filter(item => !item.showWhenLoggedOut || !isLoggedIn)
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    pathname === item.href
                      ? "bg-white text-emerald-700"
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-left"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}