import { ApiResponseProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class MessageResponseDto {
  @ApiResponseProperty()
  @IsMongoId()
  _id: string;

  @ApiResponseProperty()
  @IsString()
  from: "ME" | "OTHERS" | "SYSTEM";

  @ApiResponseProperty()
  @IsString()
  createdAt: string;

  @ApiResponseProperty()
  @IsString()
  content: string;
}
