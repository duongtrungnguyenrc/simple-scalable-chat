import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

import { ChatService, MessageService, RoomService } from "./services";
import { Message, MessageSchema, Room, RoomSchema } from "./schemas";
import { ChatController } from "./chat.controller";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  providers: [ChatService, MessageService, RoomService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
