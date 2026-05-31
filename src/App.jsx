import {
    useEffect,
    useMemo,
    useState,
} from "react";

import "./styles/global.css";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
} from "firebase/firestore";

import { db } from "./firebase/firebase";

const categories = [
    "Їда",
    "Машина",
    "Одяг",
    "Відпочинок",
    "Ресторани",
    "Комуналка",
    "Розваги",
    "Подорож",
    "Підписки",
];

export default function App() {
    const [expenses, setExpenses] =
        useState([]);

    const [balances, setBalances] =
        useState({
            me: 0,
            her: 0,
            shared: 0,
        });

    const [title, setTitle] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [category, setCategory] =
        useState("Їда");

    const [budget, setBudget] =
        useState("shared");

    const [incomeValues, setIncomeValues] =
        useState({
            me: "",
            her: "",
            shared: "",
        });

    // INIT BALANCES
    useEffect(() => {
        const initBalances = async () => {
            const ref = doc(
                db,
                "balances",
                "main"
            );

            const snap = await getDoc(ref);

            if (!snap.exists()) {
                await setDoc(ref, {
                    me: 0,
                    her: 0,
                    shared: 0,
                });
            }
        };

        initBalances();
    }, []);

    // REALTIME
    useEffect(() => {
        const expensesQuery = query(
            collection(db, "expenses"),
            orderBy("createdAt", "desc")
        );

        const unsubscribeExpenses =
            onSnapshot(
                expensesQuery,
                (snapshot) => {
                    setExpenses(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                }
            );

        const unsubscribeBalances =
            onSnapshot(
                doc(db, "balances", "main"),
                (snapshot) => {
                    if (snapshot.exists()) {
                        setBalances(snapshot.data());
                    }
                }
            );

        return () => {
            unsubscribeExpenses();
            unsubscribeBalances();
        };
    }, []);

    // TOTAL EXPENSES
    const totalExpenses = useMemo(() => {
        return expenses.reduce(
            (acc, item) =>
                acc + Number(item.amount),
            0
        );
    }, [expenses]);

    // TOTAL MONEY
    const totalMoney =
        balances.me +
        balances.her +
        balances.shared;

    // CATEGORY TOTALS
    const categoryTotals = useMemo(() => {
        const totals = {};

        expenses.forEach((expense) => {
            totals[expense.category] =
                (totals[expense.category] || 0) +
                Number(expense.amount);
        });

        return totals;
    }, [expenses]);

    // ADD MONEY
    const addMoney = async (type) => {
        const value = Number(
            incomeValues[type]
        );

        if (!value || isNaN(value)) return;

        const ref = doc(
            db,
            "balances",
            "main"
        );

        const snap = await getDoc(ref);

        if (!snap.exists()) {
            await setDoc(ref, {
                me: 0,
                her: 0,
                shared: 0,
            });
        }

        const current = snap.data() || {
            me: 0,
            her: 0,
            shared: 0,
        };

        await updateDoc(ref, {
            [type]:
                Number(current[type] || 0) +
                value,
        });

        setIncomeValues((prev) => ({
            ...prev,
            [type]: "",
        }));
    };

    // ADD EXPENSE
    const addExpense = async (e) => {
        e.preventDefault();

        if (!title || !amount) return;

        const numericAmount =
            Number(amount);

        if (isNaN(numericAmount)) return;

        // CHECK BALANCE
        if (
            balances[budget] <
            numericAmount
        ) {
            alert("Not enough money");

            return;
        }

        // SAVE EXPENSE
        await addDoc(
            collection(db, "expenses"),
            {
                title,
                amount: numericAmount,
                category,
                budget,
                createdAt: Date.now(),
            }
        );

        // UPDATE BALANCE
        await updateDoc(
            doc(db, "balances", "main"),
            {
                [budget]:
                    balances[budget] -
                    numericAmount,
            }
        );

        // CLEAR FORM
        setTitle("");
        setAmount("");
    };

    // DELETE EXPENSE
    const deleteExpense = async (
        expense
    ) => {
        try {
            // RETURN MONEY
            await updateDoc(
                doc(db, "balances", "main"),
                {
                    [expense.budget]:
                        balances[
                            expense.budget
                            ] + expense.amount,
                }
            );

            // DELETE
            await deleteDoc(
                doc(
                    db,
                    "expenses",
                    expense.id
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="app">
            <div className="gradient gradient-1"></div>

            <div className="gradient gradient-2"></div>

            <main className="container">
                {/* HEADER */}
                <header className="header">
                    <div>
                        {/*<p className="badge">*/}
                        {/*    Shared Couple Budget*/}
                        {/*</p>*/}

                        <h1>
                            Money
                            <br />
                            Tracker
                        </h1>

                        {/*<p className="subtitle">*/}
                        {/*    Shared realtime finance*/}
                        {/*    tracker.*/}
                        {/*</p>*/}
                    </div>

                    <div className="balance-card">
                        <span>Загальний бюджет</span>

                        <h2>
                            €
                            {totalMoney.toFixed(2)}
                        </h2>

                        <p>
                            Витрати: €
                            {totalExpenses.toFixed(2)}
                        </p>
                    </div>
                </header>

                {/* BUDGETS */}
                <section className="stats-grid">
                    {/* ME */}
                    <div className="stat-card">
                        <span>Бюджет Романа</span>

                        <h2 >
                            €
                            {balances.me.toFixed(2)}
                        </h2>

                        <div className="income-form">
                            <input
                                type="number"
                                placeholder="Add money"
                                value={incomeValues.me}
                                onChange={(e) =>
                                    setIncomeValues(
                                        (prev) => ({
                                            ...prev,
                                            me: e.target.value,
                                        })
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    addMoney("me")
                                }
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* HER */}
                    <div className="stat-card">
                        <span>Бюджет Олі</span>

                        <h2>
                            €
                            {balances.her.toFixed(2)}
                        </h2>

                        <div className="income-form">
                            <input
                                type="number"
                                placeholder="Add money"
                                value={incomeValues.her}
                                onChange={(e) =>
                                    setIncomeValues(
                                        (prev) => ({
                                            ...prev,
                                            her: e.target.value,
                                        })
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    addMoney("her")
                                }
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* SHARED */}
                    <div className="stat-card">
                        <span>Готівка</span>

                        <h2>
                            €
                            {balances.shared.toFixed(
                                2
                            )}
                        </h2>

                        <div className="income-form">
                            <input
                                type="number"
                                placeholder="Add money"
                                value={incomeValues.shared}
                                onChange={(e) =>
                                    setIncomeValues(
                                        (prev) => ({
                                            ...prev,
                                            shared:
                                            e.target.value,
                                        })
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    addMoney("shared")
                                }
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </section>

                {/* FORM */}
                <form
                    className="form-card"
                    onSubmit={addExpense}
                >
                    <input
                        type="text"
                        placeholder="Опис витрати"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="Ціна"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                    />

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                    >
                        {categories.map((cat) => (
                            <option key={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <select
                        value={budget}
                        onChange={(e) =>
                            setBudget(
                                e.target.value
                            )
                        }
                    >
                        <option value="me">
                            Роман
                        </option>

                        <option value="her">
                            Оля
                        </option>

                        <option value="shared">
                            Готівка
                        </option>
                    </select>

                    <button type="submit">
                        Добавити
                    </button>
                </form>

                {/* CATEGORIES */}
                <section>
                    <div className="section-title">
                        <h2>Загальні категорії</h2>
                    </div>

                    <div className="category-grid">
                        {Object.entries(
                            categoryTotals
                        ).map(([cat, val]) => (
                            <div
                                className="category-card"
                                key={cat}
                            >
                                <span>{cat}</span>

                                <h3>
                                    €
                                    {Number(val).toFixed(
                                        2
                                    )}
                                </h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* EXPENSES */}
                <section>
                    <div className="section-title">
                        <h2>Витрати</h2>
                    </div>

                    <div className="expenses-grid">
                        {expenses.map(
                            (expense) => (
                                <div
                                    className="expense-card"
                                    key={expense.id}
                                >
                                    <div className="expense-top">
                                        <div>
                                            <h3>
                                                {expense.title}
                                            </h3>

                                            <p>
                                                {
                                                    expense.category
                                                }
                                            </p>
                                        </div>

                                        <span>
                      {expense.budget}
                    </span>
                                    </div>

                                    <div className="expense-bottom">
                                        <h2>
                                            €
                                            {Number(
                                                expense.amount
                                            ).toFixed(2)}
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteExpense(
                                                    expense
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}