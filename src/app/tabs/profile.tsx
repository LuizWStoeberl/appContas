import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from '../firebase';

export default function Profile() {
    const router = useRouter();
    const [userData, setUserData] = useState<{ name: string, email: string, phone: string } | null>(null);

    const handleLogin = () => {
        router.navigate("/auth/login");
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data() as any);
                }
            }
        };
        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logoutIcon}>
                <TouchableOpacity onPress={handleLogin}>
                    <MaterialIcons name="logout" size={24} color="#f4f4f4" />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Seu perfil aqui!</Text>
            {userData ? (
                <>
                    <Text style={styles.info}>Nome: {userData.name}</Text>
                    <Text style={styles.info}>Email: {userData.email}</Text>
                    <Text style={styles.info}>Telefone: {userData.phone}</Text>
                </>
            ) : (
                <Text style={styles.info}>Carregando dados...</Text>
            )}
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242A32",
        paddingHorizontal: 30,
        paddingTop: 35
    },
    logoutIcon: {
        alignItems: "flex-end"
    },
    title: {
        fontSize: 25,
        color: "#f4f4f4",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 30
    },
    info: {
        color: "#f4f4f4",
        fontSize: 18,
        marginTop: 20
    }
});
