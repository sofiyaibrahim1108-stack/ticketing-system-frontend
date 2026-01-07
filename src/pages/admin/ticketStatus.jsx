import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    fetchAllStatus,
    createStatus,
    updateStatus,
    deleteStatus
} from "../../api/ticketStatus";
import "../../App.css";

const statusOption = ["start", "inProgress", "pending", "hold", "completed", "done"];

function TicketStatusPage() {
    const navigate = useNavigate()
    const [status, setStatus] = useState([]);
    const [newStatus, setNewStatus] = useState("");
    const [editId, setEditId] = useState(null);
    const [editStatus, setEditStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [page, setPage] = useState(1);
    const [limit] = useState(4);

    // LOAD WITH PAGINATION
    const loadStatus = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchAllStatus(page, limit);
            setStatus(data);
        } catch (err) {
            setError(err.message || "Failed to load status");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStatus();
    }, [page]);

    // CREATE
    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newStatus) {
            setError("Please select status");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await createStatus(newStatus);
            setNewStatus("");
            setSuccess("Status created successfully");
            loadStatus();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // EDIT
    const handleEdit = (s) => {
        setEditId(s.statusId);
        setEditStatus(s.status);
        setError("");
        setSuccess("");
    };

    // UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editStatus) {
            setError("Please select status");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await updateStatus(editId, editStatus);
            setEditId(null);
            setEditStatus("");
            setSuccess("Status updated successfully");
            loadStatus();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await deleteStatus(id);
            setSuccess("Status deleted successfully");
            loadStatus();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ticketStatusPage">
            <h2>Ticket Status Management </h2>
            <button onClick={() => navigate("/adminDashboard")}>🔙</button>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}


            <form onSubmit={editId ? handleUpdate : handleCreate} className="statusForm">
                <select
                    value={editId ? editStatus : newStatus}
                    onChange={(e) =>
                        editId
                            ? setEditStatus(e.target.value)
                            : setNewStatus(e.target.value)
                    }
                    disabled={loading}
                >
                    <option value="">-- Select status --</option>
                    {statusOption.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : editId ? "Update" : "Add"}
                </button>
            </form>


            <table className="statusTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {status.length === 0 ? (
                        <tr>
                            <td colSpan="3">No status found</td>
                        </tr>
                    ) : (
                        status.map((s) => (
                            <tr key={s.statusId}>
                                <td>{s.statusId}</td>
                                <td>
                                    {editId === s.statusId ? (
                                        <select
                                            value={editStatus}
                                            onChange={(e) => setEditStatus(e.target.value)}
                                            disabled={loading}
                                        >
                                            {statusOption.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        s.status
                                    )}
                                </td>
                                <td>
                                    {editId === s.statusId ? (
                                        <button onClick={handleUpdate} disabled={loading}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(s)} disabled={loading || s.ticketCount > 0}>Edit</button>
                                    )}
                                    <button
                                        className="danger"
                                        onClick={() => handleDelete(s.statusId)}
                                        disabled={loading || s.ticketCount > 0}
                                    >
                                        Delete
                                    </button>
                                    {s.ticketCount > 0 && (<small style={{ color: "red" }}> Assigned to tickets </small>)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Prev
                </button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page + 1)} disabled={status.length < limit}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default TicketStatusPage;
