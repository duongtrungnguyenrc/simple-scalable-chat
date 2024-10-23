import { SetMetadata } from "@nestjs/common";

import { PUBLIC_ROUTE_KEY } from "../constants";

export const Public = () => SetMetadata<string, boolean>(PUBLIC_ROUTE_KEY, true);
