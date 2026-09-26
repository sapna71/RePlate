import React from 'react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onScrollToSection?: (section: string) => void;
}

export default function Navigation({ currentView, onViewChange, onScrollToSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'donate', label: 'Donate Food' },
    { id: 'receive', label: 'Find Food' },
    { id: 'about', label: 'About Us' }
  ];

  return (
    <nav className="bg-orange-700 backdrop-blur border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onViewChange('home')}>
            <svg className="h-8 w-8 text-orange-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span className="text-xl font-semibold text-stone-900">REPLATE</span>
          </div>

          {/* Desktop Navigation - Right Aligned */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (currentView === 'home' && (item.id === 'donate' || item.id === 'receive')) {
                    onScrollToSection && onScrollToSection(item.id === 'donate' ? 'donor-section' : 'receiver-section');
                  } else {
                    onViewChange(item.id);
                  }
                }}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentView === item.id
                    ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30'
                    : 'text-stone-600 hover:text-white hover:bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-stone-500 hover:text-white hover:bg-white"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur border-t border-stone-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (currentView === 'home' && (item.id === 'donate' || item.id === 'receive')) {
                    onScrollToSection && onScrollToSection(item.id === 'donate' ? 'donor-section' : 'receiver-section');
                  } else {
                    onViewChange(item.id);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md w-full text-left transition-colors ${
                  currentView === item.id
                    ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30'
                    : 'text-stone-600 hover:text-white hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}