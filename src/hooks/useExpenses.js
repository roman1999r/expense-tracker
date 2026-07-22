import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";

import {
    useEffect,
    useState,
} from "react";

import { db } from "../firebase/firebase";

export function useExpenses(
    balances
) {
    const [expenses, setExpenses] =
        useState([]);

    useEffect(() => {
        const q = query(
            collection(db, "expenses"),
            orderBy("createdAt", "desc")
        );

        return onSnapshot(
            q,
            (snapshot) => {
                setExpenses(
                    snapshot.docs.map(
                        (doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        })
                    )
                );
            }
        );
    }, []);

    const addExpense =
        async ({
                   title,
                   amount,
                   category,
                   budget,
               }) => {
            amount =
                Number(amount);

            if (
                !title ||
                !amount
            )
                return;

            if (
                balances[
                    budget
                    ] < amount
            ) {
                alert(
                    "Not enough money"
                );
                return;
            }

            await addDoc(
                collection(
                    db,
                    "expenses"
                ),
                {
                    title,
                    amount,
                    category,
                    budget,
                    createdAt:
                        Date.now(),
                }
            );

            await updateDoc(
                doc(
                    db,
                    "balances",
                    "main"
                ),
                {
                    [budget]:
                        balances[
                            budget
                            ] - amount,
                }
            );
        };

    const deleteExpense =
        async (
            expense,
            balances
        ) => {
            await updateDoc(
                doc(
                    db,
                    "balances",
                    "main"
                ),
                {
                    [expense.budget]:
                        balances[
                            expense.budget
                            ] +
                        expense.amount,
                }
            );

            await deleteDoc(
                doc(
                    db,
                    "expenses",
                    expense.id
                )
            );
        };

    return {
        expenses,
        addExpense,
        deleteExpense,

    };
}