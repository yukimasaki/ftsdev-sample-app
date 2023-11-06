import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({
    example: 'user1@example.com',
    description: 'メールアドレス'
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'パスワード'
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'User Name',
    description: 'ユーザーの表示名'
  })
  @IsString()
  name: string;
}
