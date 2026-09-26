import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface UserTypeSelectionProps {
  onUserTypeSelect: (type: 'donor' | 'receiver') => void;
}

export default function UserTypeSelection({ onUserTypeSelect }: UserTypeSelectionProps) {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-orange-400/15 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-br from-orange-600/10 to-orange-500/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-orange-600/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-br from-orange-500/10 to-orange-400/15 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl text-stone-900 mb-6">
            How would you like to use 
            <span className="text-orange-400"> REPLATE</span>?
          </h1>
          <p className="text-xl text-stone-600">
            Choose your role to get started and help build a stronger community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Donor Option */}
          <Card 
            className="bg-white border-stone-200 hover:border-orange-500 transition-all duration-300 cursor-pointer group shadow-sm"
            onClick={() => onUserTypeSelect('donor')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl text-stone-900 mb-4">I want to Donate Food</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Share surplus food from your home, restaurant, or organization with those who need it most in your community.
              </p>
              <ul className="text-sm text-stone-500 space-y-2 mb-6">
                <li className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>List available food items</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Connect with local recipients</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Make a positive impact</span>
                </li>
              </ul>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Start Donating
              </Button>
            </CardContent>
          </Card>

          {/* Receiver Option */}
          <Card 
            className="bg-white border-stone-200 hover:border-orange-500 transition-all duration-300 cursor-pointer group shadow-sm"
            onClick={() => onUserTypeSelect('receiver')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl text-stone-900 mb-4">I need Food</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Find fresh, quality food donations available in your area from generous community members and local businesses.
              </p>
              <ul className="text-sm text-stone-500 space-y-2 mb-6">
                <li className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Browse available food nearby</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Connect with local donors</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Access nutritious meals</span>
                </li>
              </ul>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Find Food
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <p className="text-stone-500 text-sm">
            You can change your role anytime in your account settings
          </p>
        </div>
      </div>
    </div>
  );
}