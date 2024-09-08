import { useState, useEffect } from "react";

import { auth } from "../firebase/firebaseConfiguration";
import { onAuthStateChanged } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

export function PrivateRoutes({children}){
    const [loading, setLoading] = useState(true);
    const [userLogged, setUserLogged] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function verifyLoggedUser() {
            onAuthStateChanged(auth, (user) => {
                if (user){
                    setUserLogged(true);
                    setLoading(false);
                } else{
                    setUserLogged(false);
                    setLoading(false);
                }
            })
        }

        verifyLoggedUser();
    }, [])

    if (loading) return null;

    if (!userLogged){
        navigate('/');
    }

    return children;
}