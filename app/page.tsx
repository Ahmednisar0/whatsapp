// app/components/BulkMessenger.jsx
'use client';

import { useState } from 'react';

export default function BulkMessenger() {
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);

  const handleSend = () => {
    if (!message.trim() || !recipients.trim()) {
      alert('Please enter message and recipients');
      return;
    }

    setIsSending(true);
    
    // Simulate sending messages
    const recipientList = recipients.split(',').map(r => r.trim()).filter(r => r);
    const totalRecipients = recipientList.length;
    
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setSentCount(count);
      
      if (count >= totalRecipients) {
        clearInterval(interval);
        setIsSending(false);
        alert(`${totalRecipients} messages sent successfully!`);
      }
    }, 300);
  };

  const handleClear = () => {
    setMessage('');
    setRecipients('');
    setSentCount(0);
  };

  const handleImportCSV = () => {
    // In a real app, this would open a file input
    const sampleNumbers = '+919876543210, +919876543211, +919876543212, +919876543213, +919876543214';
    setRecipients(sampleNumbers);
    alert('CSV import simulated - sample numbers added');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Send Bulk WhatsApp Messages
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your personalized message here... You can use {name} for personalization"
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isSending}
          />
          <p className="text-sm text-gray-500 mt-2">
            Tip: Use placeholders like {'{name}'}, {'{company}'} for personalization
          </p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Recipients (separate by commas) <span className="text-red-500">*</span>
          </label>
          <textarea
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder="+91XXXXXXXXXX, +91XXXXXXXXXX, +91XXXXXXXXXX"
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isSending}
          />
          <p className="text-sm text-gray-500 mt-2">
            Example: +919876543210, +919876543211, +919876543212
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-green-700">Total Recipients</h3>
            <p className="text-2xl font-bold mt-2">
              {recipients ? recipients.split(',').filter(r => r.trim()).length : 0}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-blue-700">Messages Sent</h3>
            <p className="text-2xl font-bold mt-2">{sentCount}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold text-yellow-700">Status</h3>
            <p className="text-lg font-bold mt-2">
              {isSending ? 'Sending...' : 'Ready to Send'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <button
            onClick={handleSend}
            disabled={isSending}
            className={`px-8 py-3 rounded-lg font-bold text-white flex items-center space-x-2 transition ${
              isSending ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSending ? (
              <>
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"/>
                </svg>
                <span>Send Bulk Messages</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleClear}
            disabled={isSending}
            className="px-8 py-3 rounded-lg font-bold border border-gray-300 hover:bg-gray-50 transition"
          >
            Clear All
          </button>
          
          <button 
            onClick={handleImportCSV}
            className="px-8 py-3 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span>Import CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}