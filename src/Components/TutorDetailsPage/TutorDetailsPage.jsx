import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const TutorDetails = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const { user } = useAuth();
 const navigate = useNavigate(); // 👈
  
  useEffect(() => {
    fetch(`https://secjaf-server-side.vercel.app/tutors/${id}`,{
         headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
       .then(res => {
        if (!res.ok) {
          throw new Error('Tutorial not found');
        }
        return res.json();
      })
      .then(data => setTutor(data))
      .catch(() => {
        navigate('/error'); // 👈 navigate to error page
      });
  }, [id, navigate]);
  
  useEffect(() => {
    if (user?.email) {
      fetch(`https://secjaf-server-side.vercel.app/bookings?tutorId=${id}&email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data?.alreadyBooked) {
            setIsBooked(true);
          }
        })
        .catch(() => {
          setIsBooked(false);
        });
    }
  }, [id, user?.email]);

  const handleBooking = () => {
    if (isBooked) {
      toast.error("Already booked");
      return;
    }

    const bookingData = {
      tutorId: tutor._id,
      image: tutor.image,
      language: tutor.language,
      price: tutor.price,
      tutorEmail: tutor.email,
      email: user?.email,
    };

    fetch('https://secjaf-server-side.vercel.app/bookings', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify(bookingData),
})
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success('Booking successful!');
          setIsBooked(true); 
        } else if (data.message === 'Already booked') {
          toast.error('Already booked');
          setIsBooked(true);
        }
      })
      .catch(() => toast.error('Booking failed'));
  };

  if (!tutor) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        src={tutor.image}
        alt={tutor.name}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{tutor.name}</h2>
      <p className="mt-2">Language: {tutor.language}</p>
      <p>Price: ${tutor.price}</p>
      <p>Rating: {tutor.review}</p>
      <p className="mt-2">{tutor.details}</p>
      <p className="text-sm text-gray-500 mt-1">Email: {tutor.email}</p>

      <button
        onClick={handleBooking}
        disabled={isBooked}
        className={`mt-4 px-6 py-2 text-white rounded ${
          isBooked ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isBooked ? 'Booked' : 'Book'}
      </button>
    </div>
  );
};

export default TutorDetails;
