
import { useNavigate } from "react-router-dom";
import "../../App.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="dashboardContainer">
      <h2>Admin Dashboard</h2>
      <p>Welcome Admin 👋 You can manage everything from here.</p>

      <div className="cardsContainer">
        <div className="card" onClick={() => navigate("/admin/category")}>
          <h3>Manage Categories</h3>
          <p>Add / Edit / Delete Categories</p>
        </div>

        <div className="card" onClick={() => navigate("/admin/ticketStatus")}>
          <h3>Manage Ticket Status</h3>
          <p>Add / Edit / Delete Ticket Status</p>
        </div>

        <div className="card" onClick={() => navigate("/admin/ticket")}>
          <h3>Manage Tickets</h3>
          <p>View / Update / Delete Tickets</p>
        </div>
      </div>

      <button className="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
