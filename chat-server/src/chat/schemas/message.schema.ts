import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { User } from "@app/user";

@Schema({ timestamps: true })
export class Message extends Document<String> {
  @Prop({ type: Types.ObjectId, ref: "User" })
  user: User;

  @Prop({ type: String })
  content: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
