import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import KeyvRedis from "@keyv/redis";
import Keyv from "keyv";

import { CACHE_PROVIDE } from "./cache.constant";
import { CacheService } from "./cache.service";

@Global()
@Module({})
export class CacheModule {
  static forRoot(): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        {
          provide: CACHE_PROVIDE,
          useFactory: (configService: ConfigService) => {
            const ttl = configService.get<number>("REDIS_TTL", 3600);
            const store = new KeyvRedis(configService.get<string>("REDIS_URL"));
            return new Keyv({ store, ttl, namespace: "root" });
          },
          inject: [ConfigService],
        },
        CacheService,
      ],
      exports: [CACHE_PROVIDE, CacheService],
    };
  }

  static forFeature(namespace: string): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        {
          provide: CACHE_PROVIDE,
          useFactory: (configService: ConfigService) => {
            const ttl = configService.get<number>("REDIS_TTL", 3600);
            const store = new KeyvRedis(configService.get<string>("REDIS_URL"));
            return new Keyv({ store, ttl, namespace: namespace || "root" });
          },
          inject: [ConfigService],
        },
        CacheService,
      ],
      exports: [CACHE_PROVIDE, CacheService],
    };
  }
}
