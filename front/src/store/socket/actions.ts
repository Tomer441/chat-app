import { createAction } from "@reduxjs/toolkit";

export const setSocket = createAction<{socket: any}>('socket/setSocketInStore')