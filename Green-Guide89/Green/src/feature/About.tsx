import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const About: React.FC = () => {
    return (
        <>
            <Header />
            <div className="bg-gradient-to-r from-teal-200 to-teal-400 min-h-screen py-8 px-6 sm:px-8">
                <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                    <h1 className="text-4xl font-extrabold text-center text-teal-800 mb-8">About Green Guide</h1>
                    <p className="text-lg text-gray-800 mb-6">
                        Welcome to <span className="text-teal-600 font-semibold">Green Guide</span>, your ultimate companion for indoor and outdoor gardening. Our app is designed to help gardening enthusiasts of all levels—from beginners to experts—create and maintain beautiful gardens with ease. Whether you have a small balcony or a sprawling backyard, Green Guide is here to guide you on your gardening journey.
                    </p>

                    <h2 className="text-3xl font-semibold text-teal-700 mt-10 mb-6">Key Features</h2>
                    <ul className="space-y-6 text-gray-700">
                        <li className="flex items-center space-x-4">
                            <span className="text-3xl text-teal-600">🌱</span>
                            <div>
                                <strong className="text-xl text-teal-800">Garden Management</strong>
                                <p>Easily create and manage multiple gardens, keeping track of your plants, their needs, and growth progress.</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-4">
                            <span className="text-3xl text-teal-600">🌿</span>
                            <div>
                                <strong className="text-xl text-teal-800">Plant Library</strong>
                                <p>Access a comprehensive library of plants with detailed care instructions, ideal growing conditions, and pest management tips.</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-4">
                            <span className="text-3xl text-teal-600">💧</span>
                            <div>
                                <strong className="text-xl text-teal-800">Watering Scheduler</strong>
                                <p>Never forget to water your plants! Set reminders and schedules for watering and fertilizing your plants.</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-4">
                            <span className="text-3xl text-teal-600">🌞</span>
                            <div>
                                <strong className="text-xl text-teal-800">Lighting Recommendations</strong>
                                <p>Get personalized lighting tips based on your specific plant types and their requirements.</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-4">
                            <span className="text-3xl text-teal-600">📅</span>
                            <div>
                                <strong className="text-xl text-teal-800">Seasonal Tips</strong>
                                <p>Receive tailored advice for seasonal gardening tasks, ensuring your garden thrives year-round.</p>
                            </div>
                        </li>
                    </ul>

                    <h2 className="text-3xl font-semibold text-teal-700 mt-10 mb-6">Why Choose Green Guide?</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Our app is not just a tool; it’s a community for garden lovers. We believe that everyone should have the opportunity to enjoy the beauty and benefits of gardening. Green Guide offers:
                    </p>
                    <ul className="list-disc list-inside space-y-4 text-gray-700">
                        <li>✅ User-friendly interface that makes gardening enjoyable.</li>
                        <li>✅ Regular updates with new features and plant information.</li>
                        <li>✅ Community support through forums and sharing your gardening experiences.</li>
                        <li>✅ Resources for sustainable gardening practices to help you create an eco-friendly garden.</li>
                    </ul>

                    <h2 className="text-3xl font-semibold text-teal-700 mt-10 mb-6">Get Started!</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Join us in nurturing your green thumb! Download Green Guide today and start creating your dream garden. Together, we can cultivate a world where every space is lush, vibrant, and full of life.
                    </p>
                    <div className="flex justify-center mt-8">
                        <button className="bg-teal-600 text-white py-3 px-8 rounded-xl shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105">
                            Start Your Gardening Journey
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
