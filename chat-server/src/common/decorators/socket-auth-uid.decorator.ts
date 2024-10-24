import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Socket } from "socket.io";

export const SocketAuthUid = createParamDecorator((_, ctx: ExecutionContext): string | undefined => {
  const client: Socket = ctx.switchToWs().getClient();

  const request: Request = client.request as Request;

  console.log(request.user);

  return request.user._id;
});
