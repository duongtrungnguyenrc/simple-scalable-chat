import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Injectable } from "@nestjs/common";

import { CacheService } from "@modules/cache";
import { hashPassword } from "@common/utils";
import { CreateUserDto } from "./dtos";
import { User } from "./schemas";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly cacheService: CacheService,
  ) {}

  async createUser(data: CreateUserDto): Promise<Omit<User, "password">> {
    const { password, ...userData } = data;

    const hashedPassword: string = await hashPassword(password);

    const createdUser: User = await this.userModel.create({ ...userData, password: hashedPassword });
    delete createdUser.password;

    return createdUser;
  }

  async getUser(filter: FilterQuery<User>, raw: boolean = false): Promise<User | null> {
    if (!raw) {
      const cachedUser: User = await this.cacheService.get<User>("");

      if (cachedUser) return cachedUser;
    }

    return await this.userModel.findOne(filter);
  }
}
