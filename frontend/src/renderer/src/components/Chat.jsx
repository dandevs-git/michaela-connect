function Chat() {
    return (
        <>
            <div className="position-fixed bottom-0 end-0 me-3 mb-3 z-1 position-relative">
                <button
                    className="btn btn-primary rounded-pill py-2 shadow-lg"
                    data-bs-toggle="collapse"
                    data-bs-target="#chatBox"
                >
                    <i className="bi bi-chat-fill fs-4"></i>
                    <span className="position-absolute badge rounded-pill top-25 start-75 translate-middle p-2 bg-danger border border-light rounded-circle">
                        99+
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </button>
            </div>

            <div className="position-fixed bottom-0 end-0 me-5 mb-5 z-0">
                <div className="collapse" id="chatBox">
                    <div
                        className="card shadow-lg border rounded-3 bg-light"
                        style={{ height: '400px', width: '300px' }}
                    >
                        <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                            <h6 className="mb-0">IT Department</h6>
                            <button
                                className="btn btn-sm btn-close btn-light"
                                data-bs-toggle="collapse"
                                data-bs-target="#chatBox"
                            ></button>
                        </div>
                        <div className="card-body">
                            <p className="text-muted small">
                                Welcome to live chat! How can we help?
                            </p>
                        </div>
                        <div className="card-footer">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type a message..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Chat
