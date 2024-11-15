import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ApiPagination, AuthUid, Pagination } from "@common/decorators";
import { CreateRoomDto, FindRoomResponseDto, JoinRoomDto } from "./dtos";
import { ChatService } from "./services/chat.service";
import { Request } from "express";

@Controller("chat")
@ApiTags("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/")
  async createRoom(@Body() data: CreateRoomDto, @AuthUid() userId: string) {
    return await this.chatService.createRoom(userId, data);
  }

  @Post("/join/:id")
  async joinChatRoom(@Param("id") roomId: string, @Req() request: Request, @Body() { password }: JoinRoomDto) {
    return await this.chatService.joinRoom(roomId, request, password);
  }

  @Post("/leave/:id")
  async leaveChatRoom(@Param("id") roomId: string, @Req() request: Request) {
    return await this.chatService.leaveRoom(roomId, request);
  }

  @Get("/")
  async getJoinedChatRooms(@AuthUid() userId: string, @Pagination() pagination: Pagination) {
    return await this.chatService.getJoinedChatRooms(userId, pagination);
  }

  @Get("/:query")
  @ApiParam({
    type: String,
    name: "query",
    description: "Name or id",
  })
  @ApiResponse({
    status: 200,
    type: FindRoomResponseDto,
  })
  async findChatRoom(@AuthUid() userId: string, @Param("query") query: string): Promise<FindRoomResponseDto[]> {
    return await this.chatService.findChatRoom(userId, query);
  }

  @Delete("/")
  @ApiParam({
    type: String,
    name: "id",
    description: "Chat room id",
  })
  async deleteChatRoom(@Param("id") roomId: string, @AuthUid() userId: string) {
    return await this.chatService.deleteRoom(roomId, userId);
  }

  @Get("/:id/message")
  @ApiParam({
    type: String,
    name: "id",
    description: "Chat room id",
  })
  @ApiPagination()
  async getMessages(@AuthUid() userId: string, @Param("id") roomId: string, @Pagination() pagination: Pagination) {
    return await this.chatService.getMessages(userId, roomId, pagination);
  }
}
