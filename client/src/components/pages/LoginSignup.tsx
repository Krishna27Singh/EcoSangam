
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginSignupProps {
  onLogin: () => void;
}

export const LoginSignup: React.FC<LoginSignupProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll just call onLogin
    // In a real app, you'd handle authentication here
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-roboto-condensed">
      <Card className="w-full max-w-md bg-white/20 backdrop-blur-sm shadow-xl border border-white/30">
        <CardHeader className="text-center">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <img 
              src="/ecosangamlogo.png" 
              alt="EcoSangam Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <CardTitle className="text-2xl uppercase font-bold tracking-wide" style={{ color: '#e5e1d8', letterSpacing: '0.1px'
           }}>
            {isLogin ? 'WELCOME BACK' : 'JOIN ECOTRACKER'}
          </CardTitle>
          <CardDescription  style={{ color: '#e5e1d8', opacity: 0.8 }}>
            {isLogin 
              ? 'Sign In to track your carbon footprint' 
              : 'Start your eco-friendly journey today'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold" style={{ color: '#e5e1d8', letterSpacing: '0.1px' }}>FULL NAME</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
                  required={!isLogin}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="uppercase font-semibold" style={{ color: '#e5e1d8', letterSpacing: '0.1px' }}>EMAIL</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="uppercase font-semibold" style={{ color: '#e5e1d8', letterSpacing: '0.1px' }}>PASSWORD</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full text-black hover:opacity-90 transition-opacity uppercase font-bold tracking-wide"
              style={{ backgroundColor: '#e5e1d8', letterSpacing: '0.1px' }}
            >
              {isLogin ? 'SIGN IN' : 'SIGN UP'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm uppercase" style={{ color: '#e5e1d8', opacity: 0.8, letterSpacing: '0.1px' }}>
              {isLogin ? "DON'T HAVE AN ACCOUNT?" : "ALREADY HAVE AN ACCOUNT?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium ml-1 underline hover:opacity-80 transition-opacity uppercase"
                style={{ color: '#e5e1d8', letterSpacing: '0.1px' }}
              >
                {isLogin ? 'SIGN UP' : 'SIGN IN'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
