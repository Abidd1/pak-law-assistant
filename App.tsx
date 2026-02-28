
import React, { useState, useEffect, useRef } from 'react';
import { Message, ChatMode } from './types';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { Footer } from './components/Footer';
import { useSpeechToText } from './hooks/useSpeechToText';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { sendMessageToAI } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "As-salamu alaykum! I am your AI assistant for Pakistani Constitutional Law. How can I help you understand your rights and the regulations today? Please note, I am an AI and not a substitute for legal advice from a qualified lawyer.",
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatMode, setChatMode] = useState<ChatMode>(ChatMode.TEXT);

  const { isListening, transcript, startListening, stopListening } = useSpeechToText();
  const { speak, isSpeaking } = useTextToSpeech();
  
  const chatServiceRef = useRef<any>(null); // To hold the chat session instance

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSend = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    // Stop any ongoing speech
    if(isSpeaking) window.speechSynthesis.cancel();

    try {
      const { response, chat } = await sendMessageToAI(messageContent, chatServiceRef.current);
      chatServiceRef.current = chat; // Update chat session reference
      const modelMessage: Message = { role: 'model', content: response };
      setMessages(prev => [...prev, modelMessage]);

      if (chatMode === ChatMode.VOICE) {
        speak(response);
      }
    } catch (err) {
      const errorMessage = 'Sorry, I encountered an error. Please check your API key and try again.';
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'model', content: errorMessage, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicPress = () => {
    if (isListening) {
      stopListening();
      if(transcript) {
        handleSend(transcript);
      }
    } else {
      setInput('');
      startListening();
    }
  };
  
  const toggleChatMode = () => {
    setChatMode(prev => prev === ChatMode.TEXT ? ChatMode.VOICE : ChatMode.TEXT);
    if(isSpeaking) window.speechSynthesis.cancel();
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-white shadow-2xl font-sans">
      <Header 
        chatMode={chatMode} 
        toggleChatMode={toggleChatMode} 
        isSpeaking={isSpeaking}
      />
      <ChatInterface 
        messages={messages} 
        isLoading={isLoading} 
        error={error} 
      />
      <Footer
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isListening={isListening}
        handleMicPress={handleMicPress}
        isLoading={isLoading}
        chatMode={chatMode}
      />
    </div>
  );
};

export default App;
