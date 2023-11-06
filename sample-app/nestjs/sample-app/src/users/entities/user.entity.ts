import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsPositive, IsString, MaxLength } from "class-validator";

export class User {
  @ApiProperty({
    example: 1,
    description: 'ユーザーID',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: 'user1@exmaple.com',
    description: 'メールアドレス',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'User Name',
    description: 'ユーザー名',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: '$2a$10$SyZ5r1GZ8Dw0SPTF4pKKlOiwdcNja2MVYbnsSGD8ykTIV2JXWkrLq',
    description: 'ハッシュ化されたパスワード'
  })
  @IsString()
  hashedPassword: string;
}
