import { RootState } from "../store";

export const socketStateSelector = (state: RootState) => state.socket?.socket;