import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, Types } from "mongoose";

import { CreateMessageDto, CreateRoomDto, FindRoomResponseDto, MessageResponseDto } from "./dtos";
import { hashPassword, InfiniteResponse, withMutateTransaction } from "@app/common";
import { Message, Room } from "./schemas";
import { compare } from "bcrypt";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async createRoom(userId: string, data: CreateRoomDto): Promise<Room> {
    try {
      const { password, ...roomData } = data;

      const room: Room = await this.roomModel.create({
        ...roomData,
        author: new Types.ObjectId(userId),
        password: password ? await hashPassword(password) : undefined,
      });

      const welcomeMessage: Message = await this.messageModel.create({
        content: `Đã tạo phòng "${room.name}"!`,
      });

      await this.roomModel.updateOne({ _id: room._id }, { $push: { messages: welcomeMessage._id } });

      return room;
    } catch (error) {
      throw new InternalServerErrorException("Error creating room or message");
    }
  }

  async isExistingRoom(id: string): Promise<boolean> {
    return !!(await this.roomModel.countDocuments({ _id: id }));
  }

  async joinRoom(roomId: string, userId: string, password?: string): Promise<void> {
    const room: Room = await this.roomModel.findById(roomId);

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
      await this.roomModel.updateOne(
        { _id: roomId },
        {
          $push: {
            members: new Types.ObjectId(userId),
          },
        },
      );
    } catch (error) {
      throw new InternalServerErrorException("Lỗi khi tham gia phòng");
    }
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

  async deleteRoom(roomId: string, userId: string): Promise<void> {
    const room: Room = await this.roomModel.findById(roomId);

    if (!room) {
      throw new BadRequestException("Phòng chat không tồn tại");
    }

    if (`${room.author}` != userId || room.author._id != userId) {
      throw new ForbiddenException("Bạn không phải chủ sở hữu phòng chat này");
    }

    await this.roomModel.updateOne(
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

    const rooms: Room[] = await this.roomModel.find(filter).lean();

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
    const skip = (page - 1) * limit;

    const userObjectId = new Types.ObjectId(userId);

    const rooms: Room[] = await this.roomModel
      .find({
        $or: [
          {
            author: userObjectId,
          },
          {
            members: userObjectId,
          },
        ],
        isDeleted: false,
      })
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 })
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 1 },
      })
      .lean();

    const nextCursor = rooms.length === limit ? page + 1 : undefined;

    const response: InfiniteResponse<Room> = {
      data: rooms,
      nextCursor,
    };

    return response;
  }

  async pushMessage(userId: string, data: CreateMessageDto): Promise<MessageResponseDto> {
    const session = await this.messageModel.db.startSession();

    return withMutateTransaction(session, async (session) => {
      const { roomId, ...messageData } = data;

      const [newMessage]: Message[] = await this.messageModel.create(
        [
          {
            ...messageData,
            user: new Types.ObjectId(userId),
          },
        ],
        { session },
      );

      this.roomModel.findByIdAndUpdate(
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
    const room: Room = await this.roomModel.findById(roomId);

    if (!room) throw new BadRequestException("Phòng chat không tồn tại");
    if (room.members.findIndex((member) => member._id === userId) === -1 && room.author._id != userId) {
      throw new BadRequestException("Bạn chưa tham gia phòng chat này");
    }

    const skip = room.messages.length - page * limit;

    const messages: Message[] = await this.messageModel
      .find({ _id: { $in: room.messages } })
      .sort({ createdAt: 1 })
      .skip(skip >= 0 ? skip : 0)
      .limit(limit);

    const totalRooms: number = await this.messageModel.countDocuments({ _id: { $in: room.messages } });
    const pages: number = Math.floor(totalRooms / limit);

    const nextCursor: number = page < pages ? page + 1 : undefined;

    const mappedMessages: MessageResponseDto[] = messages.map((message) => {
      return {
        _id: message._id.toString(),
        from: !!message.user ? (message.user._id === userId ? "ME" : "OTHERS") : "SYSTEM",
        content: message.content,
        createdAt: message.createdAt.toLocaleDateString("vi-VN"),
      };
    });

    const response: InfiniteResponse<MessageResponseDto> = {
      nextCursor,
      data: mappedMessages,
    };

    return response;
  }
}
