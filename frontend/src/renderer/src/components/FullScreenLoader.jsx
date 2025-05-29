function FullScreenLoader({
    title = 'Loading',
    message = 'Please wait...',
    spinnerColor = 'light'
}) {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
            style={{ zIndex: 2000 }}
        >
            <div className="text-center text-white">
                <div className={`spinner-border text-${spinnerColor} mb-4`} role="status">
                    <span className="visually-hidden">{title}...</span>
                </div>
                <h4 className="fw-semibold">{title}</h4>
                <p className="text-white-50 mb-0">{message}</p>
            </div>
        </div>
    )
}

export default FullScreenLoader
