import { auth } from '../../firebase/firebaseConfiguration';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Logo_VidaMarinha from '../../assets/imgs/Logo_VidaMarinha.png';

import styles from './Login.module.css';
import { useState } from 'react';

const loginSchema = z.object({
    email: z.string()
        .email({ message: 'Informe um e-mail válido!' }),

    password: z.string()
        .min(6, { message: 'Defina uma senha com o mínimo de 6 caracteres' })
        .max(20, { message: 'Defina uma senha com o máximo de 20 caracteres' })
});

export function Login() {
    const [messageError, setMessageError] = useState('');

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });

    async function userAuthenticator(data) {

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate('/usuario');

        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setMessageError('Não há registro de usuário existente correspondente.');
                    break;
                case 'auth/invalid-credential':
                    setMessageError('O e-mail ou senha fornecidos não está correto.');
                    break;
                case 'auth/network-request-failed':
                    setMessageError('Falha na conexão - Verifique sua internet.');
                    break;
                default:
                    setMessageError(`Por favor, entre em contato com o suporte e informe esse código: ${error.code}`);
                    break;
            }
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
                    <h1 className={styles.title}>Entrar</h1>
                    <span className={styles.message}>{messageError}</span>
                    <form
                        className={styles.forms}
                        onSubmit={handleSubmit(userAuthenticator)}
                    >
                        <input
                            {...register('email')}
                            className={styles.field}
                            placeholder='E-mail'
                        />
                        {errors.email ? (
                            <p className={styles.message}>
                                {errors.email.message}
                            </p>
                        ) : null}

                        <input
                            {...register('password')}
                            className={styles.field}
                            placeholder='Senha'
                            type='password'
                        />
                        {errors.password ? (
                            <p className={styles.message}>
                                {errors.password.message}
                            </p>
                        ) : null}

                        <button
                            className={styles.button}
                        >Entrar</button>

                    </form>

                    <Link
                        to="/registrar"
                        className={styles.newUser}
                    >
                        Você já tem uma conta?
                    </Link>
                </div>
            </div>
        </div>
    );
}