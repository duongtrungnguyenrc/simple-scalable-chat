import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { User, UserService } from "@modules/user";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (error: any, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (error: any, user: User) => void) {
    const userInDB = await this.userService.getUser({ _id: user._id });

    return userInDB ? done(null, userInDB) : done(null, null);
  }
}
