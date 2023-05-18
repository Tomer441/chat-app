import React from 'react'
import { roomsStateSelector } from '../store/rooms/selector'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Room } from '../store/rooms/slice';
import { TiDelete } from 'react-icons/ti';
import { deleteRoomByIdThunk } from '../store/rooms/thunks';
import { changeCurrentRoom } from '../store/rooms/actions';


export default function RoomsHolder() {
    const rooms = useSelector(roomsStateSelector);
    const dispatch = useDispatch();

    const handleRemoveRoom = (roomId?: string) => {
        !!roomId && dispatch(deleteRoomByIdThunk({roomId: roomId}));
    }

    const handleRoomClick = (roomId?: string) => {
        !!roomId && dispatch(changeCurrentRoom({roomId: roomId}));
    }

    const renderRoomRow = (room: Room, i: number) => {
        const isInCurrentRoom = rooms?.currentRoom === room?._id;


        return (
            <Flex
            backgroundColor={'#805AD5'}
            onClick={() => {handleRoomClick(room?._id)}}
            borderLeft={isInCurrentRoom ? '#372263 7px solid' : ''}
            borderRadius={5}
             justifyContent={'space-between'}  alignItems={'center'} _hover={{'cursor':"pointer", 'opacity': '0.5'}} key={i}>
                <Box ml='5px' fontSize={'bigger'} maxW='60%'>
                    {room?.roomName}
                </Box>
                <Flex onClick={(e) => {
                    e?.stopPropagation();
                    e?.preventDefault();
                    handleRemoveRoom(room?._id)
                }} alignItems={'center'}>
                    <TiDelete color='red'/>
                </Flex>
            </Flex>
        )
    }


  return (
    <Flex flexDirection={'column'}>Rooms:
        <Flex gap='12px' maxH={'500px'} overflowY={'auto'} flexDirection={'column'}>
         {rooms?.rooms?.map((room, i) => {
            return renderRoomRow(room, i)
         })}
        </Flex>
    </Flex>
    
  )
}
