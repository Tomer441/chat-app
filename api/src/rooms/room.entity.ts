import { prop } from '@typegoose/typegoose';

export class Room {
  @prop()
  roomId: string;
  @prop()
  roomName: string;

  constructor(room?: Partial<Room>) {
    Object.assign(this, room);
  }
}
