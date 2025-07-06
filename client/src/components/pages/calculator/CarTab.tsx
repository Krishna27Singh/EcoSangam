import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car } from 'lucide-react';

interface CarTabProps {
  onResultUpdate: (value: number) => void;
}

export const CarTab: React.FC<CarTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    milesDriven: '',
    fuelEfficiency: '',
    fuelType: 'gasoline'
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    const miles = Number(data.milesDriven);
    const mpg = Number(data.fuelEfficiency);
    
    if (miles === 0 || mpg === 0) {
      setResult(0);
      onResultUpdate(0);
      return;
    }

    const gallonsUsed = miles / mpg;
    
    // Emission factors (kg CO2 per gallon)
    const emissionFactors = {
      gasoline: 8.89,
      diesel: 10.15,
      hybrid: 6.22,
      electric: 0 // Simplified - real calculation would depend on grid mix
    };
    
    const factor = emissionFactors[data.fuelType as keyof typeof emissionFactors] || 8.89;
    const totalEmissions = gallonsUsed * factor / 1000; // Convert to tons
    
    setResult(Math.round(totalEmissions * 100) / 100);
    onResultUpdate(Math.round(totalEmissions * 100) / 100);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-green-200/30">
        <CardHeader>
          <CardTitle className="text-[#e5e1d8] text-2xl flex items-center uppercase tracking-wide">
            <Car className="w-6 h-6 mr-3" />
            CAR TRANSPORTATION
          </CardTitle>
          <CardDescription className="text-[#e5e1d8]/80">
            Calculate emissions from your personal vehicle use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="milesDriven" className="text-[#e5e1d8] font-semibold uppercase">
                  MILES DRIVEN PER YEAR
                </Label>
                <Input
                  id="milesDriven"
                  type="number"
                  placeholder="e.g., 12000"
                  value={data.milesDriven}
                  onChange={(e) => setData({...data, milesDriven: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Average American drives 12,000 miles per year
                </p>
              </div>

              <div>
                <Label htmlFor="fuelEfficiency" className="text-[#e5e1d8] font-semibold uppercase">
                  FUEL EFFICIENCY (MPG)
                </Label>
                <Input
                  id="fuelEfficiency"
                  type="number"
                  placeholder="e.g., 25"
                  value={data.fuelEfficiency}
                  onChange={(e) => setData({...data, fuelEfficiency: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Check your vehicle's EPA rating or recent fuel economy
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-[#e5e1d8] font-semibold uppercase">
                  FUEL TYPE
                </Label>
                <Select value={data.fuelType} onValueChange={(value) => setData({...data, fuelType: value})}>
                  <SelectTrigger className="bg-white/20 border-green-300/50 text-[#e5e1d8]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-green-800 border-green-600">
                    <SelectItem value="gasoline" className="text-[#e5e1d8]">Gasoline</SelectItem>
                    <SelectItem value="diesel" className="text-[#e5e1d8]">Diesel</SelectItem>
                    <SelectItem value="hybrid" className="text-[#e5e1d8]">Hybrid</SelectItem>
                    <SelectItem value="electric" className="text-[#e5e1d8]">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-green-700/20 rounded-lg p-4">
                <h4 className="text-[#e5e1d8] font-semibold mb-2 uppercase">REDUCTION TIPS</h4>
                <ul className="text-[#e5e1d8]/80 text-sm space-y-1">
                  <li>• Combine errands into one trip</li>
                  <li>• Maintain proper tire pressure</li>
                  <li>• Drive at steady speeds</li>
                  <li>• Consider carpooling or public transit</li>
                  <li>• Work from home when possible</li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateEmissions}
            className="w-full bg-green-600 hover:bg-green-700 text-white uppercase font-semibold"
          >
            CALCULATE CAR EMISSIONS
          </Button>

          {result > 0 && (
            <div className="bg-green-600/30 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
                CAR TRANSPORTATION FOOTPRINT
              </h3>
              <div className="text-3xl font-bold text-green-300 mb-2">{result} tons</div>
              <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent per year</p>
              <p className="text-[#e5e1d8]/60 text-xs mt-2">
                {Number(data.milesDriven) > 0 && Number(data.fuelEfficiency) > 0 && 
                  `Based on ${Math.round(Number(data.milesDriven) / Number(data.fuelEfficiency))} gallons of ${data.fuelType} per year`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
