import { useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import { COLORS } from '../../constants/config'

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
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
    const [activeIndex, setActiveIndex] = useState(null)

    return (
        <ResponsiveContainer width="100%" height={450}>
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
                    outerRadius={180}
                    innerRadius={60}
                    label={renderCustomizedLabel}
                    dataKey="value"
                    stroke="white"
                    strokeWidth={2}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                >
                    {data.map((entry, index) => {
                        const isHovered = index === activeIndex
                        const fill = isHovered ? '#00000090' : COLORS[index % COLORS.length]
                        return (
                            <Cell
                                key={`cell-${index}`}
                                fill={fill}
                                style={{ transition: 'fill 0.3s ease-in-out' }}
                            />
                        )
                    })}
                </Pie>
                <Tooltip
                    contentStyle={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        borderRadius: '10px'
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart
