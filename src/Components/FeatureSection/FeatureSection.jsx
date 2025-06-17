import { motion } from "framer-motion";

const features = [
  {
    title: "Learn From Native Speakers",
    description:
      "Practice with real speakers to gain authentic pronunciation, cultural insights, and confidence.",
    image: "https://i.postimg.cc/rmhXfDQW/feature-1.jpg",
  },
  {
    title: "Interactive & Fun Lessons",
    description:
      "Gamified lessons, live quizzes, and personalized feedback make learning effective and enjoyable.",
    image: "https://i.postimg.cc/d04xYzrc/feature-2.png",
  },
  {
    title: "Track Your Progress Easily",
    description:
      "Monitor your growth with personalized dashboards, level badges, and performance charts.",
    image: "https://i.postimg.cc/Kc6FwMmr/feature-3.jpg",
  },
];
console.log(motion);
const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 space-y-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 md:mb-20">
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
