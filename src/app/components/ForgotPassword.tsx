import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";

interface ForgotPasswordProps {
  onViewChange: (view: string) => void;
  onResetLinkSent: (email: string) => void;
}

export default function ForgotPassword({ onViewChange, onResetLinkSent }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to send reset email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      onResetLinkSent(email);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-br from-green-400/20 to-teal-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white backdrop-blur border-stone-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl text-stone-900">Forgot Password?</CardTitle>
            <CardDescription className="text-stone-500">
              {isSubmitted 
                ? "Check your email for reset instructions"
                : "Enter your email address and we'll send you a link to reset your password"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-stone-900">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-500 focus:border-orange-500"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <Alert className="bg-green-900/20 border-green-700">
                  <AlertDescription className="text-green-400">
                    We've sent a password reset link to <strong>{email}</strong>. 
                    Please check your inbox and click the link to reset your password.
                  </AlertDescription>
                </Alert>

                <div className="text-sm text-stone-500 space-y-2">
                  <p>Didn't receive the email?</p>
                  <ul className="list-disc list-inside space-y-1 text-stone-500">
                    <li>Check your spam folder</li>
                    <li>Verify the email address is correct</li>
                    <li>Wait a few minutes and try again</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Button 
                    type="button"
                    onClick={() => onViewChange('resetPassword')}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Continue to Reset Password
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="w-full border-stone-200 text-stone-600 hover:bg-stone-100"
                  >
                    Try Different Email
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => onViewChange('home')}
                className="text-orange-400 hover:text-orange-300 text-sm"
              >
                ← Back to Login
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-stone-500 text-sm">
            Need help? <button onClick={() => onViewChange('contact')} className="text-orange-400 hover:underline">Contact Support</button>
          </p>
        </div>
      </div>
    </div>
  );
}
