
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Target, Users, Award } from 'lucide-react';

export const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">About EcoTracker</h1>
        <p className="text-xl text-green-600 max-w-3xl mx-auto">
          We're on a mission to make carbon footprint tracking accessible, engaging, and impactful for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <Target className="w-12 h-12 text-green-600 mb-4" />
            <CardTitle className="text-green-800">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-green-600 text-base">
              To empower individuals and communities to reduce their environmental impact through 
              easy-to-use tracking tools, personalized insights, and collective action.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <Leaf className="w-12 h-12 text-blue-600 mb-4" />
            <CardTitle className="text-green-800">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-green-600 text-base">
              A world where every person is conscious of their environmental impact and 
              empowered to make sustainable choices that protect our planet for future generations.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-8">Why Carbon Tracking Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-green-800">Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-green-600">
                Individual actions add up. When millions track and reduce their footprint, 
                we create meaningful global change.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader className="text-center">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <CardTitle className="text-green-800">Personal Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-green-600">
                Understanding your impact helps you make informed decisions and 
                develop sustainable habits that benefit both you and the planet.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader className="text-center">
              <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-green-800">Future Generations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-green-600">
                By reducing our carbon footprint today, we preserve a healthy, 
                sustainable world for our children and their children.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-4">Join the Movement</CardTitle>
          <CardDescription className="text-green-100 text-lg">
            Every step towards sustainability matters. Start your journey today and be part of the solution.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="text-3xl font-bold">500K+</div>
              <div className="text-green-100">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold">2M+</div>
              <div className="text-green-100">Tons CO₂ Reduced</div>
            </div>
            <div>
              <div className="text-3xl font-bold">150+</div>
              <div className="text-green-100">Countries</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
