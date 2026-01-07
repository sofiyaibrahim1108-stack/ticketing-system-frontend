import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchComment, createComment, updateComment, deleteComment } from "../../api/comment";
import { fetchTicketById } from "../../api/ticket"
import "../../App.css";

function CommentPage() {
  const navigate = useNavigate()

  const { ticketId } = useParams();
  const [comments, setComments] = useState([]);
  const [ticketStatusId, setTicketStatusId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // statusId → human-readable
  const statusMap = {
    1: "start",
    2: "inProgress",
    3: "pending",
    4: "hold",
    5: "completed",
    6: "done",
  };

  // load ticket + comments
  const loadComments = async () => {
    if (!ticketId) return;
    setLoading(true);
    setError("");
    try {
      const ticketData = await fetchTicketById(ticketId);
      console.log(ticketData)
      // make sure statusId exists
      if (!ticketData.statusId) {
        setError("Ticket status not found");
        setLoading(false);
        return;
      }

      setTicketStatusId(ticketData.statusId);

      const commentData = await fetchComment(ticketId);
      setComments(commentData.comment || []);
    } catch (err) {
      setError(err.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [ticketId]);

  // create comment
  const handleCreate = async () => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    if (!ticketStatusId) {
      setError("Ticket status not loaded yet");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await createComment(ticketId, ticketStatusId, newComment);
      setNewComment("");
      setSuccess("Comment added successfully");
      loadComments();
    } catch (err) {
      setError(err.message || "Failed to create comment");
    } finally {
      setLoading(false);
    }
  };

  // start editing comment
  const handleEdit = (comment) => {
    setEditId(comment.commentId);
    setNewComment(comment.comment);
    setError("");
    setSuccess("");
  };

  // update comment
  const handleUpdate = async () => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    if (!ticketStatusId) {
      setError("Ticket status not loaded yet");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await updateComment(editId, ticketStatusId, newComment);
      setEditId(null);
      setNewComment("");
      setSuccess("Comment updated successfully");
      loadComments();
    } catch (err) {
      setError(err.message || "Failed to update comment");
    } finally {
      setLoading(false);
    }
  };

  // delete comment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await deleteComment(id);
      setSuccess("Comment deleted successfully");
      loadComments();
    } catch (err) {
      setError(err.message || "Failed to delete comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticketPage">
      <h2>Comments for Ticket #{ticketId}</h2>
      <button onClick={() => navigate("/admin/ticket")}>🔙</button>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <p>
        Ticket Status: <b>{statusMap[ticketStatusId] || ticketStatusId}</b>
      </p>

      <textarea
        placeholder="Enter your comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <button onClick={editId ? handleUpdate : handleCreate} disabled={loading}>
        {loading ? "Saving..." : editId ? "Update Comment" : "Add Comment"}
      </button>

      <table className="ticketTabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Comment</th>
            <th>Status</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.length === 0 ? (
            <tr>
              <td colSpan="5">No comments found</td>
            </tr>
          ) : (
            comments.map((c) => (
              <tr key={c.commentId}>
                <td>{c.commentId}</td>
                <td>{c.comment}</td>
                <td>{c.status}</td>
                <td>{c.userName || "Unknown"}</td>
                <td>
                  <button onClick={() => handleEdit(c)} disabled={loading}>Edit</button>
                  <button onClick={() => handleDelete(c.commentId)} disabled={loading} className="danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CommentPage;
