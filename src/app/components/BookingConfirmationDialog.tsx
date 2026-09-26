import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface BookingConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  foodTitle: string;
}

export default function BookingConfirmationDialog({ 
  isOpen, 
  onConfirm, 
  onCancel,
  foodTitle 
}: BookingConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <Card className="w-full max-w-md bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Confirm Request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-stone-600">
            Are you sure you want to finalize your request for <span className="font-semibold text-stone-900">{foodTitle}</span>?
          </p>
          <p className="text-stone-500 text-sm">
            Once confirmed, you will receive an SMS with pickup details and your position in the queue.
          </p>
          
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={onConfirm}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            >
              Yes, Confirm Request
            </Button>
            <Button 
              onClick={onCancel}
              variant="outline"
              className="flex-1 border-stone-300 text-stone-600 hover:bg-stone-100"
            >
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
