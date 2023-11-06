import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { UsersService } from '@@nest/users/users.service';
import { LocalStrategy } from './local.strategy';
import { AccessTokenStrategy } from './access-token.strategy';
import { RefreshTokenStrategy } from './refresh-token.strategy';
import { RedisService } from '@@nest/common/redis/redis.service';
import { UsersModule } from '@@nest/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RedisService,
  ],
})
export class AuthModule { }
