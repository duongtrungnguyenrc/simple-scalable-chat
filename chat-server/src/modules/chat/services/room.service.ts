import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CacheService } from "@modules/cache";
import { Repository } from "@app/common";
import { Room } from "../schemas";

@Injectable()
export class RoomService extends Repository<Room> {
  constructor(
    @InjectModel(Room.name) readonly roomModel: Model<Room>,
    @Inject("NATS_SERVICE") natsClient: ClientProxy,

    readonly cacheService: CacheService,
  ) {
    super(roomModel, natsClient, cacheService);
  }
}
