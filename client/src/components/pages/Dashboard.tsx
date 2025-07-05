
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Your Carbon Dashboard</h1>
        <p className="text-green-600">Track your environmental impact and progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Monthly Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">2.8 tons</div>
            <CardDescription className="text-green-500">CO₂ equivalent this month</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-blue-600" />
              vs Last Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">-12%</div>
            <CardDescription className="text-green-500">You're improving!</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Global Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-600 mb-2">4.1 tons</div>
            <CardDescription className="text-green-500">You're 32% below average</CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Monthly Trend</CardTitle>
            <CardDescription>Your carbon emissions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyEmissions.map((month, index) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700">{month.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-green-100 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(month.emissions / 3) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-green-600 w-16">{month.emissions}t</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Emissions by Category</CardTitle>
            <CardDescription>Breakdown of your carbon footprint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${category.color}`} />
                      <span className="text-sm font-medium text-green-700">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            category.color === 'text-blue-600' ? 'bg-blue-600' :
                            category.color === 'text-green-600' ? 'bg-green-600' :
                            category.color === 'text-purple-600' ? 'bg-purple-600' : 'bg-orange-600'
                          }`}
                          style={{ width: `${(category.emissions / 1.5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-green-600 w-12">{category.emissions}t</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
