import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

import {
  fetchTicket,
  fetchStatusList,
  updateTicketStatus,
  fetchCommentsByTicket,
} from "../../api/userDashboard.js";

function UserDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [ticket, setTicket] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  // load dashboard
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const loadDashboard = async () => {
      try {
        const ticketData = await fetchTicket(token);
        let tickets = Array.isArray(ticketData.ticket)
          ? ticketData.ticket
          : [];

        // 👇 fetch comments one by one (NO Promise.all)
        for (let t of tickets) {
          try {
            const commentRes = await fetchCommentsByTicket(t.ticketId, token);
            t.comment = Array.isArray(commentRes.comment)
              ? commentRes.comment
              : [];
          } catch {
            t.comment = [];
          }
        }

        setTicket(tickets);

        // 👇 STATUS LIST (this was missing)
        const statusData = await fetchStatusList(token);
        setStatusList(
          Array.isArray(statusData.status) ? statusData.status : []
        );

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard");
        setLoading(false);
      }
    };

    loadDashboard();
  }, [token, navigate]);

  // update status
  const updateStatus = async (ticketId, statusId) => {
    try {
      setUpdatingId(ticketId);

      await updateTicketStatus(ticketId, Number(statusId), token);

      // optimistic UI update
      setTicket((prev) =>
        prev.map((t) =>
          t.ticketId === ticketId ? { ...t, statusId } : t
        )
      );

      setSuccess("Status updated successfully");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="loadingText">Loading...</p>;

  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <h2>Welcome To Your Ticket Visiting Area!</h2>
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <p className="errorText">{error}</p>}
      {success && <p className="successText">{success}</p>}

      {ticket.length === 0 ? (
        <p className="emptyText">No ticket found</p>
      ) : (
        <div className="ticketGrid">
          {ticket.map((t) => (
            <div key={t.ticketId} className="ticketCard">
              <h3 className="ticketTitle">{t.ticketTitle}</h3>
              <p className="ticketDesc">{t.description}</p>

              <p className="ticketCategory">
                <b>Category:</b> {t.categoryName}
              </p>

              <div className="ticketStatus">
                <label>Status:</label>
                <select
                  value={t.statusId}
                  disabled={updatingId === t.ticketId}
                  onChange={(e) =>
                    updateStatus(t.ticketId, e.target.value)
                  }
                >
                  {statusList.map((s) => (
                    <option key={s.statusId} value={s.statusId}>
                      {s.status}
                    </option>
                  ))}
                </select>
              </div>

              {t.comment && t.comment.length > 0 && (
                <div className="ticketComments">
                  <b>Comments:</b>
                  <ul>
                    {t.comment.map((c) => (
                     <li key={c.commentId}>{c.comment}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
