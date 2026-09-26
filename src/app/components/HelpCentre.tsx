import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface HelpCentreProps {
  onViewChange: (view: string) => void;
}

export default function HelpCentre({ onViewChange }: HelpCentreProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account on REPLATE?',
          a: 'Click on the "Get Started" button on the homepage. You\'ll need to provide basic information and verify your account through OTP. Organizations and wholesalers will need to upload additional documents for verification.'
        },
        {
          q: 'What types of users can join REPLATE?',
          a: 'REPLATE supports three user types: Individual donors/receivers, Organizations (restaurants, NGOs, community groups), and Wholesalers/Retailers. Each type has specific verification requirements.'
        },
        {
          q: 'Is REPLATE free to use?',
          a: 'Yes! REPLATE is completely free for both donors and receivers. Our mission is to reduce food waste and help communities, not to profit from them.'
        }
      ]
    },
    {
      category: 'For Donors',
      questions: [
        {
          q: 'What kind of food can I donate?',
          a: 'You can donate fresh produce, prepared meals, baked goods, packaged items, and pantry staples. All food should be safe for consumption and within expiry dates.'
        },
        {
          q: 'How do I list food for donation?',
          a: 'Go to the Donor Dashboard, click "Add New Listing", fill in details about the food (title, category, quantity, expiry date, pickup location), and submit. You can also scan barcodes for packaged items.'
        },
        {
          q: 'Can I withdraw a listing?',
          a: 'Yes, you can withdraw any listing from your dashboard. If there are active requests, you\'ll need to provide a reason for withdrawal to maintain transparency.'
        },
        {
          q: 'How does the verification process work?',
          a: 'When a receiver comes to collect food, they\'ll show you a QR code and 4-digit verification code. Scan the QR code or enter the code manually to confirm the pickup.'
        },
        {
          q: 'What happens after someone requests my food?',
          a: 'You\'ll receive a notification and the request will appear in your "Contact Requests" section. You can track the receiver\'s location, call them, or message them on WhatsApp to coordinate pickup.'
        }
      ]
    },
    {
      category: 'For Receivers',
      questions: [
        {
          q: 'How do I find available food?',
          a: 'Browse the Receiver Dashboard to see all available listings. You can search, filter by category, distance, or show only urgent listings that need immediate pickup.'
        },
        {
          q: 'What is the queue system?',
          a: 'When you request food, you join a queue. The system shows your position and gives you a pickup deadline. If you\'re #1 in queue, it\'s your turn to collect the food.'
        },
        {
          q: 'How do I get the QR code for pickup?',
          a: 'After your request is accepted, you\'ll receive a QR code and 4-digit verification code. Show this to the donor when collecting food to verify your identity.'
        },
        {
          q: 'Can I cancel a request?',
          a: 'Yes, you can cancel any request before pickup. Click the "Cancel" button and provide a reason. This helps maintain queue integrity for other receivers.'
        },
        {
          q: 'What if I can\'t pick up food in time?',
          a: 'Each request has a pickup deadline. If you can\'t make it in time, please cancel your request so others in the queue can get the food. Repeated no-shows may affect your account.'
        }
      ]
    },
    {
      category: 'Safety & Quality',
      questions: [
        {
          q: 'How do I know the food is safe?',
          a: 'All donors are verified, and we encourage honest listings with accurate expiry dates. Always check the food condition upon pickup and report any concerns through our platform.'
        },
        {
          q: 'What if the food doesn\'t match the description?',
          a: 'You have the right to refuse food that doesn\'t match the listing or appears unsafe. Report such incidents through the platform so we can take appropriate action.'
        },
        {
          q: 'Are there any food safety guidelines?',
          a: 'Yes! Check our Safety Guidelines page for comprehensive information on food handling, storage, transportation, and consumption best practices.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'What are SMS and WhatsApp alerts?',
          a: 'When a request is finalized, both donor and receiver receive automatic SMS and WhatsApp notifications with pickup details and contact information.'
        },
        {
          q: 'How does location tracking work?',
          a: 'Similar to ride-sharing apps, you can track the receiver\'s real-time location when they\'re on their way to pick up food. This feature requires location permissions.'
        },
        {
          q: 'I\'m not receiving notifications. What should I do?',
          a: 'Check your notification settings in your account. Ensure you\'ve granted necessary permissions for SMS and WhatsApp. Contact support if issues persist.'
        },
        {
          q: 'Can I use REPLATE on mobile?',
          a: 'Yes! REPLATE is fully responsive and works on all devices - smartphones, tablets, and desktop computers.'
        }
      ]
    },
    {
      category: 'Account Management',
      questions: [
        {
          q: 'How do I update my profile information?',
          a: 'Click on your account icon in the header to access your profile. From there, you can update your contact information, address, and other details.'
        },
        {
          q: 'What is account verification?',
          a: 'Verification helps build trust in our community. Individuals verify via OTP, while organizations and wholesalers need to upload official documents (licenses, registration certificates).'
        },
        {
          q: 'Can I be both a donor and receiver?',
          a: 'Yes! Many users both donate surplus food and receive food when needed. You can switch between roles from your account settings.'
        },
        {
          q: 'How do I view my donation/request history?',
          a: 'Access your history from the dashboard. Donors can see all past donations with details about receivers and impact. Receivers can view their request history with verification codes and pickup details.'
        }
      ]
    }
  ];

  const filteredFaqs = React.useMemo(() => {
    if (!searchQuery) return faqs;
    
    const query = searchQuery.toLowerCase();
    return faqs.map(category => ({
      ...category,
      questions: category.questions.filter(
        qa => qa.q.toLowerCase().includes(query) || qa.a.toLowerCase().includes(query)
      )
    })).filter(category => category.questions.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Help Centre</h1>
          <p className="text-stone-600 text-lg">Find answers to common questions about REPLATE</p>
        </div>

        {/* Search */}
        <Card className="mb-8 bg-white border-stone-200">
          <CardContent className="p-6">
            <div className="relative">
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-stone-50 border-stone-300 text-stone-900"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Card 
            className="bg-gradient-to-br from-orange-600/20 to-orange-500/20 border-orange-600/30 cursor-pointer hover:border-orange-500/50 transition-colors"
            onClick={() => onViewChange('safety')}
          >
            <CardContent className="p-6 text-center">
              <svg className="w-12 h-12 text-orange-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-stone-900 font-semibold mb-2">Safety Guidelines</h3>
              <p className="text-stone-600 text-sm">Learn about food safety</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-blue-600/20 to-blue-500/20 border-blue-600/30 cursor-pointer hover:border-blue-500/50 transition-colors"
            onClick={() => onViewChange('contact')}
          >
            <CardContent className="p-6 text-center">
              <svg className="w-12 h-12 text-blue-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-stone-900 font-semibold mb-2">Contact Us</h3>
              <p className="text-stone-600 text-sm">Get in touch with support</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-green-600/20 to-green-500/20 border-green-600/30 cursor-pointer hover:border-green-500/50 transition-colors"
            onClick={() => onViewChange('privacy')}
          >
            <CardContent className="p-6 text-center">
              <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="text-stone-900 font-semibold mb-2">Privacy Policy</h3>
              <p className="text-stone-600 text-sm">Your data and privacy</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          {filteredFaqs.map((category, catIndex) => (
            <Card key={catIndex} className="bg-white border-stone-200">
              <CardHeader>
                <CardTitle className="text-stone-900 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((qa, qaIndex) => (
                    <AccordionItem key={qaIndex} value={`item-${catIndex}-${qaIndex}`} className="border-stone-200">
                      <AccordionTrigger className="text-stone-900 hover:text-orange-400">
                        {qa.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-stone-600">
                        {qa.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <Card className="bg-white border-stone-200">
            <CardContent className="p-12 text-center">
              <svg className="w-16 h-16 text-stone-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl text-stone-500 mb-2">No results found</h3>
              <p className="text-stone-500">Try searching with different keywords</p>
            </CardContent>
          </Card>
        )}

        {/* Still Need Help */}
        <Card className="mt-8 bg-gradient-to-r from-orange-600/20 to-orange-500/20 border-orange-600/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-stone-900 mb-2">Still need help?</h3>
            <p className="text-stone-600 mb-4">Our support team is here to assist you</p>
            <button
              onClick={() => onViewChange('contact')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Contact Support
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
