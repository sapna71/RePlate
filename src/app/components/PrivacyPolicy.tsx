import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PrivacyPolicyProps {
  onViewChange: (view: string) => void;
}

export default function PrivacyPolicy({ onViewChange }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Privacy Policy</h1>
          <p className="text-stone-600 text-lg">Last updated: October 5, 2025</p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardContent className="p-8 text-stone-600 space-y-4">
            <p>
              At REPLATE, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully to understand our practices regarding your personal data.
            </p>
            <p className="text-orange-400">
              By using REPLATE, you agree to the collection and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="text-stone-600 space-y-4">
            <div>
              <h3 className="text-stone-900 font-semibold mb-2">Personal Information</h3>
              <p className="mb-2">When you register on REPLATE, we collect:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Physical address for food pickup/delivery coordination</li>
                <li>User type (individual, organization, or wholesaler)</li>
                <li>For organizations: Business name, registration documents, licenses</li>
                <li>Profile photo (optional)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-stone-900 font-semibold mb-2">Usage Information</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Food listings (descriptions, photos, quantities, expiry dates)</li>
                <li>Request history and donation records</li>
                <li>Communication between donors and receivers</li>
                <li>Verification codes and QR code scans</li>
                <li>Location data (with your permission) for tracking and matching</li>
              </ul>
            </div>

            <div>
              <h3 className="text-stone-900 font-semibold mb-2">Technical Information</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Device information (type, operating system, browser)</li>
                <li>IP address and location data</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Log data (access times, pages viewed, app features used)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="text-stone-600 space-y-3">
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-stone-900">Service Delivery:</strong> To facilitate food donations and connect donors with receivers</li>
              <li><strong className="text-stone-900">Communication:</strong> To send SMS and WhatsApp notifications about requests, pickups, and important updates</li>
              <li><strong className="text-stone-900">Verification:</strong> To verify user identities and maintain platform trust and safety</li>
              <li><strong className="text-stone-900">Location Services:</strong> To show nearby food listings and enable real-time tracking during pickups</li>
              <li><strong className="text-stone-900">Analytics:</strong> To understand usage patterns and improve our services</li>
              <li><strong className="text-stone-900">Safety & Security:</strong> To prevent fraud, ensure food safety, and protect user safety</li>
              <li><strong className="text-stone-900">Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">How We Share Your Information</CardTitle>
          </CardHeader>
          <CardContent className="text-stone-600 space-y-4">
            <div>
              <h3 className="text-stone-900 font-semibold mb-2">With Other Users</h3>
              <p>When you participate in food sharing:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Donors see receiver names and limited contact information for accepted requests</li>
                <li>Receivers see donor names, business names (if applicable), and pickup locations</li>
                <li>Both parties can access WhatsApp numbers for communication about specific donations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-stone-900 font-semibold mb-2">With Service Providers</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>SMS and WhatsApp service providers for notifications</li>
                <li>Cloud hosting providers for data storage</li>
                <li>Analytics services to improve our platform</li>
                <li>Payment processors (if applicable for future premium features)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-stone-900 font-semibold mb-2">Legal Requirements</h3>
              <p>We may disclose your information if required by law or in response to valid requests by public authorities.</p>
            </div>

            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
              <p className="text-green-300">
                <strong>We never sell your personal information to third parties.</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Data Security</CardTitle>
          </CardHeader>
          <CardContent className="text-stone-600 space-y-3">
            <p>We implement industry-standard security measures to protect your data:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication with OTP verification</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information on a need-to-know basis</li>
              <li>Secure verification process for organizations and wholesalers</li>
            </ul>
            <p className="text-yellow-400 text-sm mt-4">
              While we strive to protect your data, no method of transmission over the internet is 100% secure. Use the platform responsibly and report any security concerns immediately.
            </p>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent className="text-stone-600 space-y-3">
            <p>You have the following rights regarding your personal data:</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="text-stone-900 font-semibold mb-2">Access</h4>
                <p className="text-sm">Request access to your personal data we hold</p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="text-stone-900 font-semibold mb-2">Correction</h4>
                <p className="text-sm">Update or correct inaccurate information</p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="text-stone-900 font-semibold mb-2">Deletion</h4>
                <p className="text-sm">Request deletion of your account and data</p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="text-stone-900 font-semibold mb-2">Opt-out</h4>
                <p className="text-sm">Control notification preferences and data sharing</p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="text-stone-900 font-semibold mb-2">Data Export</h4>
                <p className="text-sm">Download your data in a portable format</p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="text-stone-900 font-semibold mb-2">Withdraw Consent</h4>
                <p className="text-sm">Revoke consent for optional data processing</p>
              </div>
            </div>
            <p className="mt-4">
              To exercise these rights, please contact us at <span className="text-orange-400">privacy@replate.org</span>
            </p>
          </CardContent>
        </Card>

        {/* Location Data */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Location Data & Tracking</CardTitle>
          </CardHeader>
          <CardContent className="text-stone-600 space-y-3">
            <p>REPLATE uses location data to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Show you nearby food listings based on distance</li>
              <li>Enable real-time tracking during food pickup (similar to ride-sharing apps)</li>
              <li>Improve matching between donors and receivers</li>
            </ul>
            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4 mt-4">
              <p className="text-blue-300">
                <strong>You control location sharing:</strong> You can enable or disable location services in your device settings at any time. Disabling location will limit some features but you can still use core REPLATE functions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="text-stone-600">
            <p>
              REPLATE is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="text-stone-600 space-y-3">
            <p>We retain your personal data for as long as necessary to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Maintain donation history for impact tracking</li>
            </ul>
            <p className="mt-3">
              When you delete your account, we will remove or anonymize your personal data within 30 days, except where retention is required by law.
            </p>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Cookies & Tracking Technologies</CardTitle>
          </CardHeader>
          <CardContent className="text-stone-600 space-y-3">
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze platform usage</li>
              <li>Improve user experience</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Note that disabling cookies may affect platform functionality.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardHeader>
            <CardTitle className="text-stone-900">Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-stone-600">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically for any changes.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 border-orange-600/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-stone-900 mb-2">Questions About Privacy?</h3>
            <p className="text-stone-600 mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-stone-600">
              <p><strong className="text-stone-900">Email:</strong> privacy@replate.org</p>
              <p><strong className="text-stone-900">Phone:</strong> +1 (800) FOOD-SHARE</p>
              <p><strong className="text-stone-900">Address:</strong> 123 Community Street, San Francisco, CA 94102</p>
            </div>
            <button
              onClick={() => onViewChange('contact')}
              className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Contact Us
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
