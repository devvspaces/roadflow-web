import { MESSAGES_KEY } from "./constants";

export enum AlertType {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning"
}

export interface Message {
  type: AlertType;
  message: string;
}

export function addMessage(type: AlertType, message: string) {
  const messages = JSON.parse(window.localStorage.getItem(MESSAGES_KEY) || "[]");
  messages.push({ type, message });
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function clearMessages() {
  window.localStorage.setItem(MESSAGES_KEY, JSON.stringify([]));
}