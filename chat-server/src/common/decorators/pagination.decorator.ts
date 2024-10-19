import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE } from "../constants";

export const Pagination = createParamDecorator((_, ctx: ExecutionContext): Pagination => {
  const request = ctx.switchToHttp().getRequest();

  const page = parseInt(request.query.page, 10) || PAGINATION_DEFAULT_PAGE;
  const limit = parseInt(request.query.limit, 10) || PAGINATION_DEFAULT_LIMIT;

  return { page, limit };
});
