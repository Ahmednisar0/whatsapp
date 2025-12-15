"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { buyTool } from "../utils/api";

type Tool = {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  savings?: number;
};

type User = {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
};

const tools: Tool[] = [
  { 
    id: 1, 
    name: "WhatsApp Bulk Sender", 
    price: 750,
    description: "Advanced WhatsApp messaging solution for businesses",
    features: [
      "Unlimited message sending",
      "Contact list management",
      "Custom message templates",
      "Scheduled messaging",
      "Delivery analytics",
      "24/7 support"
    ]
  },
  { 
    id: 2, 
    name: "Email Bulk Sender", 
    price: 750,
    description: "Professional email marketing platform",
    features: [
      "Bulk email campaigns",
      "Custom email templates",
      "Attachment support",
      "Open rate analytics",
      "Subscriber management",
      "Email scheduling"
    ]
  },
  { 
    id: 3, 
    name: "Professional Suite", 
    price: 1100,
    description: "Complete communication toolkit for businesses",
    features: [
      "All WhatsApp features",
      "All Email features",
      "Priority customer support",
      "Advanced analytics dashboard",
      "API access",
      "Dedicated account manager"
    ],
    popular: true,
    savings: 400
  },
];

const API_BASE = "http://50.2.26.50:5000";

export default function BuyingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return router.push("/login");

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        if (res.data.isActive) {
          router.push("/dashboard");
        }
      } catch {
        router.push("/login");
      }
    };

    fetchUser();
  }, [token, router]);

  const handleBuy = async () => {
    if (!selectedTool || !paymentMethod || !accountNumber || !user) {
      alert("Please fill all fields before submitting");
      return;
    }

    setLoading(true);
    const data = {
      userId: user._id,
      tool: selectedTool.name,
      price: selectedTool.price,
      paymentMethod,
      accountNumber,
    };

    try {
      await buyTool(data, token);
      alert("Purchase request submitted successfully! Our team will contact you within 24 hours.");
      setSelectedTool(null);
      setPaymentMethod("");
      setAccountNumber("");
      setStep(1);
    } catch (err) {
      console.log(err);
      alert("Failed to submit purchase request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className={`flex flex-col items-center ${
                stepNumber < 3 ? 'w-full' : ''
              }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-semibold text-lg ${
                  step >= stepNumber
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-400 bg-white'
                }`}>
                  {stepNumber}
                </div>
                <span className={`text-sm font-medium mt-2 ${
                  step >= stepNumber ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {stepNumber === 1 && 'Select Tool'}
                  {stepNumber === 2 && 'Payment Details'}
                  {stepNumber === 3 && 'Confirmation'}
                </span>
              </div>
              {stepNumber < 3 && (
                <div className={`flex-1 h-1 mx-4 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Business Solution
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Scale your business communications with our professional tools. 
          All plans include lifetime updates and dedicated support.
        </p>
      </div>

      {/* Step 1: Tool Selection */}
      {step === 1 && (
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  selectedTool?.id === tool.id
                    ? 'border-blue-500 shadow-xl transform scale-105'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {tool.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {tool.savings && (
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Save Rs. {tool.savings}
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                    <div className="flex items-baseline justify-center space-x-1 mb-3">
                      <span className="text-3xl font-bold text-gray-900">Rs. {tool.price}</span>
                      <span className="text-gray-500 text-sm">one-time</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      setSelectedTool(tool);
                      setStep(2);
                    }}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      selectedTool?.id === tool.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedTool?.id === tool.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-gray-800 font-semibold flex items-center justify-center space-x-2 mx-auto transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Payment Details */}
      {step === 2 && selectedTool && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white mb-2">Payment Details</h2>
              <p className="text-blue-100">Complete your purchase for {selectedTool.name}</p>
            </div>

            <div className="p-8">
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Selected Plan:</span>
                  <span className="font-semibold text-gray-900">{selectedTool.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">Rs. {selectedTool.price}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Payment Method *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Easypaisa", "NayaPay"].map((method) => (
                      <div
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === method
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              paymentMethod === method 
                                ? "border-blue-500 bg-blue-500" 
                                : "border-gray-300"
                            }`}>
                              {paymentMethod === method && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="font-medium text-gray-700">{method}</span>
                          </div>
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-semibold text-gray-600">
                              {method === "Easypaisa" ? "EP" : "NP"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Account Number / Email *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your account number or registered email"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    This will be used for payment verification and communication
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <p className="text-yellow-800 font-semibold">Important Notice</p>
                      <p className="text-yellow-700 text-sm mt-1">
                        After payment, please keep your transaction ID safe. Our team will verify your payment and activate your account within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBuy}
                    disabled={loading || !paymentMethod || !accountNumber}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Complete Purchase</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}