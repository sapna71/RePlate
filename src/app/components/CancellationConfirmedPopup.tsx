import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface CancellationConfirmedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  foodTitle: string;
}

export default function CancellationConfirmedPopup({ 
  isOpen, 
  onClose,
  foodTitle 
}: CancellationConfirmedPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <Card className="w-full max-w-md bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Request Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
            <p className="text-green-400 text-center">
              ✓ Your request has been successfully cancelled
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-stone-600">
              Your request for <span className="font-semibold text-stone-900">{foodTitle}</span> has been removed from the queue.
            </p>
            <p className="text-stone-500 text-sm">
              The donor has been notified about the cancellation. You can request other available food items from the dashboard.
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
