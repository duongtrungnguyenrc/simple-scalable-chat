import { IoAdapter } from "@nestjs/platform-socket.io";
import { INestApplication } from "@nestjs/common";
import { ServerOptions } from "socket.io";

export class ChatSocketAdapter extends IoAdapter {
  constructor(
    app: INestApplication<any>,
    private readonly sessionMiddleware: any,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const ioOptions: ServerOptions = {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
      ...options,
    };

    const ioServer = super.createIOServer(port, ioOptions);
    ioServer.use(this.sessionMiddleware);

    return ioServer;
  }
}
