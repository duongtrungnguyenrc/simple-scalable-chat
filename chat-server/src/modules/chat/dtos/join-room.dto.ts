import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class JoinRoomDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}
