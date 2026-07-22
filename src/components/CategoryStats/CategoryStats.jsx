import "./CategoryStats.css";

export default function CategoryStats({
                                          expenses,
                                      }) {
    const totals = {};

    const max=Math.max(...Object.values(totals));

    expenses.forEach((e) => {
        totals[e.category] =
            (totals[e.category] || 0) +
            e.amount;
    });

    return (
        <div className="category-stats">
            <h2>
                Category Totals
            </h2>

            {Object.entries(
                totals
            ).map(
                ([category, amount]) => (
                    <div className="category-row">

                        <div>

                            <strong>{category}</strong>

                            <div className="progress">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width:`${amount/max*100}%`
                                    }}
                                />

                            </div>

                        </div>

                        <span>

        €{amount.toFixed(2)}

    </span>

                    </div>
                )
            )}
        </div>
    );
}