import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";

interface ResetPasswordProps {
  onViewChange: (view: string) => void;
  onPasswordReset: () => void;
  resetEmail?: string;
}

export default function ResetPassword({ onViewChange, onPasswordReset, resetEmail }: ResetPasswordProps) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePassword = (password: string): string[] => {
    const validationErrors: string[] = [];
    
    if (password.length < 8) {
      validationErrors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      validationErrors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      validationErrors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      validationErrors.push("Password must contain at least one number");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      validationErrors.push("Password must contain at least one special character (!@#$%^&*)");
    }
    
    return validationErrors;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    const validationErrors = validatePassword(formData.password);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    setIsLoading(true);
    setErrors([]);

    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        onPasswordReset();
      }, 3000);
    }, 1500);
  };

  const passwordStrength = (password: string): { strength: string; color: string; width: string } => {
    const validationErrors = validatePassword(password);
    const score = 5 - validationErrors.length;
    
    if (score <= 1) return { strength: "Weak", color: "bg-orange-500", width: "w-1/4" };
    if (score === 2) return { strength: "Fair", color: "bg-orange-500", width: "w-2/4" };
    if (score === 3) return { strength: "Good", color: "bg-yellow-500", width: "w-3/4" };
    if (score === 4) return { strength: "Strong", color: "bg-green-500", width: "w-full" };
    return { strength: "Very Strong", color: "bg-green-600", width: "w-full" };
  };

  const strength = passwordStrength(formData.password);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <Card className="bg-white backdrop-blur border-stone-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl text-stone-900">Password Reset Successful!</h3>
                <p className="text-stone-500">
                  Your password has been successfully reset. You can now login with your new password.
                </p>
                <div className="flex items-center justify-center space-x-2 text-stone-500">
                  <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Redirecting to login...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl text-stone-900">Reset Your Password</CardTitle>
            <CardDescription className="text-stone-500">
              {resetEmail && `For ${resetEmail}`}
              <br />
              Create a strong password for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.length > 0 && (
                <Alert className="bg-orange-900/20 border-orange-700">
                  <AlertDescription className="text-orange-400">
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-stone-900">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-500 focus:border-orange-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-stone-600"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-500">Password Strength:</span>
                      <span className={`${strength.color.replace('bg-', 'text-')}`}>{strength.strength}</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-stone-900">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-500 focus:border-orange-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-stone-600"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-orange-50 rounded-lg p-4 border border-stone-200">
                <p className="text-sm text-stone-500 mb-2">Password must contain:</p>
                <ul className="text-xs text-stone-500 space-y-1">
                  <li className="flex items-center space-x-2">
                    <span className={formData.password.length >= 8 ? 'text-green-400' : ''}>
                      {formData.password.length >= 8 ? '✓' : '○'}
                    </span>
                    <span>At least 8 characters</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className={/[A-Z]/.test(formData.password) ? 'text-green-400' : ''}>
                      {/[A-Z]/.test(formData.password) ? '✓' : '○'}
                    </span>
                    <span>One uppercase letter</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className={/[a-z]/.test(formData.password) ? 'text-green-400' : ''}>
                      {/[a-z]/.test(formData.password) ? '✓' : '○'}
                    </span>
                    <span>One lowercase letter</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className={/[0-9]/.test(formData.password) ? 'text-green-400' : ''}>
                      {/[0-9]/.test(formData.password) ? '✓' : '○'}
                    </span>
                    <span>One number</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className={/[!@#$%^&*]/.test(formData.password) ? 'text-green-400' : ''}>
                      {/[!@#$%^&*]/.test(formData.password) ? '✓' : '○'}
                    </span>
                    <span>One special character (!@#$%^&*)</span>
                  </li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>

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
      </div>
    </div>
  );
}
