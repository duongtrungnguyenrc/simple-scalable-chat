declare type MessageFrom = "ME" | "OTHERS";

declare type Room = BaseModel & {
    email: string;
    messages: Message[];
    createdAt: string;
};

declare type Message = BaseModel & {
    from: MessageFrom;
    message: string;
    createdAt: string;
};