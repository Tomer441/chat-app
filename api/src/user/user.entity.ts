import { prop, index } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';

@index({ username: 1 }, { unique: true })
export class User {
  @prop({
    required: [true, 'username is required'],
  })
  username: string;

  @prop({
    required: [true, 'password is required'],
  })
  password: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  async setPassword(password: string): Promise<void> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    this.password = hash;
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
