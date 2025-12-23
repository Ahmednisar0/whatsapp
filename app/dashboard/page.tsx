"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_BASE = "https://api.chatmate.site/auth";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/buy");

      try {
        const res = await axios.get(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);

        if (!res.data.isActive) {
          router.push("/buy");
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Ready to scale your business communications?
              </p>
            </div>
            <div className="flex items-center space-x-4 bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Account Status</p>
                <p className={`text-2xl font-bold ${
                  user.isActive ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                user.isActive ? 'bg-emerald-100' : 'bg-amber-100'
              }`}>
                <svg className={`w-6 h-6 ${user.isActive ? 'text-emerald-600' : 'text-amber-600'}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d={user.isActive ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                          : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tools Access</p>
                <p className="text-2xl font-bold text-gray-900">Premium</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Support</p>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Connect WhatsApp Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
               onClick={() => router.push("/connect")}>
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                Required
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">Connect WhatsApp</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Link your WhatsApp account to start sending messages. This is required before using any messaging features.
            </p>
            <div className="flex items-center text-blue-100 font-medium">
              <span>Connect Now</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Bulk Sender Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
               onClick={() => router.push("/bulk")}>
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                Premium
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">Bulk Message Sender</h3>
            <p className="text-emerald-100 mb-6 leading-relaxed">
              Send personalized messages to multiple contacts at once. Upload CSV files and reach your audience efficiently.
            </p>
            <div className="flex items-center text-emerald-100 font-medium">
              <span>Start Sending</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => router.push("/buy")}
              className="flex items-center space-x-3 p-4 rounded-2xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Upgrade Plan</p>
                <p className="text-sm text-gray-600">Get more features</p>
              </div>
            </button>

            <button 
              onClick={() => router.push("/profile")}
              className="flex items-center space-x-3 p-4 rounded-2xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Profile</p>
                <p className="text-sm text-gray-600">Manage account</p>
              </div>
            </button>

            <button 
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="flex items-center space-x-3 p-4 rounded-2xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Logout</p>
                <p className="text-sm text-gray-600">Sign out safely</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}