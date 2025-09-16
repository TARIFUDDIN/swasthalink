"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Video, Check, X, AlertCircle, Phone } from 'lucide-react';

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  experience: number;
  languages: string[];
  availability: { [key: string]: string[] };
  bookedSlots: string[];
}

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
  symptoms: string;
  meetingUrl: string;
}

export default function EnhancedConsultationSystem() {
  const [activeTab, setActiveTab] = useState<'book' | 'appointments'>('book');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState("");
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setDoctorsLoading(true);
        const response = await fetch('/api/doctors');
        if (response.ok) {
          const doctorsData = await response.json();
          setDoctors(doctorsData);
        } else {
          console.error('Failed to fetch doctors');
          // Fallback to mock data if API fails
          setDoctors([
            {
              id: "1",
              firstName: "Rajesh",
              lastName: "Kumar",
              email: "dr.rajesh@nabha.health",
              specialization: "General Medicine",
              experience: 8,
              languages: ["Hindi", "Punjabi", "English"],
              availability: {
                monday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
                tuesday: ["09:00", "10:00", "14:00", "15:00", "16:00"],
                wednesday: ["09:00", "10:00", "11:00", "14:00"],
                thursday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
                friday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
                saturday: ["09:00", "10:00", "11:00"],
                sunday: []
              },
              bookedSlots: []
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Fallback to mock data
        setDoctors([
          {
            id: "1",
            firstName: "Rajesh",
            lastName: "Kumar",
            email: "dr.rajesh@nabha.health",
            specialization: "General Medicine",
            experience: 8,
            languages: ["Hindi", "Punjabi", "English"],
            availability: {
              monday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
              tuesday: ["09:00", "10:00", "14:00", "15:00", "16:00"],
              wednesday: ["09:00", "10:00", "11:00", "14:00"],
              thursday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
              friday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
              saturday: ["09:00", "10:00", "11:00"],
              sunday: []
            },
            bookedSlots: []
          }
        ]);
      } finally {
        setDoctorsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setAppointmentsLoading(true);
        const response = await fetch('/api/appointments');
        if (response.ok) {
          const appointmentsData = await response.json();
          setAppointments(appointmentsData);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      updateAvailableSlots();
    }
  }, [selectedDoctor, selectedDate]);

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  const updateAvailableSlots = async () => {
    if (!selectedDoctor || !selectedDate) return;

    try {
      const response = await fetch(`/api/doctors/${selectedDoctor}/availability?date=${selectedDate}`);
      if (response.ok) {
        const availabilityData = await response.json();
        setAvailableSlots(availabilityData.availableSlots || []);
      } else {
        // Fallback to client-side calculation if API fails
        const doctor = doctors.find(d => d.id === selectedDoctor);
        if (!doctor) return;

        const dayName = getDayName(selectedDate);
        const daySlots = doctor.availability[dayName] || [];
        
        const dateKey = selectedDate;
        const bookedTimes = doctor.bookedSlots
          .filter(slot => slot.startsWith(dateKey))
          .map(slot => slot.split('-').pop());

        const available = daySlots.filter(slot => !bookedTimes.includes(slot));
        setAvailableSlots(available);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const bookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    setLoading(true);
    
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: selectedDoctor,
          date: selectedDate,
          time: selectedTime,
          symptoms
        }),
      });

      if (response.ok) {
        const newAppointment = await response.json();
        
        setAppointments([{
          id: newAppointment.id,
          doctorId: selectedDoctor,
          doctorName: `Dr. ${doctors.find(d => d.id === selectedDoctor)?.firstName} ${doctors.find(d => d.id === selectedDoctor)?.lastName}`,
          date: selectedDate,
          time: selectedTime,
          status: "SCHEDULED",
          symptoms,
          meetingUrl: newAppointment.meetingUrl || `https://meet.jit.si/nabha-consultation-${Date.now()}`
        }, ...appointments]);

        setSuccess(true);
        setSelectedDoctor("");
        setSelectedDate("");
        setSelectedTime("");
        setSymptoms("");
        setAvailableSlots([]);
      } else {
        console.error('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinVideoCall = (meetingUrl: string) => {
    const meetingId = meetingUrl.split('/').pop();
    setCurrentMeeting(meetingId || '');
    setShowVideoCall(true);
  };

  const endVideoCall = () => {
    setShowVideoCall(false);
    setCurrentMeeting("");
  };

  // Video Call Component
  const VideoCallInterface = ({ meetingId }: { meetingId: string }) => {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => initializeJitsi();
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }, []);

    const initializeJitsi = () => {
      const domain = 'meet.jit.si';
      const options = {
        roomName: meetingId,
        width: '100%',
        height: '600px',
        parentNode: document.querySelector('#jitsi-container'),
        configOverwrite: {
          prejoinPageEnabled: false,
          startWithAudioMuted: false,
          startWithVideoMuted: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'chat', 'raisehand',
            'videoquality', 'filmstrip', 'settings'
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        }
      };

      // @ts-ignore
      const api = new window.JitsiMeetExternalAPI(domain, options);
      
      api.addEventListener('videoConferenceJoined', () => {
        console.log('Conference joined successfully');
      });

      api.addEventListener('videoConferenceLeft', () => {
        console.log('Conference left');
        endVideoCall();
      });

      api.addEventListener('readyToClose', () => {
        endVideoCall();
      });
    };

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
        <div className="bg-white rounded-lg w-full max-w-6xl h-5/6 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Video Consultation</h2>
            <button
              onClick={endVideoCall}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              End Call
            </button>
          </div>
          <div className="flex-1">
            <div id="jitsi-container" className="w-full h-full">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading video conference...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  if (showVideoCall) {
    return <VideoCallInterface meetingId={currentMeeting} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nabha Telemedicine Platform</h1>
          <p className="text-gray-600">Connect with qualified doctors from the comfort of your home</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('book')}
              className={`flex-1 py-3 px-6 text-center font-medium transition-colors ${
                activeTab === 'book'
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Calendar className="inline-block w-5 h-5 mr-2" />
              Book Consultation
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 py-3 px-6 text-center font-medium transition-colors ${
                activeTab === 'appointments'
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Clock className="inline-block w-5 h-5 mr-2" />
              My Appointments
            </button>
          </div>

          {activeTab === 'book' && (
            <div className="p-6">
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-green-700 font-medium">Appointment booked successfully!</p>
                    <p className="text-green-600 text-sm">You'll receive joining details via email.</p>
                  </div>
                </div>
              )}

              <form onSubmit={bookAppointment} className="space-y-6">
                {/* Doctor Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <User className="inline-block w-4 h-4 mr-1" />
                    Select Doctor
                  </label>
                  <div className="grid gap-4">
                    {doctorsLoading ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
                        <p className="text-gray-600">Loading doctors...</p>
                      </div>
                    ) : doctors.length > 0 ? doctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        onClick={() => setSelectedDoctor(doctor.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedDoctor === doctor.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Dr. {doctor.firstName} {doctor.lastName}
                            </h3>
                            <p className="text-blue-600 text-sm">{doctor.specialization}</p>
                            <p className="text-gray-600 text-sm">{doctor.experience} years experience</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {doctor.languages.map((lang) => (
                                <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Available
                            </span>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-4">
                        <p className="text-gray-600">No doctors available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={!selectedDoctor}
                  />
                </div>

                {/* Time Selection */}
                {availableSlots.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`p-3 text-center border-2 rounded-lg transition-all ${
                            selectedTime === slot
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDoctor && selectedDate && availableSlots.length === 0 && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <p className="text-yellow-700">No available slots for selected date. Please choose another date.</p>
                  </div>
                )}

                {/* Symptoms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brief description of symptoms/concern
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Briefly describe your health concern..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !selectedDoctor || !selectedDate || !selectedTime}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Booking...
                    </span>
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Appointments</h2>
              
              {appointmentsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading appointments...</p>
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No appointments scheduled</p>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Book your first consultation
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                          <p className="text-gray-600 text-sm">
                            {new Date(appointment.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })} at {appointment.time}
                          </p>
                          {appointment.symptoms && (
                            <p className="text-gray-600 text-sm mt-1">
                              <strong>Symptoms:</strong> {appointment.symptoms}
                            </p>
                          )}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'SCHEDULED'
                            ? 'bg-blue-100 text-blue-800'
                            : appointment.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      
                      {appointment.status === 'SCHEDULED' && appointment.meetingUrl && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => joinVideoCall(appointment.meetingUrl)}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Video className="h-4 w-4" />
                            Join Video Call
                          </button>
                          <button
                            onClick={() => window.open(`tel:+911234567890`, '_self')}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                            Call Support
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            Video Consultation Guidelines
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                Ensure stable internet connection (minimum 1 Mbps)
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                Use Chrome, Firefox, or Safari browser
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                Keep medical history and current medications ready
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                Join 5 minutes before appointment time
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                Find a quiet, well-lit place for consultation
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                Test camera and microphone beforehand
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}