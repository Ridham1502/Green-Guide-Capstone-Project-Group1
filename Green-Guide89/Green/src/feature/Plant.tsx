"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

export default function PlantManagement() {
  const [plantsData, setPlantsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlantsData = async () => {
      try {
        const response = await axiosInstance.get("/api/plants/list");
        setPlantsData(response.data || []);
      } catch (error) {
        console.error("Error fetching plants data:", error);
        setPlantsData([]);
      }
    };
    fetchPlantsData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row w-full h-full bg-gray-50 p-8 gap-8">
      {/* Left Section - Discount Roulette */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <h1 className="text-4xl font-bold text-gray-800">Explore Our Plant Catalogue</h1>
        <p className="mt-4 text-center text-gray-500">
        Discover the perfect plants for your home or garden! Whether you’re a plant enthusiast or just starting out, we have something for everyone.
        </p>
        <div className="mt-6 text-2xl font-semibold text-gray-700 space-y-2">
          <p>LOW MAINTENANCE</p>
          <p>INDOOR FRIENDLY</p>
          <p>EVERGREEN BEAUTIES</p>
        </div>
        <div className="bg-[url('./assets/bg.jpg')] absolute inset-0 flex items-center justify-center opacity-20">
          
        </div>
      </div>

      {/* Right Section - Side Cards */}
      <div className="flex flex-col space-y-6 lg:w-1/3">
        {/* Plant Finder */}
        <div className="bg-green-100 rounded-lg shadow-md p-6 flex flex-col items-center">
  <h2 className="text-xl font-bold text-gray-800">Eco-Friendly Reminder</h2>
  <p className="mt-4 text-gray-600 italic text-center">"Take care of the earth, and the earth will take care of you." - Unknown</p>
  <p className="mt-6 text-sm text-gray-500">Be kind to nature, and it will reward you! 🌎</p>
</div>


        
        <div className="bg-lime-50 rounded-lg shadow-md p-6 flex flex-col items-center">
  <h2 className="text-xl font-bold text-gray-800">Plant Health Tip</h2>
  <p className="mt-4 text-gray-600 italic text-center">"A good rule of thumb: If the soil feels dry, it's time to water your plant!"</p>
  <p className="mt-6 text-sm text-gray-500">Take care of your plants, and they’ll thrive! 🌿</p>
</div>



       
        <div className="bg-teal-100 rounded-lg shadow-md p-6 flex flex-col items-center">
  <h2 className="text-xl font-bold text-gray-800">Nature Quote</h2>
  <p className="mt-4 text-gray-600 italic text-center">"In all things of nature there is something of the marvelous." - Aristotle</p>
  <p className="mt-6 text-sm text-gray-500">Embrace the beauty of nature every day! 🌳</p>
</div>

      </div>
    </div>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-serif font-semibold text-teal-500 text-center mb-10">
          Plants
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plantsData && plantsData.length > 0 ? (
            plantsData.map((plant) => (
              <div
              key={plant._id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              role="article"
              aria-labelledby={`plant-title-${plant._id}`}
            >
              <div className="relative">
                <Link
                  to={`/plants/${plant._id}`}
                  className="block"
                  aria-label={`View details about ${plant.generalInfo?.plantName || "this plant"}`}
                >
                 
                </Link>
              </div>
            
              <h3
                id={`plant-title-${plant._id}`}
                className="text-2xl font-semibold text-gray-800 mt-4"
              >
                <Link
                  to={`/plants/${plant._id}`}
                  className="text-gray-800 hover:text-teal-600 transition duration-300"
                >
                  {plant.generalInfo?.plantName || "Unnamed Plant"}
                </Link>
              </h3>
            
              <p
                className="text-gray-600 text-sm mt-2 mb-4 line-clamp-3"
                aria-label="Plant description"
              >
                {plant.generalInfo?.description || "No description available"}
              </p>
            
              <div className="mt-4 text-center">
                <Link
                  to={`/plants/${plant._id}`}
                  className="bg-teal-500 text-white py-3 px-6 rounded-lg text-md font-medium shadow-lg hover:bg-teal-600 transition duration-300"
                  aria-label={`View detailed information about ${plant.generalInfo?.plantName || "this plant"}`}
                >
                  View Details
                </Link>
              </div>
            </div>
            
            ))
          ) : (
            <div className="text-center text-gray-600 col-span-3 flex flex-col justify-center items-center">
              <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-gray-500 mb-6"></div>
              <p className="text-xl mb-4">No plants found. Start growing!</p>
              <button
                onClick={() => { }}
                className="mt-4 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
              >
                + Add Your First Plant
              </button>
            </div>
          )}
        </div>


      </div>
      <Footer />
    </>
  );
}
