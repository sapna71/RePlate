import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface LandingPageProps {
  onViewChange: (view: string) => void;
  onLogin: () => void;
  scrollToSection: (sectionId: string) => void;
}

export default function LandingPage({ onViewChange, onLogin, scrollToSection }: LandingPageProps) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const scrollToLoginSection = () => {
    const element = document.getElementById('login-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect to user type selection
    onLogin();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup and redirect to user type selection
    onLogin();
  };

  const handleGoogleSignIn = () => {
    // Simulate Google sign-in and redirect to user type selection
    onLogin();
  };

  const stats = [
    { number: "10,000+", label: "Meals Shared" },
    { number: "500+", label: "Active Donors" },
    { number: "300+", label: "Families Helped" },
    { number: "50+", label: "Partner Organizations" }
  ];

  const values = [
    {
      icon: <svg className="h-6 w-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>,
      title: "Community Care",
      description: "We believe in the power of community to support one another and create positive change."
    },
    {
      icon: <svg className="h-6 w-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 7 7" />
      </svg>,
      title: "Environmental Responsibility",
      description: "Reducing food waste helps protect our planet and creates a more sustainable future."
    },
    {
      icon: <svg className="h-6 w-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>,
      title: "Dignity & Respect",
      description: "Everyone deserves access to nutritious food with dignity, regardless of their circumstances."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-br from-green-400/20 to-teal-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-56 h-56 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-1/3 left-20 w-32 h-32 border border-orange-400/20 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-32 w-24 h-24 border border-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rotate-12"></div>
      </div>

      {/* Hero Section with Login */}
      <section id="login-section" className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Hero Content */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl text-stone-900 leading-tight">
                Turn Food Waste into 
                <span className="text-orange-400"> Food Hope</span>
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed">
                Join our community platform that connects food donors with those in need. 
                Together, we can reduce waste and fight hunger in our neighborhoods.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center bg-white backdrop-blur rounded-lg p-4 border border-stone-200">
                    <div className="text-2xl text-orange-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-stone-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Hero Illustration */}
              <div className="mt-8 flex justify-center">
                <div className="relative w-80 h-64 bg-white backdrop-blur rounded-2xl border border-stone-200 flex items-center justify-center">
                  {/* 3D Food illustration */}
                  <div className="grid grid-cols-3 gap-4 p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-orange-500/30 rounded-xl flex items-center justify-center transform rotate-3">
                      <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05z"/>
                      </svg>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-500/30 rounded-xl flex items-center justify-center transform -rotate-2">
                      <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/30 rounded-xl flex items-center justify-center transform rotate-1">
                      <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/30 rounded-xl flex items-center justify-center transform rotate-2">
                      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/30 rounded-xl flex items-center justify-center transform -rotate-1">
                      <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" />
                      </svg>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400/20 to-rose-500/30 rounded-xl flex items-center justify-center transform rotate-3">
                      <svg className="w-8 h-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Connecting lines animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Login/Signup */}
            <div className="bg-white backdrop-blur rounded-2xl border border-stone-200 p-8 lg:mt-8">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-stone-50">
                  <TabsTrigger value="login" className="data-[state=active]:bg-orange-600">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-orange-600">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl text-stone-900">Welcome Back</h3>
                    <p className="text-stone-500 mt-2">Sign in to continue sharing food</p>
                  </div>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-stone-900">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-stone-900">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-500 focus:border-orange-500"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="remember-me" 
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                          className="border-stone-200 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                        />
                        <Label 
                          htmlFor="remember-me" 
                          className="text-sm text-stone-500 cursor-pointer"
                        >
                          Remember me
                        </Label>
                      </div>
                      <button 
                        type="button"
                        onClick={() => onViewChange('forgotPassword')}
                        className="text-sm text-orange-400 hover:text-orange-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                    
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      Sign In
                    </Button>
                  </form>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-stone-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-stone-500">or</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button"
                    className="w-full bg-stone-50 border border-stone-200 text-stone-900 hover:bg-stone-100 flex items-center justify-center space-x-2"
                    onClick={handleGoogleSignIn}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </Button>
                  

                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl text-stone-900">Join REPLATE</h3>
                    <p className="text-stone-500 mt-2">Create account to start making a difference</p>
                  </div>
                  
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-stone-900">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={loginData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-stone-900">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-stone-900">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm" className="text-stone-900">Confirm Password</Label>
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="Confirm your password"
                        value={loginData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      Create Account
                    </Button>
                  </form>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-stone-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-stone-500">or</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button"
                    className="w-full bg-stone-50 border border-stone-200 text-stone-900 hover:bg-stone-100 flex items-center justify-center space-x-2"
                    onClick={handleGoogleSignIn}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Sign up with Google</span>
                  </Button>
                  
                  <div className="text-center text-xs text-stone-500">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - Right Aligned */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Background 3D elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-orange-600/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-green-400/10 to-teal-600/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - 3D Illustration */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 bg-orange-50 backdrop-blur rounded-2xl border border-stone-200 flex items-center justify-center">
                {/* 3D geometric background */}
                <div className="absolute inset-4 border border-orange-400/20 rounded-xl transform rotate-6"></div>
                <div className="absolute inset-6 border border-blue-400/20 rounded-lg transform -rotate-3"></div>
                
                <div className="grid grid-cols-2 gap-6 p-8 relative z-10">
                  {/* 3D Food icons illustration */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-orange-500/30 rounded-xl flex items-center justify-center transform rotate-3">
                      <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-stone-500">Fresh Food</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-500/30 rounded-xl flex items-center justify-center transform -rotate-2">
                      <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-stone-500">Quality</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/30 rounded-xl flex items-center justify-center transform rotate-1">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-stone-500">Local</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/30 rounded-xl flex items-center justify-center transform -rotate-1">
                      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-stone-500">Community</span>
                  </div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 right-6 w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
              </div>
            </div>

            {/* Right side - About Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl text-stone-900 mb-6">
                  About REPLATE
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed mb-6">
                  We're on a mission to eliminate food waste while ensuring everyone in our communities 
                  has access to nutritious meals. Together, we're building a more sustainable and equitable food system.
                </p>
                <p className="text-stone-500 leading-relaxed">
                  India wastes an estimated 74 million tonnes of food annually, while approximately 172 million people 
                  remain undernourished. REPLATE bridges this gap by connecting those with excess food to those in need, 
                  creating stronger, more caring communities.
                </p>
              </div>

              {/* Values */}
              <div className="space-y-6">
                <h3 className="text-2xl text-stone-900">Our Values</h3>
                <div className="space-y-4">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-2 bg-orange-50 rounded-lg border border-stone-200">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="text-stone-900 mb-1">{value.title}</h4>
                        <p className="text-sm text-stone-500">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-4">
                <h3 className="text-xl text-stone-900">Ready to Make an Impact?</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={scrollToLoginSection}
                  >
                    Start Donating
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-orange-600 text-orange-400 hover:bg-orange-600/10"
                    onClick={scrollToLoginSection}
                  >
                    Find Food
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple */}
      <section className="py-20 px-4 bg-stone-50 relative overflow-hidden">
        {/* 3D Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-orange-400/10 to-orange-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gradient-to-br from-blue-400/10 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-10 w-24 h-24 border border-orange-400/20 rounded-lg rotate-45"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 border border-blue-400/20 rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl text-stone-900 mb-8">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 group">
              <div className="relative w-20 h-20 bg-orange-600/20 border border-orange-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="absolute inset-2 bg-orange-400/10 rounded-xl transform rotate-3"></div>
                <svg className="w-8 h-8 text-orange-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl text-stone-900">Sign Up</h3>
              <p className="text-stone-500">Create your account and choose your role in our community</p>
            </div>
            
            <div className="space-y-4 group">
              <div className="relative w-20 h-20 bg-blue-600/20 border border-blue-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="absolute inset-2 bg-blue-400/10 rounded-xl transform -rotate-2"></div>
                <svg className="w-8 h-8 text-blue-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl text-stone-900">Connect</h3>
              <p className="text-stone-500">Donors list available food, receivers browse what's available nearby</p>
            </div>
            
            <div className="space-y-4 group">
              <div className="relative w-20 h-20 bg-purple-600/20 border border-purple-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="absolute inset-2 bg-purple-400/10 rounded-xl transform rotate-1"></div>
                <svg className="w-8 h-8 text-purple-400 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3 className="text-xl text-stone-900">Share</h3>
              <p className="text-stone-500">Arrange safe pickup or delivery and make a difference together</p>
            </div>
          </div>
          
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
            <div className="flex justify-between items-center px-16">
              <div className="w-24 h-0.5 bg-gradient-to-r from-orange-400/50 to-blue-400/50"></div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400/50 to-purple-400/50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Section */}
      <section id="donor-section" className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-orange-600/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-green-400/10 to-teal-600/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-stone-900 mb-6">
              Share Your Extra Food
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Turn your surplus food into someone's meal. Join thousands of donors making a difference in their communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-stone-900 mb-2">List Your Food</h3>
                    <p className="text-stone-500">Upload photos, add descriptions, and set pickup times for your available food.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-stone-900 mb-2">Connect with Recipients</h3>
                    <p className="text-stone-500">Match with people in need and coordinate safe pickup or delivery options.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-stone-900 mb-2">Make an Impact</h3>
                    <p className="text-stone-500">Track your contributions and see how many families you've helped feed.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => scrollToSection('login-section')}
                >
                  Start Donating
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-orange-50 backdrop-blur border border-stone-200 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-stone-900 text-xl">🍕</span>
                    </div>
                    <div>
                      <h4 className="text-stone-900">Fresh Pizza Slices</h4>
                      <p className="text-stone-500 text-sm">8 slices • Expires in 4 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-stone-900 text-xl">🥗</span>
                    </div>
                    <div>
                      <h4 className="text-stone-900">Fresh Salad Bowls</h4>
                      <p className="text-stone-500 text-sm">12 bowls • Ready for pickup</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-stone-900 text-xl">🍞</span>
                    </div>
                    <div>
                      <h4 className="text-stone-900">Artisan Bread</h4>
                      <p className="text-stone-500 text-sm">6 loaves • Baked this morning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Receiver Section */}
      <section id="receiver-section" className="py-20 px-4 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-600/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-green-400/10 to-teal-600/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-stone-900 mb-6">
              Find Food Near You
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Discover available food donations in your community. Get access to fresh, nutritious meals with dignity and respect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="bg-white backdrop-blur border border-stone-200 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                        <span className="text-green-400">📍</span>
                      </div>
                      <div>
                        <p className="text-stone-900">0.8 km away</p>
                        <p className="text-stone-500 text-sm">Downtown Kitchen</p>
                      </div>
                    </div>
                    <span className="text-green-400 text-sm">⏰ 2h left</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-400">🏪</span>
                      </div>
                      <div>
                        <p className="text-stone-900">1.2 km away</p>
                        <p className="text-stone-500 text-sm">Local Bakery</p>
                      </div>
                    </div>
                    <span className="text-yellow-400 text-sm">⏲️ 6h left</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                        <span className="text-purple-400">🏠</span>
                      </div>
                      <div>
                        <p className="text-stone-900">2.1 km away</p>
                        <p className="text-stone-500 text-sm">Family Home</p>
                      </div>
                    </div>
                    <span className="text-green-400 text-sm">📅 2d left</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-stone-200">
                  <p className="text-center text-stone-500 text-sm">
                    🚀 Real-time updates • 📱 Mobile friendly • 🔔 Smart notifications
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-stone-900 mb-2">Browse Available Food</h3>
                    <p className="text-stone-500">Search by location, food type, or urgency to find meals that match your needs.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-stone-900 mb-2">Real-Time Tracking</h3>
                    <p className="text-stone-500">Get live updates on pickup times, queue positions, and food availability.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-stone-900 mb-2">Safe & Secure</h3>
                    <p className="text-stone-500">All food donations are verified, and pickup locations are safe and accessible.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-stone-900"
                  onClick={() => scrollToSection('login-section')}
                >
                  Find Food Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
