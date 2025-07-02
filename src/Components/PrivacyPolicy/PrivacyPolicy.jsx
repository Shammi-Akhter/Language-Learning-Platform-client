import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className=" py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold  mb-6 text-center">Privacy Policy</h2>

        <p className=" text-lg mb-4">
          At <strong>SECJAF</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our platform.
        </p>

        <h3 className="text-2xl font-semibold  mt-6 mb-2 text-left">Information We Collect</h3>
        <p className="text-gray-700 text-lg mb-4">
          We may collect the following types of personal information:
        </p>
        <ul className="list-disc list-inside  text-lg mb-4">
          <li>Name and email address during registration</li>
          <li>Profile information including photo and selected languages</li>
          <li>Usage data such as page visits, searches, and interactions</li>
          <li>Payment and booking details (if applicable)</li>
        </ul>

        <h3 className="text-2xl font-semibold  mt-6 mb-2 text-left">How We Use Your Information</h3>
        <ul className="list-disc list-inside  text-lg mb-4">
          <li>To provide access to tutors, tutorials, and other features</li>
          <li>To personalize your learning experience</li>
          <li>To improve platform performance and usability</li>
          <li>To send important updates, notifications, or promotional emails (you may opt out)</li>
        </ul>

        <h3 className="text-2xl font-semibold  mt-6 mb-2 text-left"> Data Security</h3>
        <p className=" text-lg mb-4">
          We use appropriate technical and organizational security measures to protect your data. However, no method of transmission over the internet is 100% secure.
        </p>

        <h3 className="text-2xl font-semibold  mt-6 mb-2 text-left">Third-Party Services</h3>
        <p className=" text-lg mb-4">
          We may use third-party services for analytics, payment processing, and communication. These services may collect information as governed by their own privacy policies.
        </p>

        <h3 className="text-2xl font-semibold  mt-6 mb-2 text-left">Your Rights</h3>
        <p className="text-lg mb-4">
          You have the right to access, update, or delete your personal data. If you wish to exercise these rights, please contact us via email.
        </p>

        <h3 className="text-2xl font-semibold  mt-6 mb-2 text-left">Changes to This Policy</h3>
        <p className=" text-lg mb-4">
          We may update this policy from time to time. We will notify you of any significant changes through email or the platform.
        </p>
        <p className=" text-sm mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
