import { FaEllipsisV, FaEye, FaCheck, FaTimes, FaEdit } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import StatusBadge from './badge/StatusBadge'
import CustomTable from './tables/CustomTable'
import { useLocation } from 'react-router-dom'
import { useAPI } from '../contexts/APIContext'

function TicketsTable({ endpoint, title }) {
    return (
        <div className="card shadow w-100">
            <div className="card-header bg-primary text-light text-uppercase fs-4 fw-semibold text-center">
                {title}
            </div>
            <div className="card-body">
                <div className="col-12 p-4">
                    <CustomTable isloading={loading} columns={columns} data={tickets} />
                </div>
            </div>
        </div>
    )
}

export default TicketsTable
