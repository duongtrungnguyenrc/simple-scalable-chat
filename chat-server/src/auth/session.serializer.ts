import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { User } from "@app/user";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  deserializeUser(payload: User, done: Function) {
    done(null, payload);
  }
}
