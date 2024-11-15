import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

import { NatsClientModule } from "@modules/nats-client";
import { DataSyncModule } from "@modules/data-sync";
import { CacheModule } from "@modules/cache";
import { ChatModule } from "@modules/chat";
import { AuthModule } from "@modules/auth";
import { UserModule } from "@modules/user";

@Module({
  imports: [
    UserModule,
    ChatModule,
    AuthModule,
    NatsClientModule,
    DataSyncModule,
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
