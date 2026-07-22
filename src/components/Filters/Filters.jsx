import "./Filters.css";

export default function Filters({
                                    search,
                                    setSearch,
                                    period,
                                    setPeriod,
                                }) {
    return (
        <div className="filters">
            <input
                placeholder="Search"
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
            />

            <select
                value={period}
                onChange={(e) =>
                    setPeriod(
                        e.target.value
                    )
                }
            >
                <option value="all">
                    All
                </option>

                <option value="day">
                    Day
                </option>

                <option value="week">
                    Week
                </option>

                <option value="month">
                    Month
                </option>
            </select>
        </div>
    );
}