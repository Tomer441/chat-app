import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Chat } from './chat/chat.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { RoomModule } from './rooms/room.module';

import { Room } from './rooms/room.entity';

const mongoDbUrl = 'mongodb://db:27017';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypegooseModule.forRoot(mongoDbUrl),
    TypegooseModule.forFeature([Chat, User, Room]),
    ChatModule,
    UserModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
