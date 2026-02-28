
import React from 'react';
import { ChatMode } from '../types';
import { SpeakerOnIcon, SpeakerOffIcon, PakistanFlagIcon } from './icons';

interface HeaderProps {
  chatMode: ChatMode;
  toggleChatMode: () => void;
  isSpeaking: boolean;
}

export const Header: React.FC<HeaderProps> = ({ chatMode, toggleChatMode, isSpeaking }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-green-800 text-white shadow-md flex-shrink-0">
      <div className="flex items-center space-x-3">
        <PakistanFlagIcon className="w-8 h-8"/>
        <h1 className="text-xl font-bold">PakLaw AI Assistant</h1>
      </div>
      <button 
        onClick={toggleChatMode} 
        className="p-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
        aria-label={chatMode === ChatMode.VOICE ? "Switch to Text Mode" : "Switch to Voice Mode"}
      >
        {chatMode === ChatMode.VOICE ? 
          <SpeakerOnIcon className={`w-6 h-6 ${isSpeaking ? 'animate-pulse text-yellow-300' : ''}`} /> : 
          <SpeakerOffIcon className="w-6 h-6" />
        }
      </button>
    </header>
  );
};
