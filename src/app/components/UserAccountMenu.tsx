import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserAccountInfo {
  name: string;
  email: string;
  phone: string;
  userType: 'donor' | 'receiver' | 'both';
  category: 'individual' | 'organization' | 'wholesaler';
  address: string;
  organizationName?: string;
  businessDetails?: string;
  verified: boolean;
}

interface UserAccountMenuProps {
  userInfo: UserAccountInfo;
  onLogout: () => void;
}

export default function UserAccountMenu({ userInfo, onLogout }: UserAccountMenuProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  const getCategoryLabel = () => {
    switch (userInfo.category) {
      case 'individual': return 'Individual';
      case 'organization': return 'Organization/NGO';
      case 'wholesaler': return 'Wholesaler/Retailer';
      default: return userInfo.category;
    }
  };

  const getUserTypeLabel = () => {
    switch (userInfo.userType) {
      case 'donor': return 'Donor';
      case 'receiver': return 'Receiver';
      case 'both': return 'Donor & Receiver';
      default: return userInfo.userType;
    }
  };

  return (
    <div className="relative">
      {/* Account Icon Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="relative flex items-center space-x-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-full px-3 py-2 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
          <span className="text-stone-900 font-semibold text-sm">
            {userInfo.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-white text-sm hidden md:block">{userInfo.name}</span>
        <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        
        {userInfo.verified && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-orange-800 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />
          <Card className="absolute right-0 top-full mt-2 w-80 bg-white border-stone-200 z-50 shadow-2xl">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-stone-900 font-bold text-xl">
                      {userInfo.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-stone-900 font-semibold">{userInfo.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-white/20 text-white text-xs border-0">
                        {getUserTypeLabel()}
                      </Badge>
                      {userInfo.verified && (
                        <Badge className="bg-green-500/80 text-white text-xs border-0">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="p-4 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-stone-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p className="text-stone-500">Category</p>
                      <p className="text-white">{getCategoryLabel()}</p>
                    </div>
                  </div>

                  {userInfo.organizationName && (
                    <div className="flex items-start space-x-2">
                      <svg className="w-4 h-4 text-stone-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <p className="text-stone-500">Organization</p>
                        <p className="text-white">{userInfo.organizationName}</p>
                      </div>
                    </div>
                  )}

                  {userInfo.businessDetails && (
                    <div className="flex items-start space-x-2">
                      <svg className="w-4 h-4 text-stone-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-stone-500">Business Type</p>
                        <p className="text-white">{userInfo.businessDetails}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-stone-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-stone-500">Email</p>
                      <p className="text-white">{userInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-stone-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1A17.918 17.918 0 013 5z" />
                    </svg>
                    <div>
                      <p className="text-stone-500">Phone</p>
                      <p className="text-white">{userInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-stone-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-stone-500">Address</p>
                      <p className="text-white">{userInfo.address}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-3 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-stone-300 text-stone-600 hover:bg-stone-100 justify-start"
                    onClick={() => setShowMenu(false)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Account Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-orange-600/50 text-orange-400 hover:bg-orange-600/20 justify-start"
                    onClick={() => {
                      setShowMenu(false);
                      onLogout();
                    }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
