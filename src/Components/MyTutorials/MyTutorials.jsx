import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// import { useAuth } from "../../context/AuthContext";
import UpdateModal from "../UpdateTutorialModal/UpdateTutorialModal";

const MyTutorials = () => {
  // const { user} = useAuth();
  const [tutorials, setTutorials] = useState([]);
  const [selected, setSelected] = useState(null);
 const token = localStorage.getItem('access-token');

  const fetchTutorials = async () => {
    try {
      const res = await fetch("http://localhost:5000/my-tutorials", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     const data = await res.json();
const safeData = Array.isArray(data) ? data : [data];
setTutorials(safeData);
    } catch (error) {
      toast.error("Failed to load tutorials");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/tutorials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      toast.success(data.message || "Deleted");
      fetchTutorials();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    if (token) fetchTutorials();
  }, [token]);

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Tutorials</h1>
      {tutorials.length === 0 ? (
        <p>No tutorials found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">Language</th>
                <th className="p-2">Price</th>
                <th className="p-2">Description</th>
                <th className="p-2">Review</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((item) => (
                <tr key={item._id} className="text-center border-t">
                  <td className="p-2">
                    <img src={item.image} alt="tutorial" className="w-16 h-16 object-cover mx-auto" />
                  </td>
                  <td className="p-2">{item.language}</td>
                  <td className="p-2">${item.price}</td>
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">{item.review}</td>
                  <td className="p-2 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => setSelected(item)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selected && (
        <UpdateModal
          tutorial={selected}
          onClose={() => setSelected(null)}
          onUpdate={fetchTutorials}
        />
      )}
    </div>
  );
};

export default MyTutorials;
