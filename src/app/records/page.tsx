// src/app/records/page.tsx
"use client";
import { useState, useEffect } from "react";

interface HealthRecord {
  id: string;
  diagnosis?: string;
  medicines?: string;
  notes?: string;
  date: string;
  doctorName?: string;
}

export default function HealthRecords() {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/health-records');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Failed to fetch health records:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Health Records</h1>
        
        {records.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No health records found.</p>
            <p className="text-sm text-gray-500 mt-2">Your consultation history will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {record.diagnosis || 'General Consultation'}
                    </h3>
                    <p className="text-gray-600">
                      {new Date(record.date).toLocaleDateString('en-IN')}
                    </p>
                    {record.doctorName && (
                      <p className="text-sm text-blue-600">Dr. {record.doctorName}</p>
                    )}
                  </div>
                </div>
                
                {record.medicines && (
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-800">Medicines Prescribed:</h4>
                    <p className="text-gray-600 mt-1">{record.medicines}</p>
                  </div>
                )}
                
                {record.notes && (
                  <div>
                    <h4 className="font-medium text-gray-800">Doctor's Notes:</h4>
                    <p className="text-gray-600 mt-1">{record.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}