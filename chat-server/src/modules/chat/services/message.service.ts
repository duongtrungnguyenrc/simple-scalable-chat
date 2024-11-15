import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Repository } from "@app/common";
import { CacheService } from "@modules/cache";
import { Message } from "../schemas";

@Injectable()
export class MessageService extends Repository<Message> {
  constructor(
    @InjectModel(Message.name) messageModel: Model<Message>,
    @Inject("NATS_SERVICE") natsClient: ClientProxy,
    readonly cacheService: CacheService,
  ) {
    super(messageModel, natsClient, cacheService);
  }
}
