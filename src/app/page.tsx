'use client';

import { redirect } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (isSignedIn) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: "🤖",
      title: "AI Symptom Checker",
      color: "text-blue-600",
      desc: "Get instant health advice in Hindi, Punjabi, or English. Works even with low internet connectivity.",
    },
    {
      icon: "📱",
      title: "Video Consultations",
      color: "text-green-600",
      desc: "Connect with qualified doctors from Nabha Civil Hospital via secure video calls.",
    },
    {
      icon: "💊",
      title: "Medicine Tracker",
      color: "text-purple-600",
      desc: "Check real-time medicine availability at local pharmacies before traveling.",
    },
    {
      icon: "📋",
      title: "Digital Health Records",
      color: "text-orange-600",
      desc: "Access your medical history offline. Never lose important health information.",
    },
  ];

  const stats = [
    { value: "173", label: "Villages Served" },
    { value: "11/23", label: "Available Doctors" },
    { value: "24/7", label: "AI Support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50" style={{
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.15) 1px, transparent 0)',
      backgroundSize: '20px 20px'
    }}>
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <span className="text-white text-xl">🏥</span>
              </div>
              <h1 className="text-2xl font-bold text-blue-900">
                Nabha <span className="text-blue-600">Telemedicine</span>
              </h1>
            </div>
            <div className="space-x-4 flex">
              <Link href="/sign-in">
                <button className="text-gray-900 hover:text-blue-600 border border-blue-500 rounded px-4 py-2 bg-white transition-all duration-300">Sign In</button>
              </Link>
              <Link href="/sign-up">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded px-4 py-2 hover:shadow-lg transition-all duration-300">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        {/* Animated Gradient Blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-800 to-blue-400 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-72 h-72 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-500 to-green-500 opacity-30 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Healthcare for <span className="text-blue-600">Rural Punjab</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connecting 173 villages around Nabha with quality healthcare through telemedicine, AI-powered symptom checking, and real-time pharmacy tracking.
          </p>
          <div className="space-x-4">
            <Link href="/sign-up">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg h-12 hover:shadow-lg transition-all duration-300">Get Started</button>
            </Link>
            <Link href="/sign-in">
              <button className="border-blue-600 text-blue-600 px-8 py-3 rounded-lg h-12 border hover:bg-blue-50 transition-all duration-300">Patient Login</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Healthcare Solutions for Rural Communities
        </h2>
        <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Our platform brings modern healthcare technology to rural areas, ensuring everyone has access to quality medical services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl border bg-white transition-shadow hover:shadow-md hover:border-blue-300"
            >
              <div className="pb-4">
                <div className="text-4xl mb-2">{feature.icon}</div>
                <div className={`text-lg font-semibold ${feature.color}`}>{feature.title}</div>
              </div>
              <div>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to access healthcare services?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of patients in rural Punjab who are using our platform for convenient and reliable healthcare.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300">Create Account</button>
            </Link>
            <Link href="/symptom-checker">
              <button className="border-blue-600 text-blue-600 px-8 py-3 rounded-lg border hover:bg-blue-50 transition-all duration-300">Try Symptom Checker</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <span className="text-white text-xl">🏥</span>
                </div>
                <h3 className="text-xl font-semibold">Nabha Telemedicine</h3>
              </div>
              <p className="text-gray-400">
                Improving healthcare access for rural Punjab through technology and innovation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/sign-up" className="hover:text-white block transition-colors">Register as Patient</Link>
                <Link href="/pharmacy" className="hover:text-white block transition-colors">Check Medicine Stock</Link>
                <Link href="/symptom-checker" className="hover:text-white block transition-colors">Symptom Checker</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Emergency</h4>
              <div className="text-gray-400">
                <div>Nabha Civil Hospital</div>
                <div className="text-red-400 font-semibold mt-2">📞 108 (Ambulance)</div>
                <div className="mt-2">For emergencies, visit hospital directly</div>
              </div>
            </div>
          </div>
          <div className="my-8 bg-gray-800 h-px" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Government of Punjab - Department of Higher Education</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;