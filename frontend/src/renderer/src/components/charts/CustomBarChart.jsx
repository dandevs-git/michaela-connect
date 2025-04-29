import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Rectangle,
    ResponsiveContainer
} from 'recharts'
import { COLORS } from '../../constants/config'
import { formatMinutesVerbose } from '../../utils/formatMinutesVerbose'

function CustomBarChart({ data }) {
    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: '12px' }} />
                <YAxis />
                <Tooltip
                    contentStyle={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        color: '#333'
                    }}
                    labelFormatter={(label) => label}
                    formatter={(value, name) => [
                        formatMinutesVerbose(value),
                        name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                    ]}
                />
                <Legend
                    formatter={(value) =>
                        value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                    }
                />

                <Bar
                    dataKey="previous_resolution_time"
                    name="Previous Resolution Time"
                    fill={COLORS[2]}
                    barSize={30}
                    radius={[10, 10, 0, 0]}
                    activeBar={<Rectangle fill={COLORS[3]} stroke="#000000" />}
                />
                <Bar
                    dataKey="current_resolution_time"
                    name="Current Resolution Time"
                    fill={COLORS[0]}
                    barSize={30}
                    radius={[10, 10, 0, 0]}
                    activeBar={<Rectangle fill={COLORS[1]} stroke="#000000" />}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default CustomBarChart
