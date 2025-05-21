import React from 'react'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend
} from 'recharts'

const CustomRadarChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <RadarChart cx="50%" cy="50%" outerRadius="90%" data={data}>
                <PolarGrid />
                <PolarAngleAxis
                    tick={{ fontSize: 12, wordBreak: 'break-word' }}
                    dataKey="priority"
                />
                <PolarRadiusAxis />
                <Radar
                    name="Volume"
                    dataKey="value"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.8}
                />
            </RadarChart>
        </ResponsiveContainer>
    )
}

export default CustomRadarChart
