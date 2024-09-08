import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

import styles from './Footer.module.css'

export function Footer(){
    return(
        <footer className={styles.footer_container}>
            <div className={styles.icon_container}>
                <FaFacebook size={42} color="white" className={styles.icons}/>
                <FaInstagramSquare size={42} color="white" className={styles.icons}/>
                <FaGithub size={42} color="white" className={styles.icons}/>
            </div>
            <h3 className={styles.info}>Info - Support - Marketing</h3>
            <h3 className={styles.info}>Terms of Use - Privacy Policy</h3>
            <h3 className={`${styles.info} ${styles.privacy}`}>©️ 2024 ETEC de Hortolândia</h3>
        </footer>
    );
}