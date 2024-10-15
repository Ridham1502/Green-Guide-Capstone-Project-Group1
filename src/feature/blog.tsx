import React from 'react';
import Header from '../Layout/Header'; 
import Footer from '../Layout/Footer'; 

const Blog: React.FC = () => {
  return (
    <div>
      <Header /> 
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-8">Green Guide Community</h1> 
        <p className="text-lg text-gray-500 mt-2">Sharing knowledge and stories about sustainable plantation practices</p>
        <div className="flex justify-center gap-8 mt-8">
          <div className="w-80 h-48 bg-gray-300 rounded-md">
           
          </div>
          <div className="w-80 h-48 bg-gray-300 rounded-md">
            
          </div>
        </div>
      </section>

      
      <section className="py-16 px-8">
        <h2 className="text-2xl font-semibold">What Our Community Says</h2>
        <p className="text-gray-500 mt-2">Inspiring stories and insights from plantation experts</p>
        <div className="flex flex-col gap-8 mt-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="border rounded-lg p-6 text-center w-3/4" key={index}>
              <div className="w-full h-32 bg-gray-300 rounded-md mb-4">
                <img
            src="/inner-banner.jpg" 
            alt="Gardening"
            className="w-full h-full object-cover"
          />
          </div>
              
             
              <h3 className="text-xl font-semibold">Sustainable Practices in Plantation</h3>
              <p className="text-gray-500 mt-2">
                "Green Guide has changed the way we think about plantation and sustainability. From soil health to water conservation, it covers everything!"
              </p>
              <button className="mt-4 px-4 py-2 border rounded hover:bg-gray-200">
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-16 px-8">
        <h2 className="text-2xl font-semibold">Latest Plantation Insights</h2>
        <p className="text-gray-500 mt-2">Explore recent trends and innovations in sustainable agriculture</p>
        <div className="grid grid-cols-4 gap-8 mt-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="border rounded-lg p-6 text-center" key={index}>
              <div className="w-full h-32 bg-gray-300 rounded-md mb-4">
              <img
                  src=""
                  alt="Plant"
                  className="w-full h-40 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Eco-Friendly Farming Techniques</h3>
              <p className="text-gray-500 mt-2">
                Discover how eco-friendly farming methods are helping communities grow healthier plants while protecting the environment.
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer /> 
    </div>
  );
};

export default Blog;
