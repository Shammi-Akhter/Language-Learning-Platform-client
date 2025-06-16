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
      const res = await fetch(`http://localhost:5000/tutorials/${tutorial._id}`, {
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
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
        <h2 className="text-xl font-bold mb-4">Update Tutorial</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label>Name (read-only)</label>
            <input
              type="text"
              className="input"
              value={tutorial.userName}
              disabled
            />
          </div>
          <div>
            <label>Email (read-only)</label>
            <input
              type="text"
              className="input"
              value={tutorial.email}
              disabled
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label>Language</label>
            <input
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              required
            ></textarea>
          </div>
          <div>
            <label>Review (read-only)</label>
            <input
              type="text"
              className="input bg-gray-100 cursor-not-allowed"
              value={tutorial.review}
              disabled
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-1 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
