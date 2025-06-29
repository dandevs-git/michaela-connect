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

function CustomBarChart({
    data = [],
    bars = [],
    xAxisKey = 'name',
    tooltipFormatter,
    legendFormatter,
    yAxisProps = {},
    barSize = 30,
    height = 350
}) {
    return (
        <div className="w-100">
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} tick={{ fontSize: '12px' }} />
                    <YAxis {...yAxisProps} />
                    <Tooltip
                        contentStyle={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            borderRadius: '10px',
                            color: '#333'
                        }}
                        formatter={tooltipFormatter}
                    />
                    <Legend formatter={legendFormatter} />

                    {bars.map((bar, i) => (
                        <Bar
                            key={i}
                            dataKey={bar.dataKey}
                            name={bar.name}
                            fill={bar.fill}
                            barSize={barSize}
                            radius={[10, 10, 0, 0]}
                            activeBar={<Rectangle stroke="#000" />}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
