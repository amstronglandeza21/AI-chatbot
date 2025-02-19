import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
    setIsTyping(false); // Reset to initial position when input is cleared
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed w-full max-w-2xl p-2 bg-gray-800 rounded-full shadow-lg transition-all duration-500 ${
        isTyping
          ? "bottom-5 left-1/2 transform -translate-x-1/2" // Moves to the bottom when typing
          : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // Centers initially
      }`}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (!isTyping) setIsTyping(true); // Move to bottom on first input
        }}
        onKeyDown={handleKeyDown}
        placeholder="Send a message..."
        className="flex-1 p-3 bg-transparent text-white rounded-full border-none focus:outline-none w-full"
      />
      <button
        onClick={handleSendMessage}
        className="p-3 bg-blue-600 rounded-full hover:bg-blue-500 transition text-white"
      >
        <FaPaperPlane />
      </button>
    </motion.div>
  );
}
