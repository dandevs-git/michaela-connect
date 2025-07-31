import React, { useEffect, useState } from 'react'
import { useAPI } from '../../contexts/APIContext'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import AddWifiModal from '../../components/modals/AddWifiModal'
import ViewWifiDetailsModal from '../../components/modals/ViewWifiDetailsModal'
import EditWifiModal from '../../components/modals/EditWifiModal'
import ConfirmationModal from '../../components/modals/ConfirmationModal'

function Wifi() {
    const { getData, deleteData } = useAPI()
    const [wifi, setWifi] = useState([])
    const [selectedWifi, setSelectedWifi] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const refreshList = () => {
        getData('/wifi', setWifi, setLoading, setError)
    }

    useEffect(() => {
        refreshList()
    }, [])

    const handleDeleteWifi = async () => {
        const response = await deleteData(`/wifi/${selectedWifi.id}`, setLoading, setError)
        if (response) {
            refreshList()
        }
    }

    const columns = [
        {
            header: 'User',
            accessorFn: (row) => row.user?.name || '',
            id: 'userName',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.user?.name || 'N/A'
        },
        {
            header: 'Department',
            accessorFn: (row) => row.user?.department?.name || '',
            id: 'userDepartment',
            filterFn: 'includesString',
            cell: ({ row }) => row.original.user?.department?.name || 'N/A'
        },
        {
            header: 'Device',
            accessorKey: 'device',
            cell: ({ row }) => row.original.device || 'N/A'
        },
        {
            header: 'IP Address',
            accessorKey: 'ip_address',
            cell: ({ row }) => row.original.ip_address || 'N/A'
        },
        { header: 'SSID', accessorKey: 'ssid', cell: ({ row }) => row.original.ssid || 'N/A' },
        {
            header: 'Gateway',
            accessorKey: 'gateway',
            cell: ({ row }) => row.original.gateway || 'N/A'
        },
        {
            header: 'MAC Address',
            accessorKey: 'mac_address',
            cell: ({ row }) => row.original.mac_address || 'N/A'
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="dropdown">
                    <button
                        className="action-btn btn border-0"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        aria-label="More actions"
                        title="More actions"
                    >
                        <i className="bi bi-list fs-5"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-sm rounded-3">
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#wifiDetailsModal"
                                onClick={() => setSelectedWifi(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#editWifiModal"
                                onClick={() => setSelectedWifi(row.original)}
                            >
                                <FaEdit /> Edit
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteWifiConfirmModal"
                                onClick={() => setSelectedWifi(row.original)}
                            >
                                <FaTrash /> Delete
                            </button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    return (
        <>
            <div className="card shadow w-100 rounded-4 ">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4 text-center">
                    Wifi Clients
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddWifiModal id={'AddWifiModal'} refreshList={refreshList} />
                            }
                            isloading={loading}
                            columns={columns}
                            data={wifi}
                        />
                    </div>
                </div>
            </div>

            <ViewWifiDetailsModal id="wifiDetailsModal" wifi={selectedWifi} />

            <EditWifiModal id="editWifiModal" wifi={selectedWifi} refreshList={refreshList} />

            <ConfirmationModal
                id="deleteWifiConfirmModal"
                title="Delete Wifi"
                message={`Are you sure you want to Delete Wifi Client ${selectedWifi?.user?.name}?`}
                confirmLabel="Delete"
                confirmClass="btn-danger text-light"
                cancelLabel="Cancel"
                onConfirm={() => handleDeleteWifi(selectedWifi)}
            />
        </>
    )
}

export default Wifi
