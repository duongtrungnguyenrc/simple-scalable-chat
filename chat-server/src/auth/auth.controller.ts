import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request as ER } from "express";

import { LocalAuthGuard, SessionAuthGuard } from "./guards";
import { CreateUserDto, User } from "@app/user";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  signIn(@Request() req: ER) {
    return this.authService.signIn(req)
  }

  @Post("sign-up")
  @ApiBody({ type: CreateUserDto })
  async signUp(@Body() data: CreateUserDto): Promise<Omit<User, "password">> {
    return await this.authService.signUp(data);
  }

  @UseGuards(SessionAuthGuard)
  @Get("sign-out")
  async signOut(@Request() req: ER) {
    return await this.authService.signOut(req);
  }

  @Get("status")
  @UseGuards(SessionAuthGuard)
  status() {
    return { message: "authenticated" };
  }
}
