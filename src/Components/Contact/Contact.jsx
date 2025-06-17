import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className=" py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-indigo-800 mb-6">Contact Us</h2>
        <p className="text-gray-700 text-lg mb-10">
          Have a question, suggestion, or need support? Feel free to reach out to us.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 border-2 border-white shadow-2xl rounded-lg p-8 ">
          <div>
            <label htmlFor="name" className="block  font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block  font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 !text-white font-semibold py-2 px-6 rounded hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12 text-gray-700">
          <p><strong>Email:</strong> support@secjaf.com</p>
          <p><strong>Phone:</strong> +880 1234-567890</p>
          <p><strong>Address:</strong> Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
