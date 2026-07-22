import "./ThemeSwitcher.css";

import { useTheme } from "../../context/ThemeContext";

export default function ThemeSwitcher() {
    const { theme, setTheme } =
        useTheme();

    return (
        <button
            className="theme-button"
            onClick={() =>
                setTheme(
                    theme === "dark"
                        ? "light"
                        : "dark"
                )
            }
        >
            {theme === "dark"
                ? "☀️"
                : "🌙"}
        </button>
    );
}