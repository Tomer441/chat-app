import { createAction } from "@reduxjs/toolkit";
import { Message } from "../../types/Message";

export const clearMessages = createAction('messages/clearState');

export const setInitialMessages = createAction<{messages: Message[]}>('messages/setMessages');

export const setNewMessages = createAction<{messages: Message}>('messages/setNewMessages');

export const updateMessage = createAction<{message: Message}>('messages/updateMessage');
