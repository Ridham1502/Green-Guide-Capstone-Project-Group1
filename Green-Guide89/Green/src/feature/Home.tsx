"use client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import axiosInstance from "../axios";
import type { Plant , Review} from "../types";
import { FaLeaf, FaCalendarAlt, FaUsers } from 'react-icons/fa'; 
const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [plantsData, setPlantsData] = useState<Plant[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const navigate = useNavigate();

  const fetchPlants = async () => {
    try {
      const response = await axiosInstance.get("/api/plants/list");
      setPlantsData(response.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get("/api/reviews/list");
      setReviews(response.data.review);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchPlants();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviewText) {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post(
          "/api/reviews",
          { review: reviewText },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews((prev) => [...prev, response.data.review]);
        setReviewText("");
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleCategorySearch = async (searchTerm: string) => {
    if (searchTerm) {
      try {
        const response = await axiosInstance.post("/api/plants/search", {
          category: searchTerm,
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching plants by category:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setCategory(searchTerm);
    handleCategorySearch(searchTerm);
  };

  const handlePlantClick = (plantId: string) => {
    navigate(`/plants/${plantId}`);
  };

  const displayedReviews = reviews.slice(0, 10);

  return (
    <>
      <Header />
      <div className="w-full max-w-screen-xl mx-auto px-6 py-8 bg-gray-100 min-h-screen flex flex-col mt-4">
        {/* Hero Section */}
       <section
  className="relative bg-cover bg-center text-white py-24 shadow-xl h-[60vh] flex items-center justify-center"
  style={{ backgroundImage: "url('/6.avif')" }}
  aria-labelledby="welcome-heading"
>
  <div className="absolute inset-0 bg-black opacity-40" aria-hidden="true"></div>
  <div className="container text-center z-10">
    <h1
      id="welcome-heading"
      className="text-4xl sm:text-5xl font-bold mb-4 text-white leading-tight"
    >
      Welcome to Green Guide
    </h1>
    <p className="text-lg sm:text-xl mb-6 text-gray-200">
      Discover plant care tips, seasonal guides, and connect with a vibrant
      community.
    </p>
    <Link
      to="/blog"
      className="bg-teal-600 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:bg-teal-500 transition duration-300"
      aria-label="View our blog for plant care tips, seasonal guides, and more"
    >
      View Blog
    </Link>
  </div>
</section>



        {/* Search Plants Section */}
        <section className="bg-white py-14" aria-labelledby="search-plants-heading">
                <div className="container mx-auto text-center">
                    <h2
                        id="search-plants-heading"
                        className="text-3xl font-semibold text-gray-800 mb-6"
                    >
                        Search Plants by Category
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Looking for a specific plant? Use the search bar to explore plants
                        by family or category.
                    </p>
                    <label htmlFor="plant-category-search" className="sr-only">
                        Search for plants by family or category
                    </label>
                    <input
                        id="plant-category-search"
                        type="text"
                        value={category}
                        onChange={handleInputChange}
                        placeholder="Enter plant family or category"
                        className="block mx-auto w-full md:w-1/2 rounded-md border border-gray-300 px-5 py-3 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                    />
                </div>
            </section>

            {/* Search Results Section */}
            {searchResults.length > 0 && (
                <section
                    className="py-16 bg-gray-100"
                    aria-labelledby="search-results-heading"
                >
                    <div className="container mx-auto">
                        <h2
                            id="search-results-heading"
                            className="text-3xl font-semibold text-gray-800 mb-8 text-center"
                        >
                            Search Results
                        </h2>
                        <ul
                            className="space-y-4"
                            aria-label="List of search results for plants"
                        >
                            {searchResults.map((plant) => (
                                <li
                                    key={plant._id}
                                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                                    onClick={() => handlePlantClick(plant._id)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View details for ${plant.generalInfo.plantName}`}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            handlePlantClick(plant._id);
                                        }
                                    }}
                                >
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {plant.generalInfo.plantName}
                                    </h3>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

        )}

        {/* Popular Plants Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">
              Popular Plants
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Discover the most popular and easy-to-care-for plants.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {plantsData.slice(0, 6).map((plant) => (
                <div
                  key={plant._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                  onClick={() => handlePlantClick(plant._id)}
                >
                  <img
                    src={
                      typeof plant.generalInfo.img === "string"
                        ? plant.generalInfo.img
                        : URL.createObjectURL(plant.generalInfo.img)
                    }
                    alt={plant.generalInfo.plantName}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {plant.generalInfo.plantName}
                  </h3>
                  <p className="text-gray-600">
                    {plant.generalInfo.taxonomicName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Reviews Section */}
        <section className="py-12 bg-gray-100" aria-labelledby="user-reviews-heading">
  <div className="container mx-auto text-center">
    <h2
      id="user-reviews-heading"
      className="text-3xl font-semibold text-gray-800 mb-8"
    >
      User Reviews
    </h2>
    <p className="text-lg text-gray-600 mb-6">
      See what our plant community has to say about their experiences!
    </p>
    <div className="max-w-xl mx-auto mb-8">
      <form onSubmit={handleReviewSubmit} className="space-y-6">
        <label htmlFor="review-text" className="sr-only">
          Write your review
        </label>
        <textarea
          id="review-text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="block w-full rounded-lg border border-gray-300 px-5 py-4 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
          aria-describedby="review-instruction"
        />
        <p id="review-instruction" className="text-sm text-gray-500">
          Share your thoughts about your experience with plants.
        </p>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg text-sm font-semibold hover:bg-teal-500 transition duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      aria-labelledby="reviews-list-heading"
    >
      <h3 id="reviews-list-heading" className="sr-only">
        List of user reviews
      </h3>
      {displayedReviews.map((review) => (
        <div
          key={review._id}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          <p className="text-gray-800">{review.review}</p>
          <p className="text-gray-500 text-right mt-2">
            - {review.user.name}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


        {/* Explore Features Section */}
        <section className="bg-gray-100 py-12">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-6">
      Explore More Features
    </h2>
    <p className="text-lg text-gray-600 mb-10">
      Discover exclusive features designed to enhance your plant care journey, connect with fellow enthusiasts, and make gardening easier and more enjoyable!
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Link
        to="/plant"
        className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex flex-col items-center"
      >
        <FaLeaf className="text-green-500 text-4xl mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Plant Care Guide
        </h3>
        <p className="text-gray-600 mb-2">
          Access personalized plant care tips and expert advice.
        </p>
        <ul className="text-gray-600 text-left">
          <li>🌱 Step-by-step care instructions for various plants.</li>
          <li>💧 Watering schedules tailored to your local climate.</li>
          <li>🌞 Light requirements and placement suggestions.</li>
          <li>🐛 Natural pest control methods and solutions.</li>
        </ul>
      </Link>
      <Link
        to="/calender"
        className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex flex-col items-center"
      >
        <FaCalendarAlt className="text-green-500 text-4xl mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Seasonal Calendar
        </h3>
        <p className="text-gray-600 mb-2">
          Stay on top of seasonal care with our tailored plant calendar.
        </p>
        <ul className="text-gray-600 text-left">
          <li>🗓️ Monthly reminders for planting, pruning, and harvesting.</li>
          <li>🌦️ Alerts for seasonal weather changes.</li>
          <li>🌻 Tips for preparing your garden for each season.</li>
          <li>🔄 Crop rotation schedules for optimal growth.</li>
        </ul>
      </Link>
      <Link
        to="/post"
        className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex flex-col items-center"
      >
        <FaUsers className="text-green-500 text-4xl mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Community Forum
        </h3>
        <p className="text-gray-600 mb-2">
          Connect with other plant lovers and share your experiences.
        </p>
        <ul className="text-gray-600 text-left">
          <li>👩‍🌾 Share your gardening stories and tips.</li>
          <li>🤝 Collaborate on local gardening projects.</li>
          <li>📸 Show off your plant collections and setups.</li>
          <li>🔍 Seek advice and recommendations from fellow gardeners.</li>
        </ul>
      </Link>
    </div>
  </div>
</section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
