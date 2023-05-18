import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { TokenUserIdGuard } from 'src/guards/user-from-token.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(
    @Body() body: { username: string; password: string },
  ): Promise<any> {
    try {
      const { username, password } = body;
      return await this.userService.register(username, password);
    } catch (err) {
      throw new HttpException(err?.message, err.status);
    }
  }

  @Post('/login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<any> {
    const { username, password } = body;
    return await this.userService.login(username, password);
  }

  @Post('/verify')
  async verify(@Body() body: { token: string }): Promise<any> {
    const { token } = body;
    return await this.userService.verifyToken(token);
  }

  @UseGuards(TokenUserIdGuard)
  @Post('/names')
  async getUserNamesFromId(@Body() body: { userIds: string[] }): Promise<any> {
    const { userIds } = body;
    return await this.userService.getUserNamesFromId(userIds);
  }
}
