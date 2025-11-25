'use client'

import React, { useState } from "react";


export default function UploadCSV() {
const [file, setFile] = useState<File | null>(null);
const [msg, setMsg] = useState("");


const uploadCSV = async () => {
if (!file) return;
const formData = new FormData();
formData.append("csv", file);
formData.append("message", msg);


await fetch("http://localhost:5000/send-bulk", {
method: "POST",
body: formData,
});


alert("Bulk messages started sending...");
};


return (
<div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
<h1 className="text-3xl font-bold text-gray-900 mb-6">Upload CSV Contacts</h1>


<input
type="file"
accept=".csv"
className="mb-4"
onChange={(e) => setFile(e.target.files?.[0] || null)}
/>


<textarea
placeholder="Write message..."
className="border p-3 rounded-lg w-80 mb-4"
value={msg}
onChange={(e) => setMsg(e.target.value)}
/>


<button
onClick={uploadCSV}
className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700"
>
Upload & Send
</button>
</div>
);
}