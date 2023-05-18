import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { changeCurrentRoom, clearRooms } from './actions';
import { createRoomThunk, deleteRoomByIdThunk, getAllRoomsThunk } from './thunks';
import { act } from 'react-dom/test-utils';

export interface Room {
  roomName?: string;
  _id?: string;
}

export interface RoomState {
  rooms: Room[];
  currentRoom: string;
}

const initialState: RoomState = {
  rooms: [],
  currentRoom: ''
}

function buildClearRooms(builder: ActionReducerMapBuilder<any>){
  builder.addCase(clearRooms, (state: RoomState, action) => {
    
    state.rooms = [];
    return state
  })
}

function buildChangeCurrentRoomReducer(builder: ActionReducerMapBuilder<any>){
  builder.addCase(changeCurrentRoom, (state: RoomState, action) => {
    
    state.currentRoom = action?.payload?.roomId;
    return state
  })
}

function buildGetAllRoomsReducer(builder: any){
  builder.addCase(getAllRoomsThunk.pending, (state: any, action: any) => {

  }).addCase(getAllRoomsThunk.fulfilled, (state: RoomState, action: { payload: { data: Room[] }; }) => {
    if(Array.isArray(action?.payload?.data) && !!action?.payload?.data[0]?._id){
      state.currentRoom = action?.payload?.data[0]?._id;
    }
    state.rooms = action?.payload?.data
  return state
  }).addCase(getAllRoomsThunk.rejected, (state: any, action: any) => {

  })
}

function buildCreateNewRoomReducer(builder: any){
  builder.addCase(createRoomThunk.pending, (state: any, action: any) => {

  }).addCase(createRoomThunk.fulfilled, (state: RoomState, action: { payload: { data: Room[] }; }) => {
    
    state.rooms = action?.payload?.data
  return state
  }).addCase(createRoomThunk.rejected, (state: any, action: any) => {

  })
}


function buildDeleteRoomById(builder: any){
  builder.addCase(deleteRoomByIdThunk.pending, (state: any, action: any) => {

  }).addCase(deleteRoomByIdThunk.fulfilled, (state: RoomState, action: { payload: { data: Room[] }; }) => {
    
    state.rooms = action?.payload?.data
  return state
  }).addCase(deleteRoomByIdThunk.rejected, (state: any, action: any) => {

  })
}



export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
 reducers: {},
 extraReducers: (builder) => {

  buildClearRooms(builder);

  buildChangeCurrentRoomReducer(builder);

  buildGetAllRoomsReducer(builder);

  buildCreateNewRoomReducer(builder);

  buildDeleteRoomById(builder);

 }
})

export const roomsReducer = roomsSlice.reducer;