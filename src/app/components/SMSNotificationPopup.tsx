import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface SMSNotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  requestDetails: {
    foodTitle: string;
    donorName: string;
    queuePosition: number;
  };
}

export default function SMSNotificationPopup({ 
  isOpen, 
  onClose,
  phoneNumber,
  requestDetails 
}: SMSNotificationPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <Card className="w-full max-w-md bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            SMS Sent Successfully
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
            <p className="text-green-400 mb-2">✓ Confirmation SMS has been sent to</p>
            <p className="text-stone-900 font-semibold">{phoneNumber}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-stone-900 font-semibold">Request Details:</h4>
            <div className="bg-stone-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Food Item:</span>
                <span className="text-white">{requestDetails.foodTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Donor:</span>
                <span className="text-white">{requestDetails.donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Queue Position:</span>
                <span className="text-orange-400 font-semibold">#{requestDetails.queuePosition}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3">
            <p className="text-blue-400 text-sm">
              You'll receive updates via SMS about your pickup time and QR code for verification.
            </p>
          </div>
          
          <Button 
            onClick={onClose}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            Got It!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}