
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, TrendingDown, Users, Award } from 'lucide-react';

export const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
          Track Your Carbon Footprint
        </h1>
        <p className="text-xl text-green-600 max-w-2xl mx-auto">
          Join millions in the fight against climate change. Monitor, reduce, and offset your environmental impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Leaf className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-green-800">Track Daily</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-green-600">
              Monitor your daily activities and their environmental impact
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <TrendingDown className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-green-800">Reduce Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-green-600">
              Get personalized tips to reduce your carbon footprint
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-2" />
            <CardTitle className="text-green-800">Community</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-green-600">
              Connect with eco-conscious individuals worldwide
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Award className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
            <CardTitle className="text-green-800">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-green-600">
              Earn badges and rewards for sustainable choices
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Make a Difference?</CardTitle>
            <CardDescription className="text-green-100">
              Start tracking your carbon footprint today and join the global movement for a sustainable future.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
