import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface AccountSettingsProps {
  userType: 'donor' | 'receiver';
}

export default function AccountSettings({ userType }: AccountSettingsProps) {
  const [settings, setSettings] = React.useState({
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    newRequestAlerts: true,
    pickupReminders: true,
    urgentListingAlerts: true,
    
    // Privacy Settings
    shareLocation: true,
    showPhoneNumber: true,
    profileVisibility: 'public' as 'public' | 'verified-only' | 'private',
    
    // Preference Settings
    language: 'en',
    distanceUnit: 'km' as 'km' | 'miles',
    autoAcceptRequests: false,
    
    // Display Settings
    theme: 'dark' as 'dark' | 'light' | 'auto',
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // In real app, save to backend
    console.log('Saving settings:', settings);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-stone-900">Account Settings</h1>
          <p className="text-stone-500 mt-2">Manage your account preferences and settings.</p>
        </div>

        {/* Notification Settings */}
        <Card className="mb-6 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="text-stone-600">Email Notifications</Label>
                <p className="text-sm text-stone-500">Receive updates and alerts via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications" className="text-stone-600">SMS Notifications</Label>
                <p className="text-sm text-stone-500">Get text messages for important updates</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pushNotifications" className="text-stone-600">Push Notifications</Label>
                <p className="text-sm text-stone-500">Receive browser push notifications</p>
              </div>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>

            {userType === 'donor' && (
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newRequestAlerts" className="text-stone-600">New Request Alerts</Label>
                  <p className="text-sm text-stone-500">Get notified when someone requests your food</p>
                </div>
                <Switch
                  id="newRequestAlerts"
                  checked={settings.newRequestAlerts}
                  onCheckedChange={(checked) => handleSettingChange('newRequestAlerts', checked)}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pickupReminders" className="text-stone-600">Pickup Reminders</Label>
                <p className="text-sm text-stone-500">Remind me before pickup deadlines</p>
              </div>
              <Switch
                id="pickupReminders"
                checked={settings.pickupReminders}
                onCheckedChange={(checked) => handleSettingChange('pickupReminders', checked)}
              />
            </div>

            {userType === 'receiver' && (
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="urgentListingAlerts" className="text-stone-600">Urgent Listing Alerts</Label>
                  <p className="text-sm text-stone-500">Get notified about urgent food listings near you</p>
                </div>
                <Switch
                  id="urgentListingAlerts"
                  checked={settings.urgentListingAlerts}
                  onCheckedChange={(checked) => handleSettingChange('urgentListingAlerts', checked)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="mb-6 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="shareLocation" className="text-stone-600">Share Location</Label>
                <p className="text-sm text-stone-500">Allow others to see your approximate location</p>
              </div>
              <Switch
                id="shareLocation"
                checked={settings.shareLocation}
                onCheckedChange={(checked) => handleSettingChange('shareLocation', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showPhoneNumber" className="text-stone-600">Show Phone Number</Label>
                <p className="text-sm text-stone-500">Display your phone number to verified users</p>
              </div>
              <Switch
                id="showPhoneNumber"
                checked={settings.showPhoneNumber}
                onCheckedChange={(checked) => handleSettingChange('showPhoneNumber', checked)}
              />
            </div>

            <div>
              <Label htmlFor="profileVisibility" className="text-stone-600 mb-2 block">Profile Visibility</Label>
              <Select 
                value={settings.profileVisibility} 
                onValueChange={(value: 'public' | 'verified-only' | 'private') => handleSettingChange('profileVisibility', value)}
              >
                <SelectTrigger className="bg-stone-50 border-stone-300 text-stone-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public - Everyone can see my profile</SelectItem>
                  <SelectItem value="verified-only">Verified Only - Only verified users</SelectItem>
                  <SelectItem value="private">Private - Hidden from search</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="mb-6 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="language" className="text-stone-600 mb-2 block">Language</Label>
              <Select 
                value={settings.language} 
                onValueChange={(value) => handleSettingChange('language', value)}
              >
                <SelectTrigger className="bg-stone-50 border-stone-300 text-stone-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="distanceUnit" className="text-stone-600 mb-2 block">Distance Unit</Label>
              <Select 
                value={settings.distanceUnit} 
                onValueChange={(value: 'km' | 'miles') => handleSettingChange('distanceUnit', value)}
              >
                <SelectTrigger className="bg-stone-50 border-stone-300 text-stone-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">Kilometers (km)</SelectItem>
                  <SelectItem value="miles">Miles (mi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {userType === 'donor' && (
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoAcceptRequests" className="text-stone-600">Auto-Accept First Request</Label>
                  <p className="text-sm text-stone-500">Automatically accept the first request for your listings</p>
                </div>
                <Switch
                  id="autoAcceptRequests"
                  checked={settings.autoAcceptRequests}
                  onCheckedChange={(checked) => handleSettingChange('autoAcceptRequests', checked)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="mb-6 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Display Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="theme" className="text-stone-600 mb-2 block">Theme</Label>
              <Select 
                value={settings.theme} 
                onValueChange={(value: 'dark' | 'light' | 'auto') => handleSettingChange('theme', value)}
              >
                <SelectTrigger className="bg-stone-50 border-stone-300 text-stone-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="auto">Auto (System Default)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card className="mb-6 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Account Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full border-stone-300 text-stone-600 hover:bg-stone-100">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Change Password
            </Button>

            <Button variant="outline" className="w-full border-stone-300 text-stone-600 hover:bg-stone-100">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Export My Data
            </Button>

            <Button variant="outline" className="w-full border-orange-600 text-orange-400 hover:bg-orange-600/20">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="border-stone-300 text-stone-600 hover:bg-stone-100">
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings} className="bg-orange-600 hover:bg-orange-700 text-white">
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
