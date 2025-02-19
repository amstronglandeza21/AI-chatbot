import { useState } from "react";
import styles from "../styles/Chatbot.module.css";
import { FaArrowUp } from "react-icons/fa"; 
import Switch from "react-switch";
import ReactMarkdown from "react-markdown";
import { sendMessageToChatbot } from "../utils/api";

function Chatbot() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inputPosition, setInputPosition] = useState("center"); // State to track input position
  const [showGreeting, setShowGreeting] = useState(true); // State to track greeting visibility
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track theme

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Add user message to the chat
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    setInputValue("");
    setIsTyping(true); // Show typing indicator
    setShowGreeting(false); // Hide greeting when conversation starts

    try {
      const response = await sendMessageToChatbot(inputValue); // API Call
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { text: "⚠️ Error: Could not fetch response.", sender: "bot" }]);
    } finally {
      setIsTyping(false);
      setInputPosition("bottom"); // Move input box to the bottom
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${styles.chatbotContainer} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <div className={styles.chatbotCard}>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          <Switch checked={isDarkMode} onChange={toggleTheme} offColor="#888" onColor="#555" uncheckedIcon={false} checkedIcon={false} />
        </button>
        {showGreeting && <div className={styles.greeting}>How can I assist you today?</div>}
        <div className={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          {isTyping && <div className={styles.typingIndicator}>Just a second..</div>}
        </div>
        {/* Refined Input Box */}
        <div className={`${styles.inputContainer} ${inputPosition === "bottom" ? styles.slideDown : ""}`}>
  <input
    className={styles.chatInput}
    type="text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
    placeholder="Type a message..."
  />
  <button className={styles.sendButton} onClick={handleSendMessage}>
    <FaArrowUp />
  </button>
</div>

      </div>
    </div>
  );
}

export default Chatbot;