import { useState } from 'react'

function Chat() {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        // console.log('Hello')
    }

    return (
        <>
            <button
                className="btn btn-primary border-2 border-light p-2 position-fixed rounded-circle shadow bottom-0 end-0 mb-4 me-4 z-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#chatBox"
            >
                <i className="bi bi-chat-fill fs-4 mx-1"></i>
                <span className="badge bg-danger border border-light p-2 position-absolute rounded-circle start-100 top-0 translate-middle">
                    <span className="">99+</span>
                </span>
            </button>

            <div
                className="collapse position-fixed shadow-lg bottom-0 end-0 mb-5 me-5 z-1"
                id="chatBox"
                style={{ width: '300px' }}
            >
                <div className="card rounded-4">
                    <div className="d-flex card-header align-items-center bg-primary text-white py-2">
                        <span className="fs-5">IT DEPARTMENT</span>
                        <i
                            className="text-success bi bi-circle-fill ms-2"
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
                        style={{ height: '300px', overflowY: 'auto' }}
                    >
                        <div className="text-muted">
                            IT-Minio
                            <span className="bg-success rounded-pill text-light ms-1 opacity-50 px-2 small">
                                online
                            </span>
                        </div>
                        <div className="text-muted">
                            IT-Justine
                            <span className="bg-success rounded-pill text-light ms-1 opacity-50 px-2 small">
                                online
                            </span>
                        </div>
                        <div className="text-muted">
                            IT-Gilbert
                            <span className="bg-success rounded-pill text-light ms-1 opacity-50 px-2 small">
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
                                <div className="p-0 rotate-45">
                                    <i className="bi-send-fill"></i>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Chat
