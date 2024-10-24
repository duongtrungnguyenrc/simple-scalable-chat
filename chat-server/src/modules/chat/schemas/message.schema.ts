import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

import { BaseDocument } from "@app/common";
import { User } from "@modules/user";

@Schema({ timestamps: true })
export class Message extends BaseDocument {
  @Prop({ type: Types.ObjectId, ref: "User", required: false })
  user?: User;

  @Prop({ type: String })
  content: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
