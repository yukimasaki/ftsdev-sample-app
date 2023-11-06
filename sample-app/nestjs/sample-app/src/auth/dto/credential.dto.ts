import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class Credential {
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
}
