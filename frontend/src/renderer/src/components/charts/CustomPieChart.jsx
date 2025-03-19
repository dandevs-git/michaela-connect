import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import { COLORS } from '../../constants/config'

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            className="fw-bold"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={20}
            fill="#333333"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

function CustomPieChart({ data }) {
    return (
        <ResponsiveContainer width={'100%'} height={450}>
            <PieChart>
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                />
                <Pie
                    data={data}
                    cx="50%"
                    cy="45%"
                    label={renderCustomizedLabel}
                    outerRadius={180}
                    innerRadius={60}
                    dataKey="value"
                    stroke="white"
                    strokeWidth={2}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            style={{ transition: 'fill 0.3s ease-in-out' }}
                            onMouseOver={(e) => (e.target.style.fill = '#00000090')}
                            onMouseOut={(e) =>
                                (e.target.style.fill = COLORS[index % COLORS.length])
                            }
                        />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{ fontSize: '14px', fontWeight: 'bold', borderRadius: '10px' }}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart
