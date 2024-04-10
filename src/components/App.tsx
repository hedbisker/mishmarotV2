import React, { useState } from 'react';
import Login from './login.tsx';
import Logout from './logout.tsx';
import TableUser from './tableUser.tsx';
import TableBook from './tableBook.tsx';
import TableMain from './tableMain.tsx'
const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLogin = (username: string) => {
    setUsername(username);
    setLoggedIn(true);
    
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <label>
            {username} : שלום
          </label>
          <br />
          <Logout loggedInChange={handleLogout} />
          <br />
          <br />
         <TableMain/>
        </div>
      ) : (
        <Login onLogin={handleLogin} onError={handleError} />
      )}
      <label>{error && <p style={{ color: 'red' }}>Error: {error}</p>}</label>
    </div>
  );
};

export default App;