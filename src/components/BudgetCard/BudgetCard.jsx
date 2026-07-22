import "./BudgetCard.css";

import {
    useState,
} from "react";

import { translations } from "../../i18n/translations";

import { useLanguage } from "../../context/LanguageContext";

export default function BudgetCard({
                                       title,
                                       value,
                                       onAdd,
                                   }) {
    const { lang } =
        useLanguage();

    const t =
        translations[lang];

    const [amount, setAmount] =
        useState("");

    return (
        <div className="budget-card">
            <span>{title}</span>

            <h2>
                €
                {Number(value).toFixed(
                    2
                )}
            </h2>

            <div className="budget-form">
                <input
                    type="number"
                    placeholder="100"
                    value={amount}
                    onChange={(e) =>
                        setAmount(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={() => {
                        onAdd(
                            Number(amount)
                        );

                        setAmount("");
                    }}
                >
                    {t.addMoney}
                </button>
            </div>
        </div>
    );
}