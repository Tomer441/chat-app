import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client';
import { Message } from '../../types/Message';
import { clearMessages, setInitialMessages, setNewMessages, updateMessage } from './actions';

export interface MessagesState {
  messages: Message[]
}

const initialState: MessagesState = {
  messages: []
}

function buildClearMessages(builder: ActionReducerMapBuilder<any>){
  builder.addCase(clearMessages, (state: MessagesState, action) => {
    
    state.messages = [];
    return state
  })
}

function buildSetMessages(builder: ActionReducerMapBuilder<any>){
  builder.addCase(setInitialMessages, (state: MessagesState, action) => {
    state.messages = action?.payload?.messages;
    return state
  })
}

function buildUpdateMessage(builder: ActionReducerMapBuilder<any>) {
  builder.addCase(updateMessage, (state: MessagesState, action) => {
    const messageId = action?.payload?.message?._id
    const allMessages = state.messages;
    console.log(action?.payload);
    
    
    state.messages = allMessages.map((message: any) => {
      return message._id === messageId ? action.payload.message : message;
    });
    return state;
  });
}

function buildSetNewMessages(builder: ActionReducerMapBuilder<any>){
  builder.addCase(setNewMessages, (state: MessagesState, action) => {
    state.messages = [...state.messages, action?.payload?.messages];
    return state
  })
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
 reducers: {},
 extraReducers: (builder) => {

  buildUpdateMessage(builder)

  buildSetNewMessages(builder);

  buildClearMessages(builder);

  buildSetMessages(builder);
  
 }
})

export const messagesReducer = messagesSlice.reducer;