import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Car, Home, Plane, Utensils, Globe, Target, Zap, Loader2, Plus, Calendar, CheckCircle, Leaf, Bike, Recycle, TreePine, Droplets, Sun, Battery, ShoppingBag, Trash2 } from 'lucide-react';
import { toast } from "sonner";

export const Dashboard = () => {
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [sustainabilityTip, setSustainabilityTip] = useState('');

  // EcoGoals state - starts empty
  const [ecoGoals, setEcoGoals] = useState([]);

  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const [selectedGoalForActivity, setSelectedGoalForActivity] = useState(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    type: 'carbon',
    target: '',
    days: '',
    customType: ''
  });
  const [newActivity, setNewActivity] = useState({
    activity: '',
    impact: '',
    customActivity: ''
  });

  const monthlyEmissions = [
    { month: 'Jan', emissions: 2.4 },
    { month: 'Feb', emissions: 2.1 },
    { month: 'Mar', emissions: 2.8 },
    { month: 'Apr', emissions: 2.3 },
    { month: 'May', emissions: 1.9 },
    { month: 'Jun', emissions: 2.0 },
  ];

  const categories = [
    { name: 'Transportation', icon: Car, emissions: 1.2, percentage: 45, color: 'text-blue-400' },
    { name: 'Food', icon: Utensils, emissions: 0.8, percentage: 30, color: 'text-green-400' },
    { name: 'Home Energy', icon: Home, emissions: 0.5, percentage: 18, color: 'text-purple-400' },
    { name: 'Purchases', icon: Zap, emissions: 0.2, percentage: 7, color: 'text-orange-400' },
  ];

  const standardGoalTypes = [
    { value: 'carbon', label: 'Reduce Carbon Footprint', unit: 'kg CO₂', icon: Leaf },
    { value: 'plants', label: 'Grow Plants', unit: 'plants', icon: TreePine },
    { value: 'bicycle', label: 'Travel by Bicycle', unit: 'km', icon: Bike },
    { value: 'recycle', label: 'Recycle Items', unit: 'items', icon: Recycle },
    { value: 'water', label: 'Save Water', unit: 'liters', icon: Droplets },
    { value: 'energy', label: 'Save Energy', unit: 'kWh', icon: Battery },
    { value: 'waste', label: 'Reduce Waste', unit: 'items', icon: Trash2 },
    { value: 'solar', label: 'Use Renewable Energy', unit: 'days', icon: Sun },
    { value: 'reusable', label: 'Use Reusable Products', unit: 'items', icon: ShoppingBag },
    { value: 'custom', label: 'Custom Goal', unit: '', icon: Target }
  ];

  const standardActivities = {
    carbon: [
      { label: 'Biked to work', impact: 0.5 },
      { label: 'Used public transport', impact: 0.8 },
      { label: 'Worked from home', impact: 1.2 },
      { label: 'Carpooled', impact: 0.3 },
      { label: 'Used renewable energy', impact: 1.0 },
      { label: 'Walked instead of driving', impact: 0.4 },
      { label: 'Electric vehicle usage', impact: 1.5 }
    ],
    plants: [
      { label: 'Planted seeds', impact: 1 },
      { label: 'Watered plants', impact: 0 },
      { label: 'Added compost', impact: 0 },
      { label: 'Transplanted seedlings', impact: 2 },
      { label: 'Started herb garden', impact: 3 },
      { label: 'Planted tree sapling', impact: 1 }
    ],
    bicycle: [
      { label: 'Commute to work', impact: 10 },
      { label: 'Grocery shopping', impact: 5 },
      { label: 'Leisure ride', impact: 15 },
      { label: 'Errands around town', impact: 8 },
      { label: 'Weekend long ride', impact: 25 },
      { label: 'School pickup/drop', impact: 6 }
    ],
    recycle: [
      { label: 'Recycled plastic bottles', impact: 5 },
      { label: 'Recycled paper', impact: 3 },
      { label: 'Recycled electronics', impact: 1 },
      { label: 'Composted organic waste', impact: 2 },
      { label: 'Recycled glass containers', impact: 4 },
      { label: 'Recycled cardboard', impact: 2 }
    ],
    water: [
      { label: 'Shorter shower', impact: 10 },
      { label: 'Fixed leaky faucet', impact: 50 },
      { label: 'Collected rainwater', impact: 20 },
      { label: 'Used water-efficient appliances', impact: 30 },
      { label: 'Turned off tap while brushing', impact: 5 },
      { label: 'Full dishwasher loads only', impact: 15 }
    ],
    energy: [
      { label: 'Switched to LED bulbs', impact: 2 },
      { label: 'Unplugged unused devices', impact: 1 },
      { label: 'Used natural light', impact: 0.5 },
      { label: 'Adjusted thermostat', impact: 3 },
      { label: 'Air-dried clothes', impact: 2.5 },
      { label: 'Used energy-efficient appliances', impact: 4 }
    ],
    waste: [
      { label: 'Avoided single-use packaging', impact: 3 },
      { label: 'Brought reusable bags', impact: 2 },
      { label: 'Refused plastic straws', impact: 1 },
      { label: 'Used refillable water bottle', impact: 1 },
      { label: 'Composted food scraps', impact: 2 },
      { label: 'Donated instead of throwing away', impact: 3 }
    ],
    solar: [
      { label: 'Used solar panels', impact: 1 },
      { label: 'Solar water heating', impact: 1 },
      { label: 'Solar garden lights', impact: 1 },
      { label: 'Solar phone charger', impact: 1 },
      { label: 'Community solar program', impact: 1 }
    ],
    reusable: [
      { label: 'Used reusable shopping bags', impact: 1 },
      { label: 'Used reusable water bottle', impact: 1 },
      { label: 'Used reusable food containers', impact: 1 },
      { label: 'Used reusable coffee cup', impact: 1 },
      { label: 'Used cloth napkins', impact: 1 },
      { label: 'Used rechargeable batteries', impact: 1 }
    ]
  };

  const fetchSustainabilityTip = async () => {
    setIsLoadingTip(true);
    try {
      const backendUri = import.meta.env.VITE_BACKEND_URI;
      if (!backendUri) {
        throw new Error('Backend URI not configured');
      }

      const response = await fetch(`${backendUri}/api/tips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Give me one detailed, everyday sustainability tip that is practical and easy to follow. The tip should not be concise—explain the reasoning behind it, how it positively impacts the environment, and offer actionable steps to implement it in daily life. Keep the response clear, educational, and under 100 words. Avoid technical jargon. This is meant for a general audience trying to adopt eco-friendly habits.'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sustainability tip');
      }

      const data = await response.json();
      setSustainabilityTip(data.tip || data.response || 'No tip received');
      toast.success('New sustainability tip generated!');
    } catch (error) {
      console.error('Error fetching sustainability tip:', error);
      toast.error('Failed to get sustainability tip. Please try again.');
    } finally {
      setIsLoadingTip(false);
    }
  };

  const handleCreateGoal = () => {
    // Fix validation logic - different checks for custom vs standard goals
    if (newGoal.type === 'custom') {
      if (!newGoal.title || !newGoal.target || !newGoal.days) {
        toast.error('Please fill in all required fields');
        return;
      }
    } else {
      if (!newGoal.target || !newGoal.days) {
        toast.error('Please fill in all required fields');
        return;
      }
    }

    const goalType = standardGoalTypes.find(type => type.value === newGoal.type);
    const goal = {
      id: Date.now(),
      title: newGoal.type === 'custom' ? newGoal.title : `${goalType.label} by ${newGoal.target}`,
      type: newGoal.type === 'custom' ? newGoal.customType : newGoal.type,
      target: parseFloat(newGoal.target),
      unit: newGoal.type === 'custom' ? 'units' : goalType.unit,
      days: parseInt(newGoal.days),
      progress: 0,
      activities: [],
      icon: goalType.icon,
      color: goalType.value === 'carbon' ? 'text-green-400' : 
             goalType.value === 'plants' ? 'text-green-500' : 
             goalType.value === 'bicycle' ? 'text-blue-400' :
             goalType.value === 'water' ? 'text-blue-500' :
             goalType.value === 'energy' ? 'text-yellow-400' :
             goalType.value === 'waste' ? 'text-red-400' :
             goalType.value === 'solar' ? 'text-orange-400' :
             goalType.value === 'reusable' ? 'text-purple-400' : 'text-gray-400'
    };

    setEcoGoals([...ecoGoals, goal]);
    setNewGoal({ title: '', type: 'carbon', target: '', days: '', customType: '' });
    setIsCreateGoalOpen(false);
    toast.success('Eco goal created successfully!');
  };

  const handleLogActivity = () => {
    if ((!newActivity.activity && !newActivity.customActivity) || !newActivity.impact) {
      toast.error('Please fill in all required fields');
      return;
    }

    const activityName = newActivity.customActivity || newActivity.activity;
    const impactValue = parseFloat(newActivity.impact);
    
    const updatedGoals = ecoGoals.map(goal => {
      if (goal.id === selectedGoalForActivity.id) {
        const newProgress = Math.min(goal.progress + impactValue, goal.target);
        return {
          ...goal,
          progress: newProgress,
          activities: [...goal.activities, {
            date: new Date().toISOString().split('T')[0],
            activity: activityName,
            impact: impactValue
          }]
        };
      }
      return goal;
    });

    setEcoGoals(updatedGoals);
    setNewActivity({ activity: '', impact: '', customActivity: '' });
    setIsLogActivityOpen(false);
    setSelectedGoalForActivity(null);
    toast.success('Activity logged successfully!');
  };

  return (
    <div className="min-h-screen bg-transparent font-roboto-condensed">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#e5e1d8] mb-2 uppercase tracking-wide">YOUR CARBON DASHBOARD</h1>
          <p className="text-[#e5e1d8] text-lg opacity-90 uppercase">TRACK YOUR ENVIRONMENTAL IMPACT AND PROGRESS</p>
        </div>

        {/* AI Sustainability Tip Section */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide flex items-center">
              <Target className="w-5 h-5 mr-2" />
              AI SUSTAINABILITY COACH
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={fetchSustainabilityTip}
              disabled={isLoadingTip}
              className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold tracking-wide mb-4"
            >
              {isLoadingTip ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  GETTING TIP...
                </>
              ) : (
                'GET AI BASED SUSTAINABILITY TIP'
              )}
            </Button>
            {sustainabilityTip && (
              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <p className="text-[#e5e1d8] leading-relaxed">{sustainabilityTip}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily/Weekly Carbon Footprint */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-[#e5e1d8] flex items-center uppercase font-semibold tracking-wide">
              
              🌍 YOUR DAILY CARBON FOOTPRINT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#e5e1d8] mb-2">3.2 KG</div>
                  <p className="text-[#e5e1d8] opacity-80 uppercase text-sm">CO₂ TODAY</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm uppercase">↓ 0.3kg from yesterday</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#e5e1d8] mb-2">19.8 KG</div>
                  <p className="text-[#e5e1d8] opacity-80 uppercase text-sm">CO₂ THIS WEEK</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-blue-400 mr-1" />
                    <span className="text-blue-400 text-sm uppercase">↑ 1.2kg from last week</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] flex items-center uppercase font-semibold tracking-wide">
                <TrendingUp className="w-5 h-5 mr-2" />
                MONTHLY TOTAL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-300 mb-2 uppercase">2.8 TONS</div>
              <CardDescription className="text-[#e5e1d8] opacity-80 uppercase text-sm">CO₂ EQUIVALENT THIS MONTH</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] flex items-center uppercase font-semibold tracking-wide">
                <TrendingDown className="w-5 h-5 mr-2 text-blue-400" />
                VS LAST MONTH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400 mb-2 uppercase">-12%</div>
              <CardDescription className="text-green-300 uppercase text-sm">YOU'RE IMPROVING!</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide">GLOBAL AVERAGE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#e5e1d8] mb-2 uppercase">4.1 TONS</div>
              <CardDescription className="text-green-300 uppercase text-sm">YOU'RE 32% BELOW AVERAGE</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enhanced Emissions by Category */}
          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide">
                📊 EMISSIONS BY CATEGORY
              </CardTitle>
              <CardDescription className="text-[#e5e1d8] opacity-80 uppercase">BREAKDOWN OF YOUR CARBON FOOTPRINT</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${category.color}`} />
                        <span className="text-sm font-medium text-[#e5e1d8] uppercase">{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-white/10 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              category.color === 'text-blue-400' ? 'bg-blue-400' :
                              category.color === 'text-green-400' ? 'bg-green-400' :
                              category.color === 'text-purple-400' ? 'bg-purple-400' : 'bg-orange-400'
                            }`}
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#e5e1d8] w-16 uppercase">{category.percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Text-based accessibility summary */}
              <div className="mt-4 p-3 bg-white/10 rounded border border-white/20">
                <p className="text-[#e5e1d8] text-sm">
                  <span className="font-semibold uppercase">Summary:</span> Transportation: 45%, Food: 30%, Energy: 18%, Purchases: 7%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide">MONTHLY TREND</CardTitle>
              <CardDescription className="text-[#e5e1d8] opacity-80 uppercase">YOUR CARBON EMISSIONS OVER TIME</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyEmissions.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#e5e1d8] uppercase">{month.month}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(month.emissions / 3) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-green-300 w-16 uppercase">{month.emissions}T</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ECO GOALS SECTION */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/20 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#e5e1d8] uppercase font-semibold tracking-wide flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  🎯 YOUR ECO GOALS
                </CardTitle>
                <CardDescription className="text-[#e5e1d8] opacity-80 uppercase">SET AND TRACK YOUR SUSTAINABILITY GOALS</CardDescription>
              </div>
              <Dialog open={isCreateGoalOpen} onOpenChange={setIsCreateGoalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold tracking-wide">
                    <Plus className="w-4 h-4 mr-2" />
                    ADD GOAL
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border border-white/20 text-[#e5e1d8]">
                  <DialogHeader>
                    <DialogTitle className="text-[#e5e1d8] uppercase">CREATE NEW ECO GOAL</DialogTitle>
                    <DialogDescription className="text-[#e5e1d8] opacity-80">
                      Set a new sustainability goal to track your progress
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#e5e1d8] uppercase">Goal Type</label>
                      <select 
                        value={newGoal.type}
                        onChange={(e) => setNewGoal({...newGoal, type: e.target.value})}
                        className="w-full mt-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-[#e5e1d8]"
                      >
                        {standardGoalTypes.map(type => (
                          <option key={type.value} value={type.value} className="bg-black text-[#e5e1d8]">
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {newGoal.type === 'custom' && (
                      <div>
                        <label className="text-sm font-medium text-[#e5e1d8] uppercase">Custom Goal Title</label>
                        <Input
                          value={newGoal.title}
                          onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                          placeholder="Enter your custom goal"
                          className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-[#e5e1d8] uppercase">Target Amount</label>
                      <Input
                        type="number"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                        placeholder="Enter target amount"
                        className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#e5e1d8] uppercase">Days to Complete</label>
                      <Input
                        type="number"
                        value={newGoal.days}
                        onChange={(e) => setNewGoal({...newGoal, days: e.target.value})}
                        placeholder="Enter number of days"
                        className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleCreateGoal} className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold">
                        CREATE GOAL
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreateGoalOpen(false)} className="border-white/20 text-[#e5e1d8] hover:bg-white/10">
                        CANCEL
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {ecoGoals.length === 0 ? (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-[#e5e1d8] opacity-50 mx-auto mb-4" />
                <h3 className="text-[#e5e1d8] text-xl font-semibold uppercase mb-2">NO ECO GOALS CURRENTLY</h3>
                <p className="text-[#e5e1d8] opacity-80 uppercase text-sm mb-6">Click "Add Goal" to create your first sustainability goal</p>
                <div className="flex justify-center">
                  <Dialog open={isCreateGoalOpen} onOpenChange={setIsCreateGoalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold tracking-wide">
                        <Plus className="w-4 h-4 mr-2" />
                        CREATE YOUR FIRST GOAL
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 border border-white/20 text-[#e5e1d8]">
                      <DialogHeader>
                        <DialogTitle className="text-[#e5e1d8] uppercase">CREATE NEW ECO GOAL</DialogTitle>
                        <DialogDescription className="text-[#e5e1d8] opacity-80">
                          Set a new sustainability goal to track your progress
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-[#e5e1d8] uppercase">Goal Type</label>
                          <select 
                            value={newGoal.type}
                            onChange={(e) => setNewGoal({...newGoal, type: e.target.value})}
                            className="w-full mt-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-[#e5e1d8]"
                          >
                            {standardGoalTypes.map(type => (
                              <option key={type.value} value={type.value} className="bg-black text-[#e5e1d8]">
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {newGoal.type === 'custom' && (
                          <div>
                            <label className="text-sm font-medium text-[#e5e1d8] uppercase">Custom Goal Title</label>
                            <Input
                              value={newGoal.title}
                              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                              placeholder="Enter your custom goal"
                              className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                            />
                          </div>
                        )}

                        <div>
                          <label className="text-sm font-medium text-[#e5e1d8] uppercase">Target Amount</label>
                          <Input
                            type="number"
                            value={newGoal.target}
                            onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                            placeholder="Enter target amount"
                            className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-[#e5e1d8] uppercase">Days to Complete</label>
                          <Input
                            type="number"
                            value={newGoal.days}
                            onChange={(e) => setNewGoal({...newGoal, days: e.target.value})}
                            placeholder="Enter number of days"
                            className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                          />
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button onClick={handleCreateGoal} className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold">
                            CREATE GOAL
                          </Button>
                          <Button variant="outline" onClick={() => setIsCreateGoalOpen(false)} className="border-white/20 text-[#e5e1d8] hover:bg-white/10">
                            CANCEL
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ecoGoals.map((goal) => {
                  const Icon = goal.icon;
                  const progressPercentage = (goal.progress / goal.target) * 100;
                  return (
                    <div key={goal.id} className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-6 h-6 ${goal.color}`} />
                          <div>
                            <h3 className="text-[#e5e1d8] font-semibold uppercase text-sm">{goal.title}</h3>
                            <p className="text-[#e5e1d8] opacity-60 text-xs uppercase">{goal.days} days goal</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedGoalForActivity(goal);
                            setIsLogActivityOpen(true);
                          }}
                          className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase text-xs font-semibold"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          LOG
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#e5e1d8] opacity-80 uppercase">Progress</span>
                          <span className="text-[#e5e1d8] font-semibold uppercase">
                            {goal.progress} / {goal.target} {goal.unit}
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2 bg-white/10" />
                        <div className="text-center">
                          <span className={`text-lg font-bold ${progressPercentage >= 100 ? 'text-green-400' : 'text-[#e5e1d8]'} uppercase`}>
                            {Math.round(progressPercentage)}% COMPLETE
                          </span>
                        </div>
                      </div>

                      {goal.activities.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <h4 className="text-[#e5e1d8] font-semibold text-xs uppercase mb-2">Recent Activities</h4>
                          <div className="space-y-1 max-h-20 overflow-y-auto">
                            {goal.activities.slice(-3).map((activity, idx) => (
                              <div key={idx} className="flex justify-between text-xs">
                                <span className="text-[#e5e1d8] opacity-80">{activity.activity}</span>
                                <span className="text-green-400">+{activity.impact} {goal.unit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Log Activity Dialog */}
        <Dialog open={isLogActivityOpen} onOpenChange={setIsLogActivityOpen}>
          <DialogContent className="bg-black/90 border border-white/20 text-[#e5e1d8]">
            <DialogHeader>
              <DialogTitle className="text-[#e5e1d8] uppercase">LOG ACTIVITY</DialogTitle>
              <DialogDescription className="text-[#e5e1d8] opacity-80">
                {selectedGoalForActivity && `Log progress for: ${selectedGoalForActivity.title}`}
              </DialogDescription>
            </DialogHeader>
            {selectedGoalForActivity && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#e5e1d8] uppercase">Select Activity</label>
                  <select 
                    value={newActivity.activity}
                    onChange={(e) => {
                      setNewActivity({...newActivity, activity: e.target.value});
                      const selectedStandardActivity = standardActivities[selectedGoalForActivity.type]?.find(a => a.label === e.target.value);
                      if (selectedStandardActivity) {
                        setNewActivity(prev => ({...prev, activity: e.target.value, impact: selectedStandardActivity.impact.toString()}));
                      }
                    }}
                    className="w-full mt-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-[#e5e1d8]"
                  >
                    <option value="" className="bg-black text-[#e5e1d8]">Select an activity...</option>
                    {standardActivities[selectedGoalForActivity.type]?.map((activity, idx) => (
                      <option key={idx} value={activity.label} className="bg-black text-[#e5e1d8]">
                        {activity.label} (+{activity.impact} {selectedGoalForActivity.unit})
                      </option>
                    ))}
                    <option value="custom" className="bg-black text-[#e5e1d8]">Custom Activity</option>
                  </select>
                </div>

                {newActivity.activity === 'custom' && (
                  <div>
                    <label className="text-sm font-medium text-[#e5e1d8] uppercase">Custom Activity</label>
                    <Input
                      value={newActivity.customActivity}
                      onChange={(e) => setNewActivity({...newActivity, customActivity: e.target.value})}
                      placeholder="Describe your activity"
                      className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-[#e5e1d8] uppercase">Impact Amount</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={newActivity.impact}
                    onChange={(e) => setNewActivity({...newActivity, impact: e.target.value})}
                    placeholder={`Impact in ${selectedGoalForActivity.unit}`}
                    className="bg-white/10 border border-white/20 text-[#e5e1d8] placeholder:text-[#e5e1d8]/50"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleLogActivity} className="bg-[#e5e1d8] text-black hover:bg-[#e5e1d8]/90 uppercase font-semibold">
                    LOG ACTIVITY
                  </Button>
                  <Button variant="outline" onClick={() => setIsLogActivityOpen(false)} className="border-white/20 text-[#e5e1d8] hover:bg-white/10">
                    CANCEL
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
      </div>
    </div>
  );
};

export default Dashboard;