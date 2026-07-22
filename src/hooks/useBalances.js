import {
    doc,
    getDoc,
    onSnapshot,
    setDoc,
    updateDoc,
} from "firebase/firestore";

import {
    useEffect,
    useState,
} from "react";

import { db } from "../firebase/firebase";

export function useBalances() {
    const [balances, setBalances] =
        useState({
            me: 0,
            her: 0,
            shared: 0,
        });

    useEffect(() => {
        const init = async () => {
            const ref = doc(
                db,
                "balances",
                "main"
            );

            const snap =
                await getDoc(ref);

            if (!snap.exists()) {
                await setDoc(ref, {
                    me: 0,
                    her: 0,
                    shared: 0,
                });
            }
        };

        init();

        const unsubscribe =
            onSnapshot(
                doc(
                    db,
                    "balances",
                    "main"
                ),
                (snapshot) => {
                    if (
                        snapshot.exists()
                    ) {
                        setBalances(
                            snapshot.data()
                        );
                    }
                }
            );

        return () =>
            unsubscribe();
    }, []);

    const addMoney = async (
        type,
        amount
    ) => {
        if (
            !amount ||
            amount <= 0
        )
            return;

        const ref = doc(
            db,
            "balances",
            "main"
        );

        const snap =
            await getDoc(ref);

        const current =
            snap.data();

        await updateDoc(ref, {
            [type]:
                Number(
                    current[type]
                ) + Number(amount),
        });
    };

    const transferMoney =
        async (
            from,
            to,
            amount
        ) => {
            if (
                from === to ||
                amount <= 0
            )
                return;

            const ref = doc(
                db,
                "balances",
                "main"
            );

            const snap =
                await getDoc(ref);

            const data =
                snap.data();

            if (
                data[from] <
                amount
            )
                return;

            await updateDoc(ref, {
                [from]:
                    data[from] -
                    amount,

                [to]:
                    data[to] +
                    amount,
            });
        };

    return {
        balances,
        addMoney,
        transferMoney,

    };
}