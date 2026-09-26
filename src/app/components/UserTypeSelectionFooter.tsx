import React from 'react';

interface UserTypeSelectionFooterProps {
  onViewChange: (view: string) => void;
}

export default function UserTypeSelectionFooter({ onViewChange }: UserTypeSelectionFooterProps) {
  return (
    <footer className="bg-stone-50 text-stone-900 py-8 px-4 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">REPLATE</h3>
            <p className="text-stone-600 text-sm">
              Connecting communities to reduce food waste and fight hunger. 
              Together, we're building a more sustainable and equitable food system.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onViewChange('home')} 
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onViewChange('about')} 
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button 
                  onClick={() => onViewChange('help')}
                  className="hover:text-stone-900 transition-colors text-sm"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onViewChange('safety')}
                  className="hover:text-stone-900 transition-colors text-sm"
                >
                  Safety Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onViewChange('contact')}
                  className="hover:text-stone-900 transition-colors text-sm"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onViewChange('privacy')}
                  className="hover:text-stone-900 transition-colors text-sm"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onViewChange('terms')}
                  className="hover:text-stone-900 transition-colors text-sm"
                >
                  Terms and Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-200 mt-6 pt-6 text-center text-stone-600">
          <p className="text-sm">&copy; 2025 REPLATE. All rights reserved. Built with ❤️ for our communities.</p>
        </div>
      </div>
    </footer>
  );
}