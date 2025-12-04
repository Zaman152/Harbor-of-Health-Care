"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "bot",
    text: "Hi there! I'm Harbor, your virtual care coordinator. How can I help you today?",
    time: "Now",
  },
];

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  // Auto-scroll to bottom when messages change or when loading state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const timestamp = new Intl.DateTimeFormat("en-CA", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date());

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      time: timestamp,
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Send message to webhook and wait for response
    try {
      const response = await fetch("https://hoh.app.n8n.cloud/webhook/d079e4d9-a3e9-4054-8b50-f0222c75e880", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Message: trimmed,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Wait for the response body from n8n's "Respond to Webhook" node
      const data = await response.json();
      
      // Check if n8n returned a response message in various possible formats
      // Handle array response: [{"output":"text"}]
      let botResponseText = '';
      
      if (Array.isArray(data) && data.length > 0) {
        // Extract from array format: [{"output":"text"}]
        botResponseText = data[0]?.output || data[0]?.Output || data[0]?.response || data[0]?.Response || '';
      } else if (data && typeof data === 'object') {
        // Handle object response: {"response":"text"} or {"output":"text"}
        botResponseText = 
          data?.response || 
          data?.message || 
          data?.text || 
          data?.Reply || 
          data?.reply || 
          data?.Response || 
          data?.Message || 
          data?.output ||
          data?.Output ||
          data?.data;
      } else if (typeof data === 'string') {
        // Handle string response
        botResponseText = data;
      }
      
      // Fallback if nothing found
      if (!botResponseText) {
        botResponseText = JSON.stringify(data);
      }
      
      if (botResponseText && typeof botResponseText === 'string' && botResponseText.trim()) {
        const botTimestamp = new Intl.DateTimeFormat("en-CA", {
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date());

        const botMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: botResponseText.trim(),
          time: botTimestamp,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // If no valid response text found, show a default message
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: "I received your message, but couldn't process the response. Please try again.",
          time: "Just now",
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      // Show error message to user
      console.error("Failed to send message to webhook:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        time: "Just now",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        type="button"
        onClick={handleToggle}
        aria-label="Open chat support"
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 text-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-teal-300 gradient-btn"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-28 right-6 w-96 max-w-[90vw] z-50"
          >
            <div className="glass-card bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl flex flex-col h-[480px]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/30">
                <div>
                  <p className="font-heading text-lg text-gray-900">
                    Harbor Care Support
                  </p>
                  <p className="text-sm text-gray-500 flex items-center space-x-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
                    <span>Typically replies within a few minutes</span>
                  </p>
                </div>
                <button
                  onClick={handleToggle}
                  aria-label="Close chat"
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-teal-400/60 scrollbar-track-transparent"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-teal-500 to-cyan-400 text-white"
                          : "bg-white/80 text-gray-800 border border-white/60"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span
                        className={`text-[11px] mt-2 block ${
                          message.sender === "user"
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
                {/* Typing indicator while waiting for response */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl px-4 py-3 shadow-sm bg-white/80 text-gray-800 border border-white/60">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-white/30 p-4 bg-white/80">
                <div className="flex items-center space-x-2">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={2}
                    disabled={isLoading}
                    placeholder={isLoading ? "Waiting for response..." : "Ask us about services, availability, funding..."}
                    className="flex-1 rounded-xl border border-gray-200 bg-white/90 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <motion.button
                    type="button"
                    onClick={handleSendMessage}
                    aria-label="Send message"
                    disabled={isLoading}
                    className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isLoading ? { scale: 1.05 } : {}}
                    whileTap={!isLoading ? { scale: 0.95 } : {}}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
                <p className="text-[11px] text-gray-500 mt-2">
                  By chatting, you agree to our{" "}
                  <a href="/privacy" className="text-teal-500 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;


