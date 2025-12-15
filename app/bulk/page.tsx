"use client";

import React, { useEffect, useState } from "react";

const API_BASE = "http://50.2.26.50:5001";

export default function Bulk() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Get token safely
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch logged-in user ID
  useEffect(() => {
    const fetchUserId = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://50.2.26.50:5000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data._id) {
          setUserId(data._id);
          console.log("Fetched userId:", data._id);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUserId();
  }, [token]);

  const handleSend = async () => {
    if (!file) return alert("Please upload CSV file!");
    if (!message.trim()) return alert("Please enter a message!");
    if (!userId) return alert("User not found!");

    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("message", message);

    try {
      const res = await fetch(`${API_BASE}/send-bulk/${userId}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.error) setResponse(`Error: ${data.error}`);
      else setResponse(data.status || "Bulk messages sent successfully!");
    } catch (err) {
      console.error(err);
      setResponse("Error sending bulk messages. Please try again.");
    }

    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const clearFile = () => {
    setFile(null);
    setFileName("");
    const input = document.getElementById("file-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-8 flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl border border-gray-100">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bulk Message Sender</h1>
          <p className="text-gray-600 text-lg">
            Send personalized messages to multiple contacts efficiently
          </p>
        </div>

        <div className="space-y-6">
          {/* Message Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Message Content *
            </label>
            <div className="relative">
              <textarea
                className="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 resize-none text-lg placeholder-gray-400"
                rows={4}
                placeholder="Type your message here... You can use {name} for personalization"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="absolute bottom-3 right-3 text-sm text-gray-500 bg-white/80 px-2 py-1 rounded-lg">
                {message.length} characters
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              💡 Use{" "}
              <code className="bg-emerald-100 text-emerald-700 px-1 rounded">
                &#123;name&#125;
              </code>{" "}
              to personalize messages with contact names
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Upload Contacts CSV *
            </label>
            <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-6 text-center transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50/50">
              <input
                type="file"
                name="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <svg
                    className="w-12 h-12 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      {fileName ? fileName : "Choose CSV File"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {fileName ? "File ready for upload" : "Click to select contacts file"}
                    </p>
                  </div>
                  {!fileName && (
                    <span className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                      Browse Files
                    </span>
                  )}
                </div>
              </label>
            </div>

            {fileName && (
              <div className="flex items-center justify-between mt-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <span className="text-emerald-700 font-medium block">{fileName}</span>
                    <span className="text-emerald-600 text-sm">Ready to upload</span>
                  </div>
                </div>
                <button onClick={clearFile} className="text-red-500 hover:text-red-700 transition-colors p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={loading || !file || !message.trim() || !userId}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-6 rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending Messages...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Send Bulk Messages</span>
              </>
            )}
          </button>

          {/* Response Message */}
          {response && (
            <div
              className={`p-4 rounded-2xl text-center font-medium border ${
                response.toLowerCase().includes("error")
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {!response.toLowerCase().includes("error") && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                <span>{response}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
