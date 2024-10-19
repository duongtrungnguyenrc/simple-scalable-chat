import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Message } from "./message.schema";

@Schema({ timestamps: true })
export class Room extends Document<String> {
  @Prop({ type: [{ type: Types.ObjectId }], ref: "Message", default: [] })
  messages: Array<Message>;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
