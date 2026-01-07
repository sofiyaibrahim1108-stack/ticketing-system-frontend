import { useState } from "react";
import { login } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom"
import "../../App.css";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            setError("Username and Password reqiured")
            return
        }

        setError("")
        setLoading(true);

        try {
            const res = await login({ username, password })

            if (res.success) {
                localStorage.setItem("tempToken", res.tempToken)
                localStorage.setItem("otpPurpose", "LOGIN")
                alert(res.message)
                navigate("/verifyOtp")
            } else {
                setError(res.message)
            }

        } catch (err) {
            console.error(err)
            setError("login failed")
        }

    }

    return (
        <div className="formContainer">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}

            <p>
                <Link to="/signup">Signup</Link>
            </p>

            <p>
                <Link to="/forgotPassword">Forgot Password?</Link>

            </p>
        </div>
    )
}

export default Login