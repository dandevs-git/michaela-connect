import { useState, useEffect } from 'react'
import { FaPlay, FaPaperPlane, FaEdit } from 'react-icons/fa'
import { useAPI } from '../../contexts/APIContext'

function ViewTicketDetails({ id, data }) {
    const { addComment, updateComment } = useAPI()

    const [comments, setComments] = useState(data?.comments || [])
    const [commentInput, setCommentInput] = useState('')
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editedComment, setEditedComment] = useState('')

    useEffect(() => {
        setComments(data?.comments)
    }, [data?.comments])

    const handleAddComment = async () => {
        if (!commentInput.trim()) return
        try {
            const newComment = await addComment(data?.id, { comment: commentInput })
            setComments((prev) => [newComment.comment, ...prev])
            setCommentInput('')
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
                comment: editedComment
            })

            console.log(updated)

            setComments((prev) =>
                prev.map((comment) =>
                    comment?.id === editingCommentId
                        ? { ...comment, comment: updated?.comment?.comment }
                        : comment
                )
            )

            console.log(comments)

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
                                        <div className="card shadow-sm p-3">
                                            <h6 className="fw-bold">Status:</h6>
                                            <span className="bg-warning rounded-pill text-light text-center fw-semibold">
                                                {data?.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card shadow-sm p-3">
                                            <h6 className="fw-bold">Priority:</h6>
                                            <span className="bg-danger rounded-pill text-light text-center fw-semibold">
                                                {data?.priority?.name
                                                    .replace('_', ' ')
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="card shadow-sm p-3 h-100">
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
                                        <div className="card shadow-sm p-3 h-100">
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
                                        <div className="card shadow-sm p-3">
                                            <h6 className="fw-bold">Response Deadline:</h6>
                                            <span className="text-muted">
                                                {data?.response_deadline || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card shadow-sm p-3">
                                            <h6 className="fw-bold">Resolution Deadline:</h6>
                                            <span className="text-muted">
                                                {data?.resolution_deadline || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="card shadow-sm p-3 text-center">
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
                                <div className="card shadow-sm p-3 rounded-3">
                                    <h4 className="fw-bold mb-2">Comments</h4>
                                    <div
                                        className="overflow-auto p-3 border-top border-bottom"
                                        style={{ maxHeight: '300px' }}
                                    >
                                        {comments?.length > 0 ? (
                                            comments.map((comment) => (
                                                <div key={comment?.id} className="mb-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <span className="fw-bold text-primary">
                                                                {comment?.user?.name}
                                                            </span>
                                                            <span className="text-muted small ms-2">
                                                                {new Date(
                                                                    comment?.created_at
                                                                ).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="btn btn-sm btn-outline-secondary"
                                                                onClick={() =>
                                                                    handleEditComment(
                                                                        comment?.id,
                                                                        comment?.comment
                                                                    )
                                                                }
                                                            >
                                                                <FaEdit className="me-1" />
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="text-muted">
                                                        {comment?.comment}
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
                                                    className="form-control"
                                                    value={editedComment}
                                                    onChange={(e) =>
                                                        setEditedComment(e.target.value)
                                                    }
                                                />
                                                <button
                                                    onClick={handleUpdateComment}
                                                    className="btn btn-primary ms-2"
                                                >
                                                    Update
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Add a comment..."
                                                    value={commentInput}
                                                    onChange={(e) =>
                                                        setCommentInput(e.target.value)
                                                    }
                                                />
                                                <button
                                                    onClick={handleAddComment}
                                                    className="btn btn-primary ms-2"
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

export default ViewTicketDetails
