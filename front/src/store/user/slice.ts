import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { signIn, signUp, verifyToken } from './thunks';
import { logoutAction } from './action';

export interface UserState {
  username?: string;
  userId?: string;
  password?: string;
  token?: string;
  _id?: string;
}

const initialState: UserState = {
    token: ''
}

export interface LoginResponse {
    user?: UserState,
    token?: string
}

const saveTokenToLocalStorage = (token: string): void => {
    localStorage.setItem('token', token);
  };

  function buildLogoutReducer(builder: ActionReducerMapBuilder<any>){
    builder.addCase(logoutAction, (state: UserState, action) => {
      state = {};
      return state
    })
  }

function buildRegisterReducer(builder: ActionReducerMapBuilder<LoginResponse>){
   builder.addCase(signUp.pending, (state, action) => {

   }).addCase(signUp.fulfilled, (state: UserState, action) => {
    state.username = action?.payload?.data?.user?.username;
    state.userId = action?.payload?.data?.user?._id;
    state.token = action?.payload?.data?.token;

    if(!!action?.payload?.data?.token){
        saveTokenToLocalStorage(action?.payload?.data?.token);
    }

   }).addCase(signUp.rejected, (state, action) => {

   })
}

function buildLoginReducer(builder: ActionReducerMapBuilder<LoginResponse>){
    builder.addCase(signIn.pending, (state, action) => {
 
    }).addCase(signIn.fulfilled, (state: UserState, action) => {
     state.username = action?.payload?.data?.user?.username;
     state.userId = action?.payload?.data?.user?._id;
     state.token = action?.payload?.data?.token;
       
     if(!!action?.payload?.data?.token){
         saveTokenToLocalStorage(action?.payload?.data?.token);
     }
 
    }).addCase(signIn.rejected, (state, action) => {
 
    })
 }

 function buildVerifyToken(builder: ActionReducerMapBuilder<LoginResponse>){
    builder.addCase(verifyToken.pending, (state, action) => {
 
    }).addCase(verifyToken.fulfilled, (state: UserState, action) => {
     state.username = action?.payload?.data?.user?.username;
     state.userId = action?.payload?.data?.user?._id;
     state.token = action?.payload?.data?.token;

    }).addCase(verifyToken.rejected, (state, action) => {
 
    })
 }
 



export const userSlice = createSlice({
  name: 'user',
  initialState,
 reducers: {},
 extraReducers: (builder) => {
    buildLogoutReducer(builder);

    buildRegisterReducer(builder);

    buildLoginReducer(builder);

    buildVerifyToken(builder);
 }
})

export const userReducer = userSlice.reducer;