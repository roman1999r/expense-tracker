import "./MobileNav.css";

export default function MobileNav({
                                      page,
                                      setPage,
                                  }) {
    return (
        <nav className="mobile-nav">
            <button
                className={
                    page === "dashboard"
                        ? "active"
                        : ""
                }
                onClick={() =>
                    setPage("dashboard")
                }
            >
                🏠
            </button>

            <button
                className={
                    page === "expenses"
                        ? "active"
                        : ""
                }
                onClick={() =>
                    setPage("expenses")
                }
            >
                💸
            </button>

            <button
                className={
                    page === "analytics"
                        ? "active"
                        : ""
                }
                onClick={() =>
                    setPage("analytics")
                }
            >
                📊
            </button>

            <button
                className={
                    page === "settings"
                        ? "active"
                        : ""
                }
                onClick={() =>
                    setPage("settings")
                }
            >
                ⚙️
            </button>
        </nav>
    );
}