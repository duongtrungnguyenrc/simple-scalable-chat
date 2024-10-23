import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Request } from "express";

import { PUBLIC_ROUTE_KEY } from "@common/constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic: boolean = this.reflector.get(PUBLIC_ROUTE_KEY, context.getHandler());

    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();

    return request?.isAuthenticated();
  }
}
