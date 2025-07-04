import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const TutorDetails = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`https://secjaf-server-side.vercel.app/tutors/${id}`, {
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
        navigate('/error'); 
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

  if (!tutor) return  <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>;

  return (
    <div className=" max-w-2xl mx-auto border-2 border-white md:p-4 p-2 md:my-10 rounded-2xl shadow-lg">
      <img
        src={tutor.image}
        alt={tutor.name}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{tutor.name}</h2>
      <p className="mt-2"><span className="font-semibold">Language:</span>{tutor.language}</p>
      <p><span className="font-semibold">Price::</span> ${tutor.price}</p>
      <p> <span className="font-semibold">Rating:</span>{tutor.review}</p>
      <p className=" text-gray-500 mt-1"> <span className="font-semibold">Email:</span>{tutor.email}</p>
      <p className="mt-2">{tutor.details}</p>


      <button
        onClick={handleBooking}
        disabled={isBooked}
        className={`mt-4 px-6 py-2 text-white rounded ${isBooked ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
      >
        {isBooked ? 'Booked' : 'Book'}
      </button>
    </div>
  );
};

export default TutorDetails;
