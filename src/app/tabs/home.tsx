import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
    
    return (
        <View style={styles.container}>
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
    }
})