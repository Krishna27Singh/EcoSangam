
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plane } from 'lucide-react';

interface FlightsTabProps {
  onResultUpdate: (value: number) => void;
}

export const FlightsTab: React.FC<FlightsTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    shortHaul: '', // < 1500 miles
    mediumHaul: '', // 1500-4000 miles  
    longHaul: '', // > 4000 miles
    flightClass: 'economy'
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    // Emission factors in kg CO2 per mile per passenger
    const emissionFactors = {
      economy: {
        short: 0.24,
        medium: 0.18,
        long: 0.15
      },
      business: {
        short: 0.48,
        medium: 0.36,
        long: 0.30
      },
      first: {
        short: 0.72,
        medium: 0.54,
        long: 0.45
      }
    };

    const classFactors = emissionFactors[data.flightClass as keyof typeof emissionFactors];
    
    const shortEmissions = Number(data.shortHaul) * classFactors.short;
    const mediumEmissions = Number(data.mediumHaul) * classFactors.medium;
    const longEmissions = Number(data.longHaul) * classFactors.long;
    
    const totalEmissions = (shortEmissions + mediumEmissions + longEmissions) / 1000; // Convert to tons
    
    setResult(Math.round(totalEmissions * 100) / 100);
    onResultUpdate(Math.round(totalEmissions * 100) / 100);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-green-200/30">
        <CardHeader>
          <CardTitle className="text-[#e5e1d8] text-2xl flex items-center uppercase tracking-wide">
            <Plane className="w-6 h-6 mr-3" />
            AIR TRAVEL
          </CardTitle>
          <CardDescription className="text-[#e5e1d8]/80">
            Calculate emissions from your flights per year
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="shortHaul" className="text-[#e5e1d8] font-semibold uppercase">
                  SHORT-HAUL FLIGHTS (miles/year)
                </Label>
                <Input
                  id="shortHaul"
                  type="number"
                  placeholder="e.g., 2000"
                  value={data.shortHaul}
                  onChange={(e) => setData({...data, shortHaul: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Flights under 1,500 miles (e.g., domestic flights)
                </p>
              </div>

              <div>
                <Label htmlFor="mediumHaul" className="text-[#e5e1d8] font-semibold uppercase">
                  MEDIUM-HAUL FLIGHTS (miles/year)
                </Label>
                <Input
                  id="mediumHaul"
                  type="number"
                  placeholder="e.g., 5000"
                  value={data.mediumHaul}
                  onChange={(e) => setData({...data, mediumHaul: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Flights 1,500-4,000 miles (e.g., coast to coast)
                </p>
              </div>

              <div>
                <Label htmlFor="longHaul" className="text-[#e5e1d8] font-semibold uppercase">
                  LONG-HAUL FLIGHTS (miles/year)
                </Label>
                <Input
                  id="longHaul"
                  type="number"
                  placeholder="e.g., 8000"
                  value={data.longHaul}
                  onChange={(e) => setData({...data, longHaul: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Flights over 4,000 miles (e.g., international)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-[#e5e1d8] font-semibold uppercase">
                  TYPICAL FLIGHT CLASS
                </Label>
                <Select value={data.flightClass} onValueChange={(value) => setData({...data, flightClass: value})}>
                  <SelectTrigger className="bg-white/20 border-green-300/50 text-[#e5e1d8]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-green-800 border-green-600">
                    <SelectItem value="economy" className="text-[#e5e1d8]">Economy Class</SelectItem>
                    <SelectItem value="business" className="text-[#e5e1d8]">Business Class</SelectItem>
                    <SelectItem value="first" className="text-[#e5e1d8]">First Class</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Premium classes have higher emissions per passenger
                </p>
              </div>

              <div className="bg-green-700/20 rounded-lg p-4">
                <h4 className="text-[#e5e1d8] font-semibold mb-2 uppercase">REDUCTION TIPS</h4>
                <ul className="text-[#e5e1d8]/80 text-sm space-y-1">
                  <li>• Choose direct flights when possible</li>
                  <li>• Offset your flights through verified programs</li>
                  <li>• Consider video conferencing for business</li>
                  <li>• Choose destinations closer to home</li>
                  <li>• Stay longer to justify long-haul flights</li>
                </ul>
              </div>

              <div className="bg-red-800/20 rounded-lg p-3">
                <p className="text-[#e5e1d8] text-sm">
                  <strong>Note:</strong> Aviation has one of the highest carbon intensities per mile. 
                  A single round-trip flight from NY to London produces about 2 tons of CO₂ per passenger.
                </p>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateEmissions}
            className="w-full bg-green-600 hover:bg-green-700 text-white uppercase font-semibold"
          >
            CALCULATE FLIGHT EMISSIONS
          </Button>

          {result > 0 && (
            <div className="bg-green-600/30 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
                AIR TRAVEL FOOTPRINT
              </h3>
              <div className="text-3xl font-bold text-green-300 mb-2">{result} tons</div>
              <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent per year</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
