"use client";

import { createContext } from "react";

export type ChatContextType = {
  ready: boolean;
  setReadyState: (state: boolean) => void;
  onSendMessage: () => void;
};

export const ChatContext = createContext<ChatContextType>({
  ready: false,
  setReadyState: () => {},
  onSendMessage: () => {},
});
