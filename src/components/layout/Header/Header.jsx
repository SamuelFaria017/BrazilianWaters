import { useState, useEffect } from 'react';

import { isAuthenticated, downloadImageFromURL } from '../../../firebase/basicFunctions';

import { Link } from 'react-router-dom';

import { LateralMenu } from '../LateralMenu/LateralMenu';

import User_icon from '../../../assets/imgs/User_icon.jpg';
import Logo_VidaMarinha from '../../../assets/imgs/Logo_VidaMarinha.png';
import Button_Menu from '../../../assets/imgs/Button_Menu.png';

import styles from './Header.module.css';

export function Header() {
    const [menuState, setMenuState] = useState(false);
    const [user, setUser] = useState(null);
    const [userImage, setUserImage] = useState(User_icon);

    useEffect(() => {
        isAuthenticated()
            .then((_user) => {
                setUser(_user);

                downloadImageFromURL(_user.photoURL)
                    .then((url) => setUserImage(url));
            })
            .catch((err) => {

            });
    }, []);

    function menuOpen() {
        setMenuState(!menuState);
    }

    return (
        <>
            <header className={styles.container}>
                <Link
                    to="/"
                    className={styles.logo}
                >
                    <img
                        className={styles.logo_image}
                        src={Logo_VidaMarinha}
                    />
                </Link>

                <nav className={styles.nav_container}>
                    <ul className={styles.nav_ul}>
                        <li className={styles.nav_link}>
                            <Link to="/plantas">Plantas</Link>
                        </li>
                        <li className={styles.nav_link}>
                            <Link to="/animais">Animais</Link>
                        </li>
                    </ul>
                </nav>

                <Link
                    to={(user) ? "/usuario" : "/login"}
                    className={`${styles.user} ${styles.nav_link}`}
                >
                    <img
                        className={styles.user_image}
                        src={userImage}
                    />
                </Link>
                <div
                    className={`${styles.button_menu_container} ${(menuState ? styles.active : styles.desactive)}`}
                    onClick={menuOpen}
                >
                    <img
                        className={`${styles.button_menu} ${(menuState ? styles.active : styles.desactive)}`}
                        src={Button_Menu}
                    />
                </div>
            </header>

            {menuState ? <div className={styles.overlay} onClick={menuOpen}></div> : null}

            <LateralMenu isOpen={menuState} />
        </>
    );
}