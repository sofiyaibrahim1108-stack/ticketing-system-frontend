// GET ALL with pagination
export async function fetchCategory(page = 1, limit = 4) {
    const res = await fetch(
        `http://localhost:3003/api/category/list?page=${page}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
        }
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to fetch category");
    return json.category; // IMPORTANT
}


// CREATE
export async function createCategoryApi(categoryName) {
    const res = await fetch(`http://localhost:3003/api/category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ categoryName }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to create category");
    return json;
}


// UPDATE
export async function updateCategoryApi(categoryId, categoryName) {
    const res = await fetch(
        `http://localhost:3003/api/category/${categoryId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ categoryName }),
        }
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to update category");
    return json;
}


// DELETE
export async function deleteCategoryApi(categoryId) {
    const res = await fetch(
        `http://localhost:3003/api/category/${categoryId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
        }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete category");
    return data.category;
}
