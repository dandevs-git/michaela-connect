function ConfirmationModal({
    id,
    title,
    message,
    onConfirm,
    disableConfirm = false,
    confirmLabel = 'Confirm',
    confirmClass = 'btn-primary',
    cancelLabel = 'Cancel',
    cancelClass = 'btn-secondary'
}) {
    return (
        <div
            className="modal fade"
            id={id}
            tabIndex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-capitalize">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body text-center">
                        <div className="p-4">{message}</div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className={`btn text-capitalize ${cancelClass}`}
                            data-bs-dismiss="modal"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            type="button"
                            className={`btn text-capitalize ${confirmClass}`}
                            onClick={onConfirm}
                            data-bs-dismiss="modal"
                            disabled={disableConfirm}
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
