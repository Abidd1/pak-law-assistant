
import React from 'react';
import { Message } from '../types';
import { UserIcon, BotIcon } from './icons';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const bubbleClasses = isUser
    ? 'bg-green-700 text-white rounded-br-none'
    : message.isError ? 'bg-red-100 text-red-800 rounded-bl-none' : 'bg-gray-200 text-gray-800 rounded-bl-none';

  const containerClasses = `flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`;

  const Icon = isUser ? UserIcon : BotIcon;

  return (
    <div className={containerClasses}>
      {!isUser && <Icon className="w-8 h-8 p-1.5 rounded-full bg-gray-300 text-gray-600 flex-shrink-0" />}
      <div
        className={`p-3 rounded-lg max-w-sm md:max-w-md break-words ${bubbleClasses}`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && <Icon className="w-8 h-8 p-1.5 rounded-full bg-green-700 text-white flex-shrink-0" />}
    </div>
  );
};
