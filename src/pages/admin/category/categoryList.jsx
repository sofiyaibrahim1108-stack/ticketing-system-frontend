import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchCategory, deleteCategoryApi } from "../../../api/category.js"

function CategoryList() {
    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [page, setPage] = useState(1)
    const limit = 4

    const loadCategory = async () => {
        setLoading(true)
        setError("")
        try {
            const data = await fetchCategory(page, limit)
            setCategory(data)
        } catch (err) {
            setError(err.message || "Failed to load category")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCategory()
    }, [page])

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category")) return
        setLoading(true)
        try {
            await deleteCategoryApi(id)
            setSuccess("Category deleted successfully")
            loadCategory()
        } catch (err) {
            setError(err.message || "Failed to delete category")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <button className="addButton" onClick={() => navigate("add")} disabled={loading}>Add</button>

            <table className="categoryTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Action</th>
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
                                <td>{cat.categoryName}</td>
                                <td>
                                    <button className="editButton" onClick={() => navigate(`${cat.categoryId}/edit`)} disabled={loading || cat.ticketCount > 0}>Edit</button>

                                    <button className="danger" onClick={() => handleDelete(cat.categoryId)} disabled={loading || cat.ticketCount > 0}>Delete</button>

                                    {cat.ticketCount > 0 && (<small style={{ color: "red" }}>Assigned to ticket</small>)}
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
        </>
    )
}

export default CategoryList