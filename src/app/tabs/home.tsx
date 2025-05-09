import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from 'expo-router';
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addExpense } from "../auth/expense";
import { auth, db } from "../firebase";

export default function AddExpense() {
    const router = useRouter();

    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [message, setMessage] = useState("");
    const [expenses, setExpenses] = useState<any[]>([]);

    const fetchExpenses = async () => {
        const user = auth.currentUser;
        if (user) {
            const expensesRef = collection(db, "users", user.uid, "expenses");
            const q = query(expensesRef);
            const querySnapshot = await getDocs(q);
            const expensesList: any[] = [];
            querySnapshot.forEach((doc) => {
                expensesList.push({ id: doc.id, ...doc.data() });
            });
            setExpenses(expensesList);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleAddExpense = async () => {
        const numericValue = parseFloat(value);
        if (!description || isNaN(numericValue)) {
            setMessage("Preencha todos os campos corretamente");
            return;
        }

        const user = auth.currentUser;
        if (user) {
            await addExpense(user.uid, description, numericValue, date);
            setMessage("Gasto salvo com sucesso!");
            setDescription("");
            setValue("");
            fetchExpenses();
        }
    };

    const handleDeleteExpense = async (id: string) => {
        const user = auth.currentUser;
        if (user) {
            await deleteDoc(doc(db, "users", user.uid, "expenses", id));
            setMessage("Gasto excluído com sucesso!");
            fetchExpenses();
        }
    };

    const handleEditExpense = (id: string, newDescription: string, newValue: number, newDate: Date) => {
        const formattedDate = newDate.toISOString();
        router.push({
            pathname: '/auth/editItens',
            params: {
                id,
                description: newDescription,
                value: newValue.toString(),
                date: formattedDate,
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Gasto</Text>

            <TextInput
                style={styles.input}
                placeholder="Descrição"
                placeholderTextColor="#757575"
                value={description}
                onChangeText={setDescription}
            />

            <TextInput
                style={styles.input}
                placeholder="Valor"
                placeholderTextColor="#757575"
                value={value}
                onChangeText={setValue}
                keyboardType="decimal-pad"
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDate(selectedDate);
                    }}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            {message ? <Text style={styles.message}>{message}</Text> : null}

            <FlatList
                data={expenses}
                renderItem={({ item }) => (
                    <View style={styles.expenseItem}>
                        <View>
                            <Text style={styles.expenseText}>{item.description}</Text>
                            <Text style={styles.expenseText}>R$ {item.value}</Text>
                            <Text style={styles.expenseText}>{item.date.toDate().toLocaleDateString()}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                handleEditExpense(
                                    item.id,
                                    item.description,
                                    Number(item.value),
                                    item.date.toDate()
                                );
                            }}>
                                <Text style={styles.editButton}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
                                <Text style={styles.deleteButton}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
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
    expenseItem: {
        backgroundColor: "#1F222a",
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    expenseText: {
        color: "#f4f4f4",
        fontSize: 16,
    },
    editButton: {
        color: "#FF8C00",
        fontSize: 16,
        marginBottom: 5,
    },
    deleteButton: {
        color: "#FF0000",
        fontSize: 16,
    },
});
