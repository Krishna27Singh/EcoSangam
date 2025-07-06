
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TrainsTabProps {
  onResultUpdate: (value: number) => void;
}

export const TrainsTab: React.FC<TrainsTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    milesPerYear: '',
    trainType: 'passenger'
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    const miles = Number(data.milesPerYear);
    
    // Emission factors (kg CO2 per mile per passenger)
    const emissionFactors = {
      passenger: 0.41,
      highSpeed: 0.28,
      subway: 0.35
    };
    
    const factor = emissionFactors[data.trainType as keyof typeof emissionFactors];
    const totalEmissions = miles * factor / 1000; // Convert to tons
    
    setResult(Math.round(totalEmissions * 100) / 100);
    onResultUpdate(Math.round(totalEmissions * 100) / 100);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-green-200/20">
      <CardHeader>
        <CardTitle className="text-[#e5e1d8] text-2xl uppercase tracking-wide">
          RAIL TRANSPORTATION
        </CardTitle>
        <CardDescription className="text-[#e5e1d8]/80">
          Calculate emissions from train travel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="milesPerYear" className="text-[#e5e1d8] font-semibold uppercase">
              MILES PER YEAR
            </Label>
            <Input
              id="milesPerYear"
              type="number"
              placeholder="e.g., 1000"
              value={data.milesPerYear}
              onChange={(e) => setData({...data, milesPerYear: e.target.value})}
              className="bg-white/10 border-green-300/30 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
            />
          </div>
          <div>
            <Label className="text-[#e5e1d8] font-semibold uppercase">
              TRAIN TYPE
            </Label>
            <Select value={data.trainType} onValueChange={(value) => setData({...data, trainType: value})}>
              <SelectTrigger className="bg-white/10 border-green-300/30 text-[#e5e1d8]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-green-800 border-green-600">
                <SelectItem value="passenger" className="text-[#e5e1d8]">Passenger Train</SelectItem>
                <SelectItem value="highSpeed" className="text-[#e5e1d8]">High-Speed Rail</SelectItem>
                <SelectItem value="subway" className="text-[#e5e1d8]">Subway/Metro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={calculateEmissions}
          className="w-full bg-green-600 hover:bg-green-700 text-white uppercase font-semibold"
        >
          CALCULATE RAIL EMISSIONS
        </Button>

        {result > 0 && (
          <div className="bg-green-600/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
              RAIL TRANSPORTATION FOOTPRINT
            </h3>
            <div className="text-3xl font-bold text-green-300 mb-2">{result} tons</div>
            <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent per year</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
