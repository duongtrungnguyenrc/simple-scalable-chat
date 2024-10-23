import { Module } from "@nestjs/common";

import { SessionSerializer } from "./utils/session-serializer.util";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies";
import { UserModule } from "@modules/user";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
