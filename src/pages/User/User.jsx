import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { downloadImageFromURL, isAuthenticated, updateaImageProfile, desconnectAccount, deleteAccount } from '../../firebase/basicFunctions';

import { Header } from '../../components/layout/Header/Header';

import styles from './User.module.css'

export function User() {
    const [userImage, setUserImage] = useState();
    const [userName, setUserName] = useState('');
    const [userEmail, setUseEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        updateImage();
    }, []);

    function updateImage() {
        isAuthenticated()
            .then((_user) => {
                downloadImageFromURL(_user.photoURL)
                    .then((url) => setUserImage(url));
                setUserName(_user.displayName);
                setUseEmail(_user.email);
            })
            .catch((err) => {

            });
    }

    function disconnectClick(){
        desconnectAccount(() => {navigate('/')});
    }

    function deleteClick(){
        deleteAccount(() => {navigate('/')});
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.top_container}>
                    <div className={styles.perfilImage_container} onClick={updateaImageProfile}>
                        <img
                            src={userImage}
                            className={styles.perfilImage}
                        />
                        <span className={styles.perfilImageDescription}>MUDAR FOTO DO PERFIL</span>
                    </div>
                </div>

                <h2 className={styles.user_name}>{userName}</h2>
                <h2 className={styles.user_email}>E-mail: {userEmail}</h2>
                <div className={styles.buttons_container}>
                    <button
                        type="button"
                        className={styles.desconnectButton}
                        onClick={disconnectClick}
                    >Desconectar</button>

                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={deleteClick}
                    >Deletar conta</button>
                </div>
            </div>
        </>
    );
}