import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { compare } from "bcrypt";

import { CreateUserDto, User, UserService } from "@app/user";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User | undefined> {
    const user: User = await this.userService.getUser(
      {
        email: email,
      },
      true,
    );

    if (!user) return;

    const isValid: boolean = await compare(password, user.password);
    delete user.password;

    if (isValid) return user;
  }

  async signIn(request: Request): Promise<string> {
    return new Promise((resolve, reject) => {
      request.logIn(request.user, (err) => {
        if (err) {
          reject(new UnauthorizedException());
        }
        resolve("Sign in success");
      });
    });
  }

  async signUp(data: CreateUserDto): Promise<Omit<User, "password">> {
    const isExistingUser: boolean = !!(await this.userService.getUser({ email: data.email }));

    if (isExistingUser) {
      throw new BadRequestException("User already exists");
    }

    return await this.userService.createUser(data);
  }

  async signOut(request: Request): Promise<void> {
    request.logout((err) => {
      if (err) {
        throw new InternalServerErrorException(`Logout failed: ${err.message}`);
      }
    });
  }
}
