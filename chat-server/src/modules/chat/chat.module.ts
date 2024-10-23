import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

import { Message, MessageSchema, Room, RoomSchema } from "./schemas";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
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
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
