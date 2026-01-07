const token = localStorage.getItem("authToken");

// fetch comments
export async function fetchComment(ticketId, page = 1, limit = 4) {
    const res = await fetch(`http://localhost:3003/api/comment/ticket/${ticketId}?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch comments");
    return data;
}

// create comment
export async function createComment(ticketId, statusId, comment) {
    const res = await fetch(`http://localhost:3003/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ticketId, statusId, comment })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create comment");
    return data;
}

// update comment
export async function updateComment(commentId, statusId, comment) {
    const res = await fetch(`http://localhost:3003/api/comment/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ statusId, comment })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update comment");
    return data;
}

// delete comment
export async function deleteComment(commentId) {
    const res = await fetch(`http://localhost:3003/api/comment/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete comment");
    return data;
}
