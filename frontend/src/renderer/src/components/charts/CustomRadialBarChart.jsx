import { Legend, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'

function CustomRadialBarChart({ data }) {
    return (
        <div className="w-100">
            <ResponsiveContainer width={'100%'} height={350}>
                <RadialBarChart
                    innerRadius="80%"
                    outerRadius="100%"
                    data={data}
                    startAngle={180}
                    endAngle={0}
                >
                    <RadialBar background clockWise dataKey="value" />
                    <Legend verticalAlign="bottom" height={36} />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomRadialBarChart
