
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MotorbikeTabProps {
  onResultUpdate: (value: number) => void;
}

export const MotorbikeTab: React.FC<MotorbikeTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    milesPerYear: '',
    bikeType: 'standard',
    fuelEfficiency: ''
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    const miles = Number(data.milesPerYear);
    const mpg = Number(data.fuelEfficiency) || getDefaultMPG(data.bikeType);
    
    if (miles === 0 || mpg === 0) {
      setResult(0);
      onResultUpdate(0);
      return;
    }

    const gallonsUsed = miles / mpg;
    const totalEmissions = gallonsUsed * 8.89 / 1000; // kg CO2 per gallon gasoline, convert to tons
    
    setResult(Math.round(totalEmissions * 100) / 100);
    onResultUpdate(Math.round(totalEmissions * 100) / 100);
  };

  const getDefaultMPG = (bikeType: string) => {
    const defaultMPG = {
      standard: 45,
      sport: 35,
      touring: 40,
      scooter: 80
    };
    return defaultMPG[bikeType as keyof typeof defaultMPG] || 45;
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-green-200/20">
      <CardHeader>
        <CardTitle className="text-[#e5e1d8] text-2xl uppercase tracking-wide">
          MOTORBIKE TRANSPORTATION
        </CardTitle>
        <CardDescription className="text-[#e5e1d8]/80">
          Calculate emissions from motorcycle/scooter use
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="milesPerYear" className="text-[#e5e1d8] font-semibold uppercase">
                MILES PER YEAR
              </Label>
              <Input
                id="milesPerYear"
                type="number"
                placeholder="e.g., 3000"
                value={data.milesPerYear}
                onChange={(e) => setData({...data, milesPerYear: e.target.value})}
                className="bg-white/10 border-green-300/30 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
              />
            </div>
            
            <div>
              <Label htmlFor="fuelEfficiency" className="text-[#e5e1d8] font-semibold uppercase">
                FUEL EFFICIENCY (MPG)
              </Label>
              <Input
                id="fuelEfficiency"
                type="number"
                placeholder={`Default: ${getDefaultMPG(data.bikeType)} MPG`}
                value={data.fuelEfficiency}
                onChange={(e) => setData({...data, fuelEfficiency: e.target.value})}
                className="bg-white/10 border-green-300/30 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-[#e5e1d8] font-semibold uppercase">
              BIKE TYPE
            </Label>
            <Select value={data.bikeType} onValueChange={(value) => setData({...data, bikeType: value})}>
              <SelectTrigger className="bg-white/10 border-green-300/30 text-[#e5e1d8]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-green-800 border-green-600">
                <SelectItem value="standard" className="text-[#e5e1d8]">Standard Motorcycle</SelectItem>
                <SelectItem value="sport" className="text-[#e5e1d8]">Sport Bike</SelectItem>
                <SelectItem value="touring" className="text-[#e5e1d8]">Touring Bike</SelectItem>
                <SelectItem value="scooter" className="text-[#e5e1d8]">Scooter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={calculateEmissions}
          className="w-full bg-green-600 hover:bg-green-700 text-white uppercase font-semibold"
        >
          CALCULATE MOTORBIKE EMISSIONS
        </Button>

        {result > 0 && (
          <div className="bg-green-600/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
              MOTORBIKE TRANSPORTATION FOOTPRINT
            </h3>
            <div className="text-3xl font-bold text-green-300 mb-2">{result} tons</div>
            <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent per year</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
