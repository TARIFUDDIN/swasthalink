// src/app/symptom-checker/page.tsx
"use client";
import { useState } from "react";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [language, setLanguage] = useState("english");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkSymptoms = async () => {
    if (!symptoms.trim()) {
      setError("Please describe your symptoms");
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/ai-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, language }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setAdvice(data.advice);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Error connecting to our health advisor. Please check your internet connection and try again.");
    }
    setLoading(false);
  };

  // Function to format the AI response with proper styling
  const formatAdvice = (text: string) => {
    if (!text) return null;
    
    // Split the text into sections based on the custom tags
    const sections = text.split(/(<header>|<section>|<subsection>|<point>|<warning>|<doctor>)/);
    
    return sections.map((section, index) => {
      if (section.startsWith("<header>")) {
        return (
          <h2 key={index} className="text-2xl font-bold text-blue-800 mb-4 mt-6">
            {section.replace("<header>", "").replace("</header>", "")}
          </h2>
        );
      } else if (section.startsWith("<section>")) {
        return (
          <p key={index} className="text-gray-700 mb-4">
            {section.replace("<section>", "").replace("</section>", "")}
          </p>
        );
      } else if (section.startsWith("<subsection>")) {
        return (
          <h3 key={index} className="text-xl font-semibold text-blue-700 mb-2 mt-4">
            {section.replace("<subsection>", "").replace("</subsection>", "")}
          </h3>
        );
      } else if (section.startsWith("<point>")) {
        return (
          <li key={index} className="text-gray-700 mb-1 ml-4">
            • {section.replace("<point>", "").replace("</point>", "")}
          </li>
        );
      } else if (section.startsWith("<warning>")) {
        return (
          <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p className="text-red-700 font-medium">
              ⚠️ {section.replace("<warning>", "").replace("</warning>", "")}
            </p>
          </div>
        );
      } else if (section.startsWith("<doctor>")) {
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <p className="text-blue-700 font-medium">
              👨‍⚕️ {section.replace("<doctor>", "").replace("</doctor>", "")}
            </p>
          </div>
        );
      } else if (section.trim() !== "") {
        return (
          <p key={index} className="text-gray-700 mb-2">
            {section}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">AI Symptom Checker</h1>
          <p className="opacity-90">Get preliminary health advice in your preferred language</p>
        </div>
        
        <div className="p-6">
          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Response Language
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="punjabi">Punjabi</option>
              <option value="bengali">Bengali</option>
              <option value="tamil">Tamil</option>
              <option value="telugu">Telugu</option>
            </select>
          </div>
          
          {/* Symptoms Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your symptoms in detail
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={5}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Example: सिर दर्द, बुखार, और थकान / Headache, fever, and tiredness for 2 days..."
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={checkSymptoms}
            disabled={loading || !symptoms.trim()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Symptoms...
              </>
            ) : (
              "Get Health Advice"
            )}
          </button>

          {/* Results Section */}
          {advice && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-6 0H5m4 0h4m-4 0V9m0 12v-4m0 0H9m4 0h2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Health Advice</h2>
              </div>
              
              <div className="prose max-w-none">
                {formatAdvice(advice)}
              </div>
              
              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This AI-generated health advice is for informational purposes only and is not a substitute for professional medical diagnosis, treatment, or advice. Always consult a qualified healthcare provider for any health concerns. In case of emergency, please contact your local emergency services immediately.
                </p>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Need to speak with a doctor?</p>
            <a
              href="/consultation"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Book a Doctor Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}