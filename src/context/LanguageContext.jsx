import {
    createContext,
    useContext,
    useState,
} from "react";

const LanguageContext =
    createContext();

export function LanguageProvider({
                                     children,
                                 }) {
    const [lang, setLang] =
        useState(
            localStorage.getItem("lang") ||
            "uk"
        );

    const changeLanguage = (
        language
    ) => {
        setLang(language);

        localStorage.setItem(
            "lang",
            language
        );
    };

    return (
        <LanguageContext.Provider
            value={{
                lang,
                changeLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () =>
    useContext(LanguageContext);