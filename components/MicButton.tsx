
import React from 'react';
import { MicIcon } from './icons';

interface MicButtonProps {
  isListening: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const MicButton: React.FC<MicButtonProps> = ({ isListening, onClick, disabled }) => {
  const listeningClasses = 'bg-red-600 text-white animate-pulse';
  const idleClasses = 'bg-green-700 text-white hover:bg-green-800';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0 ${isListening ? listeningClasses : idleClasses}`}
      aria-label={isListening ? "Stop Listening" : "Start Listening"}
    >
      <MicIcon className="w-6 h-6" />
    </button>
  );
};
