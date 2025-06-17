import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const AddTutorial = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        image: "",
        language: "",
        price: "",
        description: "",
    });

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        
       
        if (!user || !user.email) {
            toast.error('Please log in to add a tutorial');
            return;
        }

       
        const token = localStorage.getItem('access-token');
        if (!token) {
            toast.error('Authentication token not found. Please log in again.');
            return;
        }

        const tutorial = {
            userName: user.displayName || user.email,
            email: user.email,
            ...formData,
        };

        try {
            const res = await fetch("https://secjaf-server-side.vercel.app/tutorials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(tutorial),
            });

            
            const contentType = res.headers.get("content-type");
            let data;
            
            if (contentType && contentType.includes("application/json")) {
                data = await res.json();
            } else {
                const text = await res.text();
                throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}...`);
            }

            if (res.status === 401) {
                toast.error('Authentication failed. Please log in again.');
                localStorage.removeItem('access-token'); 
                return;
            }
            
            if (res.status === 403) {
                toast.error('Token expired or invalid. Please log in again.');
                localStorage.removeItem('access-token'); 
                return;
            }

            if (!res.ok) {
                throw new Error(data.message || `HTTP error! status: ${res.status}`);
            }

            toast.success("Tutorial added successfully!");
            setFormData({ image: "", language: "", price: "", description: "" });
            
        } catch (err) {
            console.error('Submit error:', err);
            toast.error(err.message || 'Failed to add tutorial');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto md:my-5 border-2 border-white p-4 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Add Tutorial</h2>

            <div className="mb-2">
                <label>User Name</label>
                <input 
                    type="text" 
                    value={user?.displayName || user?.email || ''} 
                    disabled 
                    className="input form-card input-bordered w-full" 
                />
            </div>

            <div className="mb-2">
                <label>Email</label>
                <input 
                    type="email" 
                    value={user?.email || ''} 
                    disabled 
                    className="input form-card input-bordered w-full" 
                />
            </div>

            <div className="mb-2">
                <label>Image URL</label>
                <input
                    type="text"
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
                    type="text"
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
                    type="number"
                    name="price"
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
                />
            </div>
           

            <button type="submit" className="btn btn-primary w-full mt-4 !text-white">
                Submit Tutorial
            </button>
        </form>
    );
};

export default AddTutorial;