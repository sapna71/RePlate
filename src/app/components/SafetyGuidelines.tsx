import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";

interface SafetyGuidelinesProps {
  onViewChange: (view: string) => void;
}

export default function SafetyGuidelines({ onViewChange }: SafetyGuidelinesProps) {
  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Safety Guidelines</h1>
          <p className="text-stone-600 text-lg">Important food safety and community guidelines for all users</p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8 bg-orange-900/20 border-orange-600/30">
          <svg className="h-5 w-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <AlertDescription className="text-orange-300 ml-2">
            Food safety is everyone's responsibility. Please read and follow these guidelines carefully to ensure safe food sharing.
          </AlertDescription>
        </Alert>

        {/* For Donors */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900 flex items-center space-x-2">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span>For Donors</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-stone-600">
            <div>
              <h3 className="text-stone-900 font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-stone-900 mr-3">1</span>
                Food Quality & Freshness
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-11">
                <li>Only donate food that you would feel comfortable eating yourself</li>
                <li>Ensure all food is within expiry dates or best-before dates</li>
                <li>Check for signs of spoilage before listing (smell, appearance, texture)</li>
                <li>Fresh produce should be free from mold, excessive bruising, or rot</li>
                <li>Cooked food should be donated within 2 hours of cooking or properly refrigerated</li>
              </ul>
            </div>

            <div>
              <h3 className="text-stone-900 font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-stone-900 mr-3">2</span>
                Storage & Handling
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-11">
                <li>Store all food at appropriate temperatures (refrigerated items below 4°C/40°F)</li>
                <li>Keep raw and cooked foods separate to prevent cross-contamination</li>
                <li>Use clean containers and packaging for food storage and transfer</li>
                <li>Maintain good personal hygiene when handling food</li>
                <li>Ensure your kitchen and preparation areas are clean</li>
              </ul>
            </div>

            <div>
              <h3 className="text-stone-900 font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-stone-900 mr-3">3</span>
                Accurate Listings
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-11">
                <li>Provide honest descriptions of the food condition</li>
                <li>List accurate expiry or best-before dates</li>
                <li>Mention any allergens or dietary information</li>
                <li>Include proper storage and reheating instructions if applicable</li>
                <li>Update or withdraw listings if food condition changes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-stone-900 font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-stone-900 mr-3">4</span>
                Pickup Safety
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-11">
                <li>Verify receiver identity using QR code or verification code</li>
                <li>Meet in safe, public locations when possible</li>
                <li>Follow COVID-19 and hygiene protocols</li>
                <li>Ensure proper packaging for transport</li>
                <li>Communicate any last-minute changes promptly</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* For Receivers */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900 flex items-center space-x-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>For Receivers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-stone-600">
            <div>
              <h3 className="text-stone-900 font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-stone-900 mr-3">1</span>
                Inspection Before Accepting
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-11">
                <li>Always inspect food before accepting it</li>
                <li>Check expiry dates and packaging integrity</li>
                <li>Look for signs of spoilage (unusual smell, color, texture)</li>
                <li>Verify the food matches the listing description</li>
                <li>Don't hesitate to refuse food that appears unsafe</li>
              </ul>
            </div>

            <div>
              <h3 className="text-stone-900 font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-stone-900 mr-3">2</span>
                Safe Transportation
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-11">
                <li>Bring appropriate containers or bags for food transport</li>
                <li>Use coolers or insulated bags for perishable items</li>
                <li>Transport food promptly to minimize time at unsafe temperatures</li>
                <li>Keep different food types separate during transport</li>
                <li>Refrigerate or freeze food immediately upon arriving home</li>
              </ul>
            </div>

            <div>
              <h3 className="text-stone-900 font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-stone-900 mr-3">3</span>
                Storage & Consumption
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-11">
                <li>Store food at appropriate temperatures immediately</li>
                <li>Consume fresh items within recommended timeframes</li>
                <li>Reheat cooked food to at least 75°C/165°F</li>
                <li>Follow any storage instructions provided by the donor</li>
                <li>When in doubt, throw it out - don't risk food poisoning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-stone-900 font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-stone-900 mr-3">4</span>
                Respectful Conduct
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-11">
                <li>Be punctual for pickup appointments</li>
                <li>Cancel requests if you can't make it to free up the queue</li>
                <li>Show your verification code/QR code to confirm identity</li>
                <li>Be courteous and respectful to donors</li>
                <li>Report any issues through the proper channels</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* General Safety Tips */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900 flex items-center space-x-2">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>General Safety for Everyone</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-stone-600">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="text-stone-900 font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Personal Safety
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Meet in well-lit, public places when possible</li>
                  <li>Let someone know where you're going</li>
                  <li>Trust your instincts - if something feels wrong, leave</li>
                  <li>Use the in-app communication features</li>
                </ul>
              </div>

              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="text-stone-900 font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Documentation
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Keep records of your donations/receipts</li>
                  <li>Use verification codes for all exchanges</li>
                  <li>Report issues immediately through the app</li>
                  <li>Save communication for your records</li>
                </ul>
              </div>

              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="text-stone-900 font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  COVID-19 Protocols
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Maintain social distancing during exchanges</li>
                  <li>Wear masks when appropriate</li>
                  <li>Use contactless handoff when possible</li>
                  <li>Sanitize hands before and after exchanges</li>
                </ul>
              </div>

              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="text-stone-900 font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Allergens & Dietary
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Always declare known allergens in listings</li>
                  <li>Ask about allergens if you have concerns</li>
                  <li>Respect dietary restrictions and preferences</li>
                  <li>Label food with ingredients when possible</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Food Safety Temperature Guide */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Temperature Safety Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                <span className="text-blue-300">Freezer</span>
                <span className="text-stone-900 font-semibold">-18°C (0°F) or below</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
                <span className="text-green-300">Refrigerator</span>
                <span className="text-stone-900 font-semibold">0-4°C (32-40°F)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
                <span className="text-orange-300">Danger Zone (avoid)</span>
                <span className="text-stone-900 font-semibold">4-60°C (40-140°F)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
                <span className="text-orange-300">Safe Reheating</span>
                <span className="text-stone-900 font-semibold">75°C (165°F) or above</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Issues */}
        <Card className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 border-orange-600/30">
          <CardContent className="p-8 text-center">
            <svg className="w-16 h-16 text-orange-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-semibold text-stone-900 mb-2">Report Safety Concerns</h3>
            <p className="text-stone-600 mb-4">
              If you encounter unsafe food or suspicious behavior, please report it immediately through our platform or contact support.
            </p>
            <button
              onClick={() => onViewChange('contact')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Report an Issue
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
