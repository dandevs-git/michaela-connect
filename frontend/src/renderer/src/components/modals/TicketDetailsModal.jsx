import { useState, useEffect, useRef } from 'react'
import { FaPlay, FaPaperPlane, FaEdit } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'
import StatusBadge from '../badge/StatusBadge'

function TicketDetailsModal({ id, data }) {
    const { addComment, updateComment, authenticatedUserDetails } = useAPI()

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
            const newComment = await addComment(data?.id, { text: commentInput })
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
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
                <div className="modal-content border">
                    <div className="modal-header bg-primary text-light">
                        <h5 className="modal-title">
                            <span className="small">Ticket# </span>
                            <span className="fw-bold">{data?.ticket_number ?? 'No Ticket'}</span>
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
                            <div className="col-6 p-3">
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="card shadow p-3 rounded-4">
                                            <h6 className="fw-bold">Status:</h6>
                                            {data?.status ?? <StatusBadge status={data?.status} />}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card shadow p-3">
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
                                        <div className="card shadow p-3 h-100">
                                            <h5 className="fw-bold">Requester:</h5>
                                            <div>
                                                <span className="me-2">Name:</span>
                                                <span className="text-primary fw-bold">
                                                    {data?.requester?.name}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="me-2">Department:</span>
                                                <span className="text-primary fw-bold">
                                                    {data?.requester?.department?.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card shadow p-3 h-100">
                                            <h5 className="fw-bold">Assign To:</h5>
                                            {data?.assigned_to ? (
                                                <div>
                                                    <div>
                                                        <span className="me-2">Name:</span>
                                                        <span className="text-primary fw-bold">
                                                            {data?.assigned_to?.name}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="me-2">Department:</span>
                                                        <span className="text-primary fw-bold">
                                                            {data?.assigned_to?.department?.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-danger">Not Assigned</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="card shadow p-3">
                                            <h6 className="fw-bold">Response Deadline:</h6>
                                            <span className="text-muted">
                                                {data?.response_deadline || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card shadow p-3">
                                            <h6 className="fw-bold">Resolution Deadline:</h6>
                                            <span className="text-muted">
                                                {data?.resolution_deadline || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="card shadow p-3 text-center">
                                        <h6 className="fw-bold">SLA Compliance:</h6>
                                        {data?.sla_breached ? (
                                            <span className="py-1 rounded-pill text-light bg-danger">
                                                SLA Breached
                                            </span>
                                        ) : (
                                            <span className="py-1 rounded-pill text-light bg-success">
                                                SLA Met
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 p-3">
                                <div className="card shadow p-3 rounded-3">
                                    <h4 className="fw-bold mb-2">Comments</h4>
                                    <div
                                        ref={commentsContainerRef}
                                        className="overflow-auto p-3 border-top border-bottom"
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
                                                            <span className="fw-bold text-primary fs-5">
                                                                {comment?.user?.name}
                                                            </span>
                                                            <span className="text-muted ms-2">
                                                                {new Date(
                                                                    comment?.created_at
                                                                ).toLocaleString('en-US', {
                                                                    dateStyle: 'medium',
                                                                    timeStyle: 'short'
                                                                })}
                                                            </span>
                                                            {comment?.edited_at && (
                                                                <span className="badge bg-secondary text-light text-primary ms-2">
                                                                    Edited
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            {comment?.user?.id ==
                                                                authenticatedUserDetails.id && (
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
                                                >
                                                    <FaPaperPlane />
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
                        {data?.assigned_to && data?.status !== 'resolved' && (
                            <button className="btn text-light btn-success">
                                <FaPlay /> Start Task
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketDetailsModal
