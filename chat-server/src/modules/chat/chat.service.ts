import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { hashPassword, InfiniteResponse } from "@app/common";
import { CreateMessageDto, CreateRoomDto } from "./dtos";
import { Message, Room } from "./schemas";
import { compare } from "bcrypt";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async createRoom(userId: string, data: CreateRoomDto): Promise<Room> {
    const { password, ...roomData } = data;

    if (password) {
      return await this.roomModel.create({
        ...roomData,
        author: new Types.ObjectId(userId),
        password: await hashPassword(password),
      });
    }

    return await this.roomModel.create({
      ...roomData,
      author: new Types.ObjectId(userId),
    });
  }

  async isExistingRoom(id: string): Promise<boolean> {
    return !!(await this.roomModel.countDocuments({ _id: id }));
  }

  async createMessage(userId: string, data: CreateMessageDto): Promise<Message> {
    return await this.messageModel.create({
      ...data,
      user: new Types.ObjectId(userId),
    });
  }

  async joinRoom(roomId: string, userId: string, password?: string): Promise<void> {
    const room: Room = await this.roomModel.findById(roomId);

    if (!room) throw new BadRequestException("Room not found");

    if (!compare(password, room.password)) {
      throw new BadRequestException("Invalid password");
    }

    await room.updateOne(
      { _id: roomId },
      {
        $push: {
          members: new Types.ObjectId(userId),
        },
      },
    );
  }

  async leaveRoom(roomId: string, userId: string): Promise<void> {
    await this.roomModel.updateOne(
      { _id: roomId },
      {
        $pull: {
          members: new Types.ObjectId(userId),
        },
      },
    );
  }

  async getMessages(id: string, pagination: Pagination): Promise<InfiniteResponse<Message>> {
    const { page, limit } = pagination;
    const room: Room = await this.roomModel.findById(id);

    if (!room) throw new BadRequestException("Room not found");

    const skip = room.messages.length - page * limit;

    const messages: Message[] = await this.messageModel
      .find({ _id: { $in: room.messages } })
      .sort({ createdAt: 1 })
      .skip(skip >= 0 ? skip : 0)
      .limit(limit);

    const totalRooms: number = await this.messageModel.countDocuments({ _id: { $in: room.messages } });
    const pages: number = Math.floor(totalRooms / limit);

    const nextCursor: number = page < pages ? page + 1 : undefined;

    const response: InfiniteResponse<Message> = {
      nextCursor,
      data: messages,
    };

    return response;
  }
}
