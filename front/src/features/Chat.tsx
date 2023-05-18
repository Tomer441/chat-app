import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socketStateSelector } from '../store/socket/selector';
import { Message, ReadBy } from '../types/Message';
import { Box, Button, Flex, Input, useDisclosure } from '@chakra-ui/react';
import { messageStateSelector } from '../store/messages/selector';
import { setInitialMessages, setNewMessages, updateMessage } from '../store/messages/actions';
import { roomsStateSelector } from '../store/rooms/selector';
import { userStateSelector } from '../store/user/selector';
import { ReadByModal } from '../modals/ReadByModal';
import { AiOutlineEye } from 'react-icons/ai';
import { TbCheck, TbChecks } from 'react-icons/tb';


const Chat = () => {

  const [newMessage, setNewMessage] = useState('');
  const socket = useSelector(socketStateSelector);
  const dispatch = useDispatch();
  const messages = useSelector(messageStateSelector);
  const currentRoomId = useSelector(roomsStateSelector)?.currentRoom;
  const user = useSelector(userStateSelector);
  const messagesContainerRef = useRef<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [usersToDisplay, setUsersToDisplay] = useState<ReadBy[] | undefined>([]);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if(!isOpen){
      cleanUpFunction();
    }
  }, [isOpen]);


  useEffect(() => {
    if(!!socket)
    socket.on('newChat', (newMessage) => {
      dispatch(setNewMessages({messages: newMessage}));
      
      socket.emit('messageRead', { messageId: newMessage._id }); 

      socket.on('updatedMessage', (updatedMessage) => {
        dispatch(updateMessage({message: updatedMessage}));
      });

    });
    return () => {
      if(!!socket)
      socket.off('newChat');
    };
  }, [dispatch, socket]);

  const cleanUpFunction = () => {
    setUsersToDisplay([]);
  }


  const handleSendMessage = () => {
    if(!currentRoomId){
      alert('create a room to send messages')
    }
    if(!!socket && !!currentRoomId){
      const message : Message = {
        message: newMessage ,
        roomId: currentRoomId
      }
      socket.emit('chat', message);
      setNewMessage('')
    }
  };

  useEffect(() => {
    if(!!socket)
    socket.on('allChats', (chats: Message[]) => {
      
      dispatch(setInitialMessages({messages: chats}));
      const allUnreadMessages = chats?.filter((chat) => {
          return !!user?.userId && !(chat?.readBy?.some((item) => item?.userId === user?.userId))
      })

      allUnreadMessages?.forEach((message) => {
        socket.emit('messageRead', { messageId: message._id }); 
      })
    });
    return () => {
      if(!!socket)
      socket.off('allChats');
    };
  }, [dispatch, socket, user?.userId]);


const renderMessage = (message: Message, index: number) => {
  const isMessageMine = message?.senderId === user?.userId;
  
  return (
    <Flex mr='5px' gap='5px' alignItems={'center'} minW={'100px'} justifyContent={'space-between'}
      alignSelf={!isMessageMine ? 'flex-start' :  'flex-end'} key={index} maxW={'45%'} padding='5px 10px'
      border={'1px solid #805AD5'}
      borderRadius={15}
      >
        
      {!isMessageMine && <Flex>
      {message?.sender}:&nbsp;
      </Flex>}
      <Flex>
        {message?.message}
      </Flex>
      {!!isMessageMine ? !!message?.readBy && 
       message?.readBy?.length > 0 ?  <Box _hover={{'cursor':'pointer'}}><TbChecks fontSize={15} onClick={() => {
        setUsersToDisplay(message?.readBy);
        onOpen();
      }}/></Box> : <><TbCheck fontSize={15}/></> : <></>}
     
    </Flex>
  )
}


  return (
    <Box w='100%' h='85%' ml='5px'>
      <Box  >
      <ReadByModal users={usersToDisplay} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Box padding={'15px 0px'} ref={messagesContainerRef} h='75vh' overflow={'auto'} borderRadius={'5px'}>
        <Flex gap={'5px'} flexDirection={'column'}>
        {messages.map((message, index) => (
            renderMessage(message, index)
        ))}
        </Flex>
        </Box>
      </Box>

      <form onSubmit={(e) => {
        e?.preventDefault();
        handleSendMessage()
      }}>
        <Flex gap='4px' mt='5px'>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button type='submit' w='150px' colorScheme='purple'>Send</Button>
        </Flex>
     
      </form>

    </Box>
  );
};

export default Chat;
