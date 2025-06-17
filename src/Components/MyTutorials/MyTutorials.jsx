import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UpdateModal from "../UpdateTutorialModal/UpdateTutorialModal";

const MyTutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [selected, setSelected] = useState(null);
  const token = localStorage.getItem('access-token');

  const fetchTutorials = async () => {
    try {
      const res = await fetch("https://secjaf-server-side.vercel.app/my-tutorials", {
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
      const res = await fetch(`https://secjaf-server-side.vercel.app/tutorials/${id}`, {
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
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">My Tutorials</h1>

      {tutorials.length === 0 ? (
        <p className="text-center text-gray-500">No tutorials found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Language</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left hidden sm:table-cell">Description</th>
                <th className="p-3 text-left hidden md:table-cell">Review</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt="tutorial"
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{item.language}</td>
                  <td className="p-3">${item.price}</td>
                  <td className="p-3 hidden sm:table-cell">{item.description}</td>
                  <td className="p-3 hidden md:table-cell">{item.review}</td>
                  <td className="p-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => setSelected(item)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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
