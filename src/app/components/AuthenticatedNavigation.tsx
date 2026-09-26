import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface AuthenticatedNavigationProps {
  userType: 'donor' | 'receiver';
  currentView: string;
  onViewChange: (view: string) => void;
  userInfo: {
    name: string;
    category: 'individual' | 'organization' | 'wholesaler';
  };
  onUserTypeChange: (type: 'individual' | 'organization' | 'wholesaler') => void;
  onAccountChange: () => void;
  onLogout: () => void;
}

export default function AuthenticatedNavigation({
  userType,
  currentView,
  onViewChange,
  userInfo,
  onUserTypeChange,
  onAccountChange,
  onLogout,
}: AuthenticatedNavigationProps) {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigationItems = userType === 'donor'
    ? [
        { id: 'donorDashboard', label: 'Dashboard' },
        { id: 'donorHistory', label: 'Donation History' },
        { id: 'profile', label: 'My Profile' },
        { id: 'settings', label: 'Account Settings' },
        { id: 'help', label: 'Help' },
      ]
    : [
        { id: 'receiverDashboard', label: 'Dashboard' },
        { id: 'receiverHistory', label: 'Request History' },
        { id: 'profile', label: 'My Profile' },
        { id: 'settings', label: 'Account Settings' },
        { id: 'help', label: 'Help' },
      ];

  const getCategoryLabel = () => {
    switch (userInfo.category) {
      case 'individual': return 'Individual/Family';
      case 'organization': return userType === 'donor' ? 'Organization/Restaurant' : 'Community Organization';
      case 'wholesaler': return 'Wholesaler/Distributor';
      default: return userInfo.category;
    }
  };

  return (
    <>
      <nav className="bg-orange-700 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <span className="text-xl font-bold text-white tracking-wide">REPLATE</span>

            {/* Desktop nav items */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    currentView === item.id
                      ? 'bg-orange-900 text-white'
                      : 'text-orange-100 hover:text-white hover:bg-orange-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* User menu (desktop) */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-white hover:text-orange-200 transition-colors text-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-xs">
                    {userInfo.name.charAt(0)}
                  </div>
                  <span>{userInfo.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-xl z-50 overflow-hidden">
                      <button
                        onClick={() => { onAccountChange(); setShowUserMenu(false); }}
                        className="block w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                      >
                        Change Account
                      </button>
                      <button
                        onClick={() => { onLogout(); setShowUserMenu(false); }}
                        className="block w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-md text-orange-100 hover:text-white hover:bg-orange-600 transition-colors"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-orange-800 border-t border-orange-600 px-4 py-3 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onViewChange(item.id); setMobileOpen(false); }}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm transition-colors ${
                  currentView === item.id
                    ? 'bg-orange-900 text-white'
                    : 'text-orange-100 hover:text-white hover:bg-orange-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-orange-700 pt-2 mt-2 space-y-1">
              <button
                onClick={() => { onAccountChange(); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-md text-sm text-orange-100 hover:text-white hover:bg-orange-700 transition-colors"
              >
                Change Account
              </button>
              <button
                onClick={() => { onLogout(); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-md text-sm text-orange-100 hover:text-white hover:bg-orange-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Type selector sub-bar */}
      <div className="bg-orange-50 border-b border-orange-100 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-2">
          <span className="text-stone-500 text-sm">Account type:</span>
          <Select value={userInfo.category} onValueChange={onUserTypeChange}>
            <SelectTrigger className="w-52 bg-white border-stone-300 text-stone-900 text-sm h-8">
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
      </div>
    </>
  );
}
