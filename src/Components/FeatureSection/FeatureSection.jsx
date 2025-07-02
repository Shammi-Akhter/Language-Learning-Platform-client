import { motion } from "framer-motion";

const features = [
  {
    title: "Learn From Native Speakers",
    description:
      "Practice with real native speakers to enhance your pronunciation, fluency, and comprehension. Gain firsthand insights into cultural nuances, idiomatic expressions, and real-world conversations. Whether you're preparing for travel, work, or personal growth, interacting with native speakers builds confidence and helps you communicate more naturally and effectively.",
    image: "https://i.postimg.cc/rmhXfDQW/feature-1.jpg",
  },
  {
    title: "Interactive & Fun Lessons",
    description:
      "Experience language learning like never before with engaging, gamified lessons designed to keep you motivated. Participate in live quizzes that test your knowledge in real time, and receive instant, personalized feedback to help you improve continuously. Each lesson is crafted to be dynamic and enjoyable, blending education with entertainment to make learning both effective and fun. Whether you're a beginner or advancing your skills, our interactive approach keeps you actively involved every step of the way.",
    image: "https://i.postimg.cc/d04xYzrc/feature-2.png",
  },
  {
    title: "Track Your Progress Easily",
    description:
      "Stay motivated by clearly seeing how far you've come. With personalized dashboards, you can effortlessly monitor your learning journey—track completed lessons, time spent, and skill improvements. Earn level badges as you progress, adding a sense of achievement to every milestone. Visual performance charts help you identify strengths and focus on areas that need improvement, ensuring a smarter, more goal-oriented learning experience.",
    image: "https://i.postimg.cc/Kc6FwMmr/feature-3.jpg",
  },
];
console.log(motion);
const FeatureSection = () => {
  return (
    <section className="  md:my-10 my-5 md:py-10 py-5">
      <div className="container mx-auto px-4 space-y-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 ">
          Why Choose SECJAF?
        </h2>

        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-8`}
          >
            <div className="md:w-1/2">
              <img
                src={feature.image}
                alt={feature.title}
                className="rounded-xl shadow-md w-full object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-lg">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
