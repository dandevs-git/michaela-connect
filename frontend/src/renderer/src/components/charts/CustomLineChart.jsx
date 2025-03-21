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
                <Line
                    type="monotone"
                    dataKey="Created"
                    stroke={COLORS[0]}
                    strokeWidth={2}
                    dot={{ r: 5, fill: COLORS[0] }}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="Resolved"
                    stroke={COLORS[1]}
                    strokeWidth={2}
                    dot={{ r: 5, fill: COLORS[1] }}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="Failed"
                    stroke={COLORS[3]}
                    strokeWidth={2}
                    dot={{ r: 5, fill: COLORS[3] }}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default CustomLineChart
