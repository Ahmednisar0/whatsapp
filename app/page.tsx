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

      {/* Footer */<footer className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white py-16 px-4 relative overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-700/10 via-transparent to-transparent"></div>
  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl"></div>
  <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-600/5 rounded-full blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Main Content Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
      {/* Brand Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl group-hover:from-emerald-400 group-hover:to-green-400 transition-all duration-300 shadow-lg">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              BulkSender
            </h3>
            <p className="text-emerald-300/90 text-sm">Professional Messaging Platform</p>
          </div>
        </div>
        <p className="text-emerald-200/80 max-w-md text-lg leading-relaxed">
          Enterprise-grade WhatsApp messaging solution trusted by 10,000+ businesses worldwide.
        </p>
        <div className="flex items-center space-x-4 pt-4">
          <div className="px-4 py-2 bg-emerald-900/50 backdrop-blur-sm rounded-lg border border-emerald-700/30">
            <span className="text-emerald-200 font-semibold">⚡</span>
            <span className="ml-2 text-sm">99.9% Uptime</span>
          </div>
          <div className="px-4 py-2 bg-emerald-900/50 backdrop-blur-sm rounded-lg border border-emerald-700/30">
            <span className="text-emerald-200 font-semibold">🔒</span>
            <span className="ml-2 text-sm">GDPR Compliant</span>
          </div>
        </div>
      </div>

      {/* Product Links */}
      <div>
        <h4 className="font-bold text-xl mb-6 flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span>Product</span>
        </h4>
        <ul className="space-y-4">
          {[
            { name: 'Features', icon: '✨', desc: 'Powerful tools' },
            { name: 'Pricing', icon: '💰', desc: 'Flexible plans' },
            { name: 'Demo', icon: '🎬', desc: 'Live preview' },
            { name: 'API Docs', icon: '📚', desc: 'Developer friendly' }
          ].map((item) => (
            <li key={item.name}>
              <a href="#" className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-900/30 transition-all duration-200">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <span className="text-emerald-100 group-hover:text-white font-medium transition-colors">
                    {item.name}
                  </span>
                  <p className="text-xs text-emerald-300/60">{item.desc}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Company Links */}
      <div>
        <h4 className="font-bold text-xl mb-6 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Company</span>
        </h4>
        <ul className="space-y-4">
          {[
            { name: 'About Us', icon: '🏢', desc: 'Our story' },
            { name: 'Contact', icon: '📞', desc: 'Get in touch' },
            { name: 'Support', icon: '🛟', desc: '24/7 help' },
            { name: 'Careers', icon: '💼', desc: 'Join our team' }
          ].map((item) => (
            <li key={item.name}>
              <a href="#" className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-900/30 transition-all duration-200">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <span className="text-emerald-100 group-hover:text-white font-medium transition-colors">
                    {item.name}
                  </span>
                  <p className="text-xs text-emerald-300/60">{item.desc}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal Links */}
      <div>
        <h4 className="font-bold text-xl mb-6 flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
          <span>Legal</span>
        </h4>
        <ul className="space-y-4">
          {[
            { name: 'Privacy Policy', icon: '🛡️', desc: 'Your data safe' },
            { name: 'Terms of Service', icon: '📋', desc: 'Usage terms' },
            { name: 'Security', icon: '🔐', desc: 'Bank-level security' },
            { name: 'Compliance', icon: '📊', desc: 'Standards we meet' }
          ].map((item) => (
            <li key={item.name}>
              <a href="#" className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-900/30 transition-all duration-200">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <span className="text-emerald-100 group-hover:text-white font-medium transition-colors">
                    {item.name}
                  </span>
                  <p className="text-xs text-emerald-300/60">{item.desc}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Newsletter Section */}
    <div className="mb-12 p-6 bg-gradient-to-r from-emerald-900/40 to-green-900/40 rounded-2xl border border-emerald-700/30 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h4 className="text-xl font-bold mb-2 flex items-center space-x-2">
            <Mail className="w-5 h-5 text-emerald-300" />
            <span>Stay Updated</span>
          </h4>
          <p className="text-emerald-200/80">Get the latest features and updates delivered to your inbox.</p>
        </div>
        <div className="flex-1 max-w-md">
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 bg-emerald-950/50 border border-emerald-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-emerald-300/50"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02]">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-emerald-300/60 mt-2">No spam, unsubscribe anytime.</p>
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="border-t border-emerald-800/50 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-emerald-200/80">
            © 2024 - 2026 BulkSender. All rights reserved.
          </p>
          <p className="text-sm text-emerald-300/60 mt-1">
            Crafted with ❤️ for businesses worldwide
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            {['twitter', 'linkedin', 'github', 'discord'].map((platform) => (
              <a 
                key={platform}
                href="#" 
                className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-700/30 flex items-center justify-center hover:bg-emerald-800/50 hover:border-emerald-600/50 hover:scale-110 transition-all duration-300 group"
                title={platform.charAt(0).toUpperCase() + platform.slice(1)}
              >
                <span className="text-lg group-hover:scale-110 transition-transform">
                  {platform === 'twitter' ? '🐦' : 
                   platform === 'linkedin' ? '💼' : 
                   platform === 'github' ? '💻' : '🎮'}
                </span>
              </a>
            ))}
          </div>
          
          <div className="h-8 w-px bg-emerald-700/50 hidden md:block"></div>
          
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1.5 bg-emerald-900/30 rounded-lg border border-emerald-700/30 text-sm">
              <span className="text-emerald-300">🌐</span>
              <span className="ml-2">English</span>
            </div>
            <div className="text-sm text-emerald-300/60 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-8 pt-6 border-t border-emerald-800/30">
        {[
          { text: 'SOC 2 Compliant', color: 'from-blue-500/20 to-blue-600/20' },
          { text: 'GDPR Ready', color: 'from-emerald-500/20 to-green-500/20' },
          { text: 'PCI DSS', color: 'from-amber-500/20 to-amber-600/20' },
          { text: 'ISO 27001', color: 'from-purple-500/20 to-purple-600/20' }
        ].map((badge, index) => (
          <div 
            key={index}
            className={`px-4 py-2 bg-gradient-to-r ${badge.color} backdrop-blur-sm rounded-lg border border-white/10 text-xs font-medium text-emerald-100/80`}
          >
            {badge.text}
          </div>
        ))}
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}
