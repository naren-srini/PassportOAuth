//* Standard React Imports
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

//* CSS Styles Imports 
import styles from './NavBar.module.css';

//* Axios Call and Response
import axios, { AxiosResponse } from 'axios';

//* User profile and res.data import
import { IUser } from '../../types/mainTypes';
import { myContext } from '../Context';


export default function NavBar() {
    // Creating userObject for storing
    const userObject = useContext(myContext) as IUser;

    // Logout Procedure 
    const logout = () => {
        axios.get("https://localhost:4000/auth/logout", {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if (res.data === "done") {
                window.location.href = "/"
            }
        })
    }

    return (
        <div className={styles.navBarWrapper}>
            <ul className={styles.navBar}>
                <li><Link to='/'>Home</Link></li>
                    {
                        userObject ? (
                        <li onClick={logout}>Logout</li>
                        ) : (
                            <li><Link to='/login'>Login</Link></li>
                        )
                    }
            </ul>
        </div>
    )
}
