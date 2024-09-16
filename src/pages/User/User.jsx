import { useEffect, useState } from 'react';

import { DownloadImageFromURL, isAuthenticated } from '../../firebase/basicFunctions';

import { Header } from '../../components/layout/Header/Header';

import styles from './User.module.css'


export function User() {
    const [userImage, setUserImage] = useState();

    useEffect(() => {
        isAuthenticated()
            .then((_user) => {
                DownloadImageFromURL(_user.photoURL)
                    .then((url) => setUserImage(url));
            });
    }, []);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.top_container}>
                    <img
                        src={userImage}
                        className={styles.perfilImage}
                    />
                </div>
            </div>
        </>
    );
}