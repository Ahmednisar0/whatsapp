'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    messagesSent: 1247,
    contacts: 89,
    successRate: 94,
    remainingQuota: 5000
  });
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, router]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-emerald-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return <div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 md:p-8">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-8 bg-gradient-to-b from-emerald-600 to-green-400 rounded-full"></div>
                <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
                  {getGreeting()}
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">{user?.email?.split('@')[0]}</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl">
                Here's what's happening with your business communications today.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white bg-emerald-500`}></div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.email?.split('@')[0]}</p>
                <p className="text-sm text-gray-500 truncate max-w-[180px]">{user?.email}</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2 bg-emerald-100 text-emerald-800`}>
                  <span className={`w-2 h-2 rounded-full mr-2 bg-emerald-500`}></span>
                  Premium Active
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">Messages</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(stats.messagesSent)}</p>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-emerald-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>+12% from last week</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-3.429a3.5 3.5 0 00-4.95-4.95l-4.95 4.95" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">Contacts</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(stats.contacts)}</p>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-emerald-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>+8 new this week</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">Success Rate</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.successRate}%</p>
              <div className="w-full bg-emerald-100 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full" 
                  style={{ width: `${stats.successRate}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-lime-100 to-green-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">Remaining</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(stats.remainingQuota)}</p>
              <p className="text-sm text-gray-600">Messages remaining this month</p>
            </div>
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Connect WhatsApp Card */}
          <div 
            onClick={() => router.push("/connect")}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                    Required Setup
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Connect WhatsApp Account</h3>
                <p className="text-emerald-100 mb-8 leading-relaxed text-lg">
                  Link your WhatsApp number to unlock powerful messaging features. Required for sending bulk messages and campaigns.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-emerald-100">Quick Setup</p>
                      <p className="text-xs text-emerald-200/80">5 minutes • One-time</p>
                    </div>
                  </div>
                  <div className="flex items-center text-white font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
                    <span>Connect Now</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Sender Card */}
          <div 
            onClick={() => router.push("/bulk")}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-600 to-lime-700 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-400/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                    Premium Feature
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Bulk Message Campaigns</h3>
                <p className="text-green-100 mb-8 leading-relaxed text-lg">
                  Launch targeted campaigns with personalized messaging. Upload contacts, schedule delivery, and track performance in real-time.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-green-100">CSV Import</p>
                      <p className="text-xs text-green-200/80">Unlimited contacts</p>
                    </div>
                  </div>
                  <div className="flex items-center text-white font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
                    <span>Start Campaign</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
                    <p className="text-gray-600">Access frequently used tools and features</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => router.push("/templates")}
                    className="group flex items-center space-x-4 p-5 rounded-2xl border border-emerald-200 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-100 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-emerald-700">Message Templates</p>
                      <p className="text-sm text-gray-600">Create & manage templates</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button 
                    onClick={() => router.push("/analytics")}
                    className="group flex items-center space-x-4 p-5 rounded-2xl border border-emerald-200 hover:border-green-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-100 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-green-700">Analytics</p>
                      <p className="text-sm text-gray-600">View performance reports</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button 
                    onClick={() => router.push("/contacts")}
                    className="group flex items-center space-x-4 p-5 rounded-2xl border border-emerald-200 hover:border-teal-300 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-100 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-3.429a3.5 3.5 0 00-4.95-4.95l-4.95 4.95" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-teal-700">Contact Manager</p>
                      <p className="text-sm text-gray-600">Organize & segment contacts</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button 
                    onClick={() => router.push("/buy")}
                    className="group flex items-center space-x-4 p-5 rounded-2xl border border-emerald-200 hover:border-lime-300 hover:bg-gradient-to-r hover:from-lime-50 hover:to-green-100 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-lime-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-lime-700">Upgrade Plan</p>
                      <p className="text-sm text-gray-600">Get more features</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-lime-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Account Management</h2>
              
              <div className="space-y-6">
                <button 
                  onClick={() => router.push("/profile")}
                  className="flex items-center space-x-4 p-5 rounded-2xl border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 group w-full"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-900">Profile Settings</p>
                    <p className="text-sm text-gray-600">Manage account details</p>
                  </div>
                </button>

                <button 
                  onClick={() => router.push("/support")}
                  className="flex items-center space-x-4 p-5 rounded-2xl border border-emerald-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group w-full"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-900">Support Center</p>
                    <p className="text-sm text-gray-600">Get help & assistance</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="flex items-center space-x-4 p-5 rounded-2xl border border-emerald-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 group w-full"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-900">Logout</p>
                    <p className="text-sm text-gray-600">Sign out of your account</p>
                  </div>
                </button>

                {/* Account Status */}
                <div className="mt-8 pt-8 border-t border-emerald-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Account Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Email</span>
                      <span className="font-semibold text-emerald-600 text-sm">{user?.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="font-semibold text-emerald-600">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Support</span>
                      <span className="font-semibold text-gray-900">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@chatmate.site" className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium">
              support@chatmate.site
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}