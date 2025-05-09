import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {
    auth,
    sendPasswordResetEmail
} from '../firebase';

export default function ForgotPasswordScreen () {

     const router = useRouter();
    
        function handleLogin () {
            router.navigate("/auth/login");
        }

    const navigation = useNavigation();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [ email, setEmail ] = useState('');

    const [ errorMessage, setErrorMessage ] = useState('');

    const resetPassword = async () => {
        if (!email) {
            setErrorMessage('Informe o e-mail.');
            return;
        }

        if (!regexEmail.test(email)) {
            setErrorMessage('E-mail inválido');
            return;
        }

        setErrorMessage('');

        await sendPasswordResetEmail(auth, email);

        console.log('e-mail de redenifição enviado!');
    }

    useEffect(() => {
        setErrorMessage('');
    }, [email])

    return (
        
            <View style={styles.container}>

                <Text style={styles.welcome}>Esqueci a senha</Text>
                <View style={styles.contentInput}>
                <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#757575"
                    style={styles.input}
                    inputMode="email"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    value={email}
                />
                </View>
                {errorMessage &&
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                }
                <TouchableOpacity
                    onPress={() => {
                        resetPassword();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText} >Redefinir Senha</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText} >Voltar</Text>
                </TouchableOpacity>
            </View>

    )
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
        fontWeight: 600
    },
    input: {
        flex: 1,
        color: "#757575"
    },
    button: {
        backgroundColor: "#1AB55C",
        width: "100%",
        height: 56,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40
    },
    buttonText: {
        color: "#f4f4f4",
        fontWeight: 600,
        fontSize: 24
    },
    errorMessage: {
        fontSize: 18,
        textAlign: 'center',
        color: 'red'
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
    }
})