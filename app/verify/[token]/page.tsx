"use client";
import { useEffect, useState } from "react";

export default function Verify({ params }: { params: any }) {
  const { token } = params;
  const [msg, setMsg] = useState("Verifying...");

  useEffect(() => {
    async function verifyEmail() {
      const res = await fetch(`https://api.chatmate.site/auth/verify/${token}`);
      const text = await res.text();
      setMsg(text);
    }
    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">{msg}</h2>
      <a
        href="/login"
        className="text-white bg-black px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Go to Login
      </a>
    </div>
  );
}
