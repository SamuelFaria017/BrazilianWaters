import { useState, useEffect } from 'react';

import { auth } from '../../../firebase/firebaseConfiguration';
import { onAuthStateChanged } from 'firebase/auth';

import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import { LateralMenu } from '../LateralMenu/LateralMenu';

import User_icon from '../../../assets/imgs/User_icon.jpg';
import Logo_VidaMarinha from '../../../assets/imgs/Logo_VidaMarinha.png';
import Button_Menu from '../../../assets/imgs/Button_Menu.png';

export function Header() {
    const [menuState, setMenuState] = useState(false);

    const [user, setUser] = useState(null);
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    }, []);

    function imageRequest() { // Fazer uma requisição para o servidor onde está os dados do usuário, requisitando sua imagem.
        return User_icon;
    }

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
                    to={(user != null) ? "/usuario" : "/login"}
                    className={`${styles.user} ${styles.nav_link}`}
                >
                    <img
                        className={styles.user_image}
                        src={imageRequest()}
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

            {menuState && <div className={styles.overlay} onClick={menuOpen}></div>}

            <LateralMenu isOpen={menuState} />
        </>
    );
}