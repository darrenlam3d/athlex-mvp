
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Bot, User } from 'lucide-react';

interface ChatMessage {
  user_input: string;
  chatbot_response: string;
}

interface NutritionChatbotProps {
  initialInteractions?: ChatMessage[];
}

const NutritionChatbot: React.FC<NutritionChatbotProps> = ({ initialInteractions = [] }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialInteractions);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Get user input and clear the input field
    const userInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);
    
    // Simulate chatbot response
    setTimeout(() => {
      const newMessage = {
        user_input: userInput,
        chatbot_response: generateResponse(userInput)
      };
      
      setMessages([...messages, newMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Simple response generator for demo purposes
  const generateResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    let calories, protein;
    
    if (lowerInput.includes("protein shake")) {
      calories = 350;
      protein = 25;
    } else if (lowerInput.includes("chicken")) {
      calories = 650;
      protein = 35;
    } else if (lowerInput.includes("salad")) {
      calories = 320;
      protein = 10;
    } else if (lowerInput.includes("fish") || lowerInput.includes("salmon")) {
      calories = 450;
      protein = 30;
    } else if (lowerInput.includes("pasta")) {
      calories = 700;
      protein = 15;
    } else if (lowerInput.includes("rice")) {
      calories = 550;
      protein = 12;
    } else {
      calories = Math.floor(Math.random() * 400) + 300;
      protein = Math.floor(Math.random() * 20) + 10;
    }
    
    return `Logged: ${input} (Est. ${calories} kcal, ${protein}g protein)`;
  };

  return (
    <Card className="bg-athlex-gray-900 border-athlex-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Meal Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-athlex-accent/30 flex items-center justify-center text-athlex-accent">
                <Bot size={18} />
              </div>
              <div className="bg-athlex-gray-800 p-3 rounded-lg max-w-[80%]">
                <p>Hi there! I'm your nutrition assistant. Tell me what you ate, and I'll log it for you.</p>
              </div>
            </div>
            
            {messages.map((message, index) => (
              <React.Fragment key={index}>
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-athlex-accent/20 p-3 rounded-lg max-w-[80%]">
                    <p>{message.user_input}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-athlex-gray-700 flex items-center justify-center">
                    <User size={18} />
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-athlex-accent/30 flex items-center justify-center text-athlex-accent">
                    <Bot size={18} />
                  </div>
                  <div className="bg-athlex-gray-800 p-3 rounded-lg max-w-[80%]">
                    <p>{message.chatbot_response}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-athlex-accent/30 flex items-center justify-center text-athlex-accent">
                  <Bot size={18} />
                </div>
                <div className="bg-athlex-gray-800 p-3 rounded-lg">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-athlex-gray-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-athlex-gray-600 animate-bounce" style={{ animationDelay: '100ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-athlex-gray-600 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type what you ate..."
              className="flex-1 bg-athlex-gray-800 border-athlex-gray-700"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !inputMessage.trim()}
              className="bg-athlex-accent hover:bg-athlex-accent/90"
            >
              <SendHorizontal className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionChatbot;
