import React from 'react';
import styles from './LoginPage.module.css';
import googleImage from '../../assets/googleImage.png';
import twitterImage from '../../assets/twitterImage.png';
import githubImage from '../../assets/githubImage.png';

export default function LoginPage() {
    return (
    <div className={styles.loginPage}>
        
        <div className={styles.loginForm}>
            <h2>Login using Google</h2>
            <div className={styles.googleContainer}>
                <img src= {googleImage} alt="Google Icon" />
                <p>Login with Google</p> 
            </div>
        </div>

    </div>
    )
}
