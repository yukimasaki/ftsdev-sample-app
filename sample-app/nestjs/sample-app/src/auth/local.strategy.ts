import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { UserOmitPassword } from "@@nest/users/entities/user.entity";
import { Credential } from "./dto/credential.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserOmitPassword> {
    const credential: Credential = {
      email,
      password,
    }
    const user = await this.authService.validateUser(credential);
    if (!user) throw new UnauthorizedException;
    return user;
  }
}
