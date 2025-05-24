import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaNetworkWired, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'

function PrinterDirectory() {
    const { getData } = useAPI()
    const [printers, setPrinters] = useState([])
    const [selectedprinter, setSelectedprinter] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData('/printers', setPrinters, setLoading)
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
            cell: ({ row }) => row.original.user.department?.name || 'N/A'
        },
        { header: 'Printer', accessorKey: 'name' },
        {
            header: 'IP Address',
            accessorKey: 'ip',
            cell: ({ row }) => row.original?.user?.ip_address?.ip || 'N/A'
        },
        { header: 'Ink Code', accessorKey: 'inkcode' },
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
                                data-bs-target="#printerDetailsModal" // Temp
                                onClick={() => setSelectedprinter(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                onClick={() => {
                                    const ip = row.original?.user?.ip_address?.ip
                                    if (ip) {
                                        window.api.send('open-network-path', ip)
                                    }
                                }}
                            >
                                Open \\{row.original?.user?.ip_address?.ip}
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
                    Printer Directory
                </div>
                <div className="card-body">
                    <div className="col-12 p-4">
                        <CustomTable
                            //   topComponent={<AddTelephoneModal />}
                            isloading={loading}
                            columns={columns}
                            data={printers}
                        />
                    </div>
                </div>
            </div>

            {/* <TelephoneDetailsModal id="telephoneDetailsModal" telephone={selectedTelephone} /> */}
        </>
    )
}

export default PrinterDirectory
