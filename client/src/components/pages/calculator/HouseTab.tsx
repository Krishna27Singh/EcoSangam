
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home } from 'lucide-react';

interface HouseTabProps {
  onResultUpdate: (value: number) => void;
}

export const HouseTab: React.FC<HouseTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    electricity: '',
    gas: '',
    oil: '',
    propane: '',
    houseSize: '',
    residents: '',
    energySource: 'grid'
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    const electricityEmissions = Number(data.electricity) * 0.5 * 12; // kWh/month * factor * 12 months
    const gasEmissions = Number(data.gas) * 5.3 * 12; // therms/month * factor * 12 months
    const oilEmissions = Number(data.oil) * 10.15; // gallons/year * factor
    const propaneEmissions = Number(data.propane) * 5.72; // gallons/year * factor
    
    // Adjust based on energy source
    const sourceMultiplier = data.energySource === 'renewable' ? 0.1 : 
                           data.energySource === 'mixed' ? 0.7 : 1.0;
    
    const total = (electricityEmissions + gasEmissions + oilEmissions + propaneEmissions) * sourceMultiplier / 1000; // Convert to tons
    const perPersonTotal = Number(data.residents) > 0 ? total / Number(data.residents) : total;
    
    setResult(Math.round(perPersonTotal * 100) / 100);
    onResultUpdate(Math.round(perPersonTotal * 100) / 100);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-green-200/30">
        <CardHeader>
          <CardTitle className="text-[#e5e1d8] text-2xl flex items-center uppercase tracking-wide">
            <Home className="w-6 h-6 mr-3" />
            HOME ENERGY CONSUMPTION
          </CardTitle>
          <CardDescription className="text-[#e5e1d8]/80">
            Calculate emissions from your household energy use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="electricity" className="text-[#e5e1d8] font-semibold uppercase">
                  ELECTRICITY (kWh/month)
                </Label>
                <Input
                  id="electricity"
                  type="number"
                  placeholder="e.g., 300"
                  value={data.electricity}
                  onChange={(e) => setData({...data, electricity: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>

              <div>
                <Label htmlFor="gas" className="text-[#e5e1d8] font-semibold uppercase">
                  NATURAL GAS (therms/month)
                </Label>
                <Input
                  id="gas"
                  type="number"
                  placeholder="e.g., 50"
                  value={data.gas}
                  onChange={(e) => setData({...data, gas: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>

              <div>
                <Label htmlFor="oil" className="text-[#e5e1d8] font-semibold uppercase">
                  HEATING OIL (gallons/year)
                </Label>
                <Input
                  id="oil"
                  type="number"
                  placeholder="e.g., 0"
                  value={data.oil}
                  onChange={(e) => setData({...data, oil: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="propane" className="text-[#e5e1d8] font-semibold uppercase">
                  PROPANE (gallons/year)
                </Label>
                <Input
                  id="propane"
                  type="number"
                  placeholder="e.g., 0"
                  value={data.propane}
                  onChange={(e) => setData({...data, propane: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>

              <div>
                <Label htmlFor="residents" className="text-[#e5e1d8] font-semibold uppercase">
                  NUMBER OF RESIDENTS
                </Label>
                <Input
                  id="residents"
                  type="number"
                  placeholder="e.g., 2"
                  value={data.residents}
                  onChange={(e) => setData({...data, residents: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>

              <div>
                <Label className="text-[#e5e1d8] font-semibold uppercase">
                  ENERGY SOURCE
                </Label>
                <Select value={data.energySource} onValueChange={(value) => setData({...data, energySource: value})}>
                  <SelectTrigger className="bg-white/20 border-green-300/50 text-[#e5e1d8]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-green-800 border-green-600">
                    <SelectItem value="grid" className="text-[#e5e1d8]">Standard Grid Mix</SelectItem>
                    <SelectItem value="mixed" className="text-[#e5e1d8]">Partial Renewable</SelectItem>
                    <SelectItem value="renewable" className="text-[#e5e1d8]">100% Renewable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateEmissions}
            className="w-full bg-green-600 hover:bg-green-700 text-white uppercase font-semibold"
          >
            CALCULATE HOME EMISSIONS
          </Button>

          {result > 0 && (
            <div className="bg-green-600/30 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
                HOME ENERGY FOOTPRINT
              </h3>
              <div className="text-3xl font-bold text-green-300 mb-2">{result} tons</div>
              <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent per year (per person)</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
