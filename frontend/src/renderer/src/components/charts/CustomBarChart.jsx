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

function CustomBarChart({ data, datakey, display }) {
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
                />
                <Legend formatter={() => display} />
                <Bar
                    dataKey={datakey}
                    fill={COLORS[0]}
                    barSize={50}
                    radius={[10, 10, 0, 0]}
                    activeBar={<Rectangle fill={COLORS[1]} stroke="#000000" />}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default CustomBarChart
