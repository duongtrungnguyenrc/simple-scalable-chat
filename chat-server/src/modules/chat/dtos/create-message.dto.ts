import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  roomId: string;
}
