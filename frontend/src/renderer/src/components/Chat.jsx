import { useState } from 'react'

function Chat() {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        console.log('Hello')
    }

    return (
        <>
            <button
                className="btn btn-primary position-fixed bottom-0 end-0 me-4 mb-4 rounded-circle p-2 shadow border-2 border-light z-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#chatBox"
            >
                <i className="bi bi-chat-fill mx-1 fs-4"></i>
                <span className="position-absolute badge top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    <span className="">99+</span>
                </span>
            </button>

            <div
                className="z-1 collapse position-fixed bottom-0 end-0 me-5 mb-5 shadow-lg"
                id="chatBox"
                style={{ width: '300px' }}
            >
                <div className="card">
                    <div className="card-header bg-primary text-white d-flex align-items-center">
                        <span>IT DEPARTMENT</span>
                        <i
                            className="bi bi-circle-fill ms-2 text-success"
                            style={{ fontSize: '0.5rem' }}
                        ></i>
                        <button
                            type="button"
                            className="btn-close btn-close-white ms-auto"
                            data-bs-toggle="collapse"
                            data-bs-target="#chatBox"
                        ></button>
                    </div>
                    <div
                        className="card-body text-center"
                        style={{ height: '250px', overflowY: 'auto' }}
                    >
                        <div className="text-muted">
                            IT-Minio
                            <span className="opacity-50 text-light bg-success rounded-pill px-2 ms-1 small">
                                online
                            </span>
                        </div>
                        <div className="text-muted">
                            IT-Justine
                            <span className="opacity-50 text-light bg-success rounded-pill px-2 ms-1 small">
                                online
                            </span>
                        </div>
                        <div className="text-muted">
                            IT-Gilbert
                            <span className="opacity-50 text-light bg-success rounded-pill px-2 ms-1 small">
                                online
                            </span>
                        </div>
                    </div>
                    <div className="card-footer py-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={sendMessage}
                                disabled={!message.trim()}
                            >
                                <i className="bi-send-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Chat
