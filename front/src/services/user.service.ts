import axios, { AxiosResponse } from "axios";
import { LoginResponse } from "../store/user/slice";
import { baseUrl } from "./baseurls";

const registerUser = async (username?: string, password?: string): Promise<AxiosResponse<LoginResponse>> => {

      return axios.post(baseUrl + '/register', { username, password });

  };

  const loginUser = async (username?: string, password?: string): Promise<AxiosResponse<LoginResponse>> => {
    return axios.post(baseUrl + '/login', { username, password });
};

const verifyToken = async (token: string): Promise<AxiosResponse<LoginResponse>> => {
    return axios.post(baseUrl + '/verify', { token });
};

const token = localStorage.getItem('token'); // Retrieve the token from local storage


const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };
  
  const getUserNames = async (userIds: string[]): Promise<AxiosResponse<any>> => {
      return axios.post(baseUrl + '/names', { userIds }, config).then((response) => response);
    };

export const userService = {
    registerUser,
    loginUser,
    verifyToken,
    getUserNames
}

