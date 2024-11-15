import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { Global, Module } from "@nestjs/common";

@Global()
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
  exports: [
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
})
export class NatsClientModule {}
