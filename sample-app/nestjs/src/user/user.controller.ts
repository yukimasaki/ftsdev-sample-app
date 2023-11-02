import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles, Unprotected } from 'nest-keycloak-connect';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Unprotected()
  getpublic(): string {
    return `${this.userService.getHello()} from public`;
  }

  @Get('/user')
  @Roles({ roles: ['user']})
  getUser(): string {
    return `${this.userService.getHello()} from user`;
  }

  @Get('/admin')
  @Roles({ roles: ['admin']})
  getAdmin(): string {
    return `${this.userService.getHello()} from admin`;
  }

  @Get('/all')
  getAll(): string {
    return `${this.userService.getHello()} from all`;
  }
}
