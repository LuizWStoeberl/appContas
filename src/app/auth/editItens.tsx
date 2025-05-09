import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase";

export default function EditExpense() {
    const router = useRouter();
    const { id, description, value, date } = useLocalSearchParams();

    const [newDescription, setNewDescription] = useState(description as string);
    const [newValue, setNewValue] = useState(value as string);
    const [newDate, setNewDate] = useState(new Date(date as string));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [message, setMessage] = useState("");

    const handleSaveEdit = async () => {
        const numericValue = parseFloat(newValue);
        if (!newDescription || isNaN(numericValue)) {
            setMessage("Preencha todos os campos corretamente");
            return;
        }

        const user = auth.currentUser;
        if (user && id) {
            const expenseRef = doc(db, "users", user.uid, "expenses", id as string);
            await updateDoc(expenseRef, {
                description: newDescription,
                value: numericValue,
                date: newDate,
            });

            setMessage("Gasto atualizado com sucesso!");
            setTimeout(() => {
                router.replace("/tabs/home");
            }, 1000);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Gasto</Text>

            <TextInput
                style={styles.input}
                placeholder="Descrição"
                placeholderTextColor="#757575"
                value={newDescription}
                onChangeText={setNewDescription}
            />

            <TextInput
                style={styles.input}
                placeholder="Valor"
                placeholderTextColor="#757575"
                value={newValue}
                onChangeText={setNewValue}
                keyboardType="decimal-pad"
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>{newDate.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={newDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setNewDate(selectedDate);
                    }}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSaveEdit}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181a20",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    input: {
        height: 50,
        borderColor: "#1AB55C",
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: "#f4f4f4",
    },
    dateButton: {
        backgroundColor: "#1F222a",
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: "center",
    },
    dateButtonText: {
        color: "#f4f4f4",
    },
    button: {
        backgroundColor: "#1AB55C",
        padding: 15,
        borderRadius: 32,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
    message: {
        marginTop: 15,
        color: "#f4f4f4",
        textAlign: "center",
    },
});
