import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './common/prisma/prisma.service';
import { RedisService } from './common/redis/redis.service';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [PrismaService, RedisService],
})
export class AppModule { }
