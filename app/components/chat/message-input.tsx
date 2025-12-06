"use client";

import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { AppLanguage } from "@/app/components/layout/chat-layout";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  language: AppLanguage;
  disabled?: boolean;
  isAuthenticated: boolean;
  onShowAuth?: (mode: "register" | "login") => void;
  onLanguageChange?: (lang: AppLanguage) => void;
}

const messageContent: Record<AppLanguage, { askPlaceholder: string; attachFile: string }> = {
  english: { askPlaceholder: "Ask anything", attachFile: "Attach File" },
  amharic: { askPlaceholder: "ማንኛውንም ጥያቄ ጠይቁ", attachFile: "ፋይል አያይዝ" },
  oromigna: { askPlaceholder: "Maaltu si barbaachisa?", attachFile: "Faayili fe'i" },
};

export default function MessageInput({
  onSendMessage,
  language,
  disabled,
  isAuthenticated,
  onShowAuth,
  onLanguageChange,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!isAuthenticated) {
      onShowAuth?.("login");
      return;
    }

    if (message.trim() === "") return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="w-full border-t p-4 bg-white flex flex-col gap-3">
      {/* Language Selector */}
      <select
        className="border rounded-lg p-2 w-fit text-sm"
        value={language}
        onChange={(e) => onLanguageChange?.(e.target.value as AppLanguage)}
      >
        <option value="english">English</option>
        <option value="amharic">Amharic</option>
        <option value="oromigna">Oromigna</option>
      </select>

      {/* Message Input */}
      <div className="flex items-center gap-3">
        {/* Attach File Button */}
        <button
          className="p-2 border rounded-lg hover:bg-gray-100"
          title={messageContent[language].attachFile}
        >
          <Paperclip size={20} />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
          placeholder={messageContent[language].askPlaceholder}
          disabled={disabled}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          disabled={disabled}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}