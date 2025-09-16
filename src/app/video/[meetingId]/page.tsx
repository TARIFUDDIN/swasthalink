"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function VideoCall() {
  const params = useParams();
  const meetingId = params.meetingId as string;

  useEffect(() => {
    // Load Jitsi Meet API script
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => initializeJitsi();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
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
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts'
        ],
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
      }
    };

    // @ts-ignore
    const api = new JitsiMeetExternalAPI(domain, options);
    
    api.addEventListener('videoConferenceJoined', () => {
      console.log('Conference joined');
    });

    api.addEventListener('videoConferenceLeft', () => {
      console.log('Conference left');
      window.close();
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Video Consultation</h1>
          <p className="text-gray-600">Meeting ID: {meetingId}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div id="jitsi-container" style={{ height: '600px' }}>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading video conference...</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Video Call Tips:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Make sure your camera and microphone are working</li>
            <li>• Find a quiet, well-lit place for the consultation</li>
            <li>• Keep your medical documents ready</li>
            <li>• Click "Join" when the doctor arrives</li>
          </ul>
        </div>
      </div>
    </div>
  );
}