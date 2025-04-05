
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Send, User } from 'lucide-react';

const AiCoach = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: 'Hello Alex! I\'m your AI Coach. What would you like help with today?'
    }
  ]);

  // Sample questions for quick access
  const sampleQuestions = [
    "What drills can improve my lateral quickness?",
    "How can I build better court vision?",
    "What should I focus on this week?",
    "Why did my shooting percentage drop?"
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      content: input
    }]);
    
    // Clear input
    setInput('');
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        content: "Based on your recent performance data, I recommend focusing on your decision-making under pressure. Your turnovers increase by 30% in close game situations. Try the 'Clock Drill' with defensive pressure to simulate game scenarios. Would you like me to elaborate on this drill?"
      }]);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      content: question
    }]);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        content: "I'm analyzing your data for a personalized answer. This feature will be fully implemented in the next update. For now, I recommend checking the Insights Feed for related content."
      }]);
    }, 1000);
  };

  return (
    <Card className="border-gray-700 bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Ask the AI Coach</CardTitle>
        <CardDescription className="text-gray-400 mt-1">
          Get personalized guidance based on your performance data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-800/30 rounded-lg p-3 h-64 overflow-y-auto">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex gap-2 mb-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <div className="bg-athlex-accent rounded-full p-1.5 h-6 w-6 mt-1">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                )}
                
                <div 
                  className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    message.sender === 'user' 
                      ? 'bg-athlex-accent text-white' 
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                
                {message.sender === 'user' && (
                  <div className="bg-gray-700 rounded-full p-1.5 h-6 w-6 mt-1">
                    <User className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-4 pr-10 text-white"
              placeholder="Ask a question about your training..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-athlex-accent"
              onClick={handleSendMessage}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Try asking:</h4>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((question, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className="text-xs border-gray-700 hover:bg-gray-700"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiCoach;
