
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Home, Plane, Utensils } from 'lucide-react';

export const CarbonCalculator = () => {
  const [transport, setTransport] = useState({ car: '', bus: '', bike: '' });
  const [energy, setEnergy] = useState({ electricity: '', gas: '', heating: '' });
  const [travel, setTravel] = useState({ flights: '', distance: '' });
  const [food, setFood] = useState({ meat: '', dairy: '', local: '' });
  const [result, setResult] = useState<number | null>(null);

  const calculateFootprint = () => {
    // Simple calculation logic (in a real app, use proper emission factors)
    const transportEmissions = (Number(transport.car) * 0.4) + (Number(transport.bus) * 0.1);
    const energyEmissions = (Number(energy.electricity) * 0.5) + (Number(energy.gas) * 0.2);
    const travelEmissions = Number(travel.flights) * 0.9;
    const foodEmissions = (Number(food.meat) * 0.3) + (Number(food.dairy) * 0.1);
    
    const total = transportEmissions + energyEmissions + travelEmissions + foodEmissions;
    setResult(Math.round(total * 100) / 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Carbon Footprint Calculator</h1>
        <p className="text-green-600">Calculate your environmental impact</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Transportation
              </CardTitle>
              <CardDescription>Weekly transportation habits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="car">Miles driven by car per week</Label>
                <Input
                  id="car"
                  type="number"
                  placeholder="e.g., 100"
                  value={transport.car}
                  onChange={(e) => setTransport({...transport, car: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="bus">Miles by public transport per week</Label>
                <Input
                  id="bus"
                  type="number"
                  placeholder="e.g., 50"
                  value={transport.bus}
                  onChange={(e) => setTransport({...transport, bus: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Home Energy
              </CardTitle>
              <CardDescription>Monthly energy consumption</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="electricity">Electricity (kWh/month)</Label>
                <Input
                  id="electricity"
                  type="number"
                  placeholder="e.g., 300"
                  value={energy.electricity}
                  onChange={(e) => setEnergy({...energy, electricity: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="gas">Natural Gas (therms/month)</Label>
                <Input
                  id="gas"
                  type="number"
                  placeholder="e.g., 50"
                  value={energy.gas}
                  onChange={(e) => setEnergy({...energy, gas: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Plane className="w-5 h-5 mr-2" />
                Air Travel
              </CardTitle>
              <CardDescription>Annual air travel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="flights">Number of flights per year</Label>
                <Input
                  id="flights"
                  type="number"
                  placeholder="e.g., 4"
                  value={travel.flights}
                  onChange={(e) => setTravel({...travel, flights: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Utensils className="w-5 h-5 mr-2" />
                Diet
              </CardTitle>
              <CardDescription>Weekly food consumption</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meat">Servings of meat per week</Label>
                <Input
                  id="meat"
                  type="number"
                  placeholder="e.g., 7"
                  value={food.meat}
                  onChange={(e) => setFood({...food, meat: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="dairy">Servings of dairy per week</Label>
                <Input
                  id="dairy"
                  type="number"
                  placeholder="e.g., 10"
                  value={food.dairy}
                  onChange={(e) => setFood({...food, dairy: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={calculateFootprint}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Calculate My Footprint
          </Button>

          {result !== null && (
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardHeader>
                <CardTitle>Your Carbon Footprint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{result} tons</div>
                  <p className="text-green-100">CO₂ equivalent per year</p>
                  <p className="text-sm text-green-100 mt-4">
                    {result < 4 ? "Great job! You're below average." : 
                     result < 8 ? "Good, but there's room for improvement." : 
                     "Consider reducing your environmental impact."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
