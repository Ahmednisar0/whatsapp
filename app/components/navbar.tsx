'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
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
  Mail,
  LogOut,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMenuOpen(false);
  };

  const loggedInNavItems = [
    { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Message Sender', href: '/bulk', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Buy Credits', href: '/buy', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  const loggedOutNavItems = [
    { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
  ];

  const navItems = isLoggedIn ? loggedInNavItems : loggedOutNavItems;

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
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
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg mx-1 transition-all ${
                  pathname === item.href
                    ? 'bg-white text-emerald-700 font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {isLoggedIn && (
              <div className="ml-4 pl-4 border-l border-white/20 flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-emerald-100">User</p>
                  <p className="text-sm font-semibold">{user?.email?.split('@')[0]}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center space-x-2 ml-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {!isLoggedIn && (
              <div className="ml-4 pl-4 border-l border-white/20 flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-700 rounded-lg transition-colors flex items-center space-x-2 font-semibold"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-700 border-t border-emerald-500 animate-in slide-in-from-top">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-white text-emerald-700 font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {isLoggedIn && (
              <>
                <div className="px-4 py-3 border-t border-emerald-600">
                  <p className="text-sm text-emerald-100 mb-2">Logged in as</p>
                  <p className="font-semibold text-white">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-left transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            )}

            {!isLoggedIn && (
              <div className="border-t border-emerald-600 pt-2 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Login</span>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span className="font-medium">Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}