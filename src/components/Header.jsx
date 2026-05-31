export default function Header({ total, count }) {
    return (
        <header className="header">
            <div>
                <p className="badge">Shared Expense Tracker</p>

                <h1>
                    Трекер грошей
                    <br />
                    together.
                </h1>

                <p className="subtitle">
                    Minimal, modern and beautiful finance
                    tracking for couples and friends.
                </p>
            </div>

            <div className="total-card">
                <span>Total Spending</span>

                <h2>€{total.toFixed(2)}</h2>

                <p>{count} expenses</p>
            </div>
        </header>
    );
}