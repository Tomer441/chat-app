import { createAction } from "@reduxjs/toolkit";

export const clearRooms = createAction('rooms/clearState');

export const changeCurrentRoom = createAction<{roomId: string}>('rooms/changeCurrentRoom');

