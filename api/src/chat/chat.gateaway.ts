import { Bind } from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/rooms/room.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements NestGateway {
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private roomService: RoomService,
  ) {}

  afterInit(server: any) {
    console.log('init');
  }

  async handleConnection(socket: any) {
    const connectedUser = await this.userService
      .verifyToken(socket?.handshake?.query?.token)
      .then((user) => user);
    if (!!connectedUser) {
      process.nextTick(async () => {
        const userConnectedRoomId = socket?.handshake?.query?.roomId;
        socket.emit(
          'allChats',
          await this.chatService.getChats(
            userConnectedRoomId,
            connectedUser?.user?._id,
          ),
        );
      });
    }
  }

  handleDisconnect(socket: any) {
    /* console.log('disconnect', socket); */
  }

  @SubscribeMessage('messageRead')
  async handleMessageRead(
    @MessageBody() data: { messageId: string },
    @ConnectedSocket() socket: any,
  ): Promise<void> {
    // Get the user information from the socket connection
    const senderUser = await this.userService
      .verifyToken(socket?.handshake?.query?.token)
      .then((user) => user);

    if (!!senderUser) {
      const { messageId } = data;
      // Update the readBy array for the specified message
      const updatedMessage = await this.chatService.updateMessageReadBy(
        messageId,
        senderUser.user._id,
      );
      if (updatedMessage) {
        socket.broadcast.emit('updatedMessage', updatedMessage);
        socket.emit('updatedMessage', updatedMessage);
      }
    }
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(chat: any, sender: any) {
    const senderUser = await this.userService
      .verifyToken(sender?.handshake?.query?.token)
      .then((user) => user);

    if (!!senderUser) {
      chat['sender'] = senderUser?.user?.username;
      chat['senderId'] = senderUser?.user?._id;
      const isRoomExists = await this.roomService.isRoomExists(chat['roomId']);
      if (!isRoomExists) {
        return;
      }

      const message = await this.chatService.saveChat(chat);

      sender.emit('newChat', message);
      sender.broadcast.emit('newChat', message);
    }
  }
}
