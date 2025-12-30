"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { buyTool } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  Shield, 
  Clock, 
  Zap, 
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  TrendingUp,
  BadgeCheck
} from "lucide-react";

type Tool = {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  savings?: number;
  icon?: React.ReactNode;
  tagline?: string;
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
    name: "WhatsApp Business Suite", 
    price: 750,
    description: "Enterprise-grade WhatsApp automation for seamless customer communication",
    features: [
      "Unlimited bulk messaging",
      "Smart contact segmentation",
      "AI-powered templates",
      "Advanced analytics dashboard",
      "24/7 priority support",
      "API integration ready"
    ],
    tagline: "Boost engagement by 300%"
  },
  { 
    id: 2, 
    name: "Email Marketing Pro", 
    price: 750,
    description: "Complete email marketing solution with automation and analytics",
    features: [
      "High-volume email campaigns",
      "Drag & drop template builder",
      "Real-time analytics",
      "Smart automation workflows",
      "A/B testing tools",
      "GDPR compliant"
    ],
    tagline: "Drive conversions efficiently"
  },
  { 
    id: 3, 
    name: "Enterprise Suite", 
    price: 1100,
    description: "All-in-one communication platform for scaling businesses",
    features: [
      "Complete WhatsApp & Email suite",
      "Dedicated account manager",
      "Custom API endpoints",
      "White-label solutions",
      "Advanced security features",
      "Training & onboarding"
    ],
    popular: true,
    savings: 400,
    tagline: "Everything you need to scale"
  },
];

const API_BASE = "https://api.chatmate.site/auth";

export default function BuyingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

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
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedTool(null);
        setPaymentMethod("");
        setAccountNumber("");
        setStep(1);
      }, 3000);
    } catch (err) {
      console.log(err);
      alert("Failed to submit purchase request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Select Plan", description: "Choose your solution" },
    { number: 2, title: "Payment Details", description: "Enter payment information" },
    { number: 3, title: "Confirmation", description: "Review and confirm" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Purchase Successful!
              </h3>
              <p className="text-gray-600 mb-6">
                Our team will contact you within 24 hours to activate your account.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">TRUSTED BY 500+ BUSINESSES</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            Elevate Your Business Communications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional tools designed to scale your outreach, enhance engagement, 
            and drive measurable results. Start growing today.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 -z-10" />
            <div 
              className="absolute top-6 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 -z-10"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
            
            {steps.map((s, index) => (
              <div key={s.number} className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 font-semibold text-lg mb-3 transition-all duration-300 ${
                  step >= s.number
                    ? 'bg-white border-blue-600 text-blue-600 shadow-lg'
                    : 'bg-white border-gray-300 text-gray-400'
                } ${step === s.number ? 'scale-110 shadow-xl' : ''}`}>
                  {step > s.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    s.number
                  )}
                </div>
                <div className="text-center">
                  <p className={`font-semibold ${
                    step >= s.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {s.title}
                  </p>
                  <p className="text-sm text-gray-500">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { icon: <Shield />, text: "Secure Payment", subtext: "256-bit SSL encrypted" },
            { icon: <Clock />, text: "24h Activation", subtext: "Quick setup guaranteed" },
            { icon: <Zap />, text: "Lifetime Updates", subtext: "Always up-to-date" },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{item.text}</p>
                <p className="text-sm text-gray-500">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Tool Selection */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative group cursor-pointer ${
                  selectedTool?.id === tool.id ? 'lg:scale-105' : ''
                }`}
                onClick={() => {
                  setSelectedTool(tool);
                  setStep(2);
                }}
              >
                {tool.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>MOST POPULAR</span>
                    </div>
                  </div>
                )}

                <div className={`h-full bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-xl border-2 overflow-hidden transition-all duration-300 ${
                  selectedTool?.id === tool.id
                    ? 'border-blue-500 shadow-2xl'
                    : 'border-gray-200 group-hover:border-blue-300'
                }`}>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                        {tool.tagline && (
                          <p className="text-blue-600 font-medium">{tool.tagline}</p>
                        )}
                      </div>
                      {tool.popular && (
                        <BadgeCheck className="w-8 h-8 text-blue-500" />
                      )}
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline mb-2">
                        <span className="text-5xl font-bold text-gray-900">Rs. {tool.price}</span>
                        <span className="text-gray-500 ml-2">/ one-time</span>
                      </div>
                      {tool.savings && (
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          Save Rs. {tool.savings} (26% off)
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">{tool.description}</p>

                    <ul className="space-y-4 mb-8">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                      selectedTool?.id === tool.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                        : 'bg-gray-900 text-white hover:bg-gray-800 group-hover:shadow-lg'
                    }`}>
                      {selectedTool?.id === tool.id ? (
                        <span className="flex items-center justify-center space-x-2">
                          <span>Selected</span>
                          <ChevronRight className="w-5 h-5" />
                        </span>
                      ) : (
                        "Select Plan"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Payment Details */}
      {step === 2 && selectedTool && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-8 py-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Complete Your Purchase</h2>
                    <p className="text-blue-100">You're one step away from unlocking {selectedTool.name}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <p className="text-white/90 text-sm font-medium">Total Amount</p>
                    <p className="text-2xl font-bold text-white">Rs. {selectedTool.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">24-hour activation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Secure payment</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Payment Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Easypaisa", "NayaPay"].map((method) => (
                          <motion.div
                            key={method}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPaymentMethod(method)}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                              paymentMethod === method
                                ? "border-blue-500 bg-blue-50 shadow-lg"
                                : "border-gray-200 hover:border-blue-300 bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  paymentMethod === method 
                                    ? "border-blue-500 bg-blue-500" 
                                    : "border-gray-400"
                                }`}>
                                  {paymentMethod === method && (
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <span className="font-semibold text-gray-900">{method}</span>
                              </div>
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                <span className="text-sm font-bold text-blue-700">
                                  {method === "Easypaisa" ? "EP" : "NP"}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Account Number / Email
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 0312XXXXXXX or your@email.com"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg placeholder-gray-400"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        This will be used for payment verification and communication
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <div>
                          <p className="font-semibold text-gray-900">{selectedTool.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{selectedTool.description}</p>
                        </div>
                        <p className="text-xl font-bold text-blue-600">Rs. {selectedTool.price}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                          <span>Platform license</span>
                          <span>Included</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Lifetime updates</span>
                          <span>Included</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Priority support</span>
                          <span>Included</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-amber-900 mb-1">Important Instructions</p>
                        <ul className="text-sm text-amber-800 space-y-1">
                          <li>• Keep your transaction ID safe for verification</li>
                          <li>• Our team will contact you within 24 hours</li>
                          <li>• You'll receive onboarding guidance via email</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Change Plan</span>
                </button>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBuy}
                    disabled={loading || !paymentMethod || !accountNumber}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Purchase</span>
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}