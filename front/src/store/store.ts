import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { userReducer } from './user/slice'
import {setupListeners} from '@reduxjs/toolkit/query'
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { socketReducer } from './socket/slice';
import { messagesReducer } from './messages/slice';
import { roomsReducer } from './rooms/slice';


const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const rootReducer = combineReducers({
    user: userReducer,
    socket: socketReducer,
    messages: messagesReducer,
    rooms: roomsReducer
})
const preloadedState = {};
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(routerMiddleware),
    preloadedState: preloadedState
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch