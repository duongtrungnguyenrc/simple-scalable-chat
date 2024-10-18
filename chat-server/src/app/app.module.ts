import { Module } from '@nestjs/common';

import { CacheModule } from '@app/cache';
import { ChatModule } from '@app/chat';
import { UserModule } from '@app/user';

@Module({
  imports: [CacheModule, UserModule, ChatModule],
})
export class AppModule {}
