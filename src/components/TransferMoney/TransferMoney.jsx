import "./TransferMoney.css";

import {
    useState,
} from "react";

export default function TransferMoney({
                                          onTransfer,
                                      }) {
    const [from, setFrom] =
        useState("me");

    const [to, setTo] =
        useState("shared");

    const [amount,
        setAmount] =
        useState("");

    return (
        <div className="transfer-card">
            <h2>
                Transfer Money
            </h2>

            <select
                value={from}
                onChange={(e) =>
                    setFrom(
                        e.target.value
                    )
                }
            >
                <option value="me">
                    Me
                </option>

                <option value="her">
                    Partner
                </option>

                <option value="shared">
                    Shared
                </option>
            </select>

            <select
                value={to}
                onChange={(e) =>
                    setTo(
                        e.target.value
                    )
                }
            >
                <option value="me">
                    Me
                </option>

                <option value="her">
                    Partner
                </option>

                <option value="shared">
                    Shared
                </option>
            </select>

            <input
                type="number"
                value={amount}
                placeholder="100"
                onChange={(e) =>
                    setAmount(
                        e.target.value
                    )
                }
            />

            <button
                onClick={() =>
                    onTransfer(
                        from,
                        to,
                        Number(amount)
                    )
                }
            >
                Transfer
            </button>
        </div>
    );
}