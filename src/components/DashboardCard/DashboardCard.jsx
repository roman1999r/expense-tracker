import "./DashboardCard.css";

export default function DashboardCard({
                                          title,
                                          value,
                                      }) {
    return (
        <div className="dashboard-card">
            <span>{title}</span>

            <h2>{value}</h2>
        </div>
    );
}