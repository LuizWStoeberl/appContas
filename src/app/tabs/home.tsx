import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
    
    const router = useRouter()
        
            function handleLogin () {
                router.navigate("/auth/login")
            }

    return (

        <View style={styles.container}>

            <View style={styles.logoutIcon}>
                <TouchableOpacity onPress={handleLogin}>
                <MaterialIcons name="logout" size={24} color="#f4f4f4" />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Bem Vindo(a)</Text>
            <View style={styles.headerInput}>
                <TextInput 
                style={styles.input}
                placeholder="Adicione sua conta:"
                placeholderTextColor='#FFF'
                />
            </View>
            
        </View>
    )
}

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#242A32",
        paddingHorizontal:30,
        paddingTop:35
    },
    title:{
        fontSize:25,
        color:"black",
        fontWeight:"bold",
        textAlign:"center"
    },
    headerInput:{
        padding:10,
        textAlign:"center"
    },
    input:{
        textAlign:"center"
    },
    logoutIcon: {
        alignContent: "flex-end",
        alignItems: "flex-end"
    }
})