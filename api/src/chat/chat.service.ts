import { Injectable } from '@nestjs/common';
import { Chat } from './chat.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private readonly chatModel: ReturnModelType<typeof Chat>,
    private readonly userService: UserService,
  ) {}

  async getChats(roomId: string, requestingUser: string): Promise<Chat[]> {
    const query = { roomId };

    const chats = await this.chatModel.find(query);

    await Promise.all(chats.map((chat) => chat.save()));

    return chats;
  }

  async updateMessageReadBy(
    messageId: string,
    userId: string,
  ): Promise<Chat | null> {
    const message = await this.chatModel.findById(messageId);

    if (message && message.senderId.toString() !== userId?.toString()) {
      const foundSeenUser = await this.userService.findByUserId(userId); // Add your method to find the user by their userId

      if (foundSeenUser) {
        await this.chatModel.updateOne(
          { _id: messageId },
          {
            $addToSet: { readBy: { userId, username: foundSeenUser.username } },
          },
        );

        const updatedMessage = await this.chatModel.findById(messageId);
        return updatedMessage;
      }
    }

    return null;
  }
  async saveChat(chat: Chat): Promise<Chat> {
    const createdChat = new this.chatModel(chat);
    return await createdChat.save();
  }

  async deleteAllMessagesByRoomId(roomId: string): Promise<void> {
    await this.chatModel.deleteMany({ roomId });
  }
}
