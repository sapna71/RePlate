import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: (enableNotifications: boolean) => void;
}

export default function NotificationPopup({ isOpen, onClose }: NotificationPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-stone-900 flex items-center space-x-2">
            <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.343 12.344l.707-.707a2 2 0 113.536 0l-.707.707-1.886 1.886-1.65-1.886zM4 4h5a2 2 0 012 2v6.414l-3.536 3.536-1.864-2.05-.6-.9L4.343 12.344 4 12V6a2 2 0 012-2z" />
            </svg>
            <span>Stay Updated</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-stone-600">
              Would you like to receive notifications about new food listings, updates on your requests, and community updates?
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-stone-600">
                <svg className="w-5 h-5 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">New food available near you</span>
              </div>
              
              <div className="flex items-center space-x-3 text-stone-600">
                <svg className="w-5 h-5 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Status updates on your requests</span>
              </div>
              
              <div className="flex items-center space-x-3 text-stone-600">
                <svg className="w-5 h-5 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Urgent pickup reminders</span>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => onClose(true)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              >
                Enable Notifications
              </Button>
              <Button 
                onClick={() => onClose(false)}
                variant="outline"
                className="flex-1 border-stone-300 text-stone-600 hover:bg-stone-100"
              >
                Not Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}