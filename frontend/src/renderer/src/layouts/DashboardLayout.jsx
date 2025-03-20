import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Overview from '../pages/dashboard/Overview'
import Activities from '../pages/dashboard/Activities'
import Reports from '../pages/dashboard/Reports'

function DashboardLayout() {
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
            <div className="card bg-light-subtle shadow text-center w-100 mb-5" id="overview">
                <div className="card-header bg-dark text-light text-uppercase fs-3 fw-semibold">
                    Overview
                </div>
                <div className="row card-body">
                    <Overview />
                </div>
            </div>
            <div className="card bg-light-subtle shadow text-center w-100 mb-5" id="activities">
                <div className="card-header bg-dark text-light text-uppercase fs-3 fw-semibold">
                    Recent Activities
                </div>
                <div className="row card-body">
                    <Activities />
                </div>
            </div>
            <div className="card bg-light-subtle shadow text-center w-100 mb-5" id="reports">
                <div className="card-header bg-dark text-light text-uppercase fs-3 fw-semibold">
                    Performance Reports
                </div>
                <div className="row card-body">
                    <Reports />
                </div>
            </div>
        </>
    )
}

export default DashboardLayout
