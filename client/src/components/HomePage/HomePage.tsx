import React, { useContext } from 'react'
import { IUser } from '../../types/mainTypes';
import { myContext } from '../Context';

export default function Homepage() {

  const userObject = useContext(myContext) as IUser;
  
  return (
      <div>
        {
            userObject ? (
                <h1>Welcome back {userObject.username}</h1>
            ) : (
                    <h1>Welcome to my Website for Passport Authentication</h1>
                )
        }
      </div>
    )
}
