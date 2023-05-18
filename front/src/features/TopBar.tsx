import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Logout from '../components/Logout';
import { useSelector } from 'react-redux';
import { userStateSelector } from '../store/user/selector';

function TopBar() {
    const user = useSelector(userStateSelector);
    return (
        <Flex gap='10px' alignItems={'center'}  w='100%' padding={'10px 0'} justifyContent={'flex-end'}>
            <Box>
                {user?.username}
            </Box>
            <Logout />
        </Flex>
    );
}

export default TopBar;