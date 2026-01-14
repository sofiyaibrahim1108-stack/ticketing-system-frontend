import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { createCategoryApi } from "../../../api/category.js";


function AddCategory() {
    const navigate = useNavigate()
    const [categoryName, setCategoryName] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const handleAdd = async (e) => {
        e.preventDefault()
        if (!categoryName) {
        setError("categoryName is missing");
        return
        }
        setLoading(true)
        try {
            await createCategoryApi(categoryName)
              setSuccess("Category Add successfully")
            navigate("/admin/category")
        } catch (err) {
            setError(err.message || "Failed to add category")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form className="categoryForm" onSubmit={handleAdd}>

                <input type="text" placeholder="Enter category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} disabled={loading} />

                <button type="submit" disabled={loading}>{loading ? "Saving..." : "Add"}</button>
                <button type="button" onClick={() => navigate("/admin/category")}>
                    Back
                </button>
            </form>
        </>
    )
}

export default AddCategory