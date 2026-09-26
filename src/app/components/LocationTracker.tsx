import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface LocationTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  donorName: string;
  pickupLocation: string;
  isPickupReady?: boolean;
}

export default function LocationTracker({ 
  isOpen, 
  onClose, 
  requestId, 
  donorName, 
  pickupLocation,
  isPickupReady = false 
}: LocationTrackerProps) {
  const [userLocation, setUserLocation] = React.useState<{lat: number, lng: number} | null>(null);
  const [estimatedTime, setEstimatedTime] = React.useState('8 min');
  const [distance, setDistance] = React.useState('1.2 km');

  React.useEffect(() => {
    // Simulate getting user location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }

    // Simulate live tracking updates
    const interval = setInterval(() => {
      const times = ['8 min', '7 min', '6 min', '5 min', '4 min', '3 min', '2 min', '1 min', 'Arrived!'];
      const distances = ['1.2 km', '1.0 km', '0.8 km', '0.6 km', '0.4 km', '0.2 km', '0.1 km', '50 m', '0 m'];
      const randomIndex = Math.floor(Math.random() * times.length);
      setEstimatedTime(times[randomIndex]);
      setDistance(distances[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4 bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-stone-900 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Live Tracking</span>
            </div>
            <button 
              onClick={onClose}
              className="text-stone-500 hover:text-stone-900"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Status */}
            <div className="text-center">
              <Badge className={`${isPickupReady ? 'bg-green-600/20 text-green-400 border-green-600/30' : 'bg-orange-600/20 text-orange-400 border-orange-600/30'} mb-2`}>
                {isPickupReady ? 'Ready for Pickup' : 'Preparing Order'}
              </Badge>
              <h3 className="text-stone-900 font-semibold">{donorName}</h3>
              <p className="text-stone-500 text-sm">{pickupLocation}</p>
            </div>

            {/* Live Map Simulation */}
            <div className="bg-orange-50 rounded-lg p-4 border border-stone-200">
              <div className="h-48 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-lg relative overflow-hidden">
                {/* Mock map with moving elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 h-full">
                    {[...Array(64)].map((_, i) => (
                      <div key={i} className="border border-stone-300/20"></div>
                    ))}
                  </div>
                </div>
                
                {/* Your location (animated) */}
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse">
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping"></div>
                </div>
                
                {/* Pickup location */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-orange-500 rounded-full">
                  <div className="absolute -inset-1 bg-orange-500/30 rounded-full animate-pulse"></div>
                </div>
                
                {/* Route line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <path
                    d="M20 180 Q100 100 180 20"
                    stroke="#f97316"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                </svg>
                
                <div className="absolute bottom-2 left-2 text-xs text-stone-900 bg-black/50 px-2 py-1 rounded">
                  📍 You
                </div>
                <div className="absolute top-2 right-2 text-xs text-stone-900 bg-black/50 px-2 py-1 rounded">
                  🏪 Pickup
                </div>
              </div>
            </div>

            {/* Journey Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 rounded-lg p-4 border border-stone-200 text-center">
                <div className="text-2xl font-bold text-orange-400">{estimatedTime}</div>
                <div className="text-stone-500 text-sm">Estimated Time</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-stone-200 text-center">
                <div className="text-2xl font-bold text-blue-400">{distance}</div>
                <div className="text-stone-500 text-sm">Distance</div>
              </div>
            </div>

            {/* Live Updates */}
            <div className="space-y-3">
              <h4 className="text-stone-900 font-medium">Live Updates</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Food is being prepared</span>
                  <span className="text-stone-500">2 min ago</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-500">
                  <div className="w-2 h-2 bg-stone-400 rounded-full"></div>
                  <span>Request confirmed</span>
                  <span className="text-stone-500">5 min ago</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => {
                  // Simulate calling donor
                  alert('Calling ' + donorName + '...');
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1a17.918 17.918 0 01-18-18 2 2 0 012-2z" />
                </svg>
                Call Donor
              </Button>
              <Button 
                variant="outline"
                className="border-stone-300 text-stone-600 hover:bg-stone-100"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}