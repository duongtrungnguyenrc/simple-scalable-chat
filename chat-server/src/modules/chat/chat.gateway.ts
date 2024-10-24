import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger, UseGuards } from "@nestjs/common";

import { CreateMessageDto, MessageResponseDto } from "./dtos";
import { SocketAuth } from "@modules/auth/guards";
import { ChatService } from "./chat.service";
import { SocketAuthUid } from "@app/common";

@WebSocketGateway({ namespace: "chat" })
@UseGuards(SocketAuth)
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;
  private readonly logger: Logger = new Logger(ChatGateway.name);

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket, @SocketAuthUid() userId: string) {
    console.log(client, userId);
  }

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
  async onSendMessage(@ConnectedSocket() client: Socket, @SocketAuthUid() userId: string, @MessageBody() data: CreateMessageDto) {
    try {
      const createdMessage: MessageResponseDto = await this.chatService.pushMessage(userId, data);

      this.server.to(data.roomId).emit("message", createdMessage);
    } catch (error) {
      this.logger.error(`Failed to send message - reason: ${error.message}`);
      client.emit("error", error.message);
    }
  }

  @SubscribeMessage("ping")
  onPing(@ConnectedSocket() client: Socket, @SocketAuthUid() userId: string) {
    this.logger.log(`Client ${client.id} ping`);

    client.emit("pong", userId);
  }
}
