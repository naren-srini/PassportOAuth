import React, { useContext } from 'react'
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { IUser } from '../../types/mainTypes';
import { myContext } from '../Context';
import axios, { AxiosResponse } from 'axios';

export default function NavBar() {
    // Creating userObject for storing
    const userObject = useContext(myContext) as IUser;

    // Logout Procedure 
    const logout = () => {
        axios.get("https://o-auth-video-backend.herokuapp.com/auth/logout", {
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
                        <li onClick={logout}>Logout </li>
                        ) : (
                            <li><Link to='/login'>Login</Link></li>
                        )
                    }
            </ul>
        </div>
    )
}
