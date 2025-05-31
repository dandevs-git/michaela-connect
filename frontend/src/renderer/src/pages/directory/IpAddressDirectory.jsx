import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import AddIpAddressModal from '../../components/modals/AddIpAddressModal'
import ViewIpAddressDetailsModal from '../../components/modals/ViewIpAddressDetailsModal'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import EditIpAddressModal from '../../components/modals/EditIpAddressModal'

function IpAddressDirectory() {
    const { getData, deleteData } = useAPI()
    const [ipAddress, setIpaddress] = useState([])
    const [selectedIpaddress, setSelectedIpaddress] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const refreshList = () => {
        getData('/ipAddress', setIpaddress, setLoading, setError)
    }

    useEffect(() => {
        refreshList()
    }, [])

    const handleDeleteIpaddress = async () => {
        const response = await deleteData(
            `/ipAddress/${selectedIpaddress.id}`,
            setLoading,
            setError
        )
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
        { header: 'IP Address', accessorKey: 'ip' },
        { header: 'Device Type', accessorKey: 'type' },
        // { header: 'Assigned Date', accessorKey: 'assigned_date' },
        // { header: 'Location', accessorKey: 'location' },
        // { header: 'Description', accessorKey: 'description' },
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
                                data-bs-target="#ipAddressDetailsModal"
                                onClick={() => setSelectedIpaddress(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#editIpaddressModal"
                                onClick={() => setSelectedIpaddress(row.original)}
                            >
                                <FaEdit /> Edit
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteIpaddressConfirmModal"
                                onClick={() => setSelectedIpaddress(row.original)}
                            >
                                <FaTrash /> Delete
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                onClick={() => {
                                    const ip = row.original?.ip
                                    if (ip) {
                                        window.api.send('open-network-path', ip)
                                    }
                                }}
                            >
                                Open \\{row.original?.ip}
                            </button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    return (
        <>
            <div className="card shadow w-100">
                <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold text-center">
                    Ip Address Directory
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            topComponent={
                                <AddIpAddressModal
                                    id={'AddIpAddressModal'}
                                    refreshList={refreshList}
                                />
                            }
                            isloading={loading}
                            columns={columns}
                            data={ipAddress}
                        />
                    </div>
                </div>
            </div>

            <ViewIpAddressDetailsModal id="ipAddressDetailsModal" ipAddress={selectedIpaddress} />

            <EditIpAddressModal
                id="editIpaddressModal"
                ipAddress={selectedIpaddress}
                refreshList={refreshList}
            />

            <ConfirmationModal
                id="deleteIpaddressConfirmModal"
                title="Delete Ip Address"
                message={`Are you sure you want to Delete Ip Address ${selectedIpaddress?.ip}?`}
                confirmLabel="Delete"
                confirmClass="btn-danger text-light"
                cancelLabel="Cancel"
                onConfirm={() => handleDeleteIpaddress(selectedIpaddress)}
            />
        </>
    )
}

export default IpAddressDirectory
