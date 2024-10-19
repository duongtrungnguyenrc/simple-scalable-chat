import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiPagination, Pagination } from "@app/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";

import { ChatService } from "./chat.service";

@Controller("chat")
@ApiTags("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/")
  async createRoom() {}

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
