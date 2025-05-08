import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function Login () {
    return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.header}>
        <AntDesign name="arrowleft" size={32} color="#F4F4F4" weight="regular" />
        </TouchableOpacity>

        <Text style={styles.welcome}>Faça login na sua conta </Text>
            
        <View style={styles.content}>
            <View style={styles.contentInput}> 
                <EvilIcons name="envelope" size={32} color="#757575" />
                <TextInput
                    placeholder='Seu E-mail' 
                    style={styles.input} 
                    placeholderTextColor={"#757575"}
                />
            </View>

            <View style={styles.contentInput}> 
                <EvilIcons name="lock" size={32} color="#757575" />
                <TextInput
                    placeholder='Sua senha' 
                    style={styles.input} 
                    placeholderTextColor={"#757575"}
                />
            </View>
        </View>

    <TouchableOpacity style={styles.buttonSignIn} >
        <Text style={styles.buttonSignInText}>Entrar</Text>
    </TouchableOpacity>

    <Text style={styles.welcome}>Ainda não tem sua conta?</Text>

    <TouchableOpacity style={styles.buttonRegister}>
        <Text style={styles.buttonSignInText}>Cadastrar conta</Text>
    </TouchableOpacity>

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
    }
})