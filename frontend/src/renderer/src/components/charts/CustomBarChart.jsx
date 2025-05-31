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
// import { useMemo, useState } from 'react'

// const getFilteredData = (data, filter) => {
//     const now = new Date()

//     return data.filter((item) => {
//         const itemDate = new Date(item.date)

//         switch (filter) {
//             case 'weekly': {
//                 const oneWeekAgo = new Date(now)
//                 oneWeekAgo.setDate(now.getDate() - 7)
//                 return itemDate >= oneWeekAgo
//             }
//             case 'monthly': {
//                 const oneMonthAgo = new Date(now)
//                 oneMonthAgo.setMonth(now.getMonth() - 1)
//                 return itemDate >= oneMonthAgo
//             }
//             case 'quarterly': {
//                 const threeMonthsAgo = new Date(now)
//                 threeMonthsAgo.setMonth(now.getMonth() - 3)
//                 return itemDate >= threeMonthsAgo
//             }
//             case 'yearly': {
//                 const oneYearAgo = new Date(now)
//                 oneYearAgo.setFullYear(now.getFullYear() - 1)
//                 return itemDate >= oneYearAgo
//             }
//             default:
//                 return true
//         }
//     })
// }

function CustomBarChart({ data, hasFilter = false }) {
    // const [filter, setFilter] = useState('monthly')

    // const filteredData = useMemo(() => getFilteredData(data, filter), [data, filter])
    return (
        <div className="w-100">
            {/* {hasFilter && (
                <div className="mb-2 d-flex justify-content-center">
                    <label htmlFor="chartFilter" className="form-label me-2 mb-0 align-self-center">
                        Filter:
                    </label>
                    <select
                        id="chartFilter"
                        className="form-select w-auto"
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
            )} */}
            <ResponsiveContainer width={'100%'} height={350}>
                {/* <BarChart data={filteredData}> */}
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
                        activeBar={<Rectangle stroke="#000000" />}
                    />
                    <Bar
                        dataKey="current_resolution_time"
                        name="Current Resolution Time"
                        fill={COLORS[0]}
                        barSize={30}
                        radius={[10, 10, 0, 0]}
                        activeBar={<Rectangle stroke="#000000" />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
