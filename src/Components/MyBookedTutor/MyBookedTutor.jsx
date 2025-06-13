import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const MyBookedTutor = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    if (!user?.email) return;

    const token = localStorage.getItem('token');

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/bookings?email=${user.email}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setBookings([]);
      }
    };

    fetchBookings();
  }, [user]);

  
const handleReview = async (tutorId) => {
  try {
    const token = localStorage.getItem('token');
    
    const res = await fetch(`http://localhost:5000/tutors/${tutorId}/review`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email: user.email })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to submit review');
    }

   
    setBookings(prev =>
      prev.map(b => 
        b.tutorId === tutorId 
          ? { ...b, reviewed: true, review: (b.review || 0) + 1 }
          : b
      )
    );
    
    toast.success('Review submitted!');
  } catch (err) {
    console.error("Review error:", err);
    toast.error(err.message);
  }
};


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Booked Tutors</h1>
      {bookings.length === 0 ? (
        <p>No tutors booked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((tutor) => (
            <div key={tutor._id} className="border p-4 rounded shadow">
              <img src={tutor.image} alt="tutor" className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{tutor.language}</h2>
              <p>Price: ${tutor.price}</p>
              <p>Reviews: {tutor.review || 0}</p>
              <button
                onClick={() => handleReview(tutor.tutorId)}
                disabled={tutor.reviewed || loadingStates[tutor.tutorId]}
                className={`mt-2 px-4 py-2 rounded ${
                  tutor.reviewed 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {tutor.reviewed 
                  ? 'Already Reviewed' 
                  : loadingStates[tutor.tutorId] 
                    ? 'Processing...' 
                    : 'Review'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedTutor;