function ViewAccountDetailsModal({ id, account }) {
    return (
        <div className="modal fade" id={id} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Account</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>

                    <div className="modal-body p-4">
                        {account ? (
                            <div className="text-start p-3">
                                <p>
                                    <strong className="me-2">Type:</strong>
                                    <span className="text-uppercase">{account.type || 'N/A'}</span>
                                </p>
                                <p>
                                    <strong className="me-2">Link:</strong>
                                    <a
                                        href={account.link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {account.link || 'N/A'}
                                    </a>
                                </p>
                                <p>
                                    <strong className="me-2">Username:</strong>
                                    <span className="text-lowercase">
                                        {account.username || 'N/A'}
                                    </span>
                                </p>
                                <p>
                                    <strong className="me-2">Password:</strong>
                                    <span>{account.password || 'N/A'}</span>
                                </p>
                                <p>
                                    <strong className="me-2">Users:</strong>
                                    {account.users?.length
                                        ? account.users.map((user) => (
                                              <div key={user.id}>{user.name}</div>
                                          ))
                                        : 'N/A'}
                                </p>
                                <p>
                                    <strong className="me-2">Department:</strong>
                                    {account.users?.length
                                        ? account.users.map((user) => (
                                              <div key={user.id}>{user.department.name}</div>
                                          ))
                                        : 'N/A'}
                                </p>
                                <p>
                                    <strong className="me-2">Purpose:</strong>
                                    <span>{account.purpose || 'N/A'}</span>
                                </p>
                                <p>
                                    <strong className="me-2">Recovery Email:</strong>
                                    <span className="text-lowercase">
                                        {account.recovery_email || 'N/A'}
                                    </span>
                                </p>
                                <p>
                                    <strong className="me-2">Recovery Number:</strong>
                                    <span>{account.recovery_number || 'N/A'}</span>
                                </p>
                                <p>
                                    <strong className="me-2">Verification:</strong>
                                    <span>{account.verification || 'N/A'}</span>
                                </p>
                                <p>
                                    <strong className="me-2">Description:</strong>
                                    <span>{account.description || 'N/A'}</span>
                                </p>
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

export default ViewAccountDetailsModal
