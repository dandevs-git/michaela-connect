import React from 'react'
import { useAPI } from '../../contexts/APIContext'

function PermissionButton({ permission, onClick, children, className = '', ...rest }) {
    const { authUser } = useAPI()
    if (!authUser?.all_permissions?.includes(permission)) return null

    return (
        <button onClick={onClick} className={className} {...rest}>
            {children}
        </button>
    )
}

export default PermissionButton
