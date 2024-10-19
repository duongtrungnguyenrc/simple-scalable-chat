import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

import { CacheModule } from "@app/cache";
import { ChatModule } from "@app/chat";
import { UserModule } from "@app/user";
import { AuthModule } from "@app/auth";
import { PassportModule } from "@nestjs/passport";

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
