
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OthersTabProps {
  onResultUpdate: (value: number) => void;
}

export const OthersTab: React.FC<OthersTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    shopping: '',
    streaming: '',
    phone: '',
    clothing: '',
    recreation: ''
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    // Rough emission factors for various activities
    const shoppingEmissions = Number(data.shopping) * 0.5; // $500 spending ~ 0.5 tons CO2
    const streamingEmissions = Number(data.streaming) * 0.0036 * 365; // hours/day * factor * days
    const phoneEmissions = Number(data.phone) * 0.000011 * 365; // hours/day * factor * days  
    const clothingEmissions = Number(data.clothing) * 0.1; // items/year * factor
    const recreationEmissions = Number(data.recreation) * 0.02; // $ spent * factor
    
    const totalEmissions = shoppingEmissions + streamingEmissions + phoneEmissions + clothingEmissions + recreationEmissions;
    
    setResult(Math.round(totalEmissions * 100) / 100);
    onResultUpdate(Math.round(totalEmissions * 100) / 100);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-sm border-green-200/20">
        <CardHeader>
          <CardTitle className="text-[#e5e1d8] text-2xl uppercase tracking-wide">
            OTHER ACTIVITIES
          </CardTitle>
          <CardDescription className="text-[#e5e1d8]/80">
            Calculate emissions from lifestyle and consumption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="shopping" className="text-[#e5e1d8] font-semibold uppercase">
                  ANNUAL SHOPPING ($)
                </Label>
                <Input
                  id="shopping"
                  type="number"
                  placeholder="e.g., 2000"
                  value={data.shopping}
                  onChange={(e) => setData({...data, shopping: e.target.value})}
                  className="bg-white/10 border-green-300/30 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Consumer goods, electronics, non-essential items
                </p>
              </div>

              <div>
                <Label htmlFor="clothing" className="text-[#e5e1d8] font-semibold uppercase">
                  NEW CLOTHING ITEMS/YEAR
                </Label>
                <Input
                  id="clothing"
                  type="number"
                  placeholder="e.g., 20"
                  value={data.clothing}
                  onChange={(e) => setData({...data, clothing: e.target.value})}
                  className="bg-white/10 border-green-300/30 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Fast fashion has significant environmental impact
                </p>
              </div>

              <div>
                <Label htmlFor="recreation" className="text-[#e5e1d8] font-semibold uppercase">
                  RECREATION & ENTERTAINMENT ($)
                </Label>
                <Input
                  id="recreation"
                  type="number"
                  placeholder="e.g., 1500"
                  value={data.recreation}
                  onChange={(e) => setData({...data, recreation: e.target.value})}
                  className="bg-white/10 border-green-300/30 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Movies, concerts, sports events, hobbies
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="streaming" className="text-[#e5e1d8] font-semibold uppercase">
                  STREAMING HOURS/DAY
                </Label>
                <Input
                  id="streaming"
                  type="number"
                  placeholder="e.g., 3"
                  value={data.streaming}
                  onChange={(e) => setData({...data, streaming: e.target.value})}
                  className="bg-white/10 border-green-300/30 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Netflix, YouTube, online videos
                </p>
              </div>

              <div>
                <Label htmlFor="phone" className="text-[#e5e1d8] font-semibold uppercase">
                  PHONE USAGE HOURS/DAY
                </Label>
                <Input
                  id="phone"
                  type="number"
                  placeholder="e.g., 4"
                  value={data.phone}
                  onChange={(e) => setData({...data, phone: e.target.value})}
                  className="bg-white/10 border-green-300/30 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
                <p className="text-[#e5e1d8]/60 text-sm mt-1">
                  Data usage, charging, device manufacturing
                </p>
              </div>

              <div className="bg-green-700/10 rounded-lg p-4">
                <h4 className="text-[#e5e1d8] font-semibold mb-2 uppercase">REDUCTION TIPS</h4>
                <ul className="text-[#e5e1d8]/80 text-sm space-y-1">
                  <li>• Buy less, choose quality over quantity</li>
                  <li>• Repair instead of replace</li>
                  <li>• Buy second-hand when possible</li>
                  <li>• Reduce streaming quality when possible</li>
                  <li>• Support eco-friendly brands</li>
                  <li>• Share or rent instead of buying</li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateEmissions}
            className="w-full bg-green-600 hover:bg-green-700 text-white uppercase font-semibold"
          >
            CALCULATE OTHER EMISSIONS
          </Button>

          {result > 0 && (
            <div className="bg-green-600/20 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
                OTHER ACTIVITIES FOOTPRINT
              </h3>
              <div className="text-3xl font-bold text-green-300 mb-2">{result} tons</div>
              <p className="text-[#e5e1d8]/80 text-sm">CO₂ equivalent per year</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-green-600/10 backdrop-blur-sm border-green-400/30">
        <CardHeader>
          <CardTitle className="text-[#e5e1d8] text-xl uppercase tracking-wide">
            FINAL THOUGHTS
          </CardTitle>
        </CardHeader>
        <CardContent className="text-[#e5e1d8]">
          <p className="mb-4">
            Remember that this calculator provides estimates based on average emission factors. 
            Your actual footprint may vary based on your location, energy sources, and specific choices.
          </p>
          <p className="text-sm opacity-80">
            The most impactful changes you can make are typically: reducing flights, eating less meat, 
            improving home energy efficiency, and reducing car travel.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
