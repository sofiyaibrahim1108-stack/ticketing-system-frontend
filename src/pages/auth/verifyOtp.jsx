import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../api/auth";
import "../../App.css";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError("OTP required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const tempToken = localStorage.getItem("tempToken");

      const data = await verifyOtp({
        otp: otp.trim(),
        tempToken
      });

      if (!data.success) {

        if (data.message === "Too many attempts") {
          alert("Too many wrong OTP attempts. Please login again.");
          localStorage.clear();
          navigate("/");
          return;
        }

        setError(data.message || "Invalid OTP");
        return;
      }
      if (data.purpose === "RESET") {
        // Forgot password flow
        localStorage.setItem("tempToken", data.tempToken);
        navigate("/resetPassword");
        return;
      }

      localStorage.removeItem("tempToken");
      localStorage.removeItem("otpPurpose");

      localStorage.setItem("authToken", data.mainToken);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") navigate("/admindashboard");
      else navigate("/userdashboard");

    } catch (err) {
      setError("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <h2>Verify OTP</h2>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <button disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <p>
        Back to <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default VerifyOtp;
