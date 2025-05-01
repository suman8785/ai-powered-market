
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: "Hi there! I'm your AI shopping assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Mock responses for demo purposes
  const getMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('order') && lowerQuery.includes('status')) {
      return "I can help you track your order! To check your order status, I'll need your order number. You can find this in your confirmation email.";
    } else if (lowerQuery.includes('return') || lowerQuery.includes('refund')) {
      return "Our return policy allows returns within 30 days of delivery. I can guide you through the return process! Would you like me to help you start a return?";
    } else if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery')) {
      return "We typically ship orders within 1-2 business days, and delivery takes 3-5 business days depending on your location. Express shipping is available for an additional fee.";
    } else if (lowerQuery.includes('payment') || lowerQuery.includes('pay')) {
      return "We accept all major credit cards, PayPal, and Apple Pay. Your payment information is always secured with industry-standard encryption.";
    } else {
      return "Thanks for your message! I'm here to help with any questions about our products, orders, shipping, returns, or anything else. Could you provide more details about what you're looking for?";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="bg-marketplace-primary text-white py-3">
        <CardTitle className="text-center text-lg font-medium">AI Customer Support</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 h-96 overflow-y-auto flex flex-col">
        <div className="flex-1 space-y-4">
          {messages.map(message => (
            <div 
              key={message.id}
              className={`ai-chat-bubble ${message.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}
            >
              <p>{message.text}</p>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="ai-chat-bubble ai-bubble">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-marketplace-primary animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-marketplace-primary animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-marketplace-primary animate-pulse delay-200"></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-2 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input 
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" className="bg-marketplace-primary hover:bg-marketplace-primary/90">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIChat;
