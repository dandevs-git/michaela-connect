function ViewWifiDetailsModal({ id, wifi }) {
    return (
        <div className="modal fade" id={id} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Wifi</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>

                    <div className="modal-body p-4">
                        {wifi ? (
                            <div className="text-center">
                                <div className="text-start p-3">
                                    <p>
                                        <strong className="me-2">User:</strong>{' '}
                                        <span className="text-uppercase">
                                            {wifi?.user?.name || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Department:</strong>{' '}
                                        <span className="text-uppercase">
                                            {wifi?.user?.department?.name || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Device Type:</strong>
                                        <span className="text-uppercase">
                                            {wifi.device || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">IP Address:</strong>
                                        <span className="text-uppercase">
                                            {wifi.ip_address || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">SSID:</strong>
                                        <span className="text-uppercase">{wifi.ssid || 'N/A'}</span>
                                    </p>
                                    <p>
                                        <strong className="me-2">Gateway:</strong>
                                        <span className="text-uppercase">
                                            {wifi.gateway || 'N/A'}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">MAC Address:</strong>
                                        <span className="text-uppercase">
                                            {wifi.mac_address || 'N/A'}
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

export default ViewWifiDetailsModal
