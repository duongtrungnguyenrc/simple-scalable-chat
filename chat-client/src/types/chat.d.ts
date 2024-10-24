declare type MessageFrom = "ME" | "OTHERS" | "SYSTEM";

declare type Room = BaseModel & {
  name: string;
  messages: Message[];
  createdAt: string;
};

declare type Message = BaseModel & {
  from: MessageFrom;
  content: string;
  createdAt: string;
};

declare type CreateChatRoomDto = {
  name: string;
  maxMembers?: number;
  password?: string;
};

declare type JoinChatRoomDto = {
  id: string;
  password?: string;
};

declare type FindChatRoomResponseDto = {
  room: Partial<Room>;
  isPrivate: boolean;
};
