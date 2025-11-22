

import React from "react";
import Link from "next/link";


export default function Dashboard() {
return (
<div className="min-h-screen bg-gray-50 p-8">
<div className="max-w-5xl mx-auto">
<h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Connect WhatsApp */}
<Link href="/connect" className="block p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition">
<h2 className="text-xl font-semibold mb-2">Connect WhatsApp</h2>
<p className="text-gray-600 text-sm">Scan QR to connect your WhatsApp Web session.</p>
</Link>


{/* Upload CSV */}
<Link href="/upload" className="block p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition">
<h2 className="text-xl font-semibold mb-2">Upload Contacts CSV</h2>
<p className="text-gray-600 text-sm">Upload phone numbers to send bulk messages.</p>
</Link>


{/* Send Messages */}
<Link href="/send" className="block p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition">
<h2 className="text-xl font-semibold mb-2">Send Bulk Messages</h2>
<p className="text-gray-600 text-sm">Write and send messages to uploaded contacts.</p>
</Link>
</div>
</div>
</div>
);
}

