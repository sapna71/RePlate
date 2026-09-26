import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FoodListing } from "./FoodCard";

interface RequestConfirmationOverlayProps {
  listing: FoodListing;
  onClose: () => void;
  onBookNow: () => void;
}

export default function RequestConfirmationOverlay({ listing, onClose, onBookNow }: RequestConfirmationOverlayProps) {
  const [queueNumber] = React.useState(Math.floor(Math.random() * 10) + 1);
  const [waitTime] = React.useState(Math.floor(Math.random() * 60) + 15); // 15-75 minutes

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Request Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Queue Information */}
          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-stone-900">Your Queue Position</h3>
              <Badge className="bg-green-600/20 text-green-400 border-green-600/30 text-lg px-3 py-1">
                #{queueNumber}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-stone-500">Expected Wait Time</p>
                <p className="text-stone-900 font-semibold">{waitTime} minutes</p>
              </div>
              <div>
                <p className="text-stone-500">Pickup Window</p>
                <p className="text-stone-900 font-semibold">Today, 6:00 PM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Food Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900">Food Details</h3>
            <div className="flex gap-4">
              <img 
                src={listing.imageUrl} 
                alt={listing.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-stone-900 mb-1">{listing.title}</h4>
                <p className="text-stone-500 text-sm mb-2">{listing.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {listing.category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {listing.quantity}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Serves {listing.servings}
                  </Badge>
                  {listing.isUrgent && (
                    <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30 text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900">Donor Information</h3>
            <div className="bg-stone-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-600/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900">Green Valley Restaurant</h4>
                  <p className="text-stone-500 text-sm">Verified Donor</p>
                </div>
                <Badge className="bg-green-600/20 text-green-400 border-green-600/30 ml-auto">
                  ✓ Verified
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-stone-500">Location</p>
                  <p className="text-white">{listing.location}</p>
                </div>
                <div>
                  <p className="text-stone-500">Distance</p>
                  <p className="text-white">0.8 km away</p>
                </div>
                <div>
                  <p className="text-stone-500">Contact</p>
                  <p className="text-white">+1 (555) 234-5678</p>
                </div>
                <div>
                  <p className="text-stone-500">Rating</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-white text-xs">(4.9)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900">Next Steps</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-400 text-xs font-semibold">1</span>
                </div>
                <div>
                  <p className="text-white font-medium">Wait for Confirmation</p>
                  <p className="text-stone-500 text-sm">The donor will confirm your request within 10 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-400 text-xs font-semibold">2</span>
                </div>
                <div>
                  <p className="text-white font-medium">Get Pickup Details</p>
                  <p className="text-stone-500 text-sm">Receive SMS with exact pickup location and QR code</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-400 text-xs font-semibold">3</span>
                </div>
                <div>
                  <p className="text-white font-medium">Pickup Your Food</p>
                  <p className="text-stone-500 text-sm">Show QR code at pickup location during the specified window</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={onBookNow}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            >
              Book Now
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="border-transparent bg-transparent text-stone-600 hover:bg-stone-50"
            >
              Cancel Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}