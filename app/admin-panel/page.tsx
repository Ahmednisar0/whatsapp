"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000"; // replace with deployed backend

interface Purchase {
  _id: string;
  userId: string;
  tool: string;
  price: number;
  paymentMethod: string;
  accountNumber: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchPurchases = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/purchases`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPurchases(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approvePurchase = async (id: string) => {
    if (!token) return;
    try {
      await axios.patch(`${API_BASE}/approve/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update UI
      setPurchases((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: "approved" } : p))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to approve purchase");
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel - Purchases</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">User ID</th>
              <th className="py-2 px-4">Tool</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Payment</th>
              <th className="py-2 px-4">Account</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p._id} className="text-center border-b">
                <td className="py-2 px-4">{p.userId}</td>
                <td className="py-2 px-4">{p.tool}</td>
                <td className="py-2 px-4">Rs. {p.price}</td>
                <td className="py-2 px-4">{p.paymentMethod}</td>
                <td className="py-2 px-4">{p.accountNumber}</td>
                <td className="py-2 px-4">
                  {p.status === "approved" ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-orange-500 font-semibold">Pending</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {p.status !== "approved" && (
                    <button
                      onClick={() => approvePurchase(p._id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
