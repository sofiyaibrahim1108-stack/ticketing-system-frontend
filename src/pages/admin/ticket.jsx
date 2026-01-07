import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTicket, createTicket, updateTicket, deleteTicket } from "../../api/ticket"
import { fetchCategory } from "../../api/category"
import { fetchUser } from "../../api/user"
import { fetchAllStatus } from "../../api/ticketStatus";
import "../../App.css"

function TicketPage() {
    const navigate = useNavigate()

    const [ticket, setTicket] = useState([])
    const [user, setUser] = useState([])
    const [category, setCategory] = useState([])
    const [status, setStatus] = useState([])

    const [ticketTitle, setTicketTitle] = useState("")
    const [description, setDescription] = useState("")
    const [userId, setUserId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [statusId, setStatusId] = useState("")

    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [page, setPage] = useState(1)
    const [limit] = useState(4)


    const loadTicket = async () => {
        setLoading(true)
        setError("")

        try {
            const data = await fetchTicket(page, limit)
            setTicket(data)
        } catch (err) {
            setError(err.message || "failed to load ticket")
        } finally {
            setLoading(false)
        }
    }

    const loadDropdowns = async () => {
        try {
            const userData = await fetchUser()
            const categoryData = await fetchCategory()
            const statusData = await fetchAllStatus()

            console.log(userData, categoryData, statusData)

            setUser(userData)
            setCategory(categoryData)
            setStatus(statusData)
        } catch (err) {
            console.error("Dropdown load error", err)
        }
    }
    useEffect(() => {
        loadTicket()
        loadDropdowns()
    }, [page])

    //create
    const handleCreate = async (e) => {
        e.preventDefault()

        if (!ticketTitle || !description || !userId || !categoryId || !statusId) {
            setError("All fields are required");
            return;
        }
        setLoading(true)
        setError("")
        setSuccess("")

        try {
            await createTicket({ ticketTitle, description, userId, categoryId, statusId })
            setSuccess("Ticket created successfully")
            setTicketTitle("")
            setDescription("")
            setUserId("")
            setCategoryId("")
            setStatusId("")
            loadTicket()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    //update
    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!ticketTitle || !description || !userId || !categoryId || !statusId) {
            setError("All fields are required");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await updateTicket(editId, { ticketTitle, description, userId, categoryId, statusId })
            setSuccess("ticket updated successfully")
            setEditId(null)
            setTicketTitle("")
            setDescription("")
            setUserId("")
            setCategoryId("")
            setStatusId("")
            loadTicket()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    //edit
    const handleEdit = (ticket) => {
        setEditId(ticket.ticketId)
        setTicketTitle(ticket.ticketTitle)
        setDescription(ticket.description)
        setUserId(ticket.userId)
        setCategoryId(ticket.categoryId);
        setStatusId(ticket.statusId)
        setError("")
        setSuccess("")
    }

    //delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delte this ticket?")) return
        setLoading(true)
        setError("")
        setSuccess("")
        try {
            await deleteTicket(id)
            setSuccess("ticket deleted successfully")
            loadTicket()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="ticketPage">
            <h2>Admin Ticket Management</h2>
            <button onClick={() => navigate("/adminDashboard")}>🔙</button>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={editId ? handleUpdate : handleCreate} className="ticketForm">

                <input type="text" placeholder="Ticket Title" value={ticketTitle} onChange={(e) => setTicketTitle(e.target.value)} />

                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <select value={userId} onChange={(e) => setUserId(e.target.value)}>
                    <option value="">--Select User --</option>
                    {user.map((u) => (
                        <option key={u.userId} value={u.userId}>{u.username}({u.role})</option>
                    ))}
                </select>

                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">--Select Category--</option>
                    {category.map((c) => (
                        <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
                    ))}
                </select>

                <select value={statusId} onChange={(e) => setStatusId(e.target.value)}>
                    <option value="">--Select Status--</option>
                    {status.map((s) => (
                        <option key={s.statusId} value={s.statusId}>{s.status}</option>
                    ))}
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : editId ? "Update Ticket" : "Create Ticket"}
                </button>
            </form>

            <table className="ticketTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Ticket Title</th>
                        <th>Ticket Category</th>
                        <th>Ticket Status</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {ticket.length === 0 ? (
                        <tr>
                            <td colSpan="6">No Ticket Found</td>
                        </tr>
                    ) : (
                        ticket.map((t) => (
                            <tr key={t.ticketId}>

                                <td>{t.ticketId}</td>
                                <td>{t.username}</td>
                                <td>{t.ticketTitle}</td>
                                <td>{t.categoryName}</td>
                                <td>{t.status}</td>

                                <td>
                                    <button onClick={() => handleEdit(t)} disabled={loading}>Edit</button>
                                    <button onClick={() => handleDelete(t.ticketId)} className="danger" disabled={loading}>
                                        Delete
                                    </button>
                                        
                                    <button
                                        onClick={() => navigate(`/admin/ticket/${t.ticketId}/comment`)}
                                        disabled={loading}
                                        style={{ marginLeft: "5px" }}
                                    >
                                        View / Comment
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page + 1)} disabled={ticket.length < limit}>Next</button>
            </div>

        </div>
    )

}
export default TicketPage