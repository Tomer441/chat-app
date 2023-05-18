import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/user.service';
import { AxiosResponse } from 'axios';
import { RoomState } from './slice';
import { roomService } from '../../services/room.service';

export const createRoomThunk = createAsyncThunk<any, {roomName: string}>(
    "room/createRoom",
    async ({roomName}: {roomName: string}, thunkAPI) => {
      try {
        const response = await roomService.createRoom(roomName);
        return response
      } catch (err) {
        let error: any = err;
        if (!error.response) {
          throw err;
        }
  
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  export const getAllRoomsThunk = createAsyncThunk<any, undefined>(
    "room/getRooms",
    async () => {
      try {
        const response = await roomService.getAllRooms();
        return response;
      } catch (err) {
        let error: any = err;
        if (!error.response) {
          throw err;
        }
      }
    }
  );
  export const deleteRoomByIdThunk = createAsyncThunk<any, {roomId: string}>(
    "room/deleteRoomById",
    async ({roomId}: {roomId: string}) => {
      try {
        const response = await roomService.deleteRoomById(roomId);
        return response;
      } catch (err) {
        let error: any = err;
        if (!error.response) {
          throw err;
        }
      }
    }
  );