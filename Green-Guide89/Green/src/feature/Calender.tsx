"use client";

import { useState, useEffect } from "react";
import Header from "../Layout/Header";
import { Search, X } from "lucide-react";
import axiosInstance from "../axios";
import Footer from "../Layout/Footer";
import { Plant, PlantSchedule } from "../types";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function PlantCalendar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axiosInstance.get("/api/plants/list");
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, []);

  const getSchedule = (plant: Plant): PlantSchedule => {
    const schedule: PlantSchedule = {
      startInside: [],
      transplant: [],
      sowOutside: [],
      beginHarvest: [],
    };

    const addToSchedule = (dateString: string, type: keyof PlantSchedule) => {
      const date = new Date(dateString);
      const month = date.getMonth();
      if (!schedule[type].includes(month + 1)) {
        schedule[type].push(month + 1);
      }
    };

    addToSchedule(plant.plantingTimes.springStartIndoors, "startInside");
    addToSchedule(plant.plantingTimes.fallStartIndoors, "startInside");
    addToSchedule(plant.plantingTimes.springTransplant, "transplant");
    addToSchedule(plant.plantingTimes.fallTransplant, "transplant");
    addToSchedule(plant.plantingTimes.springSowOutdoors, "sowOutside");
    addToSchedule(plant.plantingTimes.fallSowOutdoors, "sowOutside");

    return schedule;
  };

  const filteredPlants = plants.filter((plant) =>
    plant.generalInfo.plantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const buttonColors = {
    springstartIndoors: "bg-pink-600 text-white",
    springTransplant: "bg-orange-600 text-white",
    springsowOutdoors: "bg-purple-600 text-white",
    fallstartIndoors: "bg-teal-600 text-white",
    fallTransplant:"bg-yellow-100 text-blue",
    fallsowOutdoors:"bg-red-100 text-black",
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-8 mt-8 transition-all transform hover:scale-105">
          <h2 className="text-4xl font-extrabold text-center mb-8 text-teal-700">
            Plant Calendar
          </h2>

          {/* Feature description section */}
          <p className="text-center text-gray-600 mb-8">
            Welcome to the Plant Calendar! Easily track optimal planting, transplanting,
            and harvesting times for each plant in your garden. This tool is designed to
            guide you through the seasons and help you plan for indoor starts, outdoor
            sowing, and more. Simply search for a plant to view its unique schedule, and
            click on each entry for detailed monthly guidance.
          </p>

          <div className="flex items-center mb-6">
          <div className="relative flex-grow">
  <label htmlFor="searchInput" className="sr-only">
    Search for a plant
  </label>
  <Search
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    aria-hidden="true"
  />
  <input
    id="searchInput"
    type="text"
    placeholder="Search plant name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
    aria-label="Search for a plant by name"
  />
</div>

          </div>

          {filteredPlants.length > 0 ? (
            <div className="space-y-4">
              {filteredPlants.map((plant) => {
                const schedule = getSchedule(plant);
                return (
                  <div
                    key={plant._id}
                    className="flex flex-col sm:flex-row items-start bg-gray-100 rounded-lg shadow-md p-4 mb-4 transition-transform hover:bg-gray-200 hover:shadow-lg cursor-pointer"
                    onClick={() => setSelectedPlant(plant)}
                  >
                    <img
                      src={
                        typeof plant.generalInfo.img === "string"
                          ? plant.generalInfo.img
                          : URL.createObjectURL(plant.generalInfo.img)
                      }
                      alt={plant.generalInfo.plantName}
                      className="w-full sm:w-32 sm:h-32 object-cover rounded-lg shadow-lg mb-2 sm:mb-0 sm:mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        {plant.generalInfo.plantName}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {months.map((month, index) => (
                          <div
                            key={month}
                            className="flex-grow text-center relative"
                          >
                            <span className="text-xs text-gray-600">{month}</span>
                            <div className="h-8 border-r border-gray-300 relative">
                              {schedule.startInside.includes(index + 1) && (
                                <div className="absolute inset-0 bg-pink-500 opacity-50"></div>
                              )}
                              {schedule.transplant.includes(index + 1) && (
                                <div className="absolute inset-0 bg-orange-500 opacity-50"></div>
                              )}
                              {schedule.sowOutside.includes(index + 1) && (
                                <div className="absolute inset-0 bg-purple-500 opacity-50"></div>
                              )}
                              {schedule.beginHarvest.includes(index + 1) && (
                                <div className="absolute inset-0 bg-teal-500 opacity-50"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No plants found.</p>
          )}

          <div className="flex justify-center mt-6 space-x-4 flex-wrap">
            <button className={`${buttonColors.springstartIndoors} px-4 py-2 rounded-full bg-pink-100 text-sm`}>
              Spring Start Indoors
            </button>
            <button className={`${buttonColors.springTransplant} px-4 py-2 rounded-full text-sm`}>
              Spring Transplant
            </button>
            <button className={`${buttonColors.springsowOutdoors} px-4 py-2 rounded-full text-sm`}>
             Spring Sow Outside
            </button>
            <button className={`${buttonColors.fallstartIndoors} px-4 py-2 rounded-full text-sm`}>
              Fall Start Indoors
            </button>
            <button className={`${buttonColors.fallTransplant} px-4 py-2 rounded-full text-sm`}>
              Fall Sow Outside
            </button>

          </div>
        </div>

        {selectedPlant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl transform transition-all duration-300 scale-105">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedPlant.generalInfo.plantName} Planting Schedule
                </h3>
                <button
                  onClick={() => setSelectedPlant(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {months.map((month, index) => {
                  const isSpringStartIndoors = [
                    new Date(selectedPlant.plantingTimes.springStartIndoors).getMonth(),
                  ].includes(index);
                  const isSpringTransplant = [
                    new Date(selectedPlant.plantingTimes.springTransplant).getMonth(),
                  ].includes(index);
                  const isSpringSowOutdoors = [
                    new Date(selectedPlant.plantingTimes.springSowOutdoors).getMonth(),
                  ].includes(index);
                  const isFallStartIndoors = [
                    new Date(selectedPlant.plantingTimes.fallStartIndoors).getMonth(),
                  ].includes(index);
                  const isFallTransplant = [
                    new Date(selectedPlant.plantingTimes.fallTransplant).getMonth(),
                  ].includes(index);
                  const isFallSowOutdoors = [
                    new Date(selectedPlant.plantingTimes.fallSowOutdoors).getMonth(),
                  ].includes(index);

                  return (
                    <div
                      key={month}
                      className="p-3 rounded-lg shadow-sm border relative text-center bg-gray-50 hover:bg-gray-100 transition-all"
                    >
                      <span className="text-sm font-semibold text-gray-800">
                        {month}
                      </span>
                      <div className="mt-2 space-y-1">
                        {isSpringStartIndoors && (
                          <p className="text-xs bg-pink-100 text-pink-600 rounded px-2">
                            Spring Start Indoors
                          </p>
                        )}
                        {isSpringTransplant && (
                          <p className="text-xs bg-orange-100 text-orange-600 rounded px-2">
                            Spring Transplant
                          </p>
                        )}
                        {isSpringSowOutdoors && (
                          <p className="text-xs bg-purple-100 text-purple-600 rounded px-2">
                            Spring Sow Outdoors
                          </p>
                        )}
                        {isFallStartIndoors && (
                          <p className="text-xs bg-teal-100 text-teal-600 rounded px-2">
                            Fall Start Indoors
                          </p>
                        )}
                        {isFallTransplant && (
                          <p className="text-xs bg-yellow-100 text-yellow-600 rounded px-2">
                            Fall Transplant
                          </p>
                        )}
                        {isFallSowOutdoors && (
                          <p className="text-xs bg-green-100 text-green-600 rounded px-2">
                            Fall Sow Outdoors
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
