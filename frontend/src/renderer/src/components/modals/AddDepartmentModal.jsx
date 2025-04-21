import { FaPlus } from 'react-icons/fa'

function AddDepartmentModal() {
    return (
        <>
            <button
                className="btn btn-primary text-nowrap border me-4"
                data-bs-toggle="modal"
                data-bs-target="#AddTicketModal"
            >
                <FaPlus /> Add Department
            </button>
            <div
                className="modal fade"
                id="AddTicketModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalTitleId"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">
                                Notification!
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <h1 className="text-center fw-bold text-uppercase">Hello Kupal</h1>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddDepartmentModal
