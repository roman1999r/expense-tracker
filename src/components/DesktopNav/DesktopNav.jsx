import "./DesktopNav.css";

export default function DesktopNav({
                                       page,
                                       setPage,
                                   }) {
    return (
        <nav className="desktop-nav">
            <button
                className={page === "dashboard" ? "active" : ""}
                onClick={() => setPage("dashboard")}
            >
                Dashboard
            </button>

            <button
                className={page === "expenses" ? "active" : ""}
                onClick={() => setPage("expenses")}
            >
                Expenses
            </button>

            <button
                className={page === "analytics" ? "active" : ""}
                onClick={() => setPage("analytics")}
            >
                Analytics
            </button>

            <button
                className={page === "settings" ? "active" : ""}
                onClick={() => setPage("settings")}
            >
                Settings
            </button>
        </nav>
    );
}