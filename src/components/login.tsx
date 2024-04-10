import React, { useState } from 'react';
import { login } from '../services/apiService.ts';

interface LoginProps {
  onLogin: (username: string) => void;
  onError: (errorMessage: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onError }) => {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    try {
      if (!/^[a-zA-Z0-9א-ת]+$/.test(username)) {
        onError('Username must contain only alphabets or numbers');
        return;
      }

      const response = await login(username);
      if (response.data.code != 200) {
        onError(response.data.message);
        return;
      }
      onLogin(username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;