import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client';
import { setSocket } from './actions';

export interface SocketState {
  socket?: Socket
}

const initialState: SocketState = {
  socket: undefined
}

function buildSetSocket(builder: ActionReducerMapBuilder<any>){
  builder.addCase(setSocket, (state: SocketState, action) => {
    
    state.socket = action?.payload?.socket;
    return state
  })
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
 reducers: {},
 extraReducers: (builder) => {

  buildSetSocket(builder);
  
 }
})

export const socketReducer = socketSlice.reducer;