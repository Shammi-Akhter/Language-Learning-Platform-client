import React from 'react';

const AboutUs = () => {
    return (
        <div>
            <div className=" py-12 px-6 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold  mb-6 text-center">About SECJAF</h2>
                    <p className=" text-lg mb-6 leading-relaxed">
                        <span className="font-semibold">SECJAF</span> is a dynamic language learning platform designed to help you find expert tutors, watch high-quality tutorials, and master new languages efficiently. Whether you're a beginner or looking to polish your fluency, SECJAF is your one-stop solution for all language learning needs.
                    </p>


                    <p className=" text-lg mb-6 leading-relaxed">
                        Our platform connects students with qualified tutors from around the world. You can browse detailed tutor profiles, schedule lessons, and even leave reviews to help others in their language journey.
                    </p>

                    <p className=" text-lg mb-6 leading-relaxed">
                        We offer tutorials in multiple languages, cover grammar, vocabulary, pronunciation, and cultural aspects to give learners a rich and immersive experience. Our goal is to make language learning accessible, personalized, and enjoyable for everyone.
                    </p>


                    <ul className="list-disc list-inside  text-lg">
                        <li>Find tutors by language or category</li>
                        <li>Watch and follow tutorials at your own pace</li>
                        <li>Leave and read reviews for better guidance</li>
                        <li>Track your progress and achievements</li>
                        <li>Engage with a global language-learning community</li>
                    </ul>

                    <p className=" text-lg mt-6 leading-relaxed">
                        Join <span className="font-semibold">SECJAF</span> today and start your journey to mastering a new language, connecting with people worldwide, and building a brighter future through communication.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;