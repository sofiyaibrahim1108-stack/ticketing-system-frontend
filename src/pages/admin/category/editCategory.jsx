import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchCategoryById, updateCategoryApi } from "../../../api/category.js"

function EditCategory() {
    const { categoryId } = useParams()
    const navigate = useNavigate()

    const [editName, setEditName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const data = await fetchCategoryById(categoryId)
                setEditName(data.categoryName)
            } catch (err) {
                setError(err.message || "Failed to load category")
            }
        }
        loadCategory()
    }, [categoryId])

    const handleUpdate = async (e) => {
        e.preventDefault()

        if (!editName.trim()) {
            setError("Category name required")
            return
        }

        setLoading(true)
        setError("")

        try {
            await updateCategoryApi(categoryId, editName.trim())
            navigate("/admin/category")
        } catch (err) {
            setError(err.message || "Failed to update category")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {error && <p className="error-message">{error}</p>}

            <form className="categoryForm" onSubmit={handleUpdate}>
                <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    disabled={loading}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Update"}
                </button>

                <button type="button" onClick={() => navigate("/admin/category")}>
                    Back
                </button>
            </form>
        </>
    )
}

export default EditCategory
