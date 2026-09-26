import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import FoodCard, { FoodListing } from "./FoodCard";
import NotificationPopup from "./NotificationPopup";
import LocationTracker from "./LocationTracker";
import VerificationPopup from "./VerificationPopup";
import CancellationPopup from "./CancellationPopup";
import RequestConfirmationOverlay from "./RequestConfirmationOverlay";
import BookingConfirmationDialog from "./BookingConfirmationDialog";
import SMSNotificationPopup from "./SMSNotificationPopup";
import QRCodeDisplay from "./QRCodeDisplay";
import CancellationConfirmedPopup from "./CancellationConfirmedPopup";

interface Request {
  id: string;
  listingId: string;
  userId: string;
  userName: string;
  position: number;
  pickupDeadline: Date;
  status: 'active' | 'expired' | 'completed';
  requestedAt: Date;
  verificationCode: string;
}

export default function ReceiverDashboard() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedDistance, setSelectedDistance] = React.useState('all');
  const [showUrgentOnly, setShowUrgentOnly] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [showNotificationPopup, setShowNotificationPopup] = React.useState(true);
  const [showLocationTracker, setShowLocationTracker] = React.useState(false);
  const [userType, setUserType] = React.useState<'individual' | 'organization' | 'wholesaler'>('individual');
  const [selectedRequest, setSelectedRequest] = React.useState<string | null>(null);
  const [showVerificationPopup, setShowVerificationPopup] = React.useState(false);
  const [showCancellationPopup, setShowCancellationPopup] = React.useState(false);
  const [selectedCancellationRequest, setSelectedCancellationRequest] = React.useState<string | null>(null);
  const [isVerified, setIsVerified] = React.useState(false);
  const [requestingListing, setRequestingListing] = React.useState<FoodListing | null>(null);
  const [pendingRequest, setPendingRequest] = React.useState<Request | null>(null);
  const [showBookingConfirmation, setShowBookingConfirmation] = React.useState(false);
  const [showSMSNotification, setShowSMSNotification] = React.useState(false);
  const [showQRCode, setShowQRCode] = React.useState(false);
  const [selectedQRRequest, setSelectedQRRequest] = React.useState<Request | null>(null);
  const [showCancellationConfirmed, setShowCancellationConfirmed] = React.useState(false);
  const [cancelledFoodTitle, setCancelledFoodTitle] = React.useState('');

  // Update time every second for real-time countdown
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for user's requests with queue positions
  const [myRequests, setMyRequests] = React.useState<Request[]>([
    {
      id: '1',
      listingId: '1',
      userId: 'user123',
      userName: 'You',
      position: 1,
      pickupDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      status: 'active',
      requestedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      verificationCode: '1234'
    },
    {
      id: '2',
      listingId: '3',
      userId: 'user123',
      userName: 'You',
      position: 2,
      pickupDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      status: 'active',
      requestedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      verificationCode: '5678'
    }
  ]);

  // Mock queue data showing other users in line
  const [requestQueues] = React.useState<{[key: string]: Request[]}>({
    '1': [
      {
        id: '1',
        listingId: '1',
        userId: 'user123',
        userName: 'You',
        position: 1,
        pickupDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
        status: 'active',
        requestedAt: new Date(Date.now() - 30 * 60 * 1000),
        verificationCode: '1234'
      }
    ],
    '3': [
      {
        id: '3',
        listingId: '3',
        userId: 'user456',
        userName: 'Sarah M.',
        position: 1,
        pickupDeadline: new Date(Date.now() + 1.5 * 60 * 60 * 1000),
        status: 'active',
        requestedAt: new Date(Date.now() - 45 * 60 * 1000),
        verificationCode: '9012'
      },
      {
        id: '2',
        listingId: '3',
        userId: 'user123',
        userName: 'You',
        position: 2,
        pickupDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
        status: 'active',
        requestedAt: new Date(Date.now() - 15 * 60 * 1000),
        verificationCode: '5678'
      }
    ]
  });

  // Mock data for available listings
  const [availableListings] = React.useState<FoodListing[]>([
    {
      id: '1',
      title: 'Fresh Vegetable Surplus',
      description: 'Variety of fresh vegetables from our restaurant prep. Perfect condition, just made too much.',
      quantity: '5-6 portions',
      servings: 6,
      expiryDate: '2025-01-07',
      location: 'Downtown Kitchen',
      distance: '0.8 km',
      donorName: 'Green Leaf Restaurant',
      category: 'fresh',
      imageUrl: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc1NzA2MjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isUrgent: true,
      createdAt: '2025-01-05T10:00:00Z'
    },
    {
      id: '2',
      title: 'Homemade Bread Loaves',
      description: 'Freshly baked bread from our bakery. Still warm and perfect for families.',
      quantity: '8 loaves',
      servings: 4,
      expiryDate: '2025-01-08',
      location: 'Corner Bakery',
      distance: '1.93 km',
      donorName: 'Sunrise Bakery',
      category: 'baked',
      imageUrl: 'https://images.unsplash.com/photo-1679673987713-54f809ce417d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwYmFrZXJ5fGVufDF8fHx8MTc1NzA0Njk2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isUrgent: false,
      createdAt: '2025-01-04T15:30:00Z'
    },
    {
      id: '3',
      title: 'Prepared Meal Containers',
      description: 'Healthy home-cooked meals in individual containers. Ready to eat, just reheat.',
      quantity: '12 containers',
      servings: 12,
      expiryDate: '2025-01-06',
      location: 'Community Kitchen',
      distance: '3.38 km',
      donorName: 'Helping Hands Kitchen',
      category: 'prepared',
      imageUrl: 'https://images.unsplash.com/photo-1609915437016-85693e56470f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVwYXJlZCUyMG1lYWxzJTIwZm9vZCUyMGNvbnRhaW5lcnN8ZW58MXx8fHwxNzU3MDYyMjMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isUrgent: true,
      createdAt: '2025-01-05T08:15:00Z'
    },
    {
      id: '4',
      title: 'Canned Goods & Pantry Items',
      description: 'Various canned goods, pasta, rice, and other pantry staples. All well within expiry dates.',
      quantity: '20+ items',
      servings: 8,
      expiryDate: '2025-02-15',
      location: 'Family Home',
      distance: '1.29 km',
      donorName: 'Johnson Family',
      category: 'packaged',
      imageUrl: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwZm9vZCUyMHBhY2thZ2VzfGVufDF8fHx8MTc1NzA2MjIzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isUrgent: false,
      createdAt: '2025-01-03T12:00:00Z'
    },
    {
      id: '5',
      title: 'Fresh Fruit Medley',
      description: 'Assorted fresh fruits slightly overripe but perfect for smoothies or immediate consumption.',
      quantity: '3-4 bags',
      servings: 5,
      expiryDate: '2025-01-06',
      location: 'Organic Market',
      distance: '2.4 km',
      donorName: 'Fresh & Green Market',
      category: 'fresh',
      imageUrl: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc1NzA2MjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isUrgent: true,
      createdAt: '2025-01-05T14:20:00Z'
    }
  ]);

  const formatTimeRemaining = (deadline: Date) => {
    const diff = deadline.getTime() - currentTime.getTime();
    if (diff <= 0) return 'EXPIRED';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getTimeColor = (deadline: Date) => {
    const diff = deadline.getTime() - currentTime.getTime();
    const minutes = diff / (1000 * 60);
    
    if (minutes <= 0) return 'text-orange-600';
    if (minutes <= 30) return 'text-orange-600';
    if (minutes <= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredListings = React.useMemo(() => {
    return availableListings.filter(listing => {
      // Search query filter
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           listing.donorName.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
      
      // Distance filter
      let matchesDistance = true;
      if (selectedDistance !== 'all') {
        const distance = parseFloat(listing.distance);
        switch (selectedDistance) {
          case 'under1': matchesDistance = distance < 1; break;
          case 'under3': matchesDistance = distance < 3; break;
          case 'under5': matchesDistance = distance < 5; break;
        }
      }
      
      // Urgent filter
      const matchesUrgent = !showUrgentOnly || listing.isUrgent;
      
      return matchesSearch && matchesCategory && matchesDistance && matchesUrgent;
    });
  }, [availableListings, searchQuery, selectedCategory, selectedDistance, showUrgentOnly]);

  const handleRequest = (listingId: string) => {
    const listing = availableListings.find(l => l.id === listingId);
    if (listing) {
      // Show confirmation overlay
      setRequestingListing(listing);
      
      // Calculate pickup deadline (2 hours from now)
      const deadline = new Date(Date.now() + 2 * 60 * 60 * 1000);
      const queueLength = requestQueues[listingId]?.length || 0;
      
      // Generate 4-digit verification code
      const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
      
      const newRequest: Request = {
        id: Date.now().toString(),
        listingId,
        userId: 'user123',
        userName: 'You',
        position: queueLength + 1,
        pickupDeadline: deadline,
        status: 'active',
        requestedAt: new Date(),
        verificationCode
      };
      
      setPendingRequest(newRequest);
    }
  };

  const handleBookNow = () => {
    // Show booking confirmation dialog
    setShowBookingConfirmation(true);
  };

  const handleConfirmBooking = () => {
    // Hide booking confirmation dialog
    setShowBookingConfirmation(false);
    
    // Hide the request overlay
    setRequestingListing(null);
    
    // Add the request to myRequests
    if (pendingRequest) {
      setMyRequests(prev => [...prev, pendingRequest]);
      
      // Show SMS notification
      setShowSMSNotification(true);
    }
  };

  const handleCancelBooking = () => {
    setShowBookingConfirmation(false);
  };

  const handleCloseSMSNotification = () => {
    setShowSMSNotification(false);
    setPendingRequest(null);
  };

  const handleShowQRCode = (request: Request) => {
    setSelectedQRRequest(request);
    setShowQRCode(true);
  };

  const handleCancelRequest = (requestId: string) => {
    const request = myRequests.find(r => r.id === requestId);
    if (request) {
      const listing = availableListings.find(l => l.id === request.listingId);
      setCancelledFoodTitle(listing?.title || 'Food Request');
    }
    setSelectedCancellationRequest(requestId);
    setShowCancellationPopup(true);
  };

  const handleConfirmCancellation = (reason: string) => {
    console.log('Cancellation reason:', reason);
    if (selectedCancellationRequest) {
      setMyRequests(prev => prev.filter(r => r.id !== selectedCancellationRequest));
      setShowCancellationPopup(false);
      setShowCancellationConfirmed(true);
    }
    setSelectedCancellationRequest(null);
  };

  const urgentCount = availableListings.filter(l => l.isUrgent).length;

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 relative overflow-hidden">
      {/* Background 3D elements and human illustrations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-orange-600/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-600/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-green-400/10 to-teal-600/20 rounded-full blur-xl"></div>
        
        {/* Small human illustrations */}
        <div className="absolute top-1/4 left-10">
          <svg className="w-12 h-12 text-orange-400/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-3v13h-2v-6h-2v6H9V9H6v13H4V9H1V7h3.2c.347-.595.985-1 1.8-1h12c.815 0 1.453.405 1.8 1H23v2z"/>
          </svg>
        </div>
        <div className="absolute bottom-1/3 right-20">
          <svg className="w-10 h-10 text-blue-400/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-3v13h-2v-6h-2v6H9V9H6v13H4V9H1V7h3.2c.347-.595.985-1 1.8-1h12c.815 0 1.453.405 1.8 1H23v2z"/>
          </svg>
        </div>
        <div className="absolute top-3/4 left-1/3">
          <svg className="w-8 h-8 text-green-400/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-3v13h-2v-6h-2v6H9V9H6v13H4V9H1V7h3.2c.347-.595.985-1 1.8-1h12c.815 0 1.453.405 1.8 1H23v2z"/>
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Find Food Near You</h1>
          <p className="text-stone-600">Discover available food donations in your community and connect with donors.</p>
        </div>

        {/* My Requests Section */}
        {myRequests.length > 0 && (
          <Card className="mb-8 bg-white backdrop-blur border-stone-200">
            <CardHeader>
              <CardTitle className="text-stone-900 flex items-center space-x-2">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>My Requests ({myRequests.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myRequests.map((request) => {
                  const listing = availableListings.find(l => l.id === request.listingId);
                  const queue = requestQueues[request.listingId] || [];
                  const timeRemaining = formatTimeRemaining(request.pickupDeadline);
                  const timeColor = getTimeColor(request.pickupDeadline);
                  
                  return (
                    <div key={request.id} className="bg-stone-50 rounded-lg p-4 border border-stone-300">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-stone-900">{listing?.title}</h4>
                          <p className="text-stone-500 text-sm">{listing?.donorName}</p>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${timeColor}`}>
                            {timeRemaining === 'EXPIRED' ? 'EXPIRED' : `⏱️ ${timeRemaining}`}
                          </div>
                          <p className="text-stone-500 text-sm">to pickup</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30">
                            #{request.position} in queue
                          </Badge>
                          <span className="text-stone-500 text-sm">
                            {queue.length} total request{queue.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        
                        {request.position === 1 && timeRemaining !== 'EXPIRED' && (
                          <Badge className="bg-green-600/20 text-green-400 border-green-600/30 animate-pulse">
                            Your turn!
                          </Badge>
                        )}
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex items-center justify-between space-x-2 mb-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-stone-300 text-stone-600 hover:bg-stone-100"
                            onClick={() => handleShowQRCode(request)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                          </Button>
                          
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => {
                              setSelectedRequest(request.id);
                              setShowLocationTracker(true);
                            }}
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            Track
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-stone-300 text-stone-600 hover:bg-stone-100"
                            onClick={() => {
                              const phone = listing?.donorName === 'Green Leaf Restaurant' ? '+1 (555) 123-4567' : '+1 (555) 987-6543';
                              window.open(`tel:${phone}`);
                            }}
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1A17.918 17.918 0 013 5z" />
                            </svg>
                            Call
                          </Button>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-transparent bg-transparent text-orange-400 hover:bg-orange-600/20"
                          onClick={() => handleCancelRequest(request.id)}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel
                        </Button>
                      </div>
                      
                      {/* Queue visualization */}
                      <div className="mt-3">
                        <p className="text-stone-500 text-xs mb-2">Queue:</p>
                        <div className="flex space-x-2">
                          {queue.slice(0, 3).map((queueRequest, index) => (
                            <div
                              key={queueRequest.id}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                                queueRequest.userId === 'user123'
                                  ? 'bg-orange-600 text-white'
                                  : index === 0
                                  ? 'bg-green-600/50 text-green-200'
                                  : 'bg-stone-600 text-stone-600'
                              }`}
                            >
                              {index + 1}
                            </div>
                          ))}
                          {queue.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-stone-600 flex items-center justify-center text-xs text-stone-600">
                              +{queue.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Urgent Alerts */}
        {urgentCount > 0 && (
          <div className="mb-6">
            <Card className="border-orange-600/30 bg-orange-900/20 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-orange-300">
                      {urgentCount} urgent listing{urgentCount > 1 ? 's' : ''} available
                    </p>
                    <p className="text-orange-400 text-sm">These items need to be picked up soon!</p>
                  </div>
                  <Button
                    size="sm"
                    variant={showUrgentOnly ? "default" : "outline"}
                    onClick={() => setShowUrgentOnly(!showUrgentOnly)}
                    className={`ml-auto ${showUrgentOnly ? 'bg-orange-600 hover:bg-orange-700' : 'border-stone-300 text-stone-600 hover:bg-stone-100'}`}
                  >
                    {showUrgentOnly ? 'Show All' : 'Show Urgent Only'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="mb-8 bg-white backdrop-blur border-stone-200">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <svg className="absolute left-3 top-3 h-4 w-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <Input
                    placeholder="Search food, donor, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-stone-50 border-stone-300 text-stone-900">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="fresh">Fresh Produce</SelectItem>
                    <SelectItem value="prepared">Prepared Food</SelectItem>
                    <SelectItem value="packaged">Packaged Goods</SelectItem>
                    <SelectItem value="baked">Baked Goods</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Distance Filter */}
              <div>
                <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                  <SelectTrigger className="bg-stone-50 border-stone-300 text-stone-900">
                    <SelectValue placeholder="Distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Distance</SelectItem>
                    <SelectItem value="under1">Under 2 kilometres</SelectItem>
                    <SelectItem value="under3">Under 4 kilometres</SelectItem>
                    <SelectItem value="under5">Under 6 kilometres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                  Search: "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-2 hover:text-blue-300"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                  Category: {selectedCategory}
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="ml-2 hover:text-purple-300"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedDistance !== 'all' && (
                <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                  Distance: {selectedDistance.replace('under', 'Under ')}
                  <button 
                    onClick={() => setSelectedDistance('all')}
                    className="ml-2 hover:text-green-300"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {showUrgentOnly && (
                <Badge variant="secondary" className="bg-orange-600/20 text-orange-400 border-orange-600/30">
                  Urgent Only
                  <button 
                    onClick={() => setShowUrgentOnly(false)}
                    className="ml-2 hover:text-orange-300"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-stone-900">
            Available Food ({filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''})
          </h2>
          <div className="flex items-center space-x-2 text-sm text-stone-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Showing results within 4 kilometres</span>
          </div>
        </div>

        {/* Food Listings */}
        {filteredListings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => {
              const queue = requestQueues[listing.id] || [];
              const hasRequested = myRequests.some(r => r.listingId === listing.id);
              
              return (
                <div key={listing.id} className="relative">
                  <FoodCard
                    listing={listing}
                    onRequest={handleRequest}
                  />
                  {/* Queue indicator */}
                  {queue.length > 0 && (
                    <div className="absolute top-2 right-2 bg-orange-600/90 backdrop-blur text-white text-xs px-2 py-1 rounded-full">
                      {queue.length} in queue
                    </div>
                  )}
                  {hasRequested && (
                    <div className="absolute top-8 right-2 bg-green-600/90 backdrop-blur text-white text-xs px-2 py-1 rounded-full">
                      Requested
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <Card className="bg-white backdrop-blur border-stone-200">
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <svg className="h-12 w-12 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-lg font-semibold text-stone-900">No food found!</h3>
                <p className="text-stone-500 max-w-md">
                  {searchQuery || selectedCategory !== 'all' || selectedDistance !== 'all' || showUrgentOnly
                    ? "Try adjusting your filters to see more results."
                    : "There are no food listings available in your area right now. Check back later or expand your search radius."
                  }
                </p>
                {(searchQuery || selectedCategory !== 'all' || selectedDistance !== 'all' || showUrgentOnly) && (
                  <Button 
                    variant="outline"
                    className="border-stone-300 text-stone-600 hover:bg-stone-100"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedDistance('all');
                      setShowUrgentOnly(false);
                    }}
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notification Popup */}
      <NotificationPopup 
        isOpen={showNotificationPopup}
        onClose={(enableNotifications) => {
          setShowNotificationPopup(false);
          if (enableNotifications) {
            console.log('Notifications enabled for receiver');
          }
        }}
      />

      {/* Location Tracker */}
      <LocationTracker
        isOpen={showLocationTracker}
        onClose={() => setShowLocationTracker(false)}
        requestId={selectedRequest || ''}
        donorName="Green Leaf Restaurant"
        pickupLocation="Downtown Kitchen - 123 Main St"
        isPickupReady={false}
      />

      {/* Verification Popup */}
      <VerificationPopup
        isOpen={showVerificationPopup}
        onClose={() => {
          setShowVerificationPopup(false);
          setIsVerified(true);
        }}
        userType={userType}
        isDonor={false}
      />

      {/* Cancellation Popup */}
      <CancellationPopup
        isOpen={showCancellationPopup}
        onClose={() => {
          setShowCancellationPopup(false);
          setSelectedCancellationRequest(null);
        }}
        onConfirm={handleConfirmCancellation}
        itemTitle={cancelledFoodTitle}
        isDonor={false}
      />

      {/* Request Confirmation Overlay */}
      {requestingListing && (
        <RequestConfirmationOverlay
          listing={requestingListing}
          onClose={() => {
            setRequestingListing(null);
            setPendingRequest(null);
          }}
          onBookNow={handleBookNow}
        />
      )}

      {/* Booking Confirmation Dialog */}
      <BookingConfirmationDialog
        isOpen={showBookingConfirmation}
        onConfirm={handleConfirmBooking}
        onCancel={handleCancelBooking}
        foodTitle={requestingListing?.title || ''}
      />

      {/* SMS Notification Popup */}
      {pendingRequest && (
        <SMSNotificationPopup
          isOpen={showSMSNotification}
          onClose={handleCloseSMSNotification}
          phoneNumber="+1 (555) 123-4567"
          requestDetails={{
            foodTitle: requestingListing?.title || '',
            donorName: requestingListing?.donorName || '',
            queuePosition: pendingRequest.position
          }}
        />
      )}

      {/* QR Code Display */}
      {selectedQRRequest && (
        <QRCodeDisplay
          isOpen={showQRCode}
          onClose={() => {
            setShowQRCode(false);
            setSelectedQRRequest(null);
          }}
          requestId={selectedQRRequest.id}
          verificationCode={selectedQRRequest.verificationCode}
          foodTitle={availableListings.find(l => l.id === selectedQRRequest.listingId)?.title || ''}
          donorName={availableListings.find(l => l.id === selectedQRRequest.listingId)?.donorName || ''}
          pickupLocation={availableListings.find(l => l.id === selectedQRRequest.listingId)?.location || ''}
          queuePosition={selectedQRRequest.position}
        />
      )}

      {/* Cancellation Confirmed Popup */}
      <CancellationConfirmedPopup
        isOpen={showCancellationConfirmed}
        onClose={() => setShowCancellationConfirmed(false)}
        foodTitle={cancelledFoodTitle}
      />
    </div>
  );
}