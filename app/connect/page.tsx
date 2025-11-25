"use client"

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { useRouter } from "next/navigation";


const API_BASE = "https://whatsapp-backen-production.up.railway.app";

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
      const res = await axios.get<User>(`http://localhost:5000/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);

      if (res.data.isActive) {

      }
    } catch {
      
    }
  };

  fetchUser(); // ✅ call async function inside useEffect
}, [token, router]);


  // Fetch QR code for user
 useEffect(() => {
  if (!user?._id) return;

  const userId = user._id;
  let interval: number; // use number, not NodeJS.Timer

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
  interval = window.setInterval(fetchQR, 3000); // ✅ use window.setInterval

  return () => window.clearInterval(interval); // ✅ use window.clearInterval
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
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Connect WhatsApp</h1>

      {!ready ? (
        <>
          <p className="text-gray-700 mb-4">Scan the QR code with WhatsApp Web:</p>
          {qrImage ? (
            <img
              src={qrImage}
              alt="qr-code"
              className="shadow-lg rounded-xl border bg-white p-2"
            />
          ) : (
            <p className="text-gray-500">Loading QR...</p>
          )}
        </>
      ) : (
        <p className="text-green-600 font-semibold text-xl">
          Connected Successfully ✔
        </p>
      )}

      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Logging out...' : 'Logout WhatsApp'}
        </button>
        {message && <p className="mt-2">{message}</p>}
      </div>
    </div>
  );
}
