import { RootState } from "../store";

export const userStateSelector = (state: RootState) => state.user;

export const tokenStateSelector = (state: RootState) => state.user?.token;