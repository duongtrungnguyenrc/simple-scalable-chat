"use client";

import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { ChatContext } from "@app/context";
import { SOCKET_URL } from "@app/common";

type ChatProviderProps = {
  children: ReactNode;
};

const ChatProvider: FC<ChatProviderProps> = ({
  children,
}: ChatProviderProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (socketRef) disconnectSocket();

    socketRef.current = io(SOCKET_URL);
    handleEvent(socketRef.current);

    return () => {
      disconnectSocket();
    };
  }, [socketRef]);

  const handleEvent = (connection: Socket) => {
    connection.on("message", (message: Message) => {});
  };

  const disconnectSocket = () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
  };

  const onSendMessage = useCallback(() => {}, []);

  return (
    <ChatContext.Provider
      value={{ ready, onSendMessage, setReadyState: setReady }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
