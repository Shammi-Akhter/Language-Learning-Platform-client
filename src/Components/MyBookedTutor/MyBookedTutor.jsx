import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const MyBookedTutor = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!user?.email) return;

    const token = localStorage.getItem('access-token');

    const fetchBookings = async () => {
      try {
        const res = await fetch(`https://secjaf-server-side.vercel.app/bookings?email=${user.email}`, {
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
      } finally {
        setLoading(false); 
      }
    };

    fetchBookings();
  }, [user]);

  const handleReview = async (tutorId, bookingId, tutorialId) => {
    setLoadingStates(prev => ({ ...prev, [tutorId]: true }));
    try {
      const token = localStorage.getItem('access-token');

      const resTutor = await fetch(`https://secjaf-server-side.vercel.app/review`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tutorialId: tutorialId || null,
          tutorId: tutorId || null,
          userEmail: user.email,
        }),
      });

      if (!resTutor.ok) {
        const errorData = await resTutor.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }

      const resBooking = await fetch(`https://secjaf-server-side.vercel.app/bookings/${bookingId}/reviewed`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!resBooking.ok) {
        const errorData = await resBooking.json();
        throw new Error(errorData.message || 'Failed to update booking review status');
      }

      setBookings(prev =>
        prev.map(b =>
          b._id === bookingId
            ? {
                ...b,
                reviewed: true,
                tutorReviewCount: (b.tutorReviewCount || 0) + 1
              }
            : b
        )
      );

      toast.success('Review submitted!');
    } catch (err) {
      console.error("Review error:", err);
      toast.error(err.message);
    } finally {
      setLoadingStates(prev => ({ ...prev, [tutorId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 md:mb-10 text-center">My Booked Tutors</h1>

      {bookings.length === 0 ? (
        <p className='text-center'>No tutors booked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded shadow">
              <img src={booking.image} alt="tutor" className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{booking.language}</h2>
              <p>Language: {booking.language}</p>
              <p>Price: ${booking.price}</p>
              <p>Reviews: {booking.tutorReviewCount || 0}</p>
              <button
                onClick={() => handleReview(booking.tutorId, booking._id, booking.tutorialId)}
                disabled={booking.reviewed || loadingStates[booking.tutorId]}
                className={`mt-2 px-4 py-2 rounded ${
                  booking.reviewed
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {booking.reviewed
                  ? 'Already Reviewed'
                  : loadingStates[booking.tutorId]
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