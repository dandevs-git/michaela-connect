import React from 'react'
import { useAPI } from '../contexts/APIContext'
// import defaultProfile from '../assets/images/default-profile.png'

function Profile() {
    const { authUser } = useAPI()

    console.log(authUser)

    return (
        <div className="card shadow w-100 rounded-4 ">
            <div className="card-header bg-primary text-light text-uppercase fs-3 fw-semibold rounded-top-4 text-center">
                Profile
            </div>
            <div className="card-body p-4">
                <div className="row g-4 align-items-center">
                    <div className="col-md-12 text-center">
                        {authUser?.profile_picture ? (
                            <img
                                src={authUser.profile_picture}
                                alt="Profile"
                                className="rounded-circle border border-3 border-light shadow-sm"
                                style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div
                                className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                style={{ width: '140px', height: '140px', fontSize: '3rem' }}
                            >
                                <span>{authUser?.name?.[0]?.toUpperCase() || '?'}</span>
                            </div>
                        )}
                        <h4 className="mt-3 mb-0 fw-bold">{authUser?.name}</h4>
                        <p className="text-muted mb-1">@{authUser?.username}</p>
                        <span
                            className={`badge px-3 py-2 ${authUser?.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                        >
                            {authUser?.status}
                        </span>
                    </div>

                    <div className="container col-md-12 p-5">
                        <div className="list-group list-group-flush rounded-3 shadow-sm border">
                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="fw-semibold text-muted">
                                    <i className="bi bi-upc-scan me-2"></i>RFID
                                </span>
                                <span>
                                    {authUser?.rfid || <span className="text-muted">N/A</span>}
                                </span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="fw-semibold text-muted">
                                    <i className="bi bi-envelope me-2"></i>Email
                                </span>
                                <span>
                                    {authUser?.email || <span className="text-muted">N/A</span>}
                                </span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="fw-semibold text-muted">
                                    <i className="bi bi-briefcase me-2"></i>Position
                                </span>
                                <span>{authUser?.position}</span>
                            </div>
                            {authUser?.suspended_until && (
                                <div className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="fw-semibold text-muted">
                                        <i className="bi bi-slash-circle me-2"></i>Suspended Until
                                    </span>
                                    <span>
                                        {new Date(authUser.suspended_until).toLocaleString()}
                                    </span>
                                </div>
                            )}
                            {authUser?.last_activity_at && (
                                <div className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="fw-semibold text-muted">
                                        <i className="bi bi-clock-history me-2"></i>Last Activity
                                    </span>
                                    <span>
                                        {new Date(authUser.last_activity_at).toLocaleString()}
                                    </span>
                                </div>
                            )}
                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="fw-semibold text-muted">
                                    <i className="bi bi-calendar-check me-2"></i>Joined
                                </span>
                                <span>{new Date(authUser?.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-footer bg-light text-center py-3">
                <button className="btn btn-primary btn-sm me-2 shadow-sm">
                    <i className="bi bi-pencil-square me-1"></i> Edit Profile
                </button>
                <button className="btn btn-outline-secondary btn-sm shadow-sm">
                    <i className="bi bi-shield-lock me-1"></i> Change Password
                </button>
            </div>
        </div>
    )
}

export default Profile
