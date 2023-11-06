import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./dto/jwt-payload.dto";
import { UserOmitPassword } from "@@nest/users/entities/user.entity";
import { UsersService } from "@@nest/users/users.service";
import { Tokens } from "./dto/tokens.dto";
import { LoginResponse } from "./dto/login-response.dto";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const accessToken: string = req.cookies?.access_token;
          if (!accessToken) return null;
          return accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<LoginResponse> {
    const userOmitPassword: UserOmitPassword = await this.userService.findByEmail(payload.email);
    try {
      const tokens: Tokens = {
        accessToken: req.cookies?.access_token,
        refreshToken: req.cookies?.refresh_token,
        sessionId: req.cookies?.session_id,
      }

      return {
        userOmitPassword,
        tokens,
      };
    } catch (error) {
      throw new BadRequestException
    }
  }
}
