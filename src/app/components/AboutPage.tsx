import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutPageProps {
  onViewChange: (view: string) => void;
}

export default function AboutPage({ onViewChange }: AboutPageProps) {
  const values = [
    {
      icon: <svg className="h-8 w-8 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>,
      title: "Community Care",
      description: "We believe in the power of community to support one another and create positive change."
    },
    {
      icon: <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 7 7" />
      </svg>,
      title: "Environmental Responsibility",
      description: "Reducing food waste helps protect our planet and creates a more sustainable future."
    },
    {
      icon: <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>,
      title: "Dignity & Respect",
      description: "Everyone deserves access to nutritious food with dignity, regardless of their circumstances."
    },
    {
      icon: <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>,
      title: "Local Impact",
      description: "We focus on creating meaningful impact within local communities and neighborhoods."
    }
  ];

  const stats = [
    { icon: <svg className="h-12 w-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>, number: "1.2M", label: "People Fed" },
    { icon: <svg className="h-12 w-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 7 7" />
    </svg>, number: "500K", label: "Pounds Rescued" },
    { icon: <svg className="h-12 w-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>, number: "50+", label: "Cities Served" },
    { icon: <svg className="h-12 w-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>, number: "98%", label: "User Satisfaction" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Former food policy researcher passionate about ending hunger and waste.",
      image: "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzJTIwaGVscGluZ3xlbnwxfHx8fDE3NTcwNjIxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Miguel Rodriguez",
      role: "Head of Technology",
      description: "Tech entrepreneur dedicated to using innovation for social good.",
      image: "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzJTIwaGVscGluZ3xlbnwxfHx8fDE3NTcwNjIxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Dr. Priya Patel",
      role: "Community Outreach Director",
      description: "Community organizer with 15 years of experience in food security programs.",
      image: "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzJTIwaGVscGluZ3xlbnwxfHx8fDE3NTcwNjIxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 relative overflow-hidden">
      {/* Background 3D elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-orange-600/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-600/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-green-400/10 to-teal-600/20 rounded-full blur-xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
            About REPLATE
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed mb-8">
            We're on a mission to eliminate food waste while ensuring everyone in our communities 
            has access to nutritious meals. Together, we're building a more sustainable and equitable food system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={() => onViewChange('donate')}
            >
              Join Our Mission
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-stone-300 text-stone-600 hover:bg-stone-100"
              onClick={() => onViewChange('home')}
            >
              Learn How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="relative z-10 py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-6">
                The Problem We're Solving
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Food Waste Crisis</h3>
                  <p className="text-stone-600">
                    India wastes an estimated 74 million tonnes of food annually. At the same time, the SOFI 2025 report from the UN indicates that approximately 172 million people in India are undernourished. This massive contradiction is exacerbated by significant post-harvest losses and a lack of proper storage and transportation, which can account for up to 33% of the total food loss for some crops.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Food Insecurity</h3>
                  <p className="text-stone-600">
                    Millions of families struggle to put food on the table, especially fresh, 
                    nutritious options that support healthy living.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Disconnected Communities</h3>
                  <p className="text-stone-600">
                    Those with excess food often don't know how to connect with those in need, 
                    leading to missed opportunities for mutual aid.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1593113702251-272b1bc414a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBjaGFyaXR5JTIwaGVscGluZ3xlbnwxfHx8fDE3NTcwNjIxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Food donation and community support"
                className="w-full h-96 object-cover rounded-2xl shadow-xl border border-stone-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative z-10 py-20 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-stone-600">
              Together, we're making a real difference in communities across the country
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white backdrop-blur border-stone-200">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-stone-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-stone-500">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative z-10 py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-stone-600">
              These principles guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-stone-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-20 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-stone-600">
              Passionate individuals working to create positive change
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white backdrop-blur border-stone-200 overflow-hidden">
                <div className="aspect-square">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-stone-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-orange-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-stone-600">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 px-4 bg-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-6">
            Ready to Join the Movement?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Whether you have food to share or need support, you have a place in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-3"
              onClick={() => onViewChange('donate')}
            >
              Become a Donor
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-3 border-white text-stone-900 hover:bg-white hover:text-orange-600"
              onClick={() => onViewChange('receive')}
            >
              Find Food
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}