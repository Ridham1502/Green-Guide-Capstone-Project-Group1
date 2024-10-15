// GreenGuide.tsx
import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
const GreenGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gray-100 py-16 text-center">
        <h1 className="text-4xl font-bold">Welcome to Green Guide</h1>
        <p className="text-gray-600 mt-4">Your go-to resource for all things gardening!</p>
        <div className="mt-6 space-x-4">
          <button className="bg-gray-300 text-black px-6 py-2 rounded">Get Started</button>
          <button className="bg-black text-white px-6 py-2 rounded">Learn More</button>
        </div>
        <div className="mt-10 mx-auto w-2/3 h-64 bg-gray-200 flex items-center justify-center">
          <img
            src="/inner-banner.jpg" 
            alt="Gardening"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Popular Plants</h2>
          <p className="text-gray-600 mb-8">Discover a variety of plants for your garden.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill("").map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src=""
                  alt="Plant"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Plant {index + 1}</h3>
                  <p className="text-gray-600">Plant Type</p>
                  <p className="text-gray-500">Description of the plant.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default GreenGuide;
