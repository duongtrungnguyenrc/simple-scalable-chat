import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Message } from "./message.schema";
import { User } from "@modules/user";

@Schema({ timestamps: true })
export class Room extends Document<String> {
  @Prop({ type: Types.ObjectId, ref: "User" })
  author: User;

  @Prop()
  name: string;

  @Prop({ type: String })
  password?: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: [{ type: Types.ObjectId }], ref: "Message", default: [] })
  messages: Array<Message>;

  @Prop({ type: [{ type: Types.ObjectId }], ref: "User", default: [] })
  members: Array<User>;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
