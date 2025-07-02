import { useState } from "react";
import { toast } from "react-hot-toast";

const UpdateModal = ({ tutorial, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    image: tutorial.image || "",
    language: tutorial.language || "",
    price: tutorial.price || "",
    description: tutorial.description || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access-token");
    try {
      const res = await fetch(`https://secjaf-server-side.vercel.app/tutorials/${tutorial._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Updated successfully");
        onClose();
        onUpdate();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="nav border-2 border-gray-300 p-4 rounded-2xl shadow-lg w-[90%] max-w-md h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Update Tutorial</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-2">
            <label>User Name</label>
            <input
              type="text"
              value={tutorial.userName}
              disabled
              className="input form-card input-bordered w-full"
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="text"
              value={tutorial.email}
              disabled
              className="input form-card input-bordered w-full"
            />
          </div>
          <div className="mb-2">
            <label>Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="input form-card input-bordered w-full"
              placeholder="Tutorial image URL"
            />
          </div>
          <div className="mb-2">
            <label>Language</label>
            <input
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="input form-card input-bordered w-full"
              placeholder="Language"
            />
          </div>
          <div className="mb-2">
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="input form-card input-bordered w-full"
              placeholder="Price"
            />
          </div>
          <div className="mb-2">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="textarea form-card textarea-bordered w-full"
              placeholder="Description"
            ></textarea>
          </div>
          <div className="mb-2">
            <label>Review (read-only)</label>
            <input
              type="text"
              value={tutorial.review}
              disabled
              className="input form-card input-bordered w-full"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-500 text-white px-4 py-1 rounded cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary !text-white px-4 py-1 rounded cursor-pointer">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
