import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { setSocket } from '../store/socket/actions';
import { tokenStateSelector } from '../store/user/selector';
import { roomsStateSelector } from '../store/rooms/selector';

const useSocketLogin = (serverUrl: string, path?: string) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenStateSelector);
  const currentRoomId = useSelector(roomsStateSelector)?.currentRoom;


  useEffect(() => {

    const socketInstance = io(serverUrl, { path, query: {token, roomId: currentRoomId} });
    dispatch(setSocket({socket: socketInstance}))
    return () => {
      socketInstance.disconnect();
      dispatch(setSocket({socket: {}}))
    };
  }, [serverUrl, path, dispatch, token, currentRoomId]);

};

export default useSocketLogin;