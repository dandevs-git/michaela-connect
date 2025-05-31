import React, { useEffect, useState } from 'react'
import StatisticsCard from '../../components/cards/StatisticsCard'
import { useAPI } from '../../contexts/APIContext'
import CustomTable from '../../components/tables/CustomTable'
import Placeholder from '../../components/placeholders/Placeholder'
import CustomPieChart from '../../components/charts/CustomPieChart'
import CustomBarChart from '../../components/charts/CustomBarChart'
import PerformanceDashboard from './performance/PerformanceDashboard'

function PerformanceTracking() {
    return (
        <>
            <div className="card bg-light-subtle shadow text-center w-100 mb-5" id="overview">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold">
                    Performance Tracking
                </div>
                <div className="row card-body">
                    <PerformanceDashboard />
                </div>
            </div>
        </>
    )
}

export default PerformanceTracking
