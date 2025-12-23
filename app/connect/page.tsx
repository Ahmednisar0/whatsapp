"use client"

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_BASE = "https://api.chatmate.site";

interface User {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export default function Connect() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [qrImage, setQrImage] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<User>(`https://api.chatmate.site/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        if (res.data.isActive) {
          // Handle active user if needed
        }
      } catch {
        // Handle error
      }
    };

    fetchUser();
  }, [token, router]);

  // Fetch QR code for user
  useEffect(() => {
    if (!user?._id) return;

    const userId = user._id;
    let interval: number;
 console.log(userId)
    const fetchQR = async () => {
      try {
        console.log(userId)
        const res = await fetch(`${API_BASE}/qr/${userId}`, { cache: "no-store" });
        const data = await res.json();
        setReady(data.ready);

        if (data.qr) {
          const generated = await QRCode.toDataURL(data.qr);
          setQrImage(generated);
        }
      } catch (err) {
        console.error("Error fetching QR:", err);
      }
    };

    fetchQR();
    interval = window.setInterval(fetchQR, 3000);

    return () => window.clearInterval(interval);
  }, [user?._id]);

  // Logout WhatsApp session for this user
  const handleLogout = async () => {
    if (!user?._id) return;
    setLoading(true);
    const userId = user._id;

    try {
      const res = await fetch(`${API_BASE}/logout/${userId}`, { method: 'POST' });
      const data = await res.json();
      setMessage(data.status);
    } catch {
      setMessage('Error logging out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-8 flex flex-col items-center justify-center">
      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Connect WhatsApp</h1>
          <p className="text-gray-600 text-lg">
            {ready ? "Your WhatsApp is connected and ready!" : "Scan QR code to connect your WhatsApp"}
          </p>
        </div>

        {/* User Info */}
        {user && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 mb-8 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                ready 
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
                  : "bg-amber-100 text-amber-700 border border-amber-200"
              }`}>
                {ready ? "Connected" : "Waiting for Connection"}
              </div>
            </div>
          </div>
        )}

        {/* QR Code Section */}
        {!ready ? (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-1 rounded-2xl inline-block">
              <div className="bg-white rounded-xl p-8">
                {qrImage ? (
                  <img
                    src={qrImage}
                    alt="WhatsApp QR Code"
                    className="w-64 h-64 mx-auto shadow-lg rounded-lg"
                  />
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                      <p className="text-gray-500">Generating QR Code...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg">How to connect:</h3>
              <ol className="text-gray-600 text-sm space-y-2 max-w-md mx-auto">
                <li className="flex items-center justify-center space-x-2">
                  <span className="w-6 h-6 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center">1</span>
                  <span>Open WhatsApp on your phone</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="w-6 h-6 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center">2</span>
                  <span>Tap Menu → Linked Devices</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="w-6 h-6 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center">3</span>
                  <span>Tap Link a Device → Scan QR Code</span>
                </li>
              </ol>
            </div>
          </div>
        ) : (
          /* Connected State */
          <div className="text-center space-y-6">
            <div className="w-32 h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Successfully Connected! 🎉</h3>
              <p className="text-gray-600">Your WhatsApp is now linked and ready to use.</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleLogout}
            disabled={loading || !ready}
            className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-rose-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout WhatsApp</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Go to Dashboard</span>
          </button>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium border ${
            message.toLowerCase().includes('error') 
              ? 'bg-red-50 text-red-700 border-red-200' 
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            {message}
          </div>
        )}

        {/* Status Indicator */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className={`w-2 h-2 rounded-full ${ready ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
          <span>{ready ? 'Online - Connected to WhatsApp' : 'Offline - Waiting for connection'}</span>
        </div>
      </div>
    </div>
  );
}