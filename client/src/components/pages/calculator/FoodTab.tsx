import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Utensils } from 'lucide-react';

interface FoodTabProps {
  onResultUpdate: (value: number) => void;
}

export const FoodTab: React.FC<FoodTabProps> = ({ onResultUpdate }) => {
  const [data, setData] = useState({
    beef: '',
    pork: '',
    chicken: '',
    fish: '',
    dairy: '',
    eggs: '',
    vegetables: '',
    fruits: '',
    grains: '',
    dietType: 'mixed'
  });

  const [result, setResult] = useState(0);

  const calculateEmissions = () => {
    // Emission factors (kg CO2 per kg of food)
    const emissionFactors = {
      beef: 60,
      pork: 7.6,
      chicken: 6.1,
      fish: 5.4,
      dairy: 3.2,
      eggs: 4.2,
      vegetables: 2.0,
      fruits: 1.1,
      grains: 1.4
    };

    let totalEmissions = 0;
    
    // Calculate based on servings per week, convert to kg per year
    totalEmissions += Number(data.beef) * 0.12 * 52 * emissionFactors.beef; // ~120g per serving
    totalEmissions += Number(data.pork) * 0.12 * 52 * emissionFactors.pork;
    totalEmissions += Number(data.chicken) * 0.12 * 52 * emissionFactors.chicken;
    totalEmissions += Number(data.fish) * 0.12 * 52 * emissionFactors.fish;
    totalEmissions += Number(data.dairy) * 0.25 * 52 * emissionFactors.dairy; // ~250ml per serving
    totalEmissions += Number(data.eggs) * 0.06 * 52 * emissionFactors.eggs; // ~60g per egg
    totalEmissions += Number(data.vegetables) * 0.15 * 52 * emissionFactors.vegetables;
    totalEmissions += Number(data.fruits) * 0.15 * 52 * emissionFactors.fruits;
    totalEmissions += Number(data.grains) * 0.08 * 52 * emissionFactors.grains;

    // Apply diet type multiplier
    const dietMultipliers = {
      vegan: 0.3,
      vegetarian: 0.5,
      pescatarian: 0.7,
      mixed: 1.0,
      carnivore: 1.3
    };

    const multiplier = dietMultipliers[data.dietType as keyof typeof dietMultipliers] || 1.0;
    const finalEmissions = totalEmissions * multiplier / 1000; // Convert to tons
    
    setResult(Math.round(finalEmissions * 100) / 100);
    onResultUpdate(Math.round(finalEmissions * 100) / 100);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-green-200/30">
        <CardHeader>
          <CardTitle className="text-[#e5e1d8] text-2xl flex items-center uppercase tracking-wide">
            <Utensils className="w-6 h-6 mr-3" />
            FOOD & DIET
          </CardTitle>
          <CardDescription className="text-[#e5e1d8]/80">
            Calculate emissions from your dietary choices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="text-[#e5e1d8] font-semibold uppercase text-green-300">MEAT & PROTEIN (servings/week)</h4>
              
              <div>
                <Label htmlFor="beef" className="text-[#e5e1d8] font-semibold uppercase">BEEF</Label>
                <Input
                  id="beef"
                  type="number"
                  placeholder="e.g., 2"
                  value={data.beef}
                  onChange={(e) => setData({...data, beef: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>

              <div>
                <Label htmlFor="pork" className="text-[#e5e1d8] font-semibold uppercase">PORK</Label>
                <Input
                  id="pork"
                  type="number"
                  placeholder="e.g., 1"
                  value={data.pork}
                  onChange={(e) => setData({...data, pork: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>

              <div>
                <Label htmlFor="chicken" className="text-[#e5e1d8] font-semibold uppercase">CHICKEN</Label>
                <Input
                  id="chicken"
                  type="number"
                  placeholder="e.g., 3"
                  value={data.chicken}
                  onChange={(e) => setData({...data, chicken: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>

              <div>
                <Label htmlFor="fish" className="text-[#e5e1d8] font-semibold uppercase">FISH</Label>
                <Input
                  id="fish"
                  type="number"
                  placeholder="e.g., 2"
                  value={data.fish}
                  onChange={(e) => setData({...data, fish: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[#e5e1d8] font-semibold uppercase text-green-300">DAIRY & EGGS (servings/week)</h4>
              
              <div>
                <Label htmlFor="dairy" className="text-[#e5e1d8] font-semibold uppercase">DAIRY</Label>
                <Input
                  id="dairy"
                  type="number"
                  placeholder="e.g., 10"
                  value={data.dairy}
                  onChange={(e) => setData({...data, dairy: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>

              <div>
                <Label htmlFor="eggs" className="text-[#e5e1d8] font-semibold uppercase">EGGS</Label>
                <Input
                  id="eggs"
                  type="number"
                  placeholder="e.g., 6"
                  value={data.eggs}
                  onChange={(e) => setData({...data, eggs: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>

              <h4 className="text-[#e5e1d8] font-semibold uppercase text-green-300 pt-4">PLANT-BASED (servings/week)</h4>
              
              <div>
                <Label htmlFor="vegetables" className="text-[#e5e1d8] font-semibold uppercase">VEGETABLES</Label>
                <Input
                  id="vegetables"
                  type="number"
                  placeholder="e.g., 20"
                  value={data.vegetables}
                  onChange={(e) => setData({...data, vegetables: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>

              <div>
                <Label htmlFor="fruits" className="text-[#e5e1d8] font-semibold uppercase">FRUITS</Label>
                <Input
                  id="fruits"
                  type="number"
                  placeholder="e.g., 14"
                  value={data.fruits}
                  onChange={(e) => setData({...data, fruits: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>
              
              <div>
                <Label htmlFor="grains" className="text-[#e5e1d8] font-semibold uppercase">GRAINS</Label>
                <Input
                  id="grains"
                  type="number"
                  placeholder="e.g., 21"
                  value={data.grains}
                  onChange={(e) => setData({...data, grains: e.target.value})}
                  className="bg-white/20 border-green-300/50 text-[#e5e1d8] placeholder:text-[#e5e1d8]/60"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-[#e5e1d8] font-semibold uppercase">DIET TYPE</Label>
                <Select value={data.dietType} onValueChange={(value) => setData({...data, dietType: value})}>
                  <SelectTrigger className="bg-white/20 border-green-300/50 text-[#e5e1d8]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-green-800 border-green-600">
                    <SelectItem value="vegan" className="text-[#e5e1d8]">Vegan</SelectItem>
                    <SelectItem value="vegetarian" className="text-[#e5e1d8]">Vegetarian</SelectItem>
                    <SelectItem value="pescatarian" className="text-[#e5e1d8]">Pescatarian</SelectItem>
                    <SelectItem value="mixed" className="text-[#e5e1d8]">Mixed Diet</SelectItem>
                    <SelectItem value="carnivore" className="text-[#e5e1d8]">High Meat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-green-700/20 rounded-lg p-4">
                <h4 className="text-[#e5e1d8] font-semibold mb-2 uppercase">REDUCTION TIPS</h4>
                <ul className="text-[#e5e1d8]/80 text-sm space-y-1">
                  <li>• Reduce beef consumption (highest impact)</li>
                  <li>• Choose chicken over red meat</li>
                  <li>• Try plant-based proteins</li>
                  <li>• Buy local and seasonal produce</li>
                  <li>• Reduce food waste</li>
                  <li>• Consider one meatless day per week</li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateEmissions}
            className="w-full bg-green-600 hover:bg-green-700 text-white uppercase font-semibold"
          >
            CALCULATE FOOD EMISSIONS
          </Button>

          {result > 0 && (
            <div className="bg-green-600/30 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-[#e5e1d8] text-xl font-semibold mb-2 uppercase">
                FOOD & DIET FOOTPRINT
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
