"use client";

import React, { useState } from "react";

export default function Bulk() {
  const [file, setFile] = useState<File | null>(null);
const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!file) return alert("Please upload CSV file!");
    if (!message) return alert("Please enter a message!");

    setLoading(true);
    setResponse("");

   const formData = new FormData();
formData.append("file", file);
formData.append("message", message);


const res = await fetch("https://whatsapp-backen-production.up.railway.app/send-bulk", {
  method: "POST",
  body: formData,
});
try{

      const data = await res.json();
      if (data.error) setResponse(`Error: ${data.error}`);
      else setResponse(data.status || "Bulk messages sent!");
    } catch (err) {
      console.error(err);
      setResponse("Error sending bulk messages. Check backend console.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Send Bulk Messages</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl flex flex-col gap-4">
        {/* Message Input */}
        <textarea
          className="border p-3 rounded-lg w-full"
          rows={4}
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* CSV Upload */}
        <input
          type="file"
           name="file"
          accept=".csv"
          className="border p-2 rounded-lg"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={loading}
          className={`w-full py-3 text-white rounded-lg font-semibold ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Sending..." : "Send Bulk Messages"}
        </button>

        {/* Response */}
        {response && (
          <p className="text-center text-green-700 font-medium bg-green-100 p-3 rounded-lg">
            {response}
          </p>
        )}
      </div>
    </div>
  );
}
