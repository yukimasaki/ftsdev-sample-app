import { UserOmitPassword } from "@@nest/users/entities/user.entity";
import { Tokens } from "./tokens.dto";

export class LoginResponse {
  userOmitPassword: UserOmitPassword;
  tokens: Tokens;
}
