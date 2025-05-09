import { router } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Login from "./auth/login";

const auth = getAuth()

export default function Index () {

    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Usuário autenticado
                router.replace("/tabs/profile");
            } else {
                // Usuário não autenticado
                setCheckingAuth(false);
            }
        });

        return unsubscribe;
    }, []);

    if (checkingAuth) {
        return null; // ou um <Loading /> se quiser mostrar algo enquanto carrega
    }

    return <Login />;
}