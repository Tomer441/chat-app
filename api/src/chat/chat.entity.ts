import { prop } from '@typegoose/typegoose';

export class Chat {
  @prop({
    required: [true, 'Message is required'],
  })
  message: string;
  @prop({
    required: [true, 'sender is required'],
  })
  sender: string;
  @prop({
    required: [true, 'sender Id is required'],
  })
  senderId: string;

  @prop({
    required: [true, 'Message is required'],
  })
  roomId: string;

  @prop()
  readBy: { userName: string; userId: string }[];

  constructor(chat?: Partial<Chat>) {
    Object.assign(this, chat);
  }
}
