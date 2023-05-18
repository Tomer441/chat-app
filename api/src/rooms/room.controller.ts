import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { TokenUserIdGuard } from 'src/guards/user-from-token.guard';

export interface CreateRoomDto {
  roomName: string;
}

export interface UpdateRoomNameDto {
  roomName: string;
}

@UseGuards(TokenUserIdGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room[]> {
    const { roomName } = createRoomDto;
    return this.roomService.createRoom(roomName);
  }

  @Get(':id')
  async getRoomById(@Param('id') id: string): Promise<Room | null> {
    return this.roomService.getRoomById(id);
  }

  @Get()
  async getAllRooms(): Promise<Room[]> {
    return this.roomService.getAllRooms();
  }

  @Patch(':id')
  async updateRoomName(
    @Param('id') id: string,
    @Body() updateRoomNameDto: UpdateRoomNameDto,
  ): Promise<Room | null> {
    const { roomName } = updateRoomNameDto;
    return this.roomService.updateRoomName(id, roomName);
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string): Promise<Room[]> {
    return this.roomService.deleteRoom(id);
  }
}
