const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3003"



// GET ALL with pagination
export async function fetchAllStatus(page = 1, limit = 4) {
    const res = await fetch(
        `${API_BASE_URL}/api/ticketStatus/list?page=${page}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
        }
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to fetch ticket status");

    return json.status; 
}


// CREATE
export async function createStatus(status) {
    const res = await fetch(
        `${API_BASE_URL}/api/ticketStatus`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ status }),
        }
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to create status");

    return json;
}


// UPDATE
export async function updateStatus(statusId, status) {
    const res = await fetch(
        `${API_BASE_URL}/api/ticketStatus/${statusId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ status }),
        }
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to update status");

    return json;
}


// DELETE
export async function deleteStatus(statusId) {
    const res = await fetch(
        `${API_BASE_URL}/api/ticketStatus/${statusId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
        }
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to delete status");

    return json;
}
