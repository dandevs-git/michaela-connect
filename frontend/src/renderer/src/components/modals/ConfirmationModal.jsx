import React from 'react'

function ConfirmationModal({
    id,
    title,
    message,
    onConfirm,
    confirmLabel = 'Confirm',
    confirmClass = 'btn-primary',
    cancelLabel = 'Cancel',
    cancelClass = 'btn-secondary'
}) {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body text-center">
                        <p className="p-4">{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className={`btn ${cancelClass}`}
                            data-bs-dismiss="modal"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            type="button"
                            className={`btn ${confirmClass}`}
                            onClick={onConfirm}
                            data-bs-dismiss="modal"
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
