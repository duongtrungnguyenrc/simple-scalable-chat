import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { isValidObjectId, Types } from "mongoose";
import { Request } from "express";
import { compare } from "bcrypt";

import { CreateMessageDto, CreateRoomDto, FindRoomResponseDto, MessageResponseDto } from "../dtos";
import { hashPassword, InfiniteResponse, withMutateTransaction } from "@app/common";
import { MessageService } from "./message.service";
import { RoomService } from "./room.service";
import { Message, Room } from "../schemas";

@Injectable()
export class ChatService {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
  ) {}

  async createRoom(userId: string, data: CreateRoomDto): Promise<Room> {
    try {
      const { password, ...roomData } = data;

      const room: Room = await this.roomService.create({
        ...roomData,
        author: new Types.ObjectId(userId),
        password: password ? await hashPassword(password) : undefined,
      });

      const welcomeMessage: Message = await this.messageService.create({
        content: `Đã tạo phòng "${room.name}"!`,
      });

      await this.roomService.update({ _id: room._id }, { $push: { messages: welcomeMessage._id } });

      return room;
    } catch (error) {
      throw new InternalServerErrorException("Error creating room or message");
    }
  }

  async isExistingRoom(id: string): Promise<boolean> {
    return !!(await this.roomService.count({ _id: id }));
  }

  async joinRoom(roomId: string, request: Request, password?: string): Promise<void> {
    const room: Room = await this.roomService.find(roomId);

    if (!room) {
      throw new BadRequestException("Phòng không tồn tại");
    }

    if (room.password) {
      if (!password) {
        throw new BadRequestException("Yêu cầu mật khẩu cho phòng này");
      }

      const isPasswordValid = await compare(password, room.password);

      if (!isPasswordValid) {
        throw new BadRequestException("Mật khẩu không chính xác");
      }
    }

    try {
      const user = request.user;

      const joinMessage: Message = await this.messageService.create({
        content: `${user.name} đã tham gia phòng"!`,
      });

      await this.roomService.update(
        { _id: roomId },
        {
          $push: {
            members: new Types.ObjectId(user._id),
            messages: joinMessage._id,
          },
        },
      );
    } catch (error) {
      throw new InternalServerErrorException("Lỗi khi tham gia phòng");
    }
  }

  async leaveRoom(roomId: string, request: Request): Promise<void> {
    try {
      const user = request.user;

      const leaveMessage: Message = await this.messageService.create({
        content: `${user.name} đã tham rời phòng"!`,
      });

      await this.roomService.update(
        { _id: roomId },
        {
          $pull: {
            members: new Types.ObjectId(user._id),
          },
          $push: {
            messages: leaveMessage._id,
          },
        },
      );
    } catch (error) {
      throw new InternalServerErrorException("Lỗi khi tham gia phòng");
    }
  }

  async deleteRoom(roomId: string, userId: string): Promise<void> {
    const room: Room = await this.roomService.find(roomId);

    if (!room) {
      throw new BadRequestException("Phòng chat không tồn tại");
    }

    if (`${room.author}` != userId || room.author._id != userId) {
      throw new ForbiddenException("Bạn không phải chủ sở hữu phòng chat này");
    }

    await this.roomService.update(
      { _id: roomId },
      {
        $pull: {
          members: new Types.ObjectId(userId),
        },
      },
    );
  }

  async findChatRoom(userId: string, query: string): Promise<FindRoomResponseDto[]> {
    const filter: Record<string, any> = {
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
      ],
      $and: [{ members: { $ne: new Types.ObjectId(userId) } }, { author: { $ne: new Types.ObjectId(userId) } }],
      isDeleted: false,
    };

    if (isValidObjectId(query)) {
      filter.$or.push({ _id: query });
    }

    const rooms: Room[] = await this.roomService.findMultiple(filter);

    return rooms.map((room) => {
      const { messages, password, ...rest } = room;

      return {
        room: rest,
        isPrivate: !!password,
        isYour: room.author._id == userId || `${room.author}` == userId,
      };
    });
  }

  async getJoinedChatRooms(userId: string, { page, limit }: Pagination): Promise<InfiniteResponse<Room>> {
    const userObjectId = new Types.ObjectId(userId);

    return await this.roomService.findMultipleInfinite(
      {
        $or: [
          {
            author: userObjectId,
          },
          {
            members: userObjectId,
          },
        ],
        isDeleted: false,
      },
      page,
      limit,
    );
  }

  async pushMessage(userId: string, data: CreateMessageDto): Promise<MessageResponseDto> {
    const session = await this.messageService.getModel().db.startSession();

    return withMutateTransaction(session, async (session) => {
      const { roomId, ...messageData } = data;

      const [newMessage]: Message[] = await this.messageService.create(
        [
          {
            ...messageData,
            user: new Types.ObjectId(userId),
          },
        ],
        { session },
      );

      this.roomService.update(
        roomId,
        {
          $push: {
            messages: newMessage._id,
          },
          updatedAt: new Date(),
        },
        { session },
      );

      return {
        _id: newMessage._id.toString(),
        from: newMessage.user._id === userId ? "ME" : "OTHERS",
        content: newMessage.content,
        createdAt: newMessage.createdAt.toLocaleDateString("vi-VN"),
      };
    });
  }

  async getMessages(userId: string, roomId: string, pagination: Pagination): Promise<InfiniteResponse<MessageResponseDto>> {
    const { page, limit } = pagination;

    const userObjectId = new Types.ObjectId(userId);

    const room: Room = await this.roomService.find(
      {
        _id: new Types.ObjectId(roomId),
        $or: [
          {
            author: userObjectId,
          },
          {
            members: userObjectId,
          },
        ],
      },
      ["messages"],
    );

    if (!room) throw new BadRequestException("Phòng chat không tồn tại");

    const response: InfiniteResponse<Message> = await this.messageService.findMultipleInfinite(
      { _id: { $in: room.messages } },
      page,
      limit,
      undefined,
      undefined,
      { createdAt: 1 },
    );

    return {
      ...response,
      data: response.data.map((message) => {
        return {
          _id: message._id.toString(),
          from: !!message.user ? (message.user._id === userId ? "ME" : "OTHERS") : "SYSTEM",
          content: message.content,
          createdAt: message.createdAt ? new Date(message.createdAt).toLocaleDateString("vi-VN") : undefined,
        };
      }),
    };
  }
}
