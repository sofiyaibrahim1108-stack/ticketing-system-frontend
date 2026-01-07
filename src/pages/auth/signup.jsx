import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signup } from "../../api/auth";
import "../../App.css"

function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const handleSignup = async (e) => {
        e.preventDefault()

        if (!username || !email || !password || !confirmPassword || !role) {
            setError("All fields are required")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("")
        setLoading(true);

        try {
            const res = await signup({ username, email, password, confirmPassword, role })

            if (res.success) {
                alert(res.message)
                navigate("/")
            } else {
                setError(res.message)
            }
        } catch (err) {
            console.error(err)
            setError("signup failed")
        }

    }

    return (
        <div className="formContainer">
            <h2>Signup</h2>

            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <input type="password" placeholder="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "signup in..." : "signup"}
                </button>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    )

}
export default Signup;