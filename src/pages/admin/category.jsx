import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import {
    fetchCategory,
    createCategoryApi,
    updateCategoryApi,
    deleteCategoryApi
} from "../../api/category.js";

function CategoryPage() {
    const navigate = useNavigate();

    const [category, setCategory] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [page, setPage] = useState(1)
    const [limit] = useState(4)

    const loadCategory = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchCategory(page, limit);
            setCategory(data);
        } catch (err) {
            setError(err.message || "failed to load category");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategory();
    }, [page]);

    // Add new category
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!categoryName) {
            setError("categoryName is missing");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await createCategoryApi(categoryName);
            setCategoryName("");
            setSuccess("category created successfully!");
            loadCategory();
        } catch (err) {
            setError(err.message || "failed to create category");
        } finally {
            setLoading(false);
        }
    };

    // Edit
    const handleEdit = (cat) => {
        setEditId(cat.categoryId);
        setEditName(cat.categoryName);
        setError("");
        setSuccess("");
    };

    // Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editName) {
            setError("category name is required");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await updateCategoryApi(editId, editName);
            setEditId(null);
            setEditName("");
            setSuccess("category updated successfully!");
            loadCategory();
        } catch (err) {
            setError(err.message || "failed to update category");
        } finally {
            setLoading(false);
        }
    };

    // Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category")) return;
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await deleteCategoryApi(id);
            setSuccess("category deleted successfully");
            loadCategory();
        } catch (err) {
            setError(err.message || "failed to delete category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="categoryPage">
            <div className="categoryHeader">
                <h2>Category Management</h2>
                <button onClick={() => navigate("/adminDashboard")}>🔙</button>
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form className="categoryForm" onSubmit={handleAdd}>
                <input
                    type="text"
                    placeholder="Enter category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "saving..." : "Add"}
                </button>
            </form>

            <table className="categoryTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {category.length === 0 ? (
                        <tr>
                            <td colSpan="3">No category found</td>
                        </tr>
                    ) : (
                        category.map((cat) => (
                            <tr key={cat.categoryId}>
                                <td>{cat.categoryId}</td>

                                <td>
                                    {editId === cat.categoryId ? (
                                        <input
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            disabled={loading}
                                        />
                                    ) : (
                                        cat.categoryName
                                    )}
                                </td>

                                <td>
                                    {editId === cat.categoryId ? (
                                        <button onClick={handleUpdate} disabled={loading}>
                                            {loading ? "saving..." : "Save"}
                                        </button>
                                    ) : (
                                        <button onClick={() => handleEdit(cat)} disabled={loading || cat.ticketCount > 0}>
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="danger"
                                        onClick={() => handleDelete(cat.categoryId)}
                                        disabled={loading || cat.ticketCount > 0}
                                    >
                                        {loading ? "Deleting..." : "Delete"}
                                    </button>
                                    {cat.ticketCount > 0 && (<small style={{ color: "red" }}> Assigned to tickets </small>)}

                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page + 1)} disabled={category.length < limit}>Next</button>
            </div>
        </div>
    );
}

export default CategoryPage;
