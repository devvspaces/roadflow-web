import React, { useEffect, useState } from "react";
import { Message, clearMessages } from "../alerts";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const messages = JSON.parse(
      window.localStorage.getItem("messages") || "[]"
    );
    if (messages) {
      setMessages(messages);
      setTimeout(() => {
        setMessages([]);
        clearMessages();
      }, 5000);
    }
    // clearMessages()
  }, []);
  return messages;
}
