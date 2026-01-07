import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import VerifyOtp from "./pages/auth/verifyOtp";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";

import AdminDashboard from "./pages/admin/adminDashboard";
import Category from "./pages/admin/category";
import TicketStatus from "./pages/admin/ticketStatus";
import TicketAdmin from "./pages/admin/ticket";
import CommentAdmin from "./pages/admin/comment";

import UserDashboard from "./pages/user/userDashboard";
// import CommentUser from "./pages/user/comment";
// import TicketUser from "./pages/user/ticket";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public / Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/ticketStatus" element={<TicketStatus />} />
          <Route path="/admin/ticket" element={<TicketAdmin />} />
          <Route path="/admin/ticket/:ticketId/comment" element={<CommentAdmin />} />
        </Route>

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path="/userdashboard" element={<UserDashboard />} />
          {/* <Route path="/user/ticket" element={<TicketUser />} /> */}
          {/* <Route path="/user/ticket/:ticketId/comment" element={<CommentUser />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
