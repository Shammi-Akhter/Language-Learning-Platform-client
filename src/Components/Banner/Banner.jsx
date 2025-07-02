import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        arrows: false,
        pauseOnHover: false,
    };

    const images = [
        "https://i.postimg.cc/XYTBxrdb/banner-1.png",
        "https://i.postimg.cc/cC4v6wyQ/banner-4.webp",
        "https://i.postimg.cc/FFDf8W3G/banner-5.jpg",
        "https://i.postimg.cc/C1J1y5Bd/banner-2222.jpg",
        "https://i.postimg.cc/qBbRjtH5/banner-3.jpg"
    ];

    return (
        <div className=''>
            <div className="w-full h-full relative container mx-auto md:pt-2">

                <Slider {...settings}>
                    {images.map((url, idx) => (
                        <div key={idx}>
                            <img src={url} alt={`Slide ${idx}`} className="w-full h-[400px] object-cover" />
                        </div>
                    ))}
                </Slider>


                <div className="absolute w-full top-150 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10 text-center">
                    {/* <h1
                        className="text-2xl md:text-4xl font-bold"
                        style={{ textShadow: '4px 4px 20px rgba(255, 255, 0, 0.9)' }}
                    >
                        "From Hello to Fluent – Start Your Journey Today"
                    </h1> */}
                    {/* <p
                        className="text-sm md:text-xl font-bold md:p-5"
                        style={{ textShadow: '3px 3px 15px rgba(255, 255, 0, 0.8)' }}
                    >
                        "From beginner basics to fluent conversations, explore courses, expert tutors, and immersive experiences that bring language learning to life. Join a global community where your voice truly belongs."
                    </p> */}
                </div>

            </div>
        </div>
    );
};

export default Banner;
