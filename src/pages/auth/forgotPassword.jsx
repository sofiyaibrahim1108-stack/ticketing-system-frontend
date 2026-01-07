import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/auth"
import "../../App.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Email is required");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const data = await forgotPassword({ email: email.trim() })

            if (!data.success) {
                setError(data.message || "Failed to send OTP");
                return;
            }
            localStorage.setItem("tempToken", data.tempToken)
            localStorage.setItem("otpPurpose", "RESET");
            navigate("/verifyOtp")
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="formContainer">
            <h2>Forgot Password</h2>

            <form onSubmit={handleForgotPassword}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                </button>
            </form>

            <p>
                Back to <Link to="/">Login</Link>
            </p>
        </div>
    );
}

export default ForgotPassword;
