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
import { useState, useMemo } from 'react'
import { COLORS } from '../../constants/config'

const getFilteredData = (data, filter) => {
    const now = new Date()

    return data.filter((item) => {
        const itemDate = new Date(item.date)

        switch (filter) {
            case 'weekly': {
                const oneWeekAgo = new Date(now)
                oneWeekAgo.setDate(now.getDate() - 7)
                return itemDate >= oneWeekAgo
            }
            case 'monthly': {
                const oneMonthAgo = new Date(now)
                oneMonthAgo.setMonth(now.getMonth() - 1)
                return itemDate >= oneMonthAgo
            }
            case 'quarterly': {
                const threeMonthsAgo = new Date(now)
                threeMonthsAgo.setMonth(now.getMonth() - 3)
                return itemDate >= threeMonthsAgo
            }
            case 'yearly': {
                const oneYearAgo = new Date(now)
                oneYearAgo.setFullYear(now.getFullYear() - 1)
                return itemDate >= oneYearAgo
            }
            default:
                return true
        }
    })
}

function CustomLineChart({ data, hasFilter = false }) {
    const [filter, setFilter] = useState('monthly')

    const filteredData = useMemo(() => getFilteredData(data, filter), [data, filter])

    const lineKeys =
        filteredData.length > 0
            ? Object.keys(filteredData[0]).filter((key) => key !== 'name' && key !== 'date')
            : []

    return (
        <div className="w-100">
            {hasFilter && (
                <div className="mb-2 d-flex justify-content-center">
                    <label htmlFor="chartFilter" className="form-label me-2 mb-0 align-self-center">
                        Filter:
                    </label>
                    <select
                        id="chartFilter"
                        className="form-select form-select-sm w-auto"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="weekly">Last 7 Days</option>
                        <option value="monthly">Last 30 Days</option>
                        <option value="quarterly">Last 90 Days</option>
                        <option value="yearly">Last Year</option>
                        <option value="all">All</option>
                    </select>
                </div>
            )}

            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={filteredData}>
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
        </div>
    )
}

export default CustomLineChart
