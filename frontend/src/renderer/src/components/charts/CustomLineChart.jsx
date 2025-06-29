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
        const rawDate = item.date || item.name

        const itemDate = new Date(rawDate)

        if (isNaN(itemDate)) return false

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

export default function CustomLineChart({
    data = [],
    xKey = 'name',
    yKeys,
    colors = COLORS,
    filterOptions = [
        { value: 'weekly', label: 'Last 7 Days' },
        { value: 'monthly', label: 'Last 30 Days' },
        { value: 'quarterly', label: 'Last 90 Days' },
        { value: 'yearly', label: 'Last Year' },
        { value: 'all', label: 'All' }
    ],
    hasFilter = false,
    grid = true,
    dots = true,
    tooltip = true,
    legend = true,
    height = 350
}) {
    const [filter, setFilter] = useState(
        filterOptions.find((opt) => opt.value === 'monthly')?.value || filterOptions[0].value
    )

    const filteredData = useMemo(() => getFilteredData(data, filter), [data, filter])

    const lines =
        yKeys && yKeys.length > 0
            ? yKeys
            : filteredData.length > 0
              ? Object.keys(filteredData[0]).filter((k) => k !== xKey && k !== 'date')
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
                        {filterOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={filteredData}>
                    {grid && <CartesianGrid strokeDasharray="3 3" />}
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    {tooltip && <Tooltip />}
                    {legend && <Legend />}
                    {lines.map((key, i) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={colors[i % colors.length]}
                            strokeWidth={2}
                            dot={dots ? { r: 5, fill: colors[i % colors.length] } : false}
                            activeDot={{ r: 8 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
