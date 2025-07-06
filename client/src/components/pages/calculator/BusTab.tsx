
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BusTabProps {
  onResultUpdate: (value: number) => void;
}

export const BusTab: React.FC<BusTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    milesPerWeek: '',
    milesPerYear: ''
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    const weeklyMiles = Number(data.milesPerWeek);
    const yearlyMiles = Number(data.milesPerYear);
    const totalMiles = (weeklyMiles * 52) + yearlyMiles;
    
    // Bus emission factor: 0.64 kg CO2 per mile per passenger
    const totalEmissions = totalMiles * 0.64 / 1000; // Convert to tons
    
    setResult(Math.round(totalEmissions * 100) / 100);
    onResultUpdate(Math.round(totalEmissions * 100) / 100);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-green-200/20">
      <CardHeader>
        <CardTitle className="text-[#e5e1d8] text-2xl uppercase tracking-wide">
          BUS TRANSPORTATION
        </CardTitle>
        <CardDescription className="text-[#e5e1d8]/80">
          Calculate emissions from bus travel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="milesPerWeek" className="text-[#e5e1d8] font-semibold uppercase">
              MILES PER WEEK (local/commute)
            </Label>
            <Input
              id="milesPerWeek"
              type="number"
              placeholder="e.g., 50"
              value={data.milesPerWeek}
              onChange={(e) => setData({...data, milesPerWeek: e.target.value})}
              className="bg-white/10 border-green-300/30 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
            />
          </div>
          <div>
            <Label htmlFor="milesPerYear" className="text-[#e5e1d8] font-semibold uppercase">
              ADDITIONAL MILES PER YEAR (long distance)
            </Label>
            <Input
              id="milesPerYear"
              type="number"
              placeholder="e.g., 500"
              value={data.milesPerYear}
              onChange={(e) => setData({...data, milesPerYear: e.target.value})}
              className="bg-white/10 border-green-300/30 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
            />
          </div>
        </div>

        <Button 
          onClick={calculateEmissions}
          className="w-full bg-green-600 hover:bg-green-700 text-white uppercase font-semibold"
        >
          CALCULATE BUS EMISSIONS
        </Button>

        {result > 0 && (
          <div className="bg-green-600/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
              BUS TRANSPORTATION FOOTPRINT
            </h3>
            <div className="text-3xl font-bold text-green-300 mb-2">{result} tons</div>
            <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent per year</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
