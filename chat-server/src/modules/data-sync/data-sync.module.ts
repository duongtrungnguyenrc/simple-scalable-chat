import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { DataSyncController } from "./data-sync.controller";
import { DataSyncService } from "./data-sync.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "NATS_SERVICE",
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [configService.get<string>("NATS_SERVER_URL")],
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [DataSyncService],
  controllers: [DataSyncController],
  exports: [],
})
export class DataSyncModule {}
