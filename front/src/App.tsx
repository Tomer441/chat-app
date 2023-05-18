import React from 'react';
import logo from './logo.svg';
import './App.css';
import useSocketLogin from './hooks/useSocketLogin';
import HomePage from './features/SignPage';
import { useTokenCheck } from './hooks/useTokenCheck';
import { useSelector } from 'react-redux';
import { userStateSelector } from './store/user/selector';
import Chat from './features/Chat';
import { Box, Flex } from '@chakra-ui/react';
import Logout from './components/Logout';
import CreateRoomButton from './components/CreateRoomButton';
import RoomsHolder from './components/RoomsHolder';
import TopBar from './features/TopBar';

function App() {
  useSocketLogin('http://localhost:3000', '/socket.io');
  useTokenCheck();
  const user = useSelector(userStateSelector);


  return (
    <Flex w='1200px' className="App" alignItems="stretch">
  <Box h='100%' w='10%' backgroundColor={'#a5a3a8'} aria-label='side-bar'>
    {/* {!!user?.token && <Logout />} */}
    {!!user?.token && <CreateRoomButton />}
    {!!user?.token && <RoomsHolder />}
  </Box>
  <Flex justifyContent='center'  flex='1'>
    {!user?.token && <HomePage />}
  {!!user?.token &&  <Flex flexDirection={'column'} w='100%'>
  <TopBar />
 <Chat />
  </Flex>}
  
  </Flex>
</Flex>
  );
}

export default App;
