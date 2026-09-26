import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface QRCodeDisplayProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  verificationCode: string;
  foodTitle: string;
  donorName: string;
  pickupLocation: string;
  queuePosition: number;
}

export default function QRCodeDisplay({ 
  isOpen, 
  onClose,
  requestId,
  verificationCode,
  foodTitle,
  donorName,
  pickupLocation,
  queuePosition
}: QRCodeDisplayProps) {
  if (!isOpen) return null;

  // Generate QR code data URL
  const qrCodeData = `FOODSHARE:${requestId}:${verificationCode}`;
  
  // Create a simple QR code representation (in a real app, use a QR library)
  const QRCodeSVG = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill="white"/>
      {/* Simplified QR pattern - in production use a real QR library */}
      <g fill="black">
        {/* Corner markers */}
        <rect x="10" y="10" width="50" height="50"/>
        <rect x="20" y="20" width="30" height="30" fill="white"/>
        <rect x="140" y="10" width="50" height="50"/>
        <rect x="150" y="20" width="30" height="30" fill="white"/>
        <rect x="10" y="140" width="50" height="50"/>
        <rect x="20" y="150" width="30" height="30" fill="white"/>
        
        {/* Data pattern - simplified representation */}
        {Array.from({ length: 15 }, (_, i) => (
          Array.from({ length: 15 }, (_, j) => {
            const shouldFill = (i + j + parseInt(verificationCode)) % 3 === 0;
            return shouldFill ? (
              <rect 
                key={`${i}-${j}`}
                x={70 + j * 8} 
                y={70 + i * 8} 
                width="6" 
                height="6"
              />
            ) : null;
          })
        ))}
      </g>
    </svg>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <Card className="w-full max-w-md bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            Pickup QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* QR Code */}
          <div className="bg-white rounded-lg p-6 flex items-center justify-center">
            <div className="w-48 h-48">
              <QRCodeSVG />
            </div>
          </div>

          {/* Verification Code */}
          <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4 text-center">
            <p className="text-stone-600 text-sm mb-2">Verification Code</p>
            <p className="text-4xl font-bold text-orange-400 tracking-widest">
              {verificationCode}
            </p>
            <p className="text-stone-500 text-xs mt-2">Show this code at pickup</p>
          </div>

          {/* Request Details */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-semibold">Request Details:</h4>
            <div className="bg-stone-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Food Item:</span>
                <span className="text-white">{foodTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Donor:</span>
                <span className="text-white">{donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Location:</span>
                <span className="text-white">{pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Queue Position:</span>
                <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30">
                  #{queuePosition}
                </Badge>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> Present this QR code or the 4-digit verification code to the donor at pickup.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => {
                // In a real app, this would download or save the QR code
                alert('QR Code saved to gallery');
              }}
              variant="outline"
              className="flex-1 border-stone-300 text-stone-600 hover:bg-stone-100"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Save
            </Button>
            <Button 
              onClick={onClose}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
