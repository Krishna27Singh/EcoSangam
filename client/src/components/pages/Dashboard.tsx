
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Car, Home, Plane, Utensils } from 'lucide-react';

export const Dashboard = () => {
  const monthlyEmissions = [
    { month: 'Jan', emissions: 2.4 },
    { month: 'Feb', emissions: 2.1 },
    { month: 'Mar', emissions: 2.8 },
    { month: 'Apr', emissions: 2.3 },
    { month: 'May', emissions: 1.9 },
    { month: 'Jun', emissions: 2.0 },
  ];

  const categories = [
    { name: 'Transportation', icon: Car, emissions: 1.2, color: 'text-blue-600' },
    { name: 'Home Energy', icon: Home, emissions: 0.8, color: 'text-green-600' },
    { name: 'Travel', icon: Plane, emissions: 0.3, color: 'text-purple-600' },
    { name: 'Food', icon: Utensils, emissions: 0.5, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-transparent font-roboto-condensed">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#e5e1d8] mb-2 uppercase tracking-wide">YOUR CARBON DASHBOARD</h1>
          <p className="text-[#e5e1d8] text-lg opacity-90 uppercase">TRACK YOUR ENVIRONMENTAL IMPACT AND PROGRESS</p>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide">EMISSIONS BY CATEGORY</CardTitle>
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
                              category.color === 'text-blue-600' ? 'bg-blue-500' :
                              category.color === 'text-green-600' ? 'bg-green-500' :
                              category.color === 'text-purple-600' ? 'bg-purple-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${(category.emissions / 1.5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-green-300 w-12 uppercase">{category.emissions}T</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
