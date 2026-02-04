
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3003"


export async function fetchUser() {
  const token = localStorage.getItem("authToken"); 


  const res = await fetch(`${API_BASE_URL}/api/user/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch user");

  return data.user; 
}
