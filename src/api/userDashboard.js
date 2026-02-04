const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3003"


export const fetchTicket = async (token) => {
    const res = await fetch(
        `${API_BASE_URL}/api/ticket/list?page=1&limit=4`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }

        }
    )
    if (!res.ok) {
        throw new Error("failed to fetch tickets")
    }
    return res.json()
}

//status list
export const fetchStatusList = async (token) => {
    const res = await fetch(
        `${API_BASE_URL}/api/ticketStatus/list`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }

        }
    )
    if (!res.ok) {
        throw new Error("failed to fetch status list")
    }
    return res.json()
}

//update ticket status
export const updateTicketStatus = async (ticketId, statusId, token) => {
    console.log({ ticketId, statusId, token });
    const res = await fetch(
        `${API_BASE_URL}/api/ticket/${ticketId}/status`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ statusId })
        }
    )
    if (!res.ok) {
        throw new Error("failed to update ticket status")
    }
    return res.json()
}

export const fetchCommentsByTicket = async (ticketId, token) => {
  const res = await fetch(
    `${API_BASE_URL}/api/comment/ticket/${ticketId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};