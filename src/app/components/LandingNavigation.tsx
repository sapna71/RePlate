import React from 'react';

interface LandingNavigationProps {
  onViewChange: (view: string) => void;
  scrollToSection: (sectionId: string) => void;
}

export default function LandingNavigation({ onViewChange, scrollToSection }: LandingNavigationProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', action: () => { onViewChange('home'); setMobileOpen(false); } },
    { label: 'Donate Food', action: () => { scrollToSection('donor-section'); setMobileOpen(false); } },
    { label: 'Find Food', action: () => { scrollToSection('receiver-section'); setMobileOpen(false); } },
    { label: 'About Us', action: () => { onViewChange('about'); setMobileOpen(false); } },
  ];

  return (
    <nav className="bg-orange-700 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onViewChange('home')}
            className="text-xl font-bold text-white tracking-wide focus:outline-none"
          >
            REPLATE
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="px-4 py-2 rounded-md text-sm text-orange-100 hover:text-white hover:bg-orange-600 transition-colors"
              >
                {label}
              </button>
            ))}
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

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-orange-800 border-t border-orange-600 px-4 py-3 space-y-1">
          {navItems.map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="block w-full text-left px-4 py-3 rounded-md text-sm text-orange-100 hover:text-white hover:bg-orange-700 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
