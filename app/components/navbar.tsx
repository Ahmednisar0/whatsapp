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
  ChevronDown,
  CreditCard,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
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
    <nav className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white shadow-xl sticky top-0 z-50 backdrop-blur-sm bg-white/5 border-b border-emerald-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group" onClick={() => setIsMenuOpen(false)}>
              <div className="p-2 bg-gradient-to-br from-white/20 to-white/10 rounded-xl group-hover:from-white/30 group-hover:to-white/20 transition-all duration-300 shadow-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                    BulkSender
                  </h1>
                  <div className="px-1.5 py-0.5 bg-white/20 rounded text-xs font-medium flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Pro
                  </div>
                </div>
                <p className="text-xs text-emerald-100/80">Professional Messaging Platform</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl mx-1 transition-all duration-200 group ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-white to-emerald-50 text-emerald-700 font-semibold shadow-lg'
                    : 'hover:bg-white/10 hover:shadow-md'
                }`}
              >
                <div className={`transition-transform group-hover:scale-110 ${pathname === item.href ? 'scale-110' : ''}`}>
                  {item.icon}
                </div>
                <span className="font-medium tracking-wide">{item.name}</span>
                {pathname === item.href && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full"></div>
                )}
              </Link>
            ))}

            {isLoggedIn && (
              <div className="ml-4 pl-4 border-l border-white/30 relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-3 group p-1.5 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  <div className="relative">
                    <div className="w-9 h-9 bg-gradient-to-br from-white/25 to-emerald-400/25 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-emerald-600"></div>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-emerald-100/80">Welcome back</p>
                    <div className="flex items-center">
                      <p className="text-sm font-semibold max-w-[120px] truncate">
                        {user?.email?.split('@')[0] || 'User'}
                      </p>
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserDropdownOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-64 bg-gradient-to-b from-emerald-700 to-emerald-800 rounded-xl shadow-2xl border border-emerald-500/30 z-50 overflow-hidden animate-in slide-in-from-top-5">
                      <div className="p-4 border-b border-emerald-500/30">
                        <p className="text-sm text-emerald-100/80 mb-1">Signed in as</p>
                        <p className="font-medium text-white truncate">{user?.email}</p>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-white/20">
                              <LogOut className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Sign Out</span>
                          </div>
                          <div className="text-xs px-2 py-1 bg-white/20 rounded">Esc</div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {!isLoggedIn && (
              <div className="ml-4 pl-4 border-l border-white/30 flex items-center space-x-3">
                <Link
                  href="/login"
                  className="group relative px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 hover:from-emerald-500/30 hover:to-emerald-400/30 rounded-xl transition-all duration-300 flex items-center space-x-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <LogIn className="w-5 h-5" />
                  <span className="font-semibold tracking-wide">Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="group relative px-5 py-2.5 bg-gradient-to-r from-white to-emerald-50 text-emerald-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 overflow-hidden hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <UserPlus className="w-5 h-5" />
                  <span className="font-bold tracking-wide">Get Started</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 bg-gradient-to-br from-white/10 to-white/5 rounded-xl hover:from-white/20 hover:to-white/10 transition-all duration-300 shadow-lg"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transform hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-emerald-700 to-emerald-800 border-t border-emerald-500/30 backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-white to-emerald-50 text-emerald-700 font-semibold shadow-lg'
                    : 'hover:bg-white/10 hover:shadow-md'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${pathname === item.href ? 'bg-emerald-100' : 'bg-white/10'}`}>
                  {item.icon}
                </div>
                <span className="font-medium tracking-wide">{item.name}</span>
                {pathname === item.href && (
                  <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}

            {isLoggedIn && (
              <>
                <div className="px-4 py-4 border-t border-emerald-600/50 mt-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-white/25 to-emerald-400/25 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-100/80 mb-1">Logged in as</p>
                      <p className="font-semibold text-white truncate max-w-[200px]">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-200 group mt-2"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-white/20">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <span className="font-medium tracking-wide">Sign Out</span>
                  </div>
                  <div className="text-xs px-2.5 py-1 bg-white/20 rounded-lg">⌘Q</div>
                </button>
              </>
            )}

            {!isLoggedIn && (
              <div className="border-t border-emerald-600/50 pt-4 space-y-3 mt-2">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 hover:from-emerald-500/30 hover:to-emerald-400/30 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <LogIn className="w-5 h-5" />
                    <span className="font-medium tracking-wide">Login</span>
                  </div>
                  <div className="text-xs px-2.5 py-1 bg-white/20 rounded-lg">↪</div>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-gradient-to-r from-white to-emerald-50 text-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <UserPlus className="w-5 h-5" />
                    <span className="font-bold tracking-wide">Get Started</span>
                  </div>
                  <div className="text-xs px-2.5 py-1 bg-emerald-600/20 text-emerald-700 rounded-lg font-bold">→</div>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Footer */}
          <div className="px-4 py-3 border-t border-emerald-600/50 bg-emerald-800/50">
            <div className="flex items-center justify-center space-x-1 text-xs text-emerald-100/70">
              <CreditCard className="w-3 h-3" />
              <span>Secure • Fast • Reliable</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
