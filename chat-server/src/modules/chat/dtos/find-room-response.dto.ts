import { ApiResponseProperty } from "@nestjs/swagger";
import { Room } from "../schemas";

export class FindRoomResponseDto {
  @ApiResponseProperty()
  room: Partial<Room>;

  @ApiResponseProperty()
  isPrivate: boolean;

  @ApiResponseProperty()
  isYour: boolean;
}
