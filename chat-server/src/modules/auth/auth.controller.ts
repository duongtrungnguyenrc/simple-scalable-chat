import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
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
  signIn(@Request() req: ER) {
    return this.authService.signIn(req);
  }

  @Post("/sign-up")
  @ApiBody({ type: CreateUserDto })
  async signUp(@Body() data: CreateUserDto): Promise<Omit<User, "password">> {
    return await this.authService.signUp(data);
  }

  @Get("/sign-out")
  async signOut(@Request() req: ER) {
    return await this.authService.signOut(req);
  }

  @Get("/status")
  status() {
    return { message: "authenticated" };
  }
}
