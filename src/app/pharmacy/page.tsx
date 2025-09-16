
// src/app/pharmacy/page.tsx
"use client";
import { useState } from "react";

interface Medicine {
  id: string;
  name: string;
  stock: number;
  price?: number;
  lastUpdated: string;
}

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone?: string;
  village: string;
  medicines: Medicine[];
}

export default function PharmacyTracker() {
  const [medicine, setMedicine] = useState("");
  const [village, setVillage] = useState("");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMedicine = async () => {
    if (!medicine.trim()) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams({
        medicine,
        ...(village && { village })
      });
      
      const response = await fetch(`/api/pharmacy/check?${params}`);
      const data = await response.json();
      setPharmacies(data);
    } catch (error) {
      console.error("Medicine search failed:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Medicine Availability Tracker</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medicine Name
              </label>
              <input
                type="text"
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                placeholder="e.g., Paracetamol, Crocin..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Village (Optional)
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g., Nabha, Rajpura..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={searchMedicine}
                disabled={loading || !medicine.trim()}
                className="w-full bg-purple-500 text-white py-3 px-4 rounded-md hover:bg-purple-600 disabled:bg-gray-400"
              >
                {loading ? "Searching..." : "Check Availability"}
              </button>
            </div>
          </div>
        </div>

        {pharmacies.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Available at:</h2>
            {pharmacies.map((pharmacy) => (
              <div key={pharmacy.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{pharmacy.name}</h3>
                    <p className="text-gray-600">{pharmacy.address}</p>
                    <p className="text-gray-600">Village: {pharmacy.village}</p>
                    {pharmacy.phone && (
                      <p className="text-blue-600">📞 {pharmacy.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Available Medicines:</h4>
                  {pharmacy.medicines.map((med) => (
                    <div key={med.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <span className="font-medium">{med.name}</span>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-sm ${
                          med.stock > 10 ? 'bg-green-100 text-green-800' : 
                          med.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          Stock: {med.stock}
                        </span>
                        {med.price && (
                          <div className="text-gray-600 text-sm">₹{med.price}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {pharmacies.length === 0 && medicine && !loading && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">No pharmacies found with "{medicine}" in stock.</p>
            <p className="text-sm text-gray-500 mt-2">Try different spelling or check nearby villages.</p>
          </div>
        )}
      </div>
    </div>
  );
}