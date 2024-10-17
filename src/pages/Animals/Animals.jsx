import { Header } from '../../components/layout/Header/Header'
import { Footer } from '../../components/layout/Footer/Footer'

import styles from './Animals.module.css';

export function Animals() {
    return (
        <>
            <Header />
            <div className={styles.outerDiv}>
                <div className={styles.innerDiv}>
                    <p>Nome:</p>
                </div>
            </div>  
        </>                  
    );
}
