

import React, { useEffect, useState } from "react";


export default function Connect() {
const [qr, setQr] = useState<string>("");
const [ready, setReady] = useState(false);


useEffect(() => {
const fetchQR = async () => {
const res = await fetch("http://localhost:5000/qr");
const data = await res.json();
setQr(data.qr);
setReady(data.ready);
};
fetchQR();
const interval = setInterval(fetchQR, 3000);
return () => clearInterval(interval);
}, []);


return (
<div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
<h1 className="text-3xl font-bold text-gray-900 mb-6">Connect WhatsApp</h1>


{!ready ? (
<>
<p className="text-gray-700 mb-4">Scan the QR code with WhatsApp Web:</p>
{qr ? (
<img
src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qr}`}
alt="qr"
className="shadow-lg rounded-xl"
/>
) : (
<p className="text-gray-500">Loading QR...</p>
)}
</>
) : (
<p className="text-green-600 font-semibold text-xl">Connected Successfully ✔</p>
)}
</div>
);
}

