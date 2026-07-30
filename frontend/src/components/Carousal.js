import React from 'react';
import Chicken from '../images/chicken.jpg';
import MomosImage from '../images/momos1.jpg';
import PizzaImage from '../images/pizza.jpg';

export default function Carousal() {
    return (
        <div className="hero-section">

            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                data-bs-interval="3000"
            >

                <div className="carousel-inner" id="carousel">

                    <div className="carousel-item active">
                        <img
                            src={Chicken}
                            className="d-block w-100"
                            alt="Chicken"
                            style={{ filter: "brightness(40%)" }}
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src={PizzaImage}
                            className="d-block w-100"
                            alt="Pizza"
                            style={{ filter: "brightness(40%)" }}
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src={MomosImage}
                            className="d-block w-100"
                            alt="Momos"
                            style={{ filter: "brightness(40%)" }}
                        />
                    </div>

                </div>

                {/* Hero Content */}
                <div className="hero-overlay">

                    <div className="hero-content">

                        <h1 className="hero-title">
                            Delicious Food, Delivered Fast
                        </h1>

                        <p className="hero-subtitle">
                            Discover the best restaurants and order your favourite meals in minutes.
                        </p>

                        <form className="d-flex hero-search">

                            <input
                                className="form-control hero-search-input"
                                type="search"
                                placeholder="Search for pizza, burger, biryani..."
                            />

                            <button
                                className="btn hero-search-btn"
                                type="submit"
                            >
                                Search
                            </button>

                        </form>

                    </div>

                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

            </div>

        </div>
    );
}