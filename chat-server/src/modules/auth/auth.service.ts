import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { compare } from "bcrypt";

import { CreateUserDto, User, UserService } from "@modules/user";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<SessionUser | undefined> {
    const user: User = await this.userService.find(
      {
        email: email,
      },
      ["password"],
    );

    if (!user) return;

    const isValid: boolean = await compare(password, user.password);

    if (!isValid) return;

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async signIn(request: Request): Promise<Express.User> {
    return new Promise((resolve, reject) => {
      request.logIn(request.user, (err) => {
        if (err) {
          reject(new UnauthorizedException());
        }
        resolve(request.user);
      });
    });
  }

  async signUp(data: CreateUserDto): Promise<Omit<User, "password">> {
    const isExistingUser: boolean = !!(await this.userService.find({ email: data.email }));

    if (isExistingUser) {
      throw new BadRequestException("User already exists");
    }

    return await this.userService.createUser(data);
  }

  async signOut(request: Request): Promise<string> {
    return new Promise((resolve, reject) => {
      request.logOut((err) => {
        if (err) {
          reject(new InternalServerErrorException(`Logout failed: ${err.message}`));
        }

        resolve("success");
      });
    });
  }
}
