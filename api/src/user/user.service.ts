import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    username: string,
    password: string,
  ): Promise<{ user: any; token: string }> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ username });

    if (existingUser) {
      throw {
        message: 'Username already exists',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    const user = new this.userModel();
    user.username = username;

    await user.setPassword(password);
    await user.save();

    // Generate JWT token
    const token = this.jwtService.sign(
      { username: user.username },
      { secret: '150', expiresIn: '7d' },
    );

    // Omit the password from the user object
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    return { user: userWithoutPassword, token };
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ user: any; token: string }> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = this.jwtService.sign(
      { username: user.username },
      { secret: '150', expiresIn: '7d' },
    );

    // Omit the password from the user object
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    return { user: userWithoutPassword, token };
  }

  async verifyToken(token: string): Promise<{ user: any; token: string }> {
    try {
      const decodedToken: any = this.jwtService.verify(token, {
        secret: '150',
      });

      const user = await this.userModel
        .findOne({ username: decodedToken.username })
        .exec();

      if (!user) {
        console.log('user not found');
      }

      // Omit the password from the user object
      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;

      return { user: userWithoutPassword, token };
    } catch (error) {
      console.log('invalid token');
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findByUserId(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).select('-password').exec();
  }

  async getUserNamesFromId(userIds: string[]): Promise<string[]> {
    try {
      const users = await this.userModel.find({ _id: { $in: userIds } });
      const usernames = users.map((user) => user.username);
      return usernames;
    } catch (error) {
      throw new Error('Failed to retrieve usernames');
    }
  }
}
