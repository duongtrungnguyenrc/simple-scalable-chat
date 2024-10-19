import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export const ApiPagination = () => {
  return applyDecorators(
    ApiQuery({
      type: Number,
      name: "page",
      description: "Page index",
      required: true,
    }),
    ApiQuery({
      type: Number,
      name: "limit",
      description: "Page items limit",
      required: false,
    }),
  );
};
