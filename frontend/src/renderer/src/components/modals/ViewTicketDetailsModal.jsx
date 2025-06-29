import { useState, useEffect, useRef } from 'react'
import { FaPlay, FaPaperPlane, FaEdit } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import TicketStatusBadge from '../badges/TicketStatusBadge'
import { formatDateAndTimeVerbose } from '../../utils/formatDateAndTimeVerbose'

function ViewTicketDetailsModal({ id, data }) {
    const { addComment, updateComment, authUser } = useAPI()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [comments, setComments] = useState(data?.comments || [])
    const [commentInput, setCommentInput] = useState('')
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editedComment, setEditedComment] = useState('')

    const commentsContainerRef = useRef(null)
    const commentRefs = useRef({})

    useEffect(() => {
        setComments(data?.comments)
    }, [data?.comments])

    const handleAddComment = async () => {
        if (!commentInput.trim()) return
        try {
            const newComment = await addComment(
                data?.id,
                { text: commentInput },
                setLoading,
                setError
            )
            setComments((prev) => [newComment.comment, ...prev])
            setCommentInput('')

            setTimeout(() => {
                if (commentsContainerRef.current) {
                    commentsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
                }
            }, 100)
        } catch (error) {
            console.error('Failed to add comment:', error)
        }
    }

    const handleEditComment = (commentId, currentText) => {
        setEditingCommentId(commentId)
        setEditedComment(currentText)
    }

    const handleUpdateComment = async () => {
        if (!editedComment.trim() || !editingCommentId) return

        try {
            const updated = await updateComment(data?.id, editingCommentId, {
                text: editedComment
            })

            setComments((prev) =>
                prev.map((comment) =>
                    comment?.id === editingCommentId
                        ? { ...comment, text: updated?.comment?.text }
                        : comment
                )
            )

            setTimeout(() => {
                const target = commentRefs.current[editingCommentId]
                if (target && commentsContainerRef.current) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }, 100)

            setEditingCommentId(null)
            setEditedComment('')
        } catch (error) {
            console.error('Failed to update comment:', error)
        }
    }

    return (
        <div
            className="modal fade"
            id={id}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="ticketDetailsLabel"
        >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
                <div className="modal-content border">
                    <div className="modal-header bg-primary text-light">
                        <h5 className="modal-title">
                            <span className="small">Ticket# </span>
                            <span className="fw-bold">{data?.ticket_number}</span>
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="text-center mt-3 py-2">
                            <h3 className="fw-bold">{data?.title}</h3>
                            <p className="text-muted m-0">{data?.description}</p>
                        </div>
                        <div className="d-flex">
                            <div className="col-7 p-3">
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="card shadow p-3 h-100 rounded-4">
                                            <h6 className="fw-bold">Status:</h6>
                                            {<TicketStatusBadge status={data?.status} />}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card shadow p-3 h-100 rounded-4">
                                            <h6 className="fw-bold">Priority:</h6>
                                            <span className="text-center fw-semibold">
                                                {data?.priority?.name
                                                    .replace('_', ' ')
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="card shadow p-3 h-100 rounded-4">
                                            <h5 className="fw-bold">Requester:</h5>
                                            <div>
                                                <span className="me-2">Name:</span>
                                                <span className="fw-bold">
                                                    {data?.requester?.name}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="me-2">Department:</span>
                                                <span className="fw-bold">
                                                    {data?.origin_department?.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card shadow p-3 h-100 rounded-4">
                                            <h5 className="fw-bold">Assign To:</h5>
                                            {data?.assigned_to ? (
                                                <div>
                                                    <div>
                                                        <span className="me-2">Name:</span>
                                                        <span className="fw-bold">
                                                            {data?.assigned_to?.name}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="me-2">Department:</span>
                                                        <span className="fw-bold">
                                                            {data?.target_department?.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="d-flex h-100 justify-content-center align-items-center">
                                                    <span className="fw-bold">
                                                        {data?.target_department?.name}
                                                    </span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="card shadow p-3 h-100 rounded-4">
                                            <h6 className="fw-bold">Response Deadline:</h6>
                                            <span className="text-muted">
                                                {formatDateAndTimeVerbose(
                                                    data?.response_deadline
                                                ) || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card shadow p-3 h-100 rounded-4">
                                            <h6 className="fw-bold">Resolution Deadline:</h6>
                                            <span className="text-muted">
                                                {formatDateAndTimeVerbose(
                                                    data?.resolution_deadline
                                                ) || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="card shadow p-4 h-100 rounded-4 text-center">
                                            <h6 className="fw-bold text-uppercase mb-3">
                                                SLA Compliance:
                                            </h6>
                                            {data?.sla_breached ? (
                                                <span className="py-2 px-4 rounded-pill text-light bg-danger">
                                                    SLA Breached
                                                </span>
                                            ) : (
                                                <span className="py-2 px-4 rounded-pill text-light bg-success">
                                                    SLA Met
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="card shadow p-4 h-100 rounded-4">
                                            <h6 className="fw-bold text-uppercase mb-3">
                                                Remarks:
                                            </h6>
                                            <span
                                                className="text-muted"
                                                style={{ wordWrap: 'break-word' }}
                                            >
                                                {data?.remarks || 'No remarks provided'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-5 p-3">
                                <div className="card shadow p-3 h-100 rounded-4">
                                    <h4 className="fw-bold mb-2">Comments</h4>
                                    <div
                                        ref={commentsContainerRef}
                                        className="overflow-auto scroll p-3 border-top border-bottom"
                                        style={{ maxHeight: '300px' }}
                                    >
                                        {comments?.length > 0 ? (
                                            comments.map((comment) => (
                                                <div
                                                    key={comment?.id}
                                                    className="mb-4 border-bottom"
                                                    ref={(el) =>
                                                        (commentRefs.current[comment?.id] = el)
                                                    }
                                                >
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <span className="fw-bold fs-5">
                                                                {comment?.user?.name}
                                                            </span>
                                                            <span className="text-muted ms-2">
                                                                {formatDateAndTimeVerbose(
                                                                    comment?.created_at || ''
                                                                )}
                                                            </span>
                                                            {comment?.edited_at && (
                                                                <span className="badge bg-secondary text-light ms-2">
                                                                    Edited
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            {comment?.user?.id == authUser.id && (
                                                                <button
                                                                    className="btn btn-sm btn-outline-secondary"
                                                                    onClick={() =>
                                                                        handleEditComment(
                                                                            comment?.id,
                                                                            comment?.text
                                                                        )
                                                                    }
                                                                >
                                                                    <FaEdit className="me-1" />
                                                                    Edit
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="text-muted fw-semibold">
                                                        {comment?.text}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-muted">No comments yet</div>
                                        )}
                                    </div>

                                    <div className="d-flex mt-3">
                                        {editingCommentId ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-3 rounded-end-0"
                                                    value={editedComment}
                                                    onChange={(e) =>
                                                        setEditedComment(e.target.value)
                                                    }
                                                />
                                                <button
                                                    onClick={handleUpdateComment}
                                                    className="btn btn-primary rounded-3 rounded-start-0"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingCommentId(null)
                                                        setEditedComment('')
                                                    }}
                                                    className="btn btn-secondary rounded-3 ms-2 btn-sm py-0"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-3 rounded-end-0"
                                                    placeholder="Add a comment..."
                                                    value={commentInput}
                                                    onChange={(e) =>
                                                        setCommentInput(e.target.value)
                                                    }
                                                />
                                                <button
                                                    onClick={handleAddComment}
                                                    className="btn btn-primary rounded-3 rounded-start-0"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <span
                                                            className="spinner-border spinner-border-sm"
                                                            role="status"
                                                        ></span>
                                                    ) : (
                                                        <FaPaperPlane />
                                                    )}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                            Close
                        </button>
                        {/* {data?.assigned_to && data?.status !== 'resolved' && (
                            <button className="btn text-light btn-success">
                                <FaPlay /> Start Task
                            </button>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTicketDetailsModal
