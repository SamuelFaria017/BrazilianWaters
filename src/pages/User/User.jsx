import styles from './User.module.css'

import { Header } from '../../components/layout/Header/Header';

export function User(){
    function getImageUser(){

    }

    return(
        <>
            <Header/>
            <div className={styles.container}>
                <div className={styles.top_container}>
                    <img 
                        src={getImageUser()}
                        className={styles.perfilImage}
                    />
                </div>
            </div>
        </>
    );
}