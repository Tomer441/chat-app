import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { RoomController } from './room.controller';
import { ChatService } from 'src/chat/chat.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [TypegooseModule.forFeature([Room, User]), JwtModule, ChatModule],
  controllers: [RoomController],
  providers: [RoomService, UserService],
})
export class RoomModule {}
