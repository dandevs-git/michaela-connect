import { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { FaEdit, FaEye, FaNetworkWired, FaPlus, FaTrash } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import ViewPrinterDetailsModal from '../../components/modals/ViewPrinterDetailsModal'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import EditPrinterModal from '../../components/modals/EditPrinterModal'
import AddPrinterModal from '../../components/modals/AddPrinterModal'

function PrinterDirectory() {
    const { getData, deleteData } = useAPI()
    const [printers, setPrinters] = useState([])
    const [selectedprinter, setSelectedprinter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const refreshList = () => {
        getData('/printers', setPrinters, setLoading, setError)
    }

    useEffect(() => {
        refreshList()
    }, [])

    const handleDeletePrinter = async () => {
        const response = await deleteData(`/printers/${selectedprinter.id}`, setLoading, setError)
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
                                data-bs-target="#printerDetailsModal"
                                onClick={() => setSelectedprinter(row.original)}
                            >
                                <FaEye /> View
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#editPrinterModal"
                                onClick={() => setSelectedprinter(row.original)}
                            >
                                <FaEdit /> Edit
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#deletePrinterConfirmModal"
                                onClick={() => setSelectedprinter(row.original)}
                            >
                                <FaTrash /> Delete
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
                            topComponent={
                                <AddPrinterModal id={'AddPrinterModal'} refreshList={refreshList} />
                            }
                            isloading={loading}
                            columns={columns}
                            data={printers}
                        />
                    </div>
                </div>
            </div>

            <ViewPrinterDetailsModal id="printerDetailsModal" printer={selectedprinter} />

            <EditPrinterModal
                id="editPrinterModal"
                printer={selectedprinter}
                refreshList={refreshList}
            />

            <ConfirmationModal
                id="deletePrinterConfirmModal"
                title="Delete Printer"
                message={`Are you sure you want to delete printer from employee ${selectedprinter?.user?.name}?`}
                confirmLabel="Delete"
                confirmClass="btn-danger text-light"
                cancelLabel="Cancel"
                onConfirm={() => handleDeletePrinter(selectedprinter)}
            />
        </>
    )
}

export default PrinterDirectory
