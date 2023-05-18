import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room) private readonly roomModel: ReturnModelType<typeof Room>,
    private readonly chatService: ChatService,
  ) {}

  async createRoom(name: string): Promise<Room[]> {
    const newRoom = new this.roomModel({ roomName: name });
    await newRoom.save();
    return this.roomModel.find({});
  }

  async getRoomById(roomId: string): Promise<Room | null> {
    return this.roomModel.findById(roomId).exec();
  }

  async isRoomExists(roomId: string): Promise<boolean> {
    const room = await this.roomModel.exists({ _id: roomId });
    return !!room;
  }

  async getAllRooms(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async updateRoomName(roomId: string, newName: string): Promise<Room | null> {
    return this.roomModel
      .findByIdAndUpdate(roomId, { name: newName }, { new: true })
      .exec();
  }

  async deleteRoom(roomId: string): Promise<Room[]> {
    this.roomModel.findByIdAndDelete(roomId).exec();
    this.chatService.deleteAllMessagesByRoomId(roomId);
    return this.roomModel.find({});
  }
}
