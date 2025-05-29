import { useRef } from 'react'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min'

function SuspendDurationModal({ id, employee, onConfirm }) {
    const durationRef = useRef()

    const handleSubmit = () => {
        const days = parseInt(durationRef.current.value)
        if (!isNaN(days) && days > 0) {
            onConfirm(employee, days)
            const modal = Modal.getInstance(document.getElementById(id))
            modal.hide()
        }
    }

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-warning text-dark">
                        <h5 className="modal-title">Suspend Employee</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            How many days do you want to suspend <strong>{employee?.name}</strong>?
                        </p>
                        <input
                            type="number"
                            ref={durationRef}
                            className="form-control"
                            min={1}
                            placeholder="Enter number of days"
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button className="btn btn-warning text-dark" onClick={handleSubmit}>
                            Suspend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuspendDurationModal
