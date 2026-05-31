import { useState } from "react";
import { categories } from "../data/categories";

export default function ExpenseForm({
                                        onAddExpense,
                                    }) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(
        categories[0]
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !amount) return;

        onAddExpense({
            id: crypto.randomUUID(),
            title: title.trim(),
            amount: Number(amount),
            category,
            date: new Date().toLocaleDateString(),
        });

        setTitle("");
        setAmount("");
        setCategory(categories[0]);
    };

    return (
        <form
            className="form-card"
            onSubmit={handleSubmit}
        >
            <div className="input-group">
                <label>Expense Name</label>

                <input
                    type="text"
                    placeholder="Coffee, Rent..."
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />
            </div>

            <div className="input-group">
                <label>Amount</label>

                <input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                />
            </div>

            <div className="input-group">
                <label>Category</label>

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >
                    {categories.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>
            </div>

            <button className="add-btn">
                + Add Expense
            </button>
        </form>
    );
}