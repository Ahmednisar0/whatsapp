'use client';

import { useRouter } from 'next/navigation';
import { MessageSquare, Zap, Shield, Users, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Bulk Messaging",
      description: "Send thousands of personalized WhatsApp messages instantly with CSV import"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Deliver your campaigns in seconds with our optimized delivery system"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "End-to-end encryption and 99.9% uptime guarantee for your campaigns"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Contact Management",
      description: "Organize and segment your contacts with smart tagging and filters"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Track delivery rates, engagement metrics, and campaign performance"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Personalization",
      description: "Use dynamic variables to create personalized messages for each contact"
    }
  ];

  const stats = [
    { number: "500K+", label: "Messages Sent" },
    { number: "10K+", label: "Active Users" },
    { number: "99.9%", label: "Delivery Rate" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      name: "Ahmed Khan",
      role: "Marketing Director",
      content: "This platform transformed our customer outreach. We saw 300% increase in engagement!",
      avatar: "AK"
    },
    {
      name: "Fatima Ali",
      role: "Business Owner",
      content: "Best bulk messaging solution I've used. Simple, fast, and incredibly effective.",
      avatar: "FA"
    },
    {
      name: "Hassan Raza",
      role: "Sales Manager",
      content: "The personalization features are game-changing. Our conversion rates doubled!",
      avatar: "HR"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 to-green-100/40 backdrop-blur-3xl"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 px-6 py-3 rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Trusted by 10,000+ Businesses</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Scale Your Business with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                Bulk WhatsApp Messaging
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Send personalized WhatsApp messages to thousands of contacts instantly.
              Boost engagement, increase sales, and grow your business effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push('/signup')}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-semibold text-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => router.push('/login')}
                className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg border-2 border-emerald-200"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-emerald-100">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Your Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to run successful WhatsApp marketing campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Launch your first campaign in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect WhatsApp",
                description: "Link your WhatsApp account securely with our QR code system"
              },
              {
                step: "02",
                title: "Upload Contacts",
                description: "Import your contact list via CSV file or add them manually"
              },
              {
                step: "03",
                title: "Send Messages",
                description: "Create personalized messages and launch your campaign instantly"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-3xl p-8 shadow-xl">
                  <div className="text-6xl font-bold opacity-20 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-emerald-50 leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-emerald-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Businesses Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses using our platform to boost their sales and engagement.
                Start your free trial today!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => router.push('/signup')}
                  className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl flex items-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push('/buy')}
                  className="px-8 py-4 bg-emerald-800/50 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg hover:bg-emerald-800/70 transition-all duration-300 border-2 border-white/30"
                >
                  View Pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

   <footer className="bg-gradient-to-br from-emerald-900 to-green-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">BulkSender</h3>
              <p className="text-emerald-200">Professional WhatsApp messaging solution for businesses.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-800 pt-8 text-center text-emerald-200">
            <p>2024 BulkSender. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
