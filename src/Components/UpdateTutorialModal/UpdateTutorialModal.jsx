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
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-indigo-300 p-6 rounded-lg w-[90%] max-w-lg">
        <h2 className="text-xl font-bold mb-4">Update Tutorial</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label  className="md:pr-2">Name (read-only)</label>
            <input
              type="text"
              className="input !bg-gray-300"
              value={tutorial.userName}
              disabled
            />
          </div>
          <div>
            <label className="md:pr-2">Email (read-only)</label>
            <input
              type="text"
              className="input !bg-gray-300"
              value={tutorial.email}
              disabled
            />
          </div>
          <div>
            <label className="md:pr-2">Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input bg-gray-300"
              required
            />
          </div>
          <div>
            <label className="md:pr-2">Language</label>
            <input
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="input bg-gray-300"
              required
            />
          </div>
          <div>
            <label className="md:pr-2">Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="input bg-gray-300"
              required
            />
          </div>
          <div>
            <label className="md:pr-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input bg-gray-300"
              required
            ></textarea>
          </div>
          <div>
            <label className="md:pr-2">Review (read-only)</label>
            <input
              type="text"
              className="input !bg-gray-300 cursor-not-allowed"
              value={tutorial.review}
              disabled
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-500 text-white px-4 py-1 rounded cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-300 text-white px-4 py-1 rounded cursor-pointer">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
