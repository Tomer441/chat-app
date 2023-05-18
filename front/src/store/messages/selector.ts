import { RootState } from "../store";

export const messageStateSelector = (state: RootState) => state.messages?.messages;