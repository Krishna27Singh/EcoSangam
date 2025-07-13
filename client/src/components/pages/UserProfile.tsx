import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Award,
  Leaf,
} from 'lucide-react';

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Krishna Singh',
    email: 'krishnasingh97857@gmail.com',
    location: 'Jaipur, Rajasthan',
    joinDate: 'July 2024',
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
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl text-[#e5e1d8]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card className="bg-white/5 backdrop-blur-sm border border-[#e5e1d8]/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">
                  Personal Information
                </CardTitle>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  size="sm"
                  className="border-[#e5e1d8]/40 text-black hover:bg-white/10"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-green-700 text-white text-xl">
                    {profile.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-[#e5e1d8]">{profile.name}</h3>
                  <p className="text-[#e5e1d8]/80">Eco Enthusiast</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-[#e5e1d8] uppercase font-semibold">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8]"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-[#e5e1d8] uppercase font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8]"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-[#e5e1d8] uppercase font-semibold">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8]"
                  />
                </div>
                <div>
                  <Label className="text-[#e5e1d8] uppercase font-semibold">Member Since</Label>
                  <Input
                    value={profile.joinDate}
                    disabled
                    className="bg-white/10 border-[#e5e1d8]/30 text-[#e5e1d8]"
                  />
                </div>
              </div>
              {isEditing && (
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="bg-white/5 backdrop-blur-sm border border-[#e5e1d8]/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">
                Achievements & Badges
              </CardTitle>
              <CardDescription className="text-[#e5e1d8]/80">
                Your eco-friendly accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-white/10 border border-[#e5e1d8]/20 rounded-lg"
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-semibold text-[#e5e1d8] text-sm uppercase">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-[#e5e1d8]/70 mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="bg-white/5 backdrop-blur-sm border border-[#e5e1d8]/20">
            <CardHeader>
              <CardTitle className="text-[#e5e1d8] uppercase tracking-wide">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Leaf className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-semibold text-[#e5e1d8]">{profile.totalSaved}</div>
                  <div className="text-sm text-[#e5e1d8]/70">CO₂ Saved</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-semibold text-[#e5e1d8]">{profile.streakDays} days</div>
                  <div className="text-sm text-[#e5e1d8]/70">Current Streak</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="font-semibold text-[#e5e1d8]">{profile.badgesEarned}</div>
                  <div className="text-sm text-[#e5e1d8]/70">Badges Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eco Level */}
          <Card className="bg-gradient-to-r from-[#e5e1d8]/10 to-white/5 backdrop-blur-sm border border-[#e5e1d8]/20">
            <CardHeader>
              <CardTitle className="text-black uppercase tracking-wide">Eco Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center ">
                <div className="text-3xl font-bold text-black mb-2">Level 7</div>
                <div className="text-k-4">Eco Champion</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="text-sm text-black/60 mt-2">
                  750/1000 XP to next level
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
