import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setInitialMessages } from '../store/messages/actions';
import { logoutAction } from '../store/user/action';

function Logout() {
    const dispatch = useDispatch();
    const removeTokenFromLocalStorage = (): void => {
        localStorage.removeItem('token');
      };
      const handleLogout = () => {
        removeTokenFromLocalStorage();
        dispatch(setInitialMessages({messages: []}));
        dispatch(logoutAction())
      }
      
    return (
        <Button onClick={handleLogout} colorScheme='purple'>
            Logout
        </Button>
    );
}

export default Logout;