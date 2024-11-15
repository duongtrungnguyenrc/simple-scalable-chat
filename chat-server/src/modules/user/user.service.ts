import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { hashPassword, Repository } from "@common/utils";
import { CacheService } from "@modules/cache";
import { CreateUserDto } from "./dtos";
import { User } from "./schemas";

@Injectable()
export class UserService extends Repository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>, @Inject("NATS_SERVICE") natsClient: ClientProxy, cacheService: CacheService) {
    super(userModel, natsClient, cacheService);
  }

  async createUser(data: CreateUserDto): Promise<Omit<User, "password">> {
    const { password, ...userData } = data;

    const hashedPassword: string = await hashPassword(password);

    const createdUser: User = await this.create({ ...userData, password: hashedPassword });
    delete createdUser.password;

    return createdUser;
  }
}
