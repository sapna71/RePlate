import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HistoryItem {
  id: string;
  foodItem: string;
  donorName: string;
  quantity: string;
  requestedDate: string;
  expiryDate: string;
  pickupDate?: string;
  status: 'completed' | 'cancelled' | 'expired';
  deliveryMethod: 'pickup' | 'delivery';
  location: string;
  verificationCode?: string;
}

export default function ReceiverHistory() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'completed' | 'cancelled' | 'expired'>('all');

  // Mock history data
  const historyData: HistoryItem[] = [
    {
      id: '1',
      foodItem: 'Fresh Vegetable Surplus',
      donorName: 'Green Leaf Restaurant',
      quantity: '5-6 portions',
      requestedDate: '2025-01-05',
      expiryDate: '2025-01-07',
      pickupDate: '2025-01-05',
      status: 'completed',
      deliveryMethod: 'pickup',
      location: 'Downtown Kitchen',
      verificationCode: '4521'
    },
    {
      id: '2',
      foodItem: 'Prepared Meal Containers',
      donorName: 'Helping Hands Kitchen',
      quantity: '12 containers',
      requestedDate: '2025-01-03',
      expiryDate: '2025-01-06',
      pickupDate: '2025-01-04',
      status: 'completed',
      deliveryMethod: 'delivery',
      location: 'Community Kitchen',
      verificationCode: '7834'
    },
    {
      id: '3',
      foodItem: 'Homemade Bread Loaves',
      donorName: 'Sunrise Bakery',
      quantity: '8 loaves',
      requestedDate: '2025-01-02',
      expiryDate: '2025-01-04',
      status: 'cancelled',
      deliveryMethod: 'pickup',
      location: 'Corner Bakery'
    },
    {
      id: '4',
      foodItem: 'Canned Goods & Pantry Items',
      donorName: 'Johnson Family',
      quantity: '20+ items',
      requestedDate: '2024-12-28',
      expiryDate: '2025-02-15',
      pickupDate: '2024-12-29',
      status: 'completed',
      deliveryMethod: 'pickup',
      location: 'Family Home',
      verificationCode: '9102'
    },
    {
      id: '5',
      foodItem: 'Fresh Fruit Medley',
      donorName: 'Fresh & Green Market',
      quantity: '3-4 bags',
      requestedDate: '2024-12-20',
      expiryDate: '2024-12-22',
      status: 'expired',
      deliveryMethod: 'pickup',
      location: 'Organic Market'
    },
    {
      id: '6',
      foodItem: 'Bakery Items',
      donorName: 'Downtown Bakery',
      quantity: '15 items',
      requestedDate: '2024-12-15',
      expiryDate: '2024-12-17',
      pickupDate: '2024-12-16',
      status: 'completed',
      deliveryMethod: 'pickup',
      location: 'Main Street Bakery',
      verificationCode: '3456'
    }
  ];

  const filteredHistory = React.useMemo(() => {
    return historyData.filter(item => {
      const matchesSearch = 
        item.foodItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus]);

  const stats = {
    total: historyData.length,
    completed: historyData.filter(i => i.status === 'completed').length,
    cancelled: historyData.filter(i => i.status === 'cancelled').length,
    expired: historyData.filter(i => i.status === 'expired').length
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30">Cancelled</Badge>;
      case 'expired':
        return <Badge className="bg-stone-600/20 text-stone-500 border-stone-300/30">Expired</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Request History</h1>
          <p className="text-stone-600">View all your past food requests and their status</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-stone-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">Total Requests</p>
                  <p className="text-2xl font-bold text-stone-900">{stats.total}</p>
                </div>
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-stone-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">Completed</p>
                  <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
                </div>
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-stone-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">Cancelled</p>
                  <p className="text-2xl font-bold text-orange-400">{stats.cancelled}</p>
                </div>
                <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-stone-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">Expired</p>
                  <p className="text-2xl font-bold text-stone-500">{stats.expired}</p>
                </div>
                <svg className="w-8 h-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 bg-white border-stone-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by food item, donor, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-stone-50 border-stone-300 text-stone-900"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-orange-600 hover:bg-orange-700' : 'border-stone-300 text-stone-600 hover:bg-stone-100'}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'completed' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('completed')}
                  className={filterStatus === 'completed' ? 'bg-green-600 hover:bg-green-700' : 'border-stone-300 text-stone-600 hover:bg-stone-100'}
                >
                  Completed
                </Button>
                <Button
                  variant={filterStatus === 'cancelled' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('cancelled')}
                  className={filterStatus === 'cancelled' ? 'bg-orange-600 hover:bg-orange-700' : 'border-stone-300 text-stone-600 hover:bg-stone-100'}
                >
                  Cancelled
                </Button>
                <Button
                  variant={filterStatus === 'expired' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('expired')}
                  className={filterStatus === 'expired' ? 'bg-stone-600 hover:bg-stone-100' : 'border-stone-300 text-stone-600 hover:bg-stone-100'}
                >
                  Expired
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="bg-white border-stone-200 hover:border-stone-300 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-stone-900 font-semibold">{item.foodItem}</h3>
                        <p className="text-stone-500 text-sm">{item.donorName}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-2 mt-3 text-sm">
                      <div className="flex items-center space-x-2 text-stone-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-stone-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Requested: {new Date(item.requestedDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-stone-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Expiry: {new Date(item.expiryDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-stone-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span>{item.location}</span>
                      </div>
                      
                      {item.pickupDate && (
                        <div className="flex items-center space-x-2 text-stone-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Pickup: {new Date(item.pickupDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 text-stone-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{item.deliveryMethod === 'pickup' ? 'Self Pickup' : 'Home Delivery'}</span>
                      </div>
                    </div>

                    {item.verificationCode && (
                      <div className="mt-3 inline-flex items-center space-x-2 bg-orange-600/20 border border-orange-600/30 rounded px-3 py-1">
                        <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm text-orange-400">Verification Code: <span className="font-mono font-semibold">{item.verificationCode}</span></span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <Card className="bg-white border-stone-200">
            <CardContent className="p-12 text-center">
              <svg className="w-16 h-16 text-stone-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl text-stone-500 mb-2">No requests found</h3>
              <p className="text-stone-500">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
