
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your eco-friendly assistant. I can help you with carbon footprint questions, sustainability tips, and environmental advice. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('carbon') || lowerMessage.includes('footprint')) {
      return 'Your carbon footprint includes emissions from transportation, energy use, food choices, and consumption. I can help you calculate and reduce it! Try our carbon calculator or ask me specific questions about reducing emissions.';
    } else if (lowerMessage.includes('transport') || lowerMessage.includes('car')) {
      return 'Transportation is often the largest part of personal carbon footprints. Consider walking, cycling, public transport, or electric vehicles. Even carpooling can significantly reduce your impact!';
    } else if (lowerMessage.includes('energy') || lowerMessage.includes('electricity')) {
      return 'Home energy efficiency is key! Switch to LED bulbs, unplug devices when not in use, use programmable thermostats, and consider renewable energy sources like solar panels.';
    } else if (lowerMessage.includes('food') || lowerMessage.includes('diet')) {
      return 'Food choices matter! Eating less meat, choosing local and seasonal produce, and reducing food waste can significantly lower your carbon footprint. Plant-based meals are especially eco-friendly.';
    } else if (lowerMessage.includes('tips') || lowerMessage.includes('help') || lowerMessage.includes('reduce')) {
      return 'Here are quick eco-tips: 1) Use reusable bags and water bottles 2) Switch to energy-efficient appliances 3) Eat more plants 4) Walk or bike when possible 5) Recycle and compost. What specific area would you like to focus on?';
    } else {
      return 'That\'s an interesting question! I\'m here to help with environmental and sustainability topics. You can ask me about carbon footprints, eco-friendly tips, transportation, energy efficiency, or sustainable living practices.';
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Eco Assistant</h1>
        <p className="text-green-600">Your AI-powered sustainability companion with voice support</p>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-green-200 h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Bot className="w-5 h-5 mr-2" />
            Chat with Eco Assistant
          </CardTitle>
          <CardDescription>Ask questions about sustainability, carbon footprints, and eco-friendly tips</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' ? (
                      <Bot className="w-4 h-4 mt-1 text-green-600" />
                    ) : (
                      <User className="w-4 h-4 mt-1" />
                    )}
                    <div>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about sustainability..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="border-green-300 focus:border-green-500"
            />
            <Button
              onClick={handleVoiceInput}
              variant={isListening ? "default" : "outline"}
              size="icon"
              className={isListening ? "bg-red-600 hover:bg-red-700" : "border-green-300 hover:bg-green-50"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button
              onClick={handleSendMessage}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
