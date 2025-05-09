import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from '../firebase';

export const addExpense = async (userId: string, description: string, value: number, date: Date) => {
    const expenseRef = collection(db, "users", userId, "expenses");

    // Converte a data para um Timestamp do Firestore
    const timestamp = Timestamp.fromDate(date);

    await addDoc(expenseRef, {
        description,
        value,
        date: timestamp // Agora você passa um Timestamp, que é aceito pelo Firestore
    });

    console.log("Gasto adicionado!");
};

export const getExpenses = async (userId: string) => {
    const expensesRef = collection(db, "users", userId, "expenses");
    const expensesSnapshot = await getDocs(expensesRef);
    const expensesList = expensesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    return expensesList;
};