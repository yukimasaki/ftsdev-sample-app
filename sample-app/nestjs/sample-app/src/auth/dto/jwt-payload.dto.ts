import { IsEmail, IsString } from "class-validator";

export class JwtPayload {
  @IsString()
  @IsEmail()
  email: string;
}
