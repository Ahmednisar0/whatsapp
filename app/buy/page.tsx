"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { buyTool } from "../utils/api";

type Tool = {
  id: number;
  name: string;
  price: number;
};

type User = {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
};

const tools: Tool[] = [
  { id: 1, name: "WhatsApp Bulk Sender", price: 750 },
  { id: 2, name: "Email Bulk Sender", price: 750 },
  { id: 3, name: "Both", price: 1100 },
];

const API_BASE = "http://localhost:5000"; // replace with deployed backend

export default function BuyingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch logged-in user
  useEffect(() => {
    if (!token) return router.push("/login");

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        if (res.data.isActive) {
          // User already active → redirect to dashboard
          router.push("/dashboard");
        }
      } catch {
        router.push("/login");
      }
    };

    fetchUser();
  }, [token, router]);

  const handleBuy = async () => {
    if (!selectedTool || !paymentMethod || !accountNumber || !user)
      return alert("Fill all fields");

    const data = {
      userId: user._id,
      tool: selectedTool.name,
      price: selectedTool.price,
      paymentMethod,
      accountNumber,
    };

    try {
      await buyTool(data, token);
      alert("Purchase request submitted! Wait for admin approval.");
      setSelectedTool(null);
      setPaymentMethod("");
      setAccountNumber("");
    } catch (err) {
      console.log(err);
      alert("Failed to submit purchase request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Buy a Tool</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setSelectedTool(tool)}
            className={`p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition ${
              selectedTool?.id === tool.id ? "border-4 border-blue-500" : "border"
            } bg-white`}
          >
            <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-gray-600 font-bold">Rs. {tool.price}</p>
          </div>
        ))}
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

        <select
          className="w-full p-2 border rounded mb-4"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="Easypaisa">Easypaisa</option>
          <option value="NayaPay">NayaPay</option>
        </select>

        <input
          type="text"
          placeholder="Account Number / Email"
          className="w-full p-2 border rounded mb-4"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        <button
          onClick={handleBuy}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Submit Purchase
        </button>
      </div>
    </div>
  );
}
