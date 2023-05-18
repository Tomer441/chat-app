import axios, { AxiosResponse } from "axios";
import { LoginResponse } from "../store/user/slice";
import { baseUrl } from "./baseurls";

const token = localStorage.getItem('token'); // Retrieve the token from local storage
  
const config = {
  headers: {
    Authorization: `Bearer ${token}`, // Add the token to the Authorization header
  },
};

const createRoom = async (roomName: string): Promise<AxiosResponse<any>> => {
    return axios.post(baseUrl + '/rooms', { roomName }, config);
  };

  const getAllRooms = async (): Promise<AxiosResponse<any>> => {
    return axios.get(baseUrl + '/rooms', config);
  };

  const deleteRoomById = async (roomId: string): Promise<AxiosResponse<any>> => {
    return axios.delete(baseUrl + '/rooms/' + roomId, config);
  };




export const roomService = {
    createRoom,
    getAllRooms,
    deleteRoomById
}

