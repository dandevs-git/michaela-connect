import React from 'react'

function Placeholder({ height = '300px' }) {
    return (
        <div className="placeholder-glow w-100">
            <div className="placeholder col-12" style={{ height }}></div>
        </div>
    )
}

export default Placeholder
