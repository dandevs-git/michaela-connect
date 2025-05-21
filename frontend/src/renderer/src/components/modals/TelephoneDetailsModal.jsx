function TelephoneDetailsModal({ id, telephone }) {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View telephone</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>

                    <div className="modal-body p-4">
                        {telephone ? (
                            <div className="text-center">
                                <div className="text-start p-3">
                                    <p>
                                        <strong className="me-2">Number:</strong>{' '}
                                        <span className="text-uppercase">
                                            {telephone.number || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">User:</strong>{' '}
                                        <span className="text-uppercase">
                                            {telephone.user || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Cable Code:</strong>
                                        <span className="text-uppercase">
                                            {telephone.cable_code || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Location:</strong>
                                        <span className="text-uppercase">
                                            {telephone.location || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Description:</strong>
                                        <span className="text-uppercase">
                                            {telephone.description || 'N/A'}
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

export default TelephoneDetailsModal
