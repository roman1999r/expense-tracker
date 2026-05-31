import ExpenseCard from "./ExpenseCard";

export default function ExpenseList({
                                        expenses,
                                        onDelete,
                                    }) {
    if (expenses.length === 0) {
        return (
            <div className="empty-state">
                <h2>No expenses yet</h2>
                <p>Add your first expense above.</p>
            </div>
        );
    }

    return (
        <div className="expenses-grid">
            {expenses.map((expense) => (
                <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}