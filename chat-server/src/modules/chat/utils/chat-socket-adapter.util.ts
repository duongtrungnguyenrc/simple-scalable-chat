import { IoAdapter } from "@nestjs/platform-socket.io";
import { ConfigService } from "@nestjs/config";
import { ServerOptions } from "socket.io";
import * as passport from "passport";

import { INestApplication } from "@nestjs/common";

export class ChatSocketAdapter extends IoAdapter {
  constructor(
    private readonly app: INestApplication<any>,
    private readonly sessionMiddleware: any,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const configService: ConfigService = this.app.get(ConfigService);

    const ioOptions: ServerOptions = {
      cors: {
        origin: [configService.get<string>("CLIENT_IP_ORIGIN"), configService.get<string>("CLIENT_ORIGIN")],
        methods: ["GET", "POST"],
        credentials: true,
      },
      ...options,
    };

    const ioServer = super.createIOServer(port, ioOptions);
    ioServer.use(this.sessionMiddleware);
    ioServer.use(passport.initialize());
    ioServer.use(passport.session());

    return ioServer;
  }
}
