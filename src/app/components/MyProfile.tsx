import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import VerificationPopup from "./VerificationPopup";

interface MyProfileProps {
  userType: 'donor' | 'receiver';
}

export default function MyProfile({ userType }: MyProfileProps) {
  const [profileData, setProfileData] = React.useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, San Francisco, CA 94102',
    category: 'individual' as 'individual' | 'organization' | 'wholesaler',
    organizationName: '',
    businessDetails: '',
    verified: false
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = React.useState(false);

  const handleSave = () => {
    // In a real app, save to server
    setIsEditing(false);
  };

  const handleVerificationComplete = () => {
    setProfileData(prev => ({ ...prev, verified: true }));
    setShowVerificationPopup(false);
  };

  const getCategoryLabel = () => {
    switch (profileData.category) {
      case 'individual': return 'Individual/Family';
      case 'organization': return userType === 'donor' ? 'Organization/Restaurant' : 'Community Organization';
      case 'wholesaler': return 'Wholesaler/Distributor';
      default: return profileData.category;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">My Profile</h1>
          <p className="text-stone-600">Manage your account information and preferences</p>
        </div>

        {/* Profile Information */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-stone-900">Personal Information</CardTitle>
              <div className="flex items-center space-x-3">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-stone-300 text-stone-600 hover:bg-stone-100"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-stone-600">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  disabled={!isEditing}
                  className="bg-stone-50 border-stone-300 text-stone-900 disabled:opacity-70"
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="text-stone-600">Account Type</Label>
                <Select 
                  value={profileData.category} 
                  onValueChange={(value: 'individual' | 'organization' | 'wholesaler') => 
                    setProfileData({ ...profileData, category: value })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-stone-50 border-stone-300 text-stone-900 disabled:opacity-70">
                    <SelectValue>{getCategoryLabel()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">
                      {userType === 'donor' ? 'Individual/Family' : 'Individual/Family'}
                    </SelectItem>
                    <SelectItem value="organization">
                      {userType === 'donor' ? 'Organization/Restaurant' : 'Community Organization'}
                    </SelectItem>
                    <SelectItem value="wholesaler">Wholesaler/Distributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="email" className="text-stone-600">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                  className="bg-stone-50 border-stone-300 text-stone-900 disabled:opacity-70"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-stone-600">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="bg-stone-50 border-stone-300 text-stone-900 disabled:opacity-70"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-stone-600">Address</Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                disabled={!isEditing}
                className="bg-stone-50 border-stone-300 text-stone-900 disabled:opacity-70"
              />
            </div>

            {/* Organization-specific fields */}
            {profileData.category === 'organization' && (
              <div>
                <Label htmlFor="organizationName" className="text-stone-600">
                  {userType === 'donor' ? 'Restaurant/Organization Name' : 'Organization Name'}
                </Label>
                <Input
                  id="organizationName"
                  value={profileData.organizationName}
                  onChange={(e) => setProfileData({ ...profileData, organizationName: e.target.value })}
                  disabled={!isEditing}
                  placeholder={userType === 'donor' ? 'e.g., Green Leaf Restaurant' : 'e.g., Community Food Bank'}
                  className="bg-stone-50 border-stone-300 text-stone-900 disabled:opacity-70"
                />
              </div>
            )}

            {/* Wholesaler-specific fields */}
            {profileData.category === 'wholesaler' && (
              <div>
                <Label htmlFor="businessDetails" className="text-stone-600">Business Type</Label>
                <Input
                  id="businessDetails"
                  value={profileData.businessDetails}
                  onChange={(e) => setProfileData({ ...profileData, businessDetails: e.target.value })}
                  disabled={!isEditing}
                  placeholder="e.g., Food Distribution, Wholesale Grocery"
                  className="bg-stone-50 border-stone-300 text-stone-900 disabled:opacity-70"
                />
              </div>
            )}

            {/* Account Verification Section */}
            <div className="pt-4 border-t border-stone-200">
              <Label className="text-stone-600 mb-3 block">Account Verification</Label>
              <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-300 rounded-lg">
                <div className="flex items-center space-x-3">
                  {profileData.verified ? (
                    <>
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="text-stone-900">Verified Account</h4>
                        <p className="text-green-400 text-sm">Your account has been successfully verified</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <h4 className="text-stone-900">Unverified Account</h4>
                        <p className="text-stone-500 text-sm">Verify your account to build trust with the community</p>
                      </div>
                    </>
                  )}
                </div>
                {profileData.verified ? (
                  <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                    ✓ Verified
                  </Badge>
                ) : (
                  <Button
                    onClick={() => setShowVerificationPopup(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verify Account
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {userType === 'donor' ? '23' : '15'}
                </div>
                <p className="text-stone-500">
                  {userType === 'donor' ? 'Total Donations' : 'Total Requests'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {userType === 'donor' ? '45' : '12'}
                </div>
                <p className="text-stone-500">
                  {userType === 'donor' ? 'Families Helped' : 'Meals Received'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">92%</div>
                <p className="text-stone-500">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Contact & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 className="text-stone-900 font-semibold">Email Verified</h4>
                  <p className="text-blue-400 text-sm">Your email address is confirmed</p>
                </div>
              </div>
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">Verified</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-900/20 border border-orange-600/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1A17.918 17.918 0 013 5z" />
                </svg>
                <div>
                  <h4 className="text-stone-900 font-semibold">Phone Number</h4>
                  <p className="text-orange-400 text-sm">Used for SMS notifications and contact</p>
                </div>
              </div>
              <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}