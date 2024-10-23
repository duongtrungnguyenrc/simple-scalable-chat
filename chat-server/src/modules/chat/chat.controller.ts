import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";

import { ApiPagination, AuthUid, Pagination } from "@common/decorators";
import { CreateRoomDto, JoinRoomDto } from "./dtos";
import { ChatService } from "./chat.service";

@Controller("chat")
@ApiTags("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/")
  async createRoom(@Body() data: CreateRoomDto, @AuthUid() userId: string) {
    return await this.chatService.createRoom(userId, data);
  }

  @Post("/join/:id")
  async joinChatRoom(@Param("id") roomId: string, @AuthUid() userId: string, @Body() { password }: JoinRoomDto) {
    return await this.chatService.joinRoom(roomId, userId, password);
  }

  @Post("/leave/:id")
  async leaveChatRoom(@Param("id") roomId: string, @AuthUid() userId: string) {
    return await this.chatService.leaveRoom(roomId, userId);
  }

  @Get("/:id")
  @ApiParam({
    type: String,
    name: "id",
    description: "Chat room id",
  })
  @ApiPagination()
  async getMessages(@Param("id") id: string, @Pagination() pagination: Pagination) {
    return await this.chatService.getMessages(id, pagination);
  }
}
