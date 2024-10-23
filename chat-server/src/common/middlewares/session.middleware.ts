import { ConfigService } from "@nestjs/config";
import * as session from "express-session";
import RedisStore from "connect-redis";
import Redis from "ioredis";

export const getSessionMiddleware = (configService: ConfigService) => {
  const redisClient = new Redis(configService.get<string>("REDIS_URL"));
  const redisStore = new RedisStore({ client: redisClient });

  return session({
    name: "sid",
    store: redisStore,
    secret: configService.get<string>("SESSION_SECRET"),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: configService.get<string>("NODE_ENV") === "production",
      maxAge: 3600000,
      sameSite: configService.get<string>("NODE_ENV") === "production" ? "none" : "lax",
    },
  });
};
