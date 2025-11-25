"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_BASE = "http://localhost:5000";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
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
          router.push("/buy"); // redirect if not active
        }
      } catch {
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      {/* Add /connect and /bulk buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => router.push("/connect")}
          className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
        >
          Connect WhatsApp
        </button>
        <button
          onClick={() => router.push("/bulk")}
          className="bg-green-500 text-white p-4 rounded hover:bg-green-600"
        >
          Bulk Sender
        </button>
      </div>
    </div>
  );
}
