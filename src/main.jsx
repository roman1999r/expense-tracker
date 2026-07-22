// import React from "react";
// import ReactDOM from "react-dom/client";
//
// import App from "./App";
// import "./styles/global.css";
//
// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.css";

import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <LanguageProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </LanguageProvider>
    </React.StrictMode>
);