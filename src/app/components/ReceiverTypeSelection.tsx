import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface ReceiverTypeSelectionProps {
  onTypeSelect: (type: 'individual' | 'organization' | 'wholesaler') => void;
}

export default function ReceiverTypeSelection({ onTypeSelect }: ReceiverTypeSelectionProps) {
  const receiverTypes = [
    {
      id: 'individual' as const,
      title: 'Individual/Family',
      description: 'Find food for yourself and your family',
      icon: (
        <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'organization' as const,
      title: 'Community Organization',
      description: 'Collect food for community programs and shelters',
      icon: (
        <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      id: 'wholesaler' as const,
      title: 'Wholesaler/Distributor',
      description: 'Source food for redistribution to communities',
      icon: (
        <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-stone-900 mb-4">Choose Your Receiver Type</h1>
          <p className="text-stone-600 text-lg">Select how you'd like to access available food</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {receiverTypes.map((type) => (
            <Card key={type.id} className="bg-white border-stone-200 hover:border-orange-500 transition-all duration-300 cursor-pointer group shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform">
                  {type.icon}
                </div>
                <h3 className="text-xl text-stone-900 mb-3">{type.title}</h3>
                <p className="text-stone-600 mb-6">{type.description}</p>
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => onTypeSelect(type.id)}
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl text-stone-900 mb-8">Why Find Food with REPLATE?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-stone-900">Find Nearby</h3>
              <p className="text-stone-500 text-sm">Discover food donations close to your location</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-stone-900">Real-Time Updates</h3>
              <p className="text-stone-500 text-sm">Get instant notifications about new food listings</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-stone-900">Dignified Access</h3>
              <p className="text-stone-500 text-sm">Access nutritious food with privacy and respect</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}