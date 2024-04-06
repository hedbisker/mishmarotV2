import React, { useState } from 'react';
import TableUser from  './tableUser.tsx'
import TableBook from  './tableBook.tsx'
import { login, logout } from '../services/apiService.ts';



const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const _Login = async () => {
    try {
        if(/^[a-zA-Z0-9א-ת]+$/.test(username) == false){
            setError('username msut contain only alphabet or numbers');
            return;
        }

        const response = await login(username);
        if(response.data.code != 200){
            setError(response.data.message);
            return;
        }
        setLoggedIn(true);
    } catch (error) {
        console.log(error);
    }
  };


  const Logout = async () => {
    try {
       
      const response = await logout();
        if(response.data.code != 200){
            setError(response.data.message);
            return;
        }
        setLoggedIn(false);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div>
    {loggedIn ? 
    (
    <div>
        <label>{username} : שלום</label><br></br>
        <button onClick={Logout}>התנתק</button>
        <br></br><br></br>
          <TableUser/>
          <TableBook/>
    </div>
    

    ):
    (<div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={_Login}>Login</button>
    </div>)}
    <label>{error && <p style={{ color: 'red' }}>Error: {error}</p>}</label>
    </div>
  );
};

export default App;