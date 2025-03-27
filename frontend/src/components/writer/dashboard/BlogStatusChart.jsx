import { capitalizeWords } from "@/utils/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const BlogStatusChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-xl font-bold text-center underline">No data available</p>;
    }

    return (
        <ResponsiveContainer width={"100%"} height={400}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                <defs>
                    <linearGradient id="colorStatus" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid stroke="#ccc" />
                <XAxis interval={0} dataKey="category" tick={{ width: 60, dy: 10, fill: "white" }} tickFormatter={name => name.charAt(0).toUpperCase() + name.slice(1)} />
                <YAxis tick={{ fill: "white" }} />
                <Tooltip formatter={(value, _, props) => [`${value}`, capitalizeWords(props.payload.category)]} />
                <Area type="monotone" dataKey="value" stroke="#82ca9d" fillOpacity={1} fill="url(#colorStatus)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default BlogStatusChart;
