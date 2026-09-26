import React from 'react';
import LandingPage from './components/LandingPage';
import LandingNavigation from './components/LandingNavigation';
import UserTypeSelection from './components/UserTypeSelection';
import DonorTypeSelection from './components/DonorTypeSelection';
import ReceiverTypeSelection from './components/ReceiverTypeSelection';
import DonorDashboard from './components/DonorDashboard';
import ReceiverDashboard from './components/ReceiverDashboard';
import AboutPage from './components/AboutPage';
import DonorHistory from './components/DonorHistory';
import ReceiverHistory from './components/ReceiverHistory';
import MyProfile from './components/MyProfile';
import HelpCentre from './components/HelpCentre';
import SafetyGuidelines from './components/SafetyGuidelines';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import AuthenticatedNavigation from './components/AuthenticatedNavigation';
import UserTypeSelectionFooter from './components/UserTypeSelectionFooter';
import AccountSettings from './components/AccountSettings';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function BackArrow({ onClick, label = 'Back' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-800 font-medium mb-6 group"
    >
      <svg
        className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
}

export default function App() {
  const [currentView, setCurrentView] = React.useState('home');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userType, setUserType] = React.useState<'donor' | 'receiver' | null>(null);
  const [userCategory, setUserCategory] = React.useState<'individual' | 'organization' | 'wholesaler'>('individual');
  const [resetEmail, setResetEmail] = React.useState('');

  const [userInfo, setUserInfo] = React.useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    category: 'individual' as 'individual' | 'organization' | 'wholesaler',
    address: '123 Main Street, San Francisco, CA 94102',
    verified: true,
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = () => { setIsLoggedIn(true); setCurrentView('userTypeSelection'); };
  const handleLogout = () => { setIsLoggedIn(false); setUserType(null); setCurrentView('home'); };

  const handleUserTypeSelect = (type: 'donor' | 'receiver') => {
    setUserType(type);
    setCurrentView(type === 'donor' ? 'donorTypeSelection' : 'receiverTypeSelection');
  };

  const handleDonorTypeSelect = (type: 'individual' | 'organization' | 'wholesaler') => {
    setUserCategory(type);
    setUserInfo(prev => ({ ...prev, category: type }));
    setCurrentView('donorDashboard');
  };

  const handleReceiverTypeSelect = (type: 'individual' | 'organization' | 'wholesaler') => {
    setUserCategory(type);
    setUserInfo(prev => ({ ...prev, category: type }));
    setCurrentView('receiverDashboard');
  };

  const handleUserTypeChange = (newType: 'individual' | 'organization' | 'wholesaler') => {
    setUserCategory(newType);
    setUserInfo(prev => ({ ...prev, category: newType }));
  };

  const handleChangeAccount = () => { setUserType(null); setCurrentView('userTypeSelection'); };
  const handleResetLinkSent = (email: string) => { setResetEmail(email); };
  const handlePasswordReset = () => { setResetEmail(''); setCurrentView('home'); };

  const donorDashboardView = userType === 'donor' ? 'donorDashboard' : 'receiverDashboard';

  const renderCurrentView = () => {
    if (!isLoggedIn) {
      switch (currentView) {
        case 'home':
          return <LandingPage onViewChange={setCurrentView} onLogin={handleLogin} scrollToSection={scrollToSection} />;
        case 'about':
          return (
            <div className="max-w-5xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('home')} label="Back to Home" />
              <AboutPage onViewChange={setCurrentView} />
            </div>
          );
        case 'help':
          return (
            <div className="max-w-5xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('home')} label="Back to Home" />
              <HelpCentre onViewChange={setCurrentView} />
            </div>
          );
        case 'safety':
          return (
            <div className="max-w-5xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('home')} label="Back to Home" />
              <SafetyGuidelines onViewChange={setCurrentView} />
            </div>
          );
        case 'contact':
          return (
            <div className="max-w-5xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('home')} label="Back to Home" />
              <ContactUs onViewChange={setCurrentView} />
            </div>
          );
        case 'privacy':
          return (
            <div className="max-w-5xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('home')} label="Back to Home" />
              <PrivacyPolicy onViewChange={setCurrentView} />
            </div>
          );
        case 'forgotPassword':
          return <ForgotPassword onViewChange={setCurrentView} onResetLinkSent={handleResetLinkSent} />;
        case 'resetPassword':
          return <ResetPassword onViewChange={setCurrentView} onPasswordReset={handlePasswordReset} resetEmail={resetEmail} />;
        default:
          return <LandingPage onViewChange={setCurrentView} onLogin={handleLogin} scrollToSection={scrollToSection} />;
      }
    }

    if (currentView === 'userTypeSelection') {
      return (
        <div className="max-w-5xl mx-auto px-4 pt-8">
          <BackArrow onClick={handleLogout} label="Back to Home" />
          <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
        </div>
      );
    }

    if (currentView === 'donorTypeSelection') {
      return (
        <div className="max-w-5xl mx-auto px-4 pt-8">
          <BackArrow onClick={() => setCurrentView('userTypeSelection')} label="Back" />
          <DonorTypeSelection onTypeSelect={handleDonorTypeSelect} />
        </div>
      );
    }

    if (currentView === 'receiverTypeSelection') {
      return (
        <div className="max-w-5xl mx-auto px-4 pt-8">
          <BackArrow onClick={() => setCurrentView('userTypeSelection')} label="Back" />
          <ReceiverTypeSelection onTypeSelect={handleReceiverTypeSelect} />
        </div>
      );
    }

    if (userType === 'donor') {
      switch (currentView) {
        case 'donorDashboard':
          return <DonorDashboard />;
        case 'donorHistory':
          return (
            <div className="max-w-7xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('donorDashboard')} label="Back to Dashboard" />
              <DonorHistory />
            </div>
          );
        case 'profile':
          return (
            <div className="max-w-4xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('donorDashboard')} label="Back to Dashboard" />
              <MyProfile userType="donor" />
            </div>
          );
        case 'settings':
          return (
            <div className="max-w-4xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('donorDashboard')} label="Back to Dashboard" />
              <AccountSettings userType="donor" />
            </div>
          );
        case 'help':
          return (
            <div className="max-w-5xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('donorDashboard')} label="Back to Dashboard" />
              <HelpCentre onViewChange={setCurrentView} />
            </div>
          );
        case 'about':
          return (
            <div className="max-w-5xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('donorDashboard')} label="Back to Dashboard" />
              <AboutPage onViewChange={setCurrentView} />
            </div>
          );
        default:
          return <DonorDashboard />;
      }
    }

    if (userType === 'receiver') {
      switch (currentView) {
        case 'receiverDashboard':
          return <ReceiverDashboard />;
        case 'receiverHistory':
          return (
            <div className="max-w-7xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('receiverDashboard')} label="Back to Dashboard" />
              <ReceiverHistory />
            </div>
          );
        case 'profile':
          return (
            <div className="max-w-4xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('receiverDashboard')} label="Back to Dashboard" />
              <MyProfile userType="receiver" />
            </div>
          );
        case 'settings':
          return (
            <div className="max-w-4xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('receiverDashboard')} label="Back to Dashboard" />
              <AccountSettings userType="receiver" />
            </div>
          );
        case 'help':
          return (
            <div className="max-w-5xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('receiverDashboard')} label="Back to Dashboard" />
              <HelpCentre onViewChange={setCurrentView} />
            </div>
          );
        case 'about':
          return (
            <div className="max-w-5xl mx-auto px-4 pt-8">
              <BackArrow onClick={() => setCurrentView('receiverDashboard')} label="Back to Dashboard" />
              <AboutPage onViewChange={setCurrentView} />
            </div>
          );
        default:
          return <ReceiverDashboard />;
      }
    }

    return <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />;
  };

  const renderNavigation = () => {
    if (!isLoggedIn) {
      if (currentView === 'forgotPassword' || currentView === 'resetPassword') return null;
      return <LandingNavigation onViewChange={setCurrentView} scrollToSection={scrollToSection} />;
    }

    if (
      currentView === 'userTypeSelection' ||
      currentView === 'donorTypeSelection' ||
      currentView === 'receiverTypeSelection'
    ) {
      return (
        <nav className="bg-orange-700 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <span className="text-xl font-bold text-white tracking-wide">REPLATE</span>
              <span className="text-orange-100 text-sm">{userInfo.name}</span>
            </div>
          </div>
        </nav>
      );
    }

    if (userType) {
      return (
        <AuthenticatedNavigation
          userType={userType}
          currentView={currentView}
          onViewChange={setCurrentView}
          userInfo={userInfo}
          onUserTypeChange={handleUserTypeChange}
          onAccountChange={handleChangeAccount}
          onLogout={handleLogout}
        />
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (!isLoggedIn) {
      if (currentView === 'forgotPassword' || currentView === 'resetPassword') return null;
      return (
        <footer className="bg-orange-900 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-3 text-white">REPLATE</h3>
                <p className="text-orange-200 text-sm leading-relaxed">
                  Connecting communities to reduce food waste and fight hunger.
                  Together, we're building a more sustainable and equitable food system.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-orange-300 mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    { label: 'Home', view: 'home' },
                    { label: 'About Us', view: 'about' },
                    { label: 'Donate Food', view: 'donor-section' },
                    { label: 'Find Food', view: 'receiver-section' },
                  ].map(({ label, view }) => (
                    <li key={label}>
                      <button
                        onClick={() => setCurrentView(view)}
                        className="text-orange-200 hover:text-white transition-colors"
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-orange-300 mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    { label: 'Help Center', view: 'help' },
                    { label: 'Safety Guidelines', view: 'safety' },
                    { label: 'Contact Us', view: 'contact' },
                    { label: 'Privacy Policy', view: 'privacy' },
                  ].map(({ label, view }) => (
                    <li key={label}>
                      <button
                        onClick={() => setCurrentView(view)}
                        className="text-orange-200 hover:text-white transition-colors"
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-orange-800 mt-8 pt-8 text-center text-orange-300 text-sm">
              <p>&copy; 2025 REPLATE. All rights reserved. Built for our communities.</p>
            </div>
          </div>
        </footer>
      );
    }

    if (
      currentView === 'userTypeSelection' ||
      currentView === 'donorTypeSelection' ||
      currentView === 'receiverTypeSelection'
    ) {
      return <UserTypeSelectionFooter onViewChange={setCurrentView} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {renderNavigation()}
      <main>{renderCurrentView()}</main>
      {renderFooter()}
    </div>
  );
}
