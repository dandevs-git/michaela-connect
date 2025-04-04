import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import { COLORS } from '../../constants/config'

function CustomLineChart({ data }) {
    const lineKeys = data?.length > 0 ? Object.keys(data[0]).filter((key) => key !== 'month') : []

    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip
                    contentStyle={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        color: '#333'
                    }}
                />
                <Legend />
                {lineKeys.map((key, index) => (
                    <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                        dot={{ r: 5, fill: COLORS[index % COLORS.length] }}
                        activeDot={{ r: 8 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    )
}

export default CustomLineChart
