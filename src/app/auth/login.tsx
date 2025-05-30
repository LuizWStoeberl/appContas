import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useRouter } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
    auth,
    signInWithEmailAndPassword
} from "../firebase";



export default function Login () {
    const router = useRouter();

    function handleRegister () {
        router.navigate("/auth/register");
    }

    function handleRecuperar () {
        router.navigate("/auth/recuperation")
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const login = async () => {
        if (!email || !password) {
            setErrorMessage('Informe o e-mail e senha.');
            return;
        }

        if (!regexEmail.test(email)) {
            setErrorMessage('E-mail inválido');
            return;
        }

        if (!regexPassword.test(password)) {
            setErrorMessage('A senha deve conter no mínimo 8 caracteres, letra maiúscula, minúscula, número e símbolo');
            return;
        }

        setErrorMessage('');

        try {
            const userCredentials: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            console.log("Usuário logado:", user.email);

            router.replace("/tabs/home")
        } catch (error: any) {
            const firebaseError = error as FirebaseError;
            setErrorMessage(firebaseError.message);
        }
    };

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Faça login na sua conta</Text>
            
            <View style={styles.content}>
                <View style={styles.contentInput}> 
                    <EvilIcons name="envelope" size={32} color="#757575" />
                    <TextInput
                        placeholder="Seu E-mail"
                        style={styles.input}
                        placeholderTextColor="#757575"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.contentInput}> 
                    <EvilIcons name="lock" size={32} color="#757575" />
                    <TextInput
                        placeholder="Sua senha"
                        style={styles.input}
                        placeholderTextColor="#757575"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                {errorMessage ? (
                    <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
                ) : null}
            </View>


            <View style={styles.footer}>
                <Text style={styles.footerText}>Esqueceu sua sua?</Text>
                <TouchableOpacity onPress={handleRecuperar}>
                    <Text style={styles.footerButtonText}>Recuperar senha</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={login} style={styles.buttonSignIn}>
                <Text style={styles.buttonSignInText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Ainda não tem sua conta?</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.footerButtonText}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181a20",
        alignItems: "center",
        paddingHorizontal: 20
    },
    header: {
        alignSelf:"flex-start",
        marginTop: 50
    },
    welcome: {
        color: "#F4F4F4",
        marginTop: 50,
        fontSize: 24,
        fontWeight: 600
    },
    content: {
        width: "100%",
        marginTop:50,
        alignItems: "center",
        gap: 20
    },
    contentInput: {
        width: "100%",
        height: 56,
        backgroundColor: "#1F222a",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 10,
    },
    input: {
        flex: 1,
        color: "#757575"
    },
    buttonSignIn: {
        backgroundColor: "#1AB55C",
        width: "100%",
        height: 56,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40
    },
    buttonSignInText: {
        color: "#f4f4f4",
        fontWeight: 600,
        fontSize: 24
    },
    buttonRegister: {
        backgroundColor: "#FF00FF",
        width: "100%",
        height: 56,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40
    },
    footer: {
        marginTop: 50,
        flexDirection: "row",
        gap: 10
    },
    footerText: {
        color: "#f4f4f4",
        fontSize: 16,
        fontWeight: 400
    },
    footerButtonText: {
        color: "#1ab55c",
        fontSize: 16,
        fontWeight: 400
    }
})