import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

interface VerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'individual' | 'organization' | 'wholesaler';
  isDonor?: boolean;
}

export default function VerificationPopup({ isOpen, onClose, userType, isDonor = false }: VerificationPopupProps) {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    email: '',
    phone: '',
    otp: '',
    businessName: '',
    businessAddress: '',
    licenseNumber: '',
    taxId: '',
    organizationName: '',
    organizationType: '',
    registrationNumber: '',
    documents: [] as File[]
  });
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = React.useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({ ...prev, documents: Array.from(files) }));
    }
  };

  const sendEmailOTP = () => {
    // Simulate sending OTP
    setTimeout(() => {
      alert('OTP sent to your email!');
    }, 500);
  };

  const sendPhoneOTP = () => {
    // Simulate sending OTP
    setTimeout(() => {
      alert('OTP sent to your phone!');
    }, 500);
  };

  const verifyOTP = (type: 'email' | 'phone') => {
    if (formData.otp === '123456') {
      if (type === 'email') {
        setIsEmailVerified(true);
      } else {
        setIsPhoneVerified(true);
      }
      setFormData(prev => ({ ...prev, otp: '' }));
    } else {
      alert('Invalid OTP. Use 123456 for demo.');
    }
  };

  if (!isOpen) return null;

  const getTitle = () => {
    if (userType === 'wholesaler') return isDonor ? 'Wholesaler Donor Verification' : 'Wholesaler Receiver Verification';
    if (userType === 'organization') return isDonor ? 'Organization Donor Verification' : 'Organization Receiver Verification';
    return isDonor ? 'Individual Donor Verification' : 'Individual/Family Receiver Verification';
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-stone-900 mb-2">Basic Information Verification</h3>
        <p className="text-stone-500 text-sm">We need to verify your contact information to ensure secure transactions.</p>
      </div>

      {/* Email Verification */}
      <div className="space-y-3">
        <Label className="text-stone-600">Email Address</Label>
        <div className="flex space-x-2">
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className="bg-stone-50 border-stone-300 text-stone-900 flex-1"
            disabled={isEmailVerified}
          />
          {!isEmailVerified ? (
            <Button
              onClick={sendEmailOTP}
              disabled={!formData.email}
              className="bg-orange-600 hover:bg-orange-700 text-white whitespace-nowrap"
            >
              Send OTP
            </Button>
          ) : (
            <Badge className="bg-green-600/20 text-green-400 border-green-600/30 px-3 py-1 flex items-center">
              ✓ Verified
            </Badge>
          )}
        </div>
        
        {!isEmailVerified && formData.email && (
          <div className="flex space-x-2">
            <Input
              type="text"
              value={formData.otp}
              onChange={(e) => handleInputChange('otp', e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="bg-stone-50 border-stone-300 text-stone-900 flex-1"
              maxLength={6}
            />
            <Button
              onClick={() => verifyOTP('email')}
              disabled={formData.otp.length !== 6}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Verify
            </Button>
          </div>
        )}
      </div>

      {/* Phone Verification */}
      <div className="space-y-3">
        <Label className="text-stone-600">Phone Number</Label>
        <div className="flex space-x-2">
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="bg-stone-50 border-stone-300 text-stone-900 flex-1"
            disabled={isPhoneVerified}
          />
          {!isPhoneVerified ? (
            <Button
              onClick={sendPhoneOTP}
              disabled={!formData.phone}
              className="bg-orange-600 hover:bg-orange-700 text-white whitespace-nowrap"
            >
              Send OTP
            </Button>
          ) : (
            <Badge className="bg-green-600/20 text-green-400 border-green-600/30 px-3 py-1 flex items-center">
              ✓ Verified
            </Badge>
          )}
        </div>
        
        {!isPhoneVerified && formData.phone && (
          <div className="flex space-x-2">
            <Input
              type="text"
              value={formData.otp}
              onChange={(e) => handleInputChange('otp', e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="bg-stone-50 border-stone-300 text-stone-900 flex-1"
              maxLength={6}
            />
            <Button
              onClick={() => verifyOTP('phone')}
              disabled={formData.otp.length !== 6}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Verify
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {userType === 'wholesaler' && (
        <>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Business License Verification</h3>
            <p className="text-stone-500 text-sm">Please provide your government-issued business license and tax information.</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-stone-600">Business Name</Label>
              <Input
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="ABC Food Distributors LLC"
                className="bg-stone-50 border-stone-300 text-stone-900"
              />
            </div>

            <div>
              <Label className="text-stone-600">Business Address</Label>
              <Textarea
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                placeholder="123 Industrial Park Ave, City, State, ZIP"
                className="bg-stone-50 border-stone-300 text-stone-900"
              />
            </div>

            <div>
              <Label className="text-stone-600">Business License Number</Label>
              <Input
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                placeholder="BL-123456789"
                className="bg-stone-50 border-stone-300 text-stone-900"
              />
            </div>

            <div>
              <Label className="text-stone-600">Tax ID / EIN</Label>
              <Input
                value={formData.taxId}
                onChange={(e) => handleInputChange('taxId', e.target.value)}
                placeholder="12-3456789"
                className="bg-stone-50 border-stone-300 text-stone-900"
              />
            </div>

            <div>
              <Label className="text-stone-600">Upload Documents</Label>
              <Input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="bg-stone-50 border-stone-300 text-stone-900"
              />
              <p className="text-stone-500 text-xs mt-1">Upload business license, tax certificate, and other relevant documents (PDF, JPG, PNG)</p>
            </div>
          </div>
        </>
      )}

      {userType === 'organization' && (
        <>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Organization Verification</h3>
            <p className="text-stone-500 text-sm">Please provide your organization details and registration information.</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-stone-600">Organization Name</Label>
              <Input
                value={formData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                placeholder="Community Food Bank"
                className="bg-stone-50 border-stone-300 text-stone-900"
              />
            </div>

            <div>
              <Label className="text-stone-600">Organization Type</Label>
              <Input
                value={formData.organizationType}
                onChange={(e) => handleInputChange('organizationType', e.target.value)}
                placeholder="Non-profit, Community Center, Shelter, etc."
                className="bg-stone-50 border-stone-300 text-stone-900"
              />
            </div>

            <div>
              <Label className="text-stone-600">Registration Number</Label>
              <Input
                value={formData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                placeholder="501(c)(3) or other registration number"
                className="bg-stone-50 border-stone-300 text-stone-900"
              />
            </div>

            <div>
              <Label className="text-stone-600">Upload Documents</Label>
              <Input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="bg-stone-50 border-stone-300 text-stone-900"
              />
              <p className="text-stone-500 text-xs mt-1">Upload organization registration, tax-exempt certificate, or other verification documents</p>
            </div>
          </div>
        </>
      )}

      {userType === 'individual' && (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-stone-900 mb-2">Verification Complete!</h3>
          <p className="text-stone-500">Your contact information has been verified. You can now access all features.</p>
        </div>
      )}
    </div>
  );

  const canProceedToStep2 = isEmailVerified && isPhoneVerified;
  const canComplete = userType === 'individual' || 
    (userType === 'wholesaler' && formData.businessName && formData.licenseNumber && formData.taxId) ||
    (userType === 'organization' && formData.organizationName && formData.organizationType);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4 bg-white border-stone-200 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-stone-900 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{getTitle()}</span>
            </div>
            <button 
              onClick={onClose}
              className="text-stone-500 hover:text-stone-900"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-orange-600 text-white' : 'bg-stone-600 text-stone-500'
              }`}>
                1
              </div>
              <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-orange-600' : 'bg-stone-600'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-orange-600 text-white' : 'bg-stone-600 text-stone-500'
              }`}>
                2
              </div>
            </div>

            {step === 1 ? renderStep1() : renderStep2()}

            <div className="flex gap-3 pt-4">
              {step === 2 && (
                <Button 
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-stone-300 text-stone-600 hover:bg-stone-100"
                >
                  Back
                </Button>
              )}
              
              {step === 1 ? (
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  onClick={onClose}
                  disabled={!canComplete}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Complete Verification
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}