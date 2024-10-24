import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request as ER } from "express";

import { CreateUserDto, User } from "@modules/user";
import { AuthService } from "./auth.service";
import { Public } from "@common/decorators";
import { LocalAuthGuard } from "./guards";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("/sign-in")
  @HttpCode(200)
  async signIn(@Request() req: ER): Promise<Express.User> {
    return await this.authService.signIn(req);
  }

  @Post("/sign-up")
  @Public()
  @ApiBody({ type: CreateUserDto })
  async signUp(@Body() data: CreateUserDto): Promise<Omit<User, "password">> {
    return await this.authService.signUp(data);
  }

  @Post("/sign-out")
  @HttpCode(200)
  async signOut(@Request() req: ER) {
    return await this.authService.signOut(req);
  }

  @Get("/status")
  status(@Request() req: ER): Express.User {
    return req.user;
  }
}
