

export async function signup(data) {
    const res = await fetch(`http://localhost:3003/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    return res.json()
}


export async function login(data) {
    const res = await fetch(`http://localhost:3003/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function verifyOtp(data) {
    const res = await fetch(`http://localhost:3003/api/verifyOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function forgotPassword(data) {
    const res = await fetch(`http://localhost:3003/api/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json();
}

export async function resetPassword(data) {
    const res = await fetch(`http://localhost:3003/api/resetPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
     const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to reset password");
  return json;
}