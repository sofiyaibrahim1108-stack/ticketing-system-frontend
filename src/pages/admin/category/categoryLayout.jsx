import { Outlet, useNavigate } from "react-router-dom";

function CategoryLayout() {
   const navigate = useNavigate()
   return (
      <div className="categoryPage">
         <div className="categoryHeader">
            <h2>Category Management</h2>
            <button onClick={() => navigate("/admindashboard")}>🔙</button>
         </div>
         <Outlet />
      </div>
   )
}

export default CategoryLayout