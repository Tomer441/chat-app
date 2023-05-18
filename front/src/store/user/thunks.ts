import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/user.service';
import { LoginResponse, UserState } from './slice';
import { AxiosResponse } from 'axios';
import { getAllRoomsThunk } from '../rooms/thunks';

export const signUp = createAsyncThunk<any, UserState>(
  "auth/signUpUser",
  async (user, thunkAPI) => {
    try {
      const response = await userService.registerUser(user?.username, user?.password);
      if(!!response?.data?.token){
        await thunkAPI.dispatch(getAllRoomsThunk())
      }
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

export const signIn = createAsyncThunk<AxiosResponse<LoginResponse>, UserState>(
    "auth/signInUser",
    async (user, thunkAPI) => {
      try {
        const response = await userService.loginUser(user?.username, user?.password);
        if(!!response?.data?.token){
          await thunkAPI.dispatch(getAllRoomsThunk())
        }
        
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

  export const verifyToken = createAsyncThunk<AxiosResponse<LoginResponse>, {token: string}>(
    "auth/verifyToken",
    async ({token} : {token: string}, thunkAPI) => {
      try {
        const response = await userService.verifyToken(token);
        if(!!response?.data?.token){
          await thunkAPI.dispatch(getAllRoomsThunk())
        }
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
