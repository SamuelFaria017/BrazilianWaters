import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import styles from './LateralMenu.module.css';

export function LateralMenu({ isOpen }) {

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
                <Link to="/login">Entrar</Link>
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