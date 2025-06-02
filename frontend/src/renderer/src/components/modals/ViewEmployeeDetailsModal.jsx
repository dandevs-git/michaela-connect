function ViewEmployeeDetailsModal({ id, employee }) {
    return (
        <div className="modal fade" id={id} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Employee</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>

                    <div className="modal-body p-4">
                        {employee ? (
                            <div className="text-center">
                                {employee?.profile_picture ? (
                                    <img
                                        src={employee.profile_picture}
                                        alt="Profile"
                                        className="rounded-circle mb-3"
                                        width="100"
                                        height="100"
                                    />
                                ) : (
                                    <div
                                        className="bg-secondary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{ width: '100px', height: '100px' }}
                                    >
                                        <span className="fs-4">{employee.name?.[0]}</span>
                                    </div>
                                )}

                                <div className="text-start p-3">
                                    <p>
                                        <strong className="me-2">Name:</strong>{' '}
                                        <span className="text-uppercase">
                                            {employee.name || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Department:</strong>
                                        <span className="text-uppercase">
                                            {employee.department?.name || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Role:</strong>
                                        <span className="text-uppercase">
                                            {employee.roles?.[0]?.name || 'N/A'}
                                        </span>
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{' '}
                                        <span
                                            className={`text-uppercase text-nowrap text-light fw-semibold rounded-pill px-3 text-center ${
                                                employee?.status === 'active'
                                                    ? 'bg-success'
                                                    : employee?.status === 'locked'
                                                      ? 'bg-danger'
                                                      : 'bg-secondary'
                                            }`}
                                        >
                                            {employee?.status || 'Unknown'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted">No data available.</p>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEmployeeDetailsModal
