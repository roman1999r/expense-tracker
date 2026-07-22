// // export default function Header({ total, count }) {
// //     return (
// //         <header className="header">
// //             <div>
// //                 <p className="badge">Shared Expense Tracker</p>
// //
// //                 <h1>
// //                     Трекер грошей
// //                     <br />
// //                     together.
// //                 </h1>
// //
// //                 <p className="subtitle">
// //                     Minimal, modern and beautiful finance
// //                     tracking for couples and friends.
// //                 </p>
// //             </div>
// //
// //             <div className="total-card">
// //                 <span>Total Spending</span>
// //
// //                 <h2>€{total.toFixed(2)}</h2>
// //
// //                 <p>{count} expenses</p>
// //             </div>
// //         </header>
// //     );
// // }
//
//
// export default function Header({
//                                    totalMoney,
//                                    totalExpenses,
//                                }) {
//     return (
//         <header className="header">
//             <div>
//                 <h1>
//                     Money
//                     <br />
//                     Tracker
//                 </h1>
//             </div>
//
//             <div className="balance-card">
//                 <span>Загальний бюджет</span>
//
//                 <h2>
//                     €{totalMoney.toFixed(2)}
//                 </h2>
//
//                 <p>
//                     Витрати:
//                     €
//                     {totalExpenses.toFixed(2)}
//                 </p>
//             </div>
//         </header>
//     );
// }

import "./Header.css";

import { translations } from "../../i18n/translations";

import { useLanguage } from "../../context/LanguageContext";

import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

export default function Header() {
    const { lang } =
        useLanguage();

    const t =
        translations[lang];

    return (
        <header className="header">
            <div>
                <h1>
                    Couple Budget
                </h1>

                <p>
                    {lang === "uk"
                        ? "Керуйте фінансами разом"
                        : "Manage finances together"}
                </p>
            </div>

            <div className="header-actions">
                <LanguageSwitcher />

                <ThemeSwitcher />
            </div>
        </header>
    );
}