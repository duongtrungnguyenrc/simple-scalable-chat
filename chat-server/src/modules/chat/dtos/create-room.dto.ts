import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsBoolean()
  public: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;
}
