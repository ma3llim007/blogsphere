import { getStatusColor } from "@/utils/statusUtils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
const BlogStatusLineChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-xl font-bold text-center underline">No data available</p>;
    }

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                    <XAxis dataKey="name" tick={{ fill: "white" }} />
                    <YAxis tick={{ fill: "white" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#333", color: "white" }} />
                    <Bar dataKey="value" fill="#3b82f6">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getStatusColor(entry.name)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default BlogStatusLineChart;
