import React from 'react'

function Placeholder({ height = '300px', width = '100%' }) {
    const style = {
        height: height,
        width: width
    }
    return (
        <div className="placeholder-glow w-100">
            <div className="placeholder col-12 border" style={style}></div>
        </div>
    )
}

export default Placeholder
