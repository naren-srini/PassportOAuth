import React from 'react';
import styles from './LoginPage.module.css';
import googleImage from '../../assets/googleImage.png';
import twitterImage from '../../assets/twitterImage.png';
import githubImage from '../../assets/githubImage.png';

export default function LoginPage() {

    //* Google Login-Page Route
    const googleLogin = () => {
        window.open("http://localhost:4000/auth/google", "_self");
    }

    //* Github Login-Page Route
    const githubLogin = () => {
        window.open("https://localhost:4000/auth/github", "_self");
    }
    
    //* Twitter Login-Page Route
    const twitterLogin = () => {
        // Using the below to prevent login from opening in another tab
        window.location.href = "https://localhost:4000/auth/twitter"
    }

    return (
    <div className={styles.loginPage}>
        
        <div className={styles.loginForm}>
            <h2>Login using</h2>
            <div className={styles.googleContainer} onClick={googleLogin}>
                <img src= {googleImage} alt="Google Icon" />
                <p>Login with Google</p> 
            </div>
        </div>

        <div className={`${styles.googleContainer} ${styles.githubContainer}`} onClick={githubLogin}>
            <img src={githubImage} alt="Github Icon" />
            <p>Login With Github</p>
        </div>

        <div className={`${styles.googleContainer} ${styles.twitterContainer}`} onClick={twitterLogin}>
            <img src={twitterImage} alt="Twitter Icon" />
            <p>Login With Twitter</p>
        </div>

    </div>
    )
}
