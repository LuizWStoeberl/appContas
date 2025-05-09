import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase";

export default function Register() {
    const router = useRouter();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const register = async () => {
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
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccessMessage('Conta criada com sucesso!');
            setTimeout(() => {
                router.replace("/"); 
            }, 1500);
        } catch (error: any) {
            const firebaseError = error as FirebaseError;
            setErrorMessage(firebaseError.message);
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const uid = user.uid; // Aqui você pega o UID
            console.log("UID do usuário:", uid); 

            // ✅ Salva nome e telefone no Firestore
            await setDoc(doc(collection(db, "users"), user.uid), {
                name,
                phone,
                email: user.email
            });

            setSuccessMessage('Conta criada com sucesso!');
            setTimeout(() => {
                router.replace("/");
            }, 1500);
        } catch (error: any) {
            const firebaseError = error as FirebaseError;
            setErrorMessage(firebaseError.message);
        }
    };
    

    useEffect(() => {
        setErrorMessage('');
        setSuccessMessage('');
    }, [email, password]);

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Crie sua conta</Text>

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

                <View style={styles.contentInput}> 
                    <MaterialIcons name="drive-file-rename-outline" size={24} color="black" />
                    <TextInput
                        placeholder="Seu nome"
                        style={styles.input}
                        placeholderTextColor="#757575"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="none"
                    />
                </View>


                <View style={styles.contentInput}> 
                    <Feather name="smartphone" size={24} color="black" />
                    <TextInput
                        placeholder="Seu telefone"
                        style={styles.input}
                        placeholderTextColor="#757575"
                        value={phone}
                        onChangeText={setPhone}
                        autoCapitalize="none"
                    />
                </View>
                {errorMessage ? (
                    <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
                ) : null}

                {successMessage ? (
                    <Text style={{ color: 'green', marginTop: 10 }}>{successMessage}</Text>
                ) : null}
            </View>

            <TouchableOpacity onPress={register} style={styles.buttonSignIn}>
                <Text style={styles.buttonSignInText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181a20",
        alignItems: "center",
        paddingHorizontal: 20
    },
    welcome: {
        color: "#F4F4F4",
        marginTop: 50,
        fontSize: 24,
        fontWeight: "600"
    },
    content: {
        width: "100%",
        marginTop: 50,
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
        gap: 10
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
        fontWeight: "600",
        fontSize: 24
    }
});
