import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

import { Message } from "./message.schema";
import { BaseDocument } from "@app/common";
import { User } from "@modules/user";

@Schema({ timestamps: true })
export class Room extends BaseDocument {
  @Prop({ type: Types.ObjectId, ref: "User" })
  author: User;

  @Prop()
  name: string;

  @Prop({ type: String })
  password?: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ required: false })
  maxMembers?: number;

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
