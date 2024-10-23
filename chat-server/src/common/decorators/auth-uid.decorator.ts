import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const AuthUid = createParamDecorator((_, ctx: ExecutionContext): string | undefined => {
  const request: Request = ctx.switchToHttp().getRequest();

  return request.user._id;
});
