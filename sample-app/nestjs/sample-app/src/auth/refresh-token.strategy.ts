import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./dto/jwt-payload.dto";
import { AuthService } from "./auth.service";
import { LoginResponse } from "./dto/login-response.dto";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const refreshToken: string = req.cookies.refresh_token;
          if (!refreshToken) return null;
          return refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    jwtPayload: JwtPayload,
  ): Promise<LoginResponse> {
    const refreshToken: string = req.cookies.refresh_token;
    const sessionId: string = req.cookies.session_id;

    if (!refreshToken || !sessionId) throw new BadRequestException;

    const loginResponse: LoginResponse = await this.authService.refreshToken(
      refreshToken,
      sessionId,
      jwtPayload,
    );
    return loginResponse;
  }
}
