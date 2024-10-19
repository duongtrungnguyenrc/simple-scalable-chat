import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { ChatService } from "./chat.service";
import { Logger } from "@nestjs/common";

@WebSocketGateway({ namespace: "chat" })
export class ChatGateway {
  @WebSocketServer()
  private server: Server;

  private readonly logger: Logger = new Logger(ChatGateway.name);

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage("join")
  async onJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    try {
      if (!id) throw new Error("Invalid room id");

      if (!(await this.chatService.isExistingRoom(id))) throw new Error("Room does not exists");

      await client.join(id);
      this.logger.log(`Client ${client.id} joined room ${id}`);
    } catch (error) {
      this.logger.error(`Client ${client.id} failed to join room ${id} - reason: ${error.message}`);
      client.emit("error", error.message);
    }
  }

  @SubscribeMessage("send")
  async onSendMessage() {}
}
