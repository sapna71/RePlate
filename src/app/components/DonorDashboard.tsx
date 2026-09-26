import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import FoodCard, { FoodListing } from "./FoodCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import NotificationPopup from "./NotificationPopup";
import LocationTracker from "./LocationTracker";
import VerificationPopup from "./VerificationPopup";
import CancellationPopup from "./CancellationPopup";
import FoodListingEditOverlay from "./FoodListingEditOverlay";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function DonorDashboard() {
  const [showForm, setShowForm] = React.useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = React.useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = React.useState(true);
  const [showLocationTracker, setShowLocationTracker] = React.useState(false);
  const [userType, setUserType] = React.useState<'individual' | 'organization' | 'wholesaler'>('individual');
  const [editingListing, setEditingListing] = React.useState<FoodListing | null>(null);
  const [selectedRequest, setSelectedRequest] = React.useState<string | null>(null);
  const [showVerificationPopup, setShowVerificationPopup] = React.useState(false);
  const [showWithdrawalPopup, setShowWithdrawalPopup] = React.useState(false);
  const [selectedWithdrawalListing, setSelectedWithdrawalListing] = React.useState<string | null>(null);
  const [isVerified, setIsVerified] = React.useState(false);
  const [predictionExpanded, setPredictionExpanded] = React.useState(true);

  // User name for location tracker - in real app this would come from user context
  const userName = 'John Doe';

  // Mock ML surplus prediction data (Scikit-Learn Random Forest output simulation)
  const surplusHistory = [
    { day: 'Mon', actual: 12, predicted: 14 },
    { day: 'Tue', actual: 8,  predicted: 10 },
    { day: 'Wed', actual: 18, predicted: 16 },
    { day: 'Thu', actual: 6,  predicted: 8  },
    { day: 'Fri', actual: 22, predicted: 20 },
    { day: 'Sat', actual: 35, predicted: 30 },
    { day: 'Sun', actual: 28, predicted: 26 },
  ];

  const weeklyForecast = [
    { day: 'Mon', surplus: 13, confidence: 88 },
    { day: 'Tue', surplus: 9,  confidence: 85 },
    { day: 'Wed', surplus: 17, confidence: 82 },
    { day: 'Thu', surplus: 7,  confidence: 90 },
    { day: 'Fri', surplus: 21, confidence: 87 },
    { day: 'Sat', surplus: 32, confidence: 91 },
    { day: 'Sun', surplus: 25, confidence: 89 },
  ];

  const aiInsights = [
    {
      icon: '🍚',
      severity: 'high',
      title: 'Rice Surplus Alert',
      message: 'Rice surplus has exceeded 20% on the last 3 Saturdays. Consider reducing preparation volume by 15 kg.',
      action: 'Reduce by 15 kg'
    },
    {
      icon: '🥖',
      severity: 'medium',
      title: 'Baked Goods Trend',
      message: 'Bread surplus peaks on Wednesdays. Listing early (before 2 PM) increases pickup rate by 40%.',
      action: 'List before 2 PM'
    },
    {
      icon: '🥦',
      severity: 'low',
      title: 'Vegetable Optimisation',
      message: 'Fresh vegetables are claimed within 1 hour on weekdays. Weekend surplus averages 8 kg unclaimed.',
      action: 'Prep less weekends'
    }
  ];

  const severityColor: Record<string, string> = {
    high: 'border-l-orange-500 bg-orange-500/5',
    medium: 'border-l-orange-400 bg-orange-400/5',
    low: 'border-l-green-400 bg-green-400/5',
  };
  const severityBadge: Record<string, string> = {
    high: 'bg-orange-500/20 text-orange-300',
    medium: 'bg-orange-400/20 text-orange-300',
    low: 'bg-green-400/20 text-green-300',
  };
  
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    quantity: '',
    servings: '',
    expiryDate: '',
    category: '',
    location: '',
    isUrgent: false,
    photos: [] as File[],
    barcode: ''
  });

  // Mock data for existing listings
  const [myListings, setMyListings] = React.useState<FoodListing[]>([
    {
      id: '1',
      title: 'Fresh Vegetable Surplus',
      description: 'Variety of fresh vegetables from our restaurant prep. Perfect condition, just made too much.',
      quantity: '5-6 portions',
      servings: 6,
      expiryDate: '2025-01-07',
      location: 'Downtown Kitchen',
      distance: '0.805 KM',
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
      expiryDate: '2025-01-06',
      location: 'Corner Bakery',
      distance: '1.931 KM',
      donorName: 'Sunrise Bakery',
      category: 'baked',
      imageUrl: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc1NzA2MjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isUrgent: false,
      createdAt: '2025-01-04T15:30:00Z'
    }
  ]);

  const handleInputChange = (field: string, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files].slice(0, 3) }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const simulateBarcodeScanner = () => {
    // Simulate barcode scanning with mock data
    const mockBarcodes = [
      { code: '8901030851992', name: 'Organic Vegetables Mix' },
      { code: '1234567890123', name: 'Fresh Bread Loaf' },
      { code: '9876543210987', name: 'Packaged Rice' },
      { code: '5432109876543', name: 'Canned Tomatoes' },
      { code: '6789012345678', name: 'Pasta Package' }
    ];
    const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
    
    setFormData(prev => ({
      ...prev,
      barcode: randomBarcode.code,
      title: randomBarcode.name
    }));
    setShowBarcodeScanner(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new listing
    const newListing: FoodListing = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      quantity: formData.quantity,
      servings: parseInt(formData.servings) || 1,
      expiryDate: formData.expiryDate,
      location: formData.location,
      distance: '0 miles',
      donorName: 'Your Business',
      category: formData.category as any,
      imageUrl: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc1NzA2MjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isUrgent: formData.isUrgent,
      createdAt: new Date().toISOString()
    };
    
    setMyListings(prev => [newListing, ...prev]);
    setShowForm(false);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      quantity: '',
      servings: '',
      expiryDate: '',
      category: '',
      location: '',
      isUrgent: false,
      photos: [],
      barcode: ''
    });
  };

  const stats = [
    { icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>, label: 'Total Donations', value: '23' },
    { icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>, label: 'Families Helped', value: '45' },
    { icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>, label: 'Active Listings', value: myListings.length.toString() }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 relative overflow-hidden">
      {/* Background 3D elements and human illustrations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-orange-600/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-600/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-green-400/10 to-teal-600/20 rounded-full blur-xl"></div>
        
        {/* Small human illustrations */}
        <div className="absolute top-1/4 right-10">
          <svg className="w-12 h-12 text-orange-400/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-3v13h-2v-6h-2v6H9V9H6v13H4V9H1V7h3.2c.347-.595.985-1 1.8-1h12c.815 0 1.453.405 1.8 1H23v2z"/>
          </svg>
        </div>
        <div className="absolute bottom-1/3 left-20">
          <svg className="w-10 h-10 text-blue-400/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-3v13h-2v-6h-2v6H9V9H6v13H4V9H1V7h3.2c.347-.595.985-1 1.8-1h12c.815 0 1.453.405 1.8 1H23v2z"/>
          </svg>
        </div>
        <div className="absolute top-3/4 right-1/3">
          <svg className="w-8 h-8 text-green-400/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-3v13h-2v-6h-2v6H9V9H6v13H4V9H1V7h3.2c.347-.595.985-1 1.8-1h12c.815 0 1.453.405 1.8 1H23v2z"/>
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Donor Dashboard</h1>
          <p className="text-stone-600">Manage your food donations and help reduce waste in your community.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white backdrop-blur border-stone-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-stone-500 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
                  </div>
                  <div className="text-orange-400">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── AI Surplus Prediction Panel ── */}
        <div className="mb-8">
          {/* Panel header with toggle */}
          <button
            onClick={() => setPredictionExpanded(p => !p)}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="text-left">
                <h2 className="text-lg font-bold text-stone-900 leading-tight">AI Surplus Prediction</h2>
                <p className="text-xs text-stone-500">Powered by Random Forest Regression · Scikit-Learn</p>
              </div>
              <Badge className="ml-2 bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs">BETA</Badge>
            </div>
            <svg
              className={`w-5 h-5 text-stone-500 transition-transform duration-200 ${predictionExpanded ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {predictionExpanded && (
            <div className="space-y-6">
              {/* Top row: forecast chart + model info */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Surplus history vs prediction chart */}
                <div className="lg:col-span-2">
                  <Card className="bg-white backdrop-blur border-stone-200 h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-stone-900 text-sm font-semibold flex items-center gap-2">
                        <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                        Weekly Surplus: Actual vs Predicted (kg)
                      </CardTitle>
                      <p className="text-xs text-stone-500">Historical input: day of week · prep volume · food type · event history</p>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={surplusHistory} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }}
                            labelStyle={{ color: '#f3f4f6', fontSize: 12 }}
                            itemStyle={{ fontSize: 12 }}
                          />
                          <Area type="monotone" dataKey="actual" name="Actual (kg)" stroke="#f97316" strokeWidth={2} fill="#f97316" fillOpacity={0.12} dot={{ fill: '#f97316', r: 3 }} activeDot={{ r: 4 }} />
                          <Area type="monotone" dataKey="predicted" name="Predicted (kg)" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4 2" fill="#8b5cf6" fillOpacity={0.1} dot={{ fill: '#8b5cf6', r: 3 }} activeDot={{ r: 4 }} />
                        </AreaChart>
                      </ResponsiveContainer>
                      <div className="flex gap-4 mt-3 text-xs text-stone-500">
                        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-orange-400 inline-block rounded"></span> Actual</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-violet-400 inline-block rounded border-dashed border-t border-violet-400"></span> ML Predicted</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Model info + next-day forecast */}
                <div className="flex flex-col gap-4">
                  {/* Model card */}
                  <Card className="bg-gradient-to-br from-violet-900/40 to-indigo-900/40 border-violet-700/40 flex-1">
                    <CardContent className="p-4 space-y-3">
                      <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider">Model Details</p>
                      <div className="space-y-2 text-xs text-stone-600">
                        <div className="flex justify-between"><span className="text-stone-500">Algorithm</span><span className="text-white font-medium">Random Forest</span></div>
                        <div className="flex justify-between"><span className="text-stone-500">Fallback</span><span className="text-white font-medium">Linear Regression</span></div>
                        <div className="flex justify-between"><span className="text-stone-500">Accuracy</span><span className="text-green-400 font-bold">88.4%</span></div>
                        <div className="flex justify-between"><span className="text-stone-500">Training data</span><span className="text-white font-medium">90 days</span></div>
                        <div className="flex justify-between"><span className="text-stone-500">Features</span><span className="text-white font-medium">4 inputs</span></div>
                      </div>
                      <div className="pt-2 border-t border-violet-700/40">
                        <p className="text-xs text-stone-500 mb-1">Feature importance</p>
                        {[
                          { label: 'Day of week', pct: 38 },
                          { label: 'Prep volume', pct: 31 },
                          { label: 'Food type',   pct: 19 },
                          { label: 'Event history', pct: 12 },
                        ].map(f => (
                          <div key={f.label} className="flex items-center gap-2 mb-1">
                            <span className="w-20 text-xs text-stone-500 shrink-0">{f.label}</span>
                            <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                              <div className="h-full bg-violet-500 rounded-full" style={{ width: `${f.pct}%` }}></div>
                            </div>
                            <span className="text-xs text-stone-500 w-7 text-right">{f.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Today's prediction highlight */}
                  <Card className="bg-white border-stone-200">
                    <CardContent className="p-4">
                      <p className="text-xs text-stone-500 mb-1">Today's Surplus Forecast</p>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-orange-400">32</span>
                        <span className="text-stone-500 text-sm mb-1">kg</span>
                        <Badge className="ml-auto bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">Saturday</Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs text-green-400">91% model confidence</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 7-day forecast bar chart */}
              <Card className="bg-white backdrop-blur border-stone-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-stone-900 text-sm font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    7-Day Surplus Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={weeklyForecast} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }}
                        labelStyle={{ color: '#f3f4f6', fontSize: 12 }}
                        itemStyle={{ fontSize: 12 }}
                        formatter={(v: number) => [`${v} kg`, 'Predicted surplus']}
                      />
                      <Bar dataKey="surplus" name="Predicted surplus" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* AI Advisory / Heuristic Insights */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-stone-900">Actionable AI Insights</h3>
                  <span className="text-xs text-stone-500">· Rule-based heuristic generator from pattern analysis</span>
                </div>
                <div className="space-y-3">
                  {aiInsights.map((insight, i) => (
                    <div
                      key={i}
                      className={`border-l-4 rounded-r-lg p-4 flex items-start gap-4 ${severityColor[insight.severity]}`}
                    >
                      <span className="text-2xl shrink-0">{insight.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-white text-sm font-semibold">{insight.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityBadge[insight.severity]}`}>
                            {insight.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-stone-600 text-xs leading-relaxed">{insight.message}</p>
                      </div>
                      <Button size="sm" variant="outline" className="shrink-0 border-stone-300 text-stone-600 hover:bg-stone-100 text-xs h-7 px-2">
                        {insight.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample advisory callout */}
              <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border-amber-700/40">
                <CardContent className="p-4 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-amber-300 text-xs font-semibold mb-1">Sample AI Advisory</p>
                    <p className="text-stone-600 text-sm italic leading-relaxed">
                      "Rice surplus has exceeded 20% on the last 3 Saturdays. Consider reducing preparation volume by 15 kg."
                    </p>
                    <p className="text-stone-500 text-xs mt-1">Generated by rule-based heuristic engine · based on 3-week pattern</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Contact Requests */}
        <Card className="mb-8 bg-white backdrop-blur border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900 flex items-center space-x-2">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
              </svg>
              <span>Recent Contact Requests (3)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: '1', name: 'Sarah Johnson', phone: '+1 (555) 987-6543', item: 'Fresh Vegetable Surplus', time: '5 min ago' },
                { id: '2', name: 'Mike Chen', phone: '+1 (555) 456-7890', item: 'Homemade Bread Loaves', time: '12 min ago' },
                { id: '3', name: 'Anna Rodriguez', phone: '+1 (555) 234-5678', item: 'Fresh Vegetable Surplus', time: '1 hour ago' }
              ].map((request) => (
                <div key={request.id} className="bg-stone-50 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-stone-900 font-medium">{request.name}</h4>
                    <p className="text-stone-500 text-sm">{request.item}</p>
                    <p className="text-stone-500 text-xs">{request.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
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
                      onClick={() => window.open(`tel:${request.phone}`)}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1A17.918 17.918 0 013 5z" />
                      </svg>
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add New Listing Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-stone-900">My Food Listings</h2>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Listing
          </Button>
        </div>

        {/* Barcode Scanner Modal */}
        {showBarcodeScanner && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 bg-white border-stone-200">
              <CardHeader>
                <CardTitle className="text-white">Barcode Scanner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-48 h-48 mx-auto bg-stone-50 rounded-lg border-2 border-dashed border-stone-300 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-orange-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-.01M12 12v4m0 0h4m-4 0h-.01m0-8h4.01M12 8h-.01M8 12h-.01M12 8h-.01m0 4h-.01m4-4h.01m0 4h-.01M8 8h.01M8 8h-.01" />
                      </svg>
                      <p className="text-stone-600 text-sm">Point camera at barcode</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={simulateBarcodeScanner}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      Simulate Scan
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowBarcodeScanner(false)}
                      className="flex-1 border-stone-300 text-stone-600 hover:bg-stone-100"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add New Listing Form */}
        {showForm && (
          <Card className="mb-8 bg-white backdrop-blur border-stone-200">
            <CardHeader>
              <CardTitle className="text-white">Add New Food Listing</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload Section */}
                <div>
                  <Label className="text-stone-600">Food Photos (up to 3)</Label>
                  <div className="mt-2 space-y-4">
                    <div className="flex flex-wrap gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative w-24 h-24 bg-stone-100 rounded-lg overflow-hidden">
                          <img 
                            src={URL.createObjectURL(photo)} 
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {formData.photos.length < 3 && (
                        <label className="w-24 h-24 bg-stone-50 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-stone-100">
                          <svg className="w-8 h-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="title" className="text-stone-600">Food Title</Label>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setShowBarcodeScanner(true)}
                        className="text-xs px-2 py-1 h-6 border-stone-300 text-stone-500 hover:bg-stone-100"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-.01M12 12v4m0 0h4m-4 0h-.01m0-8h4.01M12 8h-.01M8 12h-.01M12 8h-.01m0 4h-.01m4-4h.01m0 4h-.01M8 8h.01M8 8h-.01" />
                        </svg>
                        Scan
                      </Button>
                    </div>
                    <Input
                      id="title"
                      placeholder="e.g., Fresh Vegetables, Prepared Meals"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                      required
                    />
                    {formData.barcode && (
                      <p className="text-xs text-stone-500 mt-1">Barcode: {formData.barcode}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-stone-600">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange('category', value)}
                      required
                    >
                      <SelectTrigger className="bg-stone-50 border-stone-300 text-stone-900">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresh">Fresh Produce</SelectItem>
                        <SelectItem value="prepared">Prepared Food</SelectItem>
                        <SelectItem value="packaged">Packaged Goods</SelectItem>
                        <SelectItem value="baked">Baked Goods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-stone-600">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the food, its condition, and any special instructions"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-[100px] bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="quantity" className="text-stone-600">Quantity/Portions</Label>
                    <Input
                      id="quantity"
                      placeholder="e.g., 5-6 portions, 3 bags"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                      className="bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="servings" className="text-stone-600">Number of Servings</Label>
                    <Input
                      id="servings"
                      type="number"
                      placeholder="e.g., 4"
                      value={formData.servings}
                      onChange={(e) => handleInputChange('servings', e.target.value)}
                      className="bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate" className="text-stone-600">Best By Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className="bg-stone-50 border-stone-300 text-stone-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-stone-600">Pickup Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Downtown Restaurant, Home Address"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-500"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="urgent"
                    checked={formData.isUrgent}
                    onCheckedChange={(checked) => handleInputChange('isUrgent', checked)}
                  />
                  <Label htmlFor="urgent" className="text-stone-600">Mark as urgent (expires within 24 hours)</Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
                    Add Listing
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                    className="border-stone-300 text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Current Listings */}
        {myListings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map((listing) => (
              <FoodCard
                key={listing.id}
                listing={listing}
                isOwner={true}
                onEdit={(id) => {
                  const listing = myListings.find(l => l.id === id);
                  if (listing) {
                    setEditingListing(listing);
                  }
                }}
                onWithdraw={(id) => {
                  setSelectedWithdrawalListing(id);
                  setShowWithdrawalPopup(true);
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-white backdrop-blur border-stone-200">
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <svg className="h-12 w-12 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-lg font-semibold text-stone-900">No listings yet</h3>
                <p className="text-stone-500 max-w-md">
                  Start making a difference by adding your first food listing. Help reduce waste and feed those in need.
                </p>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Add Your First Listing
                </Button>
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
            // Handle notification permission request
            console.log('Notifications enabled');
          }
        }}
      />

      {/* Location Tracker */}
      <LocationTracker
        isOpen={showLocationTracker}
        onClose={() => setShowLocationTracker(false)}
        requestId={selectedRequest || ''}
        donorName={userName}
        pickupLocation="Downtown Kitchen - 123 Main St"
        isPickupReady={true}
      />

      {/* Verification Popup */}
      <VerificationPopup
        isOpen={showVerificationPopup}
        onClose={() => {
          setShowVerificationPopup(false);
          setIsVerified(true);
        }}
        userType={userType}
        isDonor={true}
      />

      {/* Withdrawal Popup */}
      <CancellationPopup
        isOpen={showWithdrawalPopup}
        onClose={() => {
          setShowWithdrawalPopup(false);
          setSelectedWithdrawalListing(null);
        }}
        onConfirm={(reason) => {
          console.log('Withdrawal reason:', reason);
          if (selectedWithdrawalListing) {
            setMyListings(prev => prev.filter(l => l.id !== selectedWithdrawalListing));
          }
          setSelectedWithdrawalListing(null);
        }}
        itemTitle={
          selectedWithdrawalListing 
            ? myListings.find(l => l.id === selectedWithdrawalListing)?.title || 'Food Donation'
            : 'Food Donation'
        }
        isDonor={true}
      />

      {/* Edit Listing Overlay */}
      {editingListing && (
        <FoodListingEditOverlay
          listing={editingListing}
          onSave={(updatedListing) => {
            setMyListings(prev => prev.map(listing => 
              listing.id === updatedListing.id ? updatedListing : listing
            ));
            setEditingListing(null);
          }}
          onCancel={() => setEditingListing(null)}
        />
      )}
    </div>
  );
}