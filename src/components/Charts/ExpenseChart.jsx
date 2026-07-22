import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#8b5cf6",
    "#06b6d4",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
];

export default function ExpenseChart({
                                         expenses,
                                     }) {
    const categories = {};

    expenses.forEach((expense) => {
        categories[expense.category] =
            (categories[expense.category] || 0) +
            expense.amount;
    });

    const data = Object.entries(
        categories
    ).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <div className="chart-card">
            <h2>Expenses Chart</h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={3}
                        label={({percent})=>`${(percent*100).toFixed(0)}%`}
                    >
                        {data.map(
                            (_, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                        index %
                                        COLORS.length
                                            ]
                                    }
                                />
                            )
                        )}
                    </Pie>

                    <Tooltip
                        formatter={(value)=>`€${value}`}
                    />

                    <Legend
                        verticalAlign="bottom"
                        height={50}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}