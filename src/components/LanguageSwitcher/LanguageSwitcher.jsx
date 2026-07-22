import "./LanguageSwitcher.css";

import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSwitcher() {
    const { lang, changeLanguage } =
        useLanguage();

    return (
        <div className="language-switcher">
            <button
                className={
                    lang === "uk"
                        ? "active"
                        : ""
                }
                onClick={() =>
                    changeLanguage("uk")
                }
            >
                🇺🇦
            </button>

            <button
                className={
                    lang === "en"
                        ? "active"
                        : ""
                }
                onClick={() =>
                    changeLanguage("en")
                }
            >
                🇬🇧
            </button>
        </div>
    );
}