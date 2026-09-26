import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface CancellationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  itemTitle: string;
  isDonor?: boolean;
}

export default function CancellationPopup({ isOpen, onClose, onConfirm, itemTitle, isDonor = false }: CancellationPopupProps) {
  const [reason, setReason] = React.useState('');
  const [selectedReason, setSelectedReason] = React.useState('');

  const commonReasons = isDonor ? [
    "Food was consumed/given away",
    "Change in availability",
    "Emergency or unexpected event",
    "Quality concerns",
    "Transportation issues",
    "Other"
  ] : [
    "Plans changed",
    "Found alternative source",
    "Too far/transportation issues",
    "No longer needed",
    "Emergency situation",
    "Other"
  ];

  const handleConfirm = () => {
    const finalReason = selectedReason === 'Other' ? reason : selectedReason;
    if (finalReason.trim()) {
      onConfirm(finalReason);
      onClose();
      setReason('');
      setSelectedReason('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-stone-900 flex items-center space-x-2">
            <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>{isDonor ? 'Withdraw Donation' : 'Cancel Request'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-stone-600 mb-2">
                Are you sure you want to {isDonor ? 'withdraw' : 'cancel'} this {isDonor ? 'donation' : 'request'}?
              </p>
              <p className="text-stone-900 font-medium">"{itemTitle}"</p>
            </div>

            <div>
              <Label className="text-stone-600 mb-3 block">Please select a reason:</Label>
              <div className="space-y-2">
                {commonReasons.map((reasonOption) => (
                  <label key={reasonOption} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="cancellation-reason"
                      value={reasonOption}
                      checked={selectedReason === reasonOption}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="w-4 h-4 text-orange-600 bg-stone-100 border-stone-300 focus:ring-orange-500"
                    />
                    <span className="text-stone-600 group-hover:text-stone-900 transition-colors">
                      {reasonOption}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {selectedReason === 'Other' && (
              <div>
                <Label className="text-stone-600">Please specify:</Label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide additional details..."
                  className="bg-stone-50 border-stone-300 text-stone-900 mt-2"
                  rows={3}
                />
              </div>
            )}

            <div className="bg-stone-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-stone-600">
                  {isDonor ? (
                    <p>Withdrawing this donation will notify all receivers who have requested it. This action cannot be undone.</p>
                  ) : (
                    <p>Canceling this request will remove you from the queue and notify the donor. You can request this item again later.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={onClose}
                variant="outline"
                className="flex-1 border-stone-300 text-stone-600 hover:bg-stone-100"
              >
                Keep {isDonor ? 'Donation' : 'Request'}
              </Button>
              <Button 
                onClick={handleConfirm}
                disabled={!selectedReason || (selectedReason === 'Other' && !reason.trim())}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isDonor ? 'Withdraw' : 'Cancel'} {isDonor ? 'Donation' : 'Request'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}