import { auth } from '../../firebase/firebaseConfiguration';

import { uploadImageFromURL } from '../../firebase/basicFunctions';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { } from 'firebase/storage';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Logo_VidaMarinha from '../../assets/imgs/Logo_VidaMarinha.png';

import styles from './Register.module.css';
import { useState } from 'react';

const loginSchema = z.object({
    username: z.string()
        .min(6, { message: 'Defina uma nome com o mínimo de 6 caracteres' })
        .max(50, { message: 'Defina uma nome com o máximo de 20 caracteres' }),

    email: z.string()
        .email({ message: 'Informe um e-mail válido!' }),

    password: z.string()
        .min(8, { message: 'Defina uma senha com o mínimo de 6 caracteres' })
        .max(30, { message: 'Defina uma senha com o máximo de 20 caracteres' })
});

export function Register() {
    const [messageError, setMessageError] = useState('');

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });

    async function userCreate(data) {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

            const userImageURL = await uploadImageFromURL('../../assets/imgs/User_icon.jpg', 'User_icon.jpg');

            await updateProfile(userCredential.user, {
                displayName: data.username,
                photoURL: userImageURL
            });

            navigate('/');

        } catch (error) {
            setMessageError('Conta já existente.');
        }
    }

    return (
        <div className={styles.container}>
            <Link
                to="/"
                className={styles.logo}
            >
                <img
                    className={styles.logo_image}
                    src={Logo_VidaMarinha}
                />
            </Link>
            <div className={styles.main_container}>
                <div className={styles.login_container}>
                    <h1 className={styles.title}>Registrar</h1>
                    <span className={styles.message}>{messageError}</span>
                    <form
                        className={styles.forms}
                        onSubmit={handleSubmit(userCreate)}
                    >
                        <input
                            {...register('username')}
                            className={styles.field}
                            placeholder='Nome'
                        />
                        {errors.username && (
                            <p className={styles.message}>
                                {errors.username.message}
                            </p>
                        )}

                        <input
                            {...register('email')}
                            className={styles.field}
                            placeholder='E-mail'
                        />
                        {errors.email && (
                            <p className={styles.message}>
                                {errors.email.message}
                            </p>
                        )}

                        <input
                            {...register('password')}
                            className={styles.field}
                            placeholder='Senha'
                            type='password'
                        />
                        {errors.password && (
                            <p className={styles.message}>
                                {errors.password.message}
                            </p>
                        )}

                        <button
                            className={styles.button}
                        >Registrar</button>

                    </form>

                    <Link
                        to="/login"
                        className={styles.newUser}
                    >
                        Entrar com uma conta?
                    </Link>
                </div>
            </div>
        </div>
    );
}