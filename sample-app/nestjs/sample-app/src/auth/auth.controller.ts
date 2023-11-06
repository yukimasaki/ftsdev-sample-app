import { Body, Controller, Delete, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EXPIRES_IN } from '@@nest/common/master/expires-in.master';
import { User, UserOmitPassword } from '@@nest/users/entities/user.entity';
import { LoginResponse } from './dto/login-response.dto';
import { AccessTokenAuthGuard } from './access-token-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { RefreshTokenAuthGuard } from './refresh-token-auth.guard';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from '@@nest/users/users.service';
import { Credential } from './dto/credential.dto';

@Controller('auth')
@ApiTags('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('register')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'ユーザー作成API' })
  @ApiResponse({
    status: 201,
    description: 'ユーザー登録情報を送信すると、パスワードをハッシュ化してユーザーを作成し、ハッシュ化したパスワードを除くユーザー情報を返却する。',
    type: UserOmitPassword,
  })
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ) {
    const registerResponse: UserOmitPassword = await this.usersService.create(registerUserDto);
    return registerResponse;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'ログインAPI' })
  @ApiResponse({
    status: 201,
    description: '認証に成功するとセッションストアにセッション情報を保存し、ハッシュ化されたパスワードを除くユーザー情報を返却する。',
    type: UserOmitPassword,
  })
  async login(
    // reqがLocalStrategyに渡る
    @Request() req,
    // Swagger用
    @Body() credential: Credential,
  ): Promise<UserOmitPassword> {
    const loginResponse: LoginResponse = await this.authService.signTokens(req.user);
    const userOmitPassword: UserOmitPassword = loginResponse.userOmitPassword;

    this._setCookie(req, loginResponse);
    return userOmitPassword;
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Get('refresh')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'トークン更新API' })
  @ApiResponse({
    status: 200,
    description: '認証情報をもとにアクセストークンを更新し、ハッシュ化されたパスワードを除くユーザー情報を返却する。',
    type: UserOmitPassword,
  })
  async refreshToken(
    @Request() req
  ): Promise<UserOmitPassword> {
    const loginResponse: LoginResponse = req.user;
    const userOmitPassword: UserOmitPassword = loginResponse.userOmitPassword;

    this._setCookie(req, loginResponse);
    return userOmitPassword;
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get('profile')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'プロフィール取得API' })
  @ApiResponse({
    status: 200,
    description: '自分のプロフィール情報を取得する',
    type: UserOmitPassword,
  })
  async getProfile(
    @Request() req
  ): Promise<UserOmitPassword> {
    const requestUser: LoginResponse = req.user;
    const email = requestUser.userOmitPassword.email;

    const profile: User = await this.usersService.findByEmail(email);
    return profile;
  }

  @UseGuards(AccessTokenAuthGuard)
  @Delete('logout')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'ログアウトAPI' })
  @ApiResponse({
    status: 200,
    description: 'セッションストアのセッション情報を削除する。',
  })
  async logout(
    @Request() req
  ) {
    const httpCookie: LoginResponse = req.user;
    const sessionId: string = httpCookie.tokens.sessionId;

    await this.authService.logout(sessionId);
    return {
      loggedIn: false,
    }
  }

  _setCookie(
    req,
    loginResponse: LoginResponse,
  ): void {
    const now = new Date();
    const expiresAccessToken: number = 1000 * EXPIRES_IN.accessToken;
    req.res.cookie('access_token', loginResponse.tokens.accessToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(now.getTime() + (expiresAccessToken)),
    });

    const expiresRefreshToken: number = 1000 * EXPIRES_IN.refreshToken;
    req.res.cookie('refresh_token', loginResponse.tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(now.getTime() + (expiresRefreshToken)),
    });

    req.res.cookie('session_id', loginResponse.tokens.sessionId, {
      httpOnly: true,
      secure: false,
      expires: new Date(now.getTime() + (expiresRefreshToken)),
    });
  }
}
