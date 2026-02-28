
import React from 'react';
import { MicButton } from './MicButton';
import { SendIcon } from './icons';
import { ChatMode } from '../types';

interface FooterProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: (message: string) => void;
  isListening: boolean;
  handleMicPress: () => void;
  isLoading: boolean;
  chatMode: ChatMode;
}

export const Footer: React.FC<FooterProps> = ({
  input,
  setInput,
  handleSend,
  isListening,
  handleMicPress,
  isLoading,
  chatMode,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const showTextInput = chatMode === ChatMode.TEXT || isListening;

  return (
    <footer className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
      <div className="flex items-center space-x-2">
        <div className="flex-grow relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening..." : "Type your question..."}
            className={`w-full p-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300 ${showTextInput ? 'opacity-100' : 'opacity-0 w-0 p-0 border-0'}`}
            disabled={isLoading || (chatMode === ChatMode.VOICE && !isListening)}
          />
           {chatMode === ChatMode.TEXT && (
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-green-700 text-white hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                aria-label="Send Message"
              >
                <SendIcon className="w-5 h-5" />
              </button>
           )}
        </div>
        <MicButton 
          isListening={isListening} 
          onClick={handleMicPress} 
          disabled={isLoading}
        />
      </div>
    </footer>
  );
};
