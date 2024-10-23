import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { Request } from "express";

@Injectable()
export class SocketAuth implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const request: Request = client.request as Request;

    return request.isAuthenticated?.();
  }
}
