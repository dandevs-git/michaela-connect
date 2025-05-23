import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'

function IpAddressDirectory() {
    const { getData } = useAPI()
    const [ipaddress, setIpaddress] = useState([])
    const [selectedIpaddress, setSelectedIpaddress] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData('/ipaddress', setIpaddress, setLoading)
    }, [])

    const columns = [
        { header: 'No.', accessorKey: 'id' },
        {
            header: 'User',
            accessorKey: 'user',
            cell: ({ row }) => row.original.user?.name || 'N/A'
        },
        {
            header: 'Department',
            accessorKey: 'user?.department',
            cell: ({ row }) => row.original.user?.department?.name || 'N/A'
        },
        { header: 'IP Address', accessorKey: 'ip_address' },
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
                        className="btn border-0"
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
                            //   topComponent={<AddTelephoneModal />}
                            isloading={loading}
                            columns={columns}
                            data={ipaddress}
                        />
                    </div>
                </div>
            </div>

            {/* <TelephoneDetailsModal id="telephoneDetailsModal" telephone={selectedTelephone} /> */}
        </>
    )
}

export default IpAddressDirectory
