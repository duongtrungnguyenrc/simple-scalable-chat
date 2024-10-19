import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";

import { Message, Room } from "./schemas";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async createRoom(): Promise<Room> {
    return;
  }

  async isExistingRoom(id: string): Promise<boolean> {
    return !!(await this.roomModel.countDocuments({ _id: id }));
  }

  async createMessage(): Promise<Message> {
    return;
  }

  async getMessages(id: string, pagination: Pagination): Promise<Message[]> {
    return [];
  }
}
