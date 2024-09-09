import { useState, useEffect } from 'react';

import { auth } from '../../../firebase/firebaseConfiguration';
import { onAuthStateChanged } from 'firebase/auth';

import { Link } from 'react-router-dom';

import styles from './LateralMenu.module.css';

export function LateralMenu({ isOpen }) {
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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <nav className={`${styles.lateralMenu_container} ${(isOpen ? styles.open : styles.closed)}`}>
            <div className={styles.buttonUser}>
                <Link to={(user != null) ? "/usuario" : "/login"}>{(user != null) ? "Usuário" : "Entrar"}</Link>
            </div>
            <div className={styles.nav_lateralMenu}>
                <Link to="/plantas">Plantas</Link>
            </div>
            <div className={styles.nav_lateralMenu}>
                <Link to="/animais">Animais</Link>
            </div>
        </nav>
    );
}