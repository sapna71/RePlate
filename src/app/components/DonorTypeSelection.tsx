import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface DonorTypeSelectionProps {
  onTypeSelect: (type: 'individual' | 'organization' | 'wholesaler') => void;
}

export default function DonorTypeSelection({ onTypeSelect }: DonorTypeSelectionProps) {
  const donorTypes = [
    {
      id: 'individual' as const,
      title: 'Individual/Family',
      description: 'Share surplus food from your home kitchen',
      icon: (
        <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'organization' as const,
      title: 'Organization/Restaurant',
      description: 'Donate excess food from your business',
      icon: (
        <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'wholesaler' as const,
      title: 'Wholesaler/Distributor',
      description: 'Distribute surplus food at scale',
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
          <h1 className="text-4xl text-stone-900 mb-4">Choose Your Donor Type</h1>
          <p className="text-stone-600 text-lg">Select how you'd like to contribute to reducing food waste</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {donorTypes.map((type) => (
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
          <h2 className="text-2xl text-stone-900 mb-8">Why Donate with REPLATE?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-stone-900">Make an Impact</h3>
              <p className="text-stone-500 text-sm">Help families in your community access nutritious meals</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-stone-900">Save Time</h3>
              <p className="text-stone-500 text-sm">Quick listing process with instant notifications</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-stone-900">Stay Safe</h3>
              <p className="text-stone-500 text-sm">Verified recipients and secure exchange process</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}