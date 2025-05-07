import { router } from "expo-router";
import { useEffect } from "react";
import Login from "./auth/login";



export default function Index () {

    useEffect (() => {
        const timeout = setTimeout(() => {
            const isLoggedIn = false;

            if(isLoggedIn) {
                router.navigate("/tabs/profile")
            } else {
                return (<Login />);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);


    return (
    <Login />
    );
}