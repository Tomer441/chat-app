import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from '../store/user/thunks';
import { userStateSelector } from '../store/user/selector';
import { Input } from '@chakra-ui/react';

const SignPage: React.FC = () => {
  const [displayRegister, setDisplayRegister] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loggedUser = useSelector(userStateSelector);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signUp({ username, password }));
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signIn({ username, password }));
  };

  return (
    <div>
      <h1>Home Page</h1>
      {loggedUser?.username}
      <form onSubmit={displayRegister ? handleRegister : handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div onClick={() => {
            setDisplayRegister((prev) => !prev)
        }}>{displayRegister ? 'Already have a user?' : 'Create a user'}</div>
        <button type="submit">{ displayRegister ? 'Register' : 'Login'}</button>
      </form>
    </div>
  );
};

export default SignPage;
