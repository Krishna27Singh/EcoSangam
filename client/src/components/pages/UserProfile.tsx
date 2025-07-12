
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, MapPin, Calendar, Award, Leaf } from 'lucide-react';

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    totalSaved: '2.4 tons CO₂',
    streakDays: 45,
    badgesEarned: 12,
  });

  const badges = [
    { name: 'Eco Warrior', icon: '🌱', description: 'Reduced footprint by 20%' },
    { name: 'Commuter Champion', icon: '🚲', description: 'Used public transport 30 days' },
    { name: 'Energy Saver', icon: '💡', description: 'Reduced home energy by 15%' },
    { name: 'Green Streak', icon: '🔥', description: 'Logged activity for 30 days' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend/database
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">User Profile</h1>
        <p className="text-green-600">Manage your account and track your eco achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-800">Personal Information</CardTitle>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  size="sm"
                  className="border-green-300 hover:bg-green-50"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-green-600 text-white text-xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-green-800">{profile.name}</h3>
                  <p className="text-green-600">Eco Enthusiast</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-green-700">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!isEditing}
                    className="border-green-300 focus:border-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-green-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                    className="border-green-300 focus:border-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-green-700">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    disabled={!isEditing}
                    className="border-green-300 focus:border-green-500"
                  />
                </div>
                <div>
                  <Label className="text-green-700">Member Since</Label>
                  <Input
                    value={profile.joinDate}
                    disabled
                    className="border-green-300 bg-gray-50"
                  />
                </div>
              </div>

              {isEditing && (
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Achievements & Badges</CardTitle>
              <CardDescription>Your eco-friendly accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge, index) => (
                  <div key={index} className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-semibold text-green-800 text-sm">{badge.name}</h4>
                    <p className="text-xs text-green-600 mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Leaf className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-semibold text-green-800">{profile.totalSaved}</div>
                  <div className="text-sm text-green-600">CO₂ Saved</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-green-800">{profile.streakDays} days</div>
                  <div className="text-sm text-green-600">Current Streak</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="font-semibold text-green-800">{profile.badgesEarned}</div>
                  <div className="text-sm text-green-600">Badges Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardHeader>
              <CardTitle>Eco Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Level 7</div>
                <div className="text-green-100 mb-4">Eco Champion</div>
                <div className="w-full bg-green-500 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                <div className="text-sm text-green-100 mt-2">750/1000 XP to next level</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;