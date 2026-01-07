
export async function fetchUser() {
  const token = localStorage.getItem("authToken"); 


  const res = await fetch("http://localhost:3003/api/user/list", {
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
