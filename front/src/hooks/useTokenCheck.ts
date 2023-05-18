import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyToken } from '../store/user/thunks';

export const useTokenCheck = (): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(verifyToken({ token }));
    }
  }, [dispatch]);
};
