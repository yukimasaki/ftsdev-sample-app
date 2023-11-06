import { IsEmail, IsInt, IsPositive, IsString, MaxLength } from "class-validator";

export class User {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  hashedPassword: string;
}
