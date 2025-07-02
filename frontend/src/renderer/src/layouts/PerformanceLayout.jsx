import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import TeamOverview from '../pages/dashboard/TeamOverview'
import TeamActivities from '../pages/dashboard/TeamActivities'
import TeamReports from '../pages/dashboard/TeamReports'

function PerformanceLayout() {
    const { section } = useParams()

    useEffect(() => {
        if (section) {
            const element = document.getElementById(section)
            if (element) {
                const yOffset = -100
                const yPosition = element.getBoundingClientRect().top + window.scrollY + yOffset
                window.scrollTo({ top: yPosition, behavior: 'smooth' })
            }
        }
    }, [section])

    return (
        <>
            <div
                className="card bg-light-subtle shadow text-center w-100 mb-5 rounded-4"
                id="overview"
            >
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4">
                    Team Overview
                </div>
                <div className="row card-body">
                    <TeamOverview />
                </div>
            </div>
            <div
                className="card bg-light-subtle shadow text-center w-100 mb-5 rounded-4"
                id="activities"
            >
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4">
                    Team Activities
                </div>
                <div className="row card-body">
                    <TeamActivities />
                </div>
            </div>
            <div
                className="card bg-light-subtle shadow text-center w-100 mb-5 rounded-4"
                id="reports"
            >
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4">
                    Team Performance Reports
                </div>
                <div className="row card-body">
                    <TeamReports />
                </div>
            </div>
        </>
    )
}

export default PerformanceLayout
