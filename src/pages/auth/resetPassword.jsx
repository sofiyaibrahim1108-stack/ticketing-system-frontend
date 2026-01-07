import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import "../../App.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tempToken, setTempToken] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("tempToken");
    if (!token) {
      setError("No temp token found. Please request OTP again.");
    } else {
      setTempToken(token);
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Both password fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("tempToken"); // fetch directly here
    if (!token) {
      setError("No temp token found. Please request OTP again.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await resetPassword({
        tempToken: token,
        newPassword: password,
        confirmPassword
      });

      alert("Password reset successful!");
      localStorage.removeItem("tempToken");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="formContainer">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading || !tempToken}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </form>
      <p>
        Back to <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
