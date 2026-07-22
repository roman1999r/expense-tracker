// export default function ExpenseCard({
//                                         expense,
//                                         onDelete,
//                                     }) {
//     return (
//         <article className="expense-card">
//             <div className="expense-header">
//                 <div>
//                     <h3>{expense.title}</h3>
//                     <p>{expense.date}</p>
//                 </div>
//
//                 <span className="category-pill">
//           {expense.category}
//         </span>
//             </div>
//
//             <div className="expense-footer">
//                 <h2>
//                     €{expense.amount.toFixed(2)}
//                 </h2>
//
//                 <button
//                     className="delete-btn"
//                     onClick={() => onDelete(expense.id)}
//                 >
//                     Delete
//                 </button>
//             </div>
//         </article>
//     );
// }


import "./ExpenseCard.css";
export default function ExpenseCard({
                                        expense,
                                        onDelete,
                                    }) {
    return (
        <div className="expense-card">
            <div className="expense-info">
                <h3>{expense.title}</h3>

                <p>{expense.category}</p>
            </div>

            <div className="expense-amount">
                €{expense.amount}
            </div>

            <button
                className="expense-delete"
                onClick={() =>
                    onDelete(expense)
                }
            >
                Delete
            </button>
        </div>
    );
}