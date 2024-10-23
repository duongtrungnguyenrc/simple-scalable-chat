import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

import { CacheModule } from "@modules/cache";
import { ChatModule } from "@modules/chat";
import { UserModule } from "@modules/user";
import { AuthModule } from "@modules/auth";

@Module({
  imports: [
    UserModule,
    ChatModule,
    AuthModule,
    CacheModule.forRoot(),
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>("MONGODB_URI"),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
