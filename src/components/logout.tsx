import React, { useState } from 'react';
import { logout } from '../services/apiService.ts';


const LogoutComponent: React.FC = ({ loggedInChange }) => {
    
    const loggedInChangeAction = async () => {
            try {
              await logout();
              loggedInChange(false);
            } catch (error) {
                console.log(error);
            }
          };


    return (
        <button onClick={loggedInChangeAction}>התנתק</button>
    )
    
}


export default LogoutComponent;