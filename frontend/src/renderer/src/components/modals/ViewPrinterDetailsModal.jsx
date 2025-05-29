function ViewPrinterDetailsModal({ id, printer }) {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Printer</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>

                    <div className="modal-body p-4">
                        {printer ? (
                            <div className="text-start p-3">
                                <p>
                                    <strong className="me-2">Name:</strong>
                                    <span className="text-uppercase">{printer.name || 'N/A'}</span>
                                </p>
                                <p>
                                    <strong className="me-2">User:</strong>
                                    <span className="text-uppercase">
                                        {printer?.user?.name || 'N/A'}
                                    </span>
                                </p>
                                <p>
                                    <strong className="me-2">Inkcode:</strong>
                                    <span className="text-uppercase">
                                        {printer.inkcode || 'N/A'}
                                    </span>
                                </p>
                            </div>
                        ) : (
                            <p className="text-muted text-center">No data available.</p>
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

export default ViewPrinterDetailsModal
