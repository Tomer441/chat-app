import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { Chat } from './chat.entity';
import { ChatGateway } from './chat.gateaway';
import { ChatService } from './chat.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';
import { RoomService } from 'src/rooms/room.service';
import { RoomModule } from 'src/rooms/room.module';
import { Room } from 'src/rooms/room.entity';

@Module({
  imports: [TypegooseModule.forFeature([Chat, User, Room]), JwtModule],
  providers: [ChatService, ChatGateway, UserService, RoomService],
  exports: [ChatService],
})
export class ChatModule {}
