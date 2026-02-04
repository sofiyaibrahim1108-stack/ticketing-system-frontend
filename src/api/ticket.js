const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3003"


export async function fetchTicketById(ticketId) {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${API_BASE_URL}/api/ticket/${ticketId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch ticket");
  return data; 
}

// GET
export async function fetchTicket(page = 1, limit = 4) {
  const token = localStorage.getItem("authToken")
  const res = await fetch(
    `${API_BASE_URL}/api/ticket/list?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to fetch ticket")

  return data.ticket
}

// CREATE
export async function createTicket(payload) {
  const token = localStorage.getItem("authToken")
  const res = await fetch(`${API_BASE_URL}/api/ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to create ticket")

  return data
}

// UPDATE
export async function updateTicket(ticketId, payload) {
  const token = localStorage.getItem("authToken")
  const res = await fetch(
    `${API_BASE_URL}/api/ticket/${ticketId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }
  )

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to update ticket")

  return data
}

// DELETE
export async function deleteTicket(ticketId) {
  const token = localStorage.getItem("authToken")
  const res = await fetch(
    `${API_BASE_URL}/api/ticket/${ticketId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to delete ticket")

  return data
}
