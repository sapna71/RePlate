import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface QRCodeVerificationProps {
  donorName: string;
  foodItem: string;
  onClose: () => void;
}

export default function QRCodeVerification({ donorName, foodItem, onClose }: QRCodeVerificationProps) {
  const [verificationCode] = React.useState(() => {
    // Generate a random 4-digit code
    return Math.floor(1000 + Math.random() * 9000).toString();
  });

  // Generate QR code data (in real app, this would be a proper QR code URL)
  const qrData = `FOODSHARE-${verificationCode}`;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-white text-center">Pickup Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-stone-600 mb-2">Your request has been accepted!</p>
            <p className="text-stone-500 text-sm">Show this QR code to the donor</p>
          </div>

          {/* QR Code Display */}
          <div className="bg-white p-6 rounded-lg mx-auto w-64 h-64 flex items-center justify-center">
            <svg viewBox="0 0 29 29" className="w-full h-full">
              {/* Simple QR code pattern representation */}
              <rect width="29" height="29" fill="white"/>
              {/* Corner markers */}
              <rect x="0" y="0" width="7" height="7" fill="black"/>
              <rect x="1" y="1" width="5" height="5" fill="white"/>
              <rect x="2" y="2" width="3" height="3" fill="black"/>
              
              <rect x="22" y="0" width="7" height="7" fill="black"/>
              <rect x="23" y="1" width="5" height="5" fill="white"/>
              <rect x="24" y="2" width="3" height="3" fill="black"/>
              
              <rect x="0" y="22" width="7" height="7" fill="black"/>
              <rect x="1" y="23" width="5" height="5" fill="white"/>
              <rect x="2" y="24" width="3" height="3" fill="black"/>
              
              {/* Data pattern (simplified) */}
              <rect x="8" y="2" width="1" height="1" fill="black"/>
              <rect x="10" y="2" width="1" height="1" fill="black"/>
              <rect x="12" y="2" width="1" height="1" fill="black"/>
              <rect x="14" y="2" width="1" height="1" fill="black"/>
              <rect x="16" y="2" width="1" height="1" fill="black"/>
              <rect x="18" y="2" width="1" height="1" fill="black"/>
              <rect x="20" y="2" width="1" height="1" fill="black"/>
              
              <rect x="8" y="4" width="1" height="1" fill="black"/>
              <rect x="10" y="4" width="1" height="1" fill="black"/>
              <rect x="12" y="4" width="1" height="1" fill="black"/>
              <rect x="16" y="4" width="1" height="1" fill="black"/>
              <rect x="20" y="4" width="1" height="1" fill="black"/>
              
              <rect x="8" y="8" width="1" height="1" fill="black"/>
              <rect x="10" y="8" width="1" height="1" fill="black"/>
              <rect x="14" y="8" width="1" height="1" fill="black"/>
              <rect x="16" y="8" width="1" height="1" fill="black"/>
              <rect x="18" y="8" width="1" height="1" fill="black"/>
              <rect x="20" y="8" width="1" height="1" fill="black"/>
              
              <rect x="2" y="10" width="1" height="1" fill="black"/>
              <rect x="4" y="10" width="1" height="1" fill="black"/>
              <rect x="8" y="10" width="1" height="1" fill="black"/>
              <rect x="12" y="10" width="1" height="1" fill="black"/>
              <rect x="14" y="10" width="1" height="1" fill="black"/>
              <rect x="18" y="10" width="1" height="1" fill="black"/>
              <rect x="20" y="10" width="1" height="1" fill="black"/>
              <rect x="24" y="10" width="1" height="1" fill="black"/>
              <rect x="26" y="10" width="1" height="1" fill="black"/>
              
              <rect x="2" y="12" width="1" height="1" fill="black"/>
              <rect x="6" y="12" width="1" height="1" fill="black"/>
              <rect x="8" y="12" width="1" height="1" fill="black"/>
              <rect x="10" y="12" width="1" height="1" fill="black"/>
              <rect x="14" y="12" width="1" height="1" fill="black"/>
              <rect x="16" y="12" width="1" height="1" fill="black"/>
              <rect x="20" y="12" width="1" height="1" fill="black"/>
              <rect x="22" y="12" width="1" height="1" fill="black"/>
              <rect x="26" y="12" width="1" height="1" fill="black"/>
            </svg>
          </div>

          {/* Verification Code */}
          <div className="text-center">
            <p className="text-stone-500 text-sm mb-2">Verification Code</p>
            <div className="bg-stone-50 rounded-lg p-4 inline-block">
              <p className="text-3xl font-mono tracking-widest text-orange-400">{verificationCode}</p>
            </div>
          </div>

          {/* Details */}
          <div className="bg-stone-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Donor:</span>
              <span className="text-white">{donorName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Food Item:</span>
              <span className="text-white">{foodItem}</span>
            </div>
          </div>

          {/* Alerts sent notification */}
          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm">
                <p className="text-green-300 font-medium">Alerts Sent!</p>
                <p className="text-green-400/80 text-xs mt-1">
                  SMS and WhatsApp notifications sent to both you and the donor.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            Got it!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
