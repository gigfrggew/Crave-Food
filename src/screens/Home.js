import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  // State to hold the fetched image URLs for the carousel
  const [carouselImgs, setCarouselImgs] = useState([]);

  // ⚠️ SECURITY NOTE: Ideally, move this key to a .env file (e.g., REACT_APP_UNSPLASH_ACCESS_KEY)
  const UNPLASH_ACCESS_KEY = 'qHuRExRWwhfRUT1etRqujii3lulFKOBxj7ZSGP71Zx8';

  const loadData = async () => {
    try {
      // 1. Fetch Food Data
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
      console.log("API response:", response);
      console.log("Food Items:", response[0]);
      console.log("Food Categories:", response[1]);


      // 2. Fetch Specific Carousel Images by ID (Optimized with Promise.all)
      // Array of Unsplash Photo IDs for the carousel slides
      const imageIDs = ['_qxbJUr9RqI', '_Vzy1i8Cx0g', '7H0NZLbBgyI', 'dKT6Q7q2UKs', 'PxJ9zkM2wdA', 'LR559Dcst70', 'dFE0FNVd4k0', 'q-cWjuOzZHY'];

      // Create an array of all fetch promises concurrently
      const imagePromises = imageIDs.map(id =>
        fetch(`https://api.unsplash.com/photos/${id}?client_id=${UNPLASH_ACCESS_KEY}`)
      );

      // Wait for all fetches to complete
      const imgResponses = await Promise.all(imagePromises);

      // Wait for all responses to be converted to JSON
      const imgData = await Promise.all(imgResponses.map(res => res.json()));

      // Extract the 'regular' URL from the valid responses
      const fetchedImages = imgData
        .filter(data => data.urls && data.urls.regular)
        .map(data => data.urls.regular);

      if (fetchedImages.length < imageIDs.length) {
        console.warn(`${imageIDs.length - fetchedImages.length} image(s) failed to load from Unsplash.`);
      }

      setCarouselImgs(fetchedImages);

    } catch (error) {
      console.error("Error loading data or images:", error);
      // Optional: Set a fallback image array here if the entire fetch fails
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10", top: '80%' }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value) }}
                />
              </div>
            </div>

            {/* 🔥 CRITICAL FIX: Dynamically mapping carousel items */}
            {carouselImgs.length > 0 ? (
              carouselImgs.map((imgUrl, index) => (
                <div
                  key={index}
                  // Conditionally apply the 'active' class ONLY to the first item (index === 0)
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                >
                  <img
                    src={imgUrl}
                    className="d-block w-100"
                    alt={`Food Slide ${index + 1}`}
                    // Added object-fit for better visual consistency
                    style={{ filter: "brightness(30%)", objectFit: "cover", maxHeight: "550px" }}
                  />
                </div>
              ))
            ) : (
              // Fallback while waiting for Unsplash fetch
              <div className="carousel-item active">
                <img src="https://via.placeholder.com/1200x600?text=Loading..." className="d-block w-100" alt="loading" style={{ filter: "brightness(30%)" }} />
              </div>
            )}

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {
          foodCat.length > 0 ? (
            foodCat.map((category) => (
              <div key={category._id} className="row mb-3">
                <div className="fs-3 m-3">
                  {category.CategoryName}
                </div>
                <hr />
                <div className="row">
                  {/* Filter by Category and Search */}
                  {foodItem
                    .filter((item) => item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase()))
                    .length > 0 ? (
                    foodItem
                      .filter((item) => item.CategoryName === category.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase()))
                      .map((filterItems) => (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 mb-4">
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      ))
                  ) : (
                    <div className="text-muted m-3">
                      {search === '' ? "No items found in this category." : `No items matching "${search}" found in this category.`}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
      </div>

      <Footer />
    </div>
  );
}