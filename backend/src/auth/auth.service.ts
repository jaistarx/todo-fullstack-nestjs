import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(username: string, password: string) {
    const userDetails = await this.userService.findUser(username);
    if (userDetails) {
      const matched = comparePasswords(password, userDetails.password);
      if (matched) {
        return {
          status: true,
          id: userDetails.id,
          username: userDetails.userName,
        };
      } else {
        return { status: false };
      }
    } else {
      return { status: false };
    }
  }
}
