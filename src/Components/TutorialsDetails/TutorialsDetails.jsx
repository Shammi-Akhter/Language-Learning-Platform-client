import { useParams, useNavigate } from 'react-router'; 
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

const TutorialDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [tutorial, setTutorial] = useState(null);
    const [isBooked, setIsBooked] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`https://secjaf-server-side.vercel.app/tutorials/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Tutorial not found');
                }
                return res.json();
            })
            .then(data => setTutorial(data))
            .catch(() => {
                navigate('/error'); 
            });
    }, [id, navigate]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://secjaf-server-side.vercel.app/bookings?tutorialId=${id}&email=${user.email}`)
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
            tutorialId: tutorial._id,
            image: tutorial.image,
            language: tutorial.language,
            price: tutorial.price,
            tutorEmail: tutorial.email,
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

    if (!tutorial) return   <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className='border-2 border-white p-4 rounded-2xl shadow-lg'>
                <img
                    src={tutorial.image}
                    alt={tutorial.language}
                    className="w-full h-64 object-cover rounded"
                />
                <h2 className="text-3xl font-bold mt-4">{tutorial.language} Tutorial</h2>
                <p className="mt-2"><span className="font-semibold">Language:</span> {tutorial.language}</p>
                <p><span className="font-semibold">Price:</span> ${tutorial.price}</p>
                <p><span className="font-semibold">Rating: </span> {tutorial.review}</p>
                <p className=" text-gray-500 mt-1"><span className="font-semibold">Tutor Email: </span>{tutorial.email}</p>
                <p className="mt-2">{tutorial.description}</p>
                <button
                    onClick={handleBooking}
                    disabled={isBooked}
                    className={`mt-4 px-6 py-2 text-white rounded ${isBooked ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isBooked ? 'Booked' : 'Book'}
                </button>
            </div>
        </div>
    );
};

export default TutorialDetails;
