function ViewTicketDetails({ id, data }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'warning'
            case 'new':
                return 'info'
            case 'open':
                return 'primary'
            case 'rejected':
                return 'danger'
            case 'in_progress':
                return 'success'
            case 'resolved':
                return 'success'
            case 'failed':
                return 'danger'
            case 'closed':
                return 'secondary'
            case 'reopened':
                return 'info'
            default:
                return 'dark'
        }
    }

    return (
        <>
            <div
                className="modal fade"
                id={id}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="ticketDetailsLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-light">
                            <h5 className="modal-title">
                                <span className="small">Ticket# </span>
                                <span className="fw-bold">{data?.ticket_number}</span>
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body p-4">
                            <div className="mb-3">
                                <h5 className="fw-bold">{data?.title}</h5>
                                <p className="text-muted">{data?.description}</p>
                            </div>

                            <div className="row g-2">
                                <div className="col-md-6">
                                    <div className="card shadow-sm p-3">
                                        <h6 className="fw-bold">Status:</h6>
                                        <span className="bg-warning rounded-pill text-light text-center fw-semibold">
                                            {data?.status.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card shadow-sm p-3">
                                        <h6 className="fw-bold">Priority:</h6>
                                        <span className="bg-danger rounded-pill text-light text-center fw-semibold">
                                            {data?.priority.name.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2 mt-2">
                                <div className="col-md-6">
                                    <div className="card shadow-sm p-3 h-100">
                                        <h5 className="fw-bold">Requester:</h5>
                                        <div>
                                            <span className="me-2">Name:</span>
                                            <span className="text-primary fw-bold">
                                                {data?.requester?.name}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="me-2">Department:</span>
                                            <span className="text-primary fw-bold">
                                                {data?.requester?.department?.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card shadow-sm p-3 h-100">
                                        <h5 className="fw-bold">Assign To:</h5>
                                        {data?.assigned_to ? (
                                            <div>
                                                <div>
                                                    <span className="me-2">Name:</span>
                                                    <span className="text-primary fw-bold">
                                                        {data?.assignedTo}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="me-2">Department:</span>
                                                    <span className="text-primary fw-bold">
                                                        {data?.requester?.department?.name}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-danger">Not Assigned</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2 mt-2">
                                <div className="col-md-6">
                                    <div className="card shadow-sm p-3">
                                        <h6 className="fw-bold">Response Deadline:</h6>
                                        <span className="text-muted">
                                            {data?.response_deadline || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card shadow-sm p-3">
                                        <h6 className="fw-bold">Resolution Deadline:</h6>
                                        <span className="text-muted">
                                            {data?.resolution_deadline || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="card shadow-sm p-3 text-center">
                                    <h6 className="fw-bold">SLA Compliance:</h6>
                                    {data?.sla_breached ? (
                                        <span className="py-1 rounded-pill text-light bg-danger">
                                            SLA Breached
                                        </span>
                                    ) : (
                                        <span className="py-1 rounded-pill text-light bg-success">
                                            SLA Met
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            {data?.assigned_to && data?.status !== 'resolved' && (
                                <button className="btn btn-success">
                                    <FaPlay /> Start Task
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewTicketDetails
