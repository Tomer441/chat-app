import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialMessages } from '../store/messages/actions';
import { logoutAction } from '../store/user/action';
import { createRoomThunk } from '../store/rooms/thunks';

function CreateRoomButton() {
  const [roomName, setRoomName] = useState('');
    const dispatch = useDispatch();

    const handleCreateRoom = () => {
      if(!!roomName){
        dispatch(createRoomThunk({roomName: roomName}));
        setRoomName('')
      }
    }
      
    return (
      <Flex alignItems={'center'} gap='10px' flexDirection={'column'}>

       
        <Button  mt='20px'  onClick={handleCreateRoom} colorScheme='purple'>
            New Room
        </Button>
        <Input width={'90%'}colorScheme='purple' borderColor={'purple.400'} value={roomName} onChange={(e) => {
          setRoomName(e?.target?.value)
        }}/>
      </Flex>
    );
}

export default CreateRoomButton;