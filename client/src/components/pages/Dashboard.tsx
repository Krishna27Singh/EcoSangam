
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Car, Home, Plane, Utensils, Globe, Target, Zap, Loader2 } from 'lucide-react';
import { toast } from "sonner";

export const Dashboard = () => {
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [sustainabilityTip, setSustainabilityTip] = useState('');

  const monthlyEmissions = [
    { month: 'Jan', emissions: 2.4 },
    { month: 'Feb', emissions: 2.1 },
    { month: 'Mar', emissions: 2.8 },
    { month: 'Apr', emissions: 2.3 },
    { month: 'May', emissions: 1.9 },
    { month: 'Jun', emissions: 2.0 },
  ];

  const categories = [
    { name: 'Transportation', icon: Car, emissions: 1.2, percentage: 45, color: 'text-blue-400' },
    { name: 'Food', icon: Utensils, emissions: 0.8, percentage: 30, color: 'text-green-400' },
    { name: 'Home Energy', icon: Home, emissions: 0.5, percentage: 18, color: 'text-purple-400' },
    { name: 'Purchases', icon: Zap, emissions: 0.2, percentage: 7, color: 'text-orange-400' },
  ];

  const ecoGoals = [
    { goal: 'Bike to work 3x this week', progress: 66, streak: 2, target: 3 },
    { goal: 'Zero plastic for 7 days', progress: 43, streak: 3, target: 7 },
    { goal: 'Reduce energy by 20%', progress: 85, streak: 12, target: 30 },
  ];

  const fetchSustainabilityTip = async () => {
    setIsLoadingTip(true);
    try {
      const backendUri = import.meta.env.VITE_BACKEND_URI;
      if (!backendUri) {
        throw new Error('Backend URI not configured');
      }

      const response = await fetch(`${backendUri}/api/tips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Give me one detailed, everyday sustainability tip that is practical and easy to follow. The tip should not be concise—explain the reasoning behind it, how it positively impacts the environment, and offer actionable steps to implement it in daily life. Keep the response clear, educational, and under 100 words. Avoid technical jargon. This is meant for a general audience trying to adopt eco-friendly habits.'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sustainability tip');
      }

      const data = await response.json();
      setSustainabilityTip(data.tip || data.response || 'No tip received');
      toast.success('New sustainability tip generated!');
    } catch (error) {
      console.error('Error fetching sustainability tip:', error);
      toast.error('Failed to get sustainability tip. Please try again.');
    } finally {
      setIsLoadingTip(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-roboto-condensed">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#e5e1d8] mb-2 uppercase tracking-wide">YOUR CARBON DASHBOARD</h1>
          <p className="text-[#e5e1d8] text-lg opacity-90 uppercase">TRACK YOUR ENVIRONMENTAL IMPACT AND PROGRESS</p>
        </div>

        {/* AI Sustainability Tip Section */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide flex items-center">
              <Target className="w-5 h-5 mr-2" />
              AI SUSTAINABILITY COACH
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={fetchSustainabilityTip}
              disabled={isLoadingTip}
              className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold tracking-wide mb-4"
            >
              {isLoadingTip ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  GETTING TIP...
                </>
              ) : (
                'GET AI BASED SUSTAINABILITY TIP'
              )}
            </Button>
            {sustainabilityTip && (
              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <p className="text-[#e5e1d8] leading-relaxed">{sustainabilityTip}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily/Weekly Carbon Footprint */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-[#e5e1d8] flex items-center uppercase font-semibold tracking-wide">
              
              🌍 YOUR DAILY CARBON FOOTPRINT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#e5e1d8] mb-2">3.2 KG</div>
                  <p className="text-[#e5e1d8] opacity-80 uppercase text-sm">CO₂ TODAY</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm uppercase">↓ 0.3kg from yesterday</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#e5e1d8] mb-2">19.8 KG</div>
                  <p className="text-[#e5e1d8] opacity-80 uppercase text-sm">CO₂ THIS WEEK</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-blue-400 mr-1" />
                    <span className="text-blue-400 text-sm uppercase">↑ 1.2kg from last week</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] flex items-center uppercase font-semibold tracking-wide">
                <TrendingUp className="w-5 h-5 mr-2" />
                MONTHLY TOTAL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-300 mb-2 uppercase">2.8 TONS</div>
              <CardDescription className="text-[#e5e1d8] opacity-80 uppercase text-sm">CO₂ EQUIVALENT THIS MONTH</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] flex items-center uppercase font-semibold tracking-wide">
                <TrendingDown className="w-5 h-5 mr-2 text-blue-400" />
                VS LAST MONTH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400 mb-2 uppercase">-12%</div>
              <CardDescription className="text-green-300 uppercase text-sm">YOU'RE IMPROVING!</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide">GLOBAL AVERAGE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#e5e1d8] mb-2 uppercase">4.1 TONS</div>
              <CardDescription className="text-green-300 uppercase text-sm">YOU'RE 32% BELOW AVERAGE</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enhanced Emissions by Category */}
          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide">
                📊 EMISSIONS BY CATEGORY
              </CardTitle>
              <CardDescription className="text-[#e5e1d8] opacity-80 uppercase">BREAKDOWN OF YOUR CARBON FOOTPRINT</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${category.color}`} />
                        <span className="text-sm font-medium text-[#e5e1d8] uppercase">{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-white/10 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              category.color === 'text-blue-400' ? 'bg-blue-400' :
                              category.color === 'text-green-400' ? 'bg-green-400' :
                              category.color === 'text-purple-400' ? 'bg-purple-400' : 'bg-orange-400'
                            }`}
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#e5e1d8] w-16 uppercase">{category.percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Text-based accessibility summary */}
              <div className="mt-4 p-3 bg-white/10 rounded border border-white/20">
                <p className="text-[#e5e1d8] text-sm">
                  <span className="font-semibold uppercase">Summary:</span> Transportation: 45%, Food: 30%, Energy: 18%, Purchases: 7%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide">MONTHLY TREND</CardTitle>
              <CardDescription className="text-[#e5e1d8] opacity-80 uppercase">YOUR CARBON EMISSIONS OVER TIME</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyEmissions.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#e5e1d8] uppercase">{month.month}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(month.emissions / 3) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-green-300 w-16 uppercase">{month.emissions}T</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Eco Goals + Streaks */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide flex items-center">
              <Target className="w-5 h-5 mr-2" />
              🎯 ECO GOALS + STREAKS
            </CardTitle>
            <CardDescription className="text-[#e5e1d8] opacity-80 uppercase">YOUR SUSTAINABILITY CHALLENGES</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {ecoGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#e5e1d8] font-medium uppercase text-sm">{goal.goal}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#e5e1d8] text-sm">🔥 {goal.streak} day streak</span>
                    </div>
                  </div>
                  <Progress 
                    value={goal.progress} 
                    className="h-3 bg-white/10"
                  />
                  <div className="flex justify-between text-xs text-[#e5e1d8] opacity-80 uppercase">
                    <span>{goal.progress}% Complete</span>
                    <span>Target: {goal.target} days</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;