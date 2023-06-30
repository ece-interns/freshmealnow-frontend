import React from "react";
import "./card.css";
import { Link } from 'react-router-dom';
import restaurant1 from "../../assets/restaurant1.jpg";
import restaurant2 from "../../assets/restaurant2.jpg";
import restaurant3 from "../../assets/restaurant3.jpg";
import restaurant4 from "../../assets/restaurant4.jpg";
import restaurants from "../../assets/restaurants.jpg";

const card = () => {
  return (
    <div className="restarunts">
        <div className="heading"><h1>Popular Restaurants In The Town</h1></div>
    <div className="card">
    <Link to="/products">
      <div className="cardImg">
        <img src={restaurant1} alt="restaurant1Img" />
        <h1>Restraunt1</h1>
        <span>"Experience Culinary Nirvana at our Award-Winning Restaurant - Where Flavor Reigns Supreme!"</span>
      </div>
    </Link>
      <div className="cardImg">
        <img src={restaurant2} alt="restaurant2.jpg" />
        <h1>Restaurant2</h1>
        <span>"Escape to a World of Delectable Delights - Your Passport to Unforgettable Dining!"</span>
      </div>
      <div className="cardImg">
        <img src={restaurant3} alt="restaurant3.jpg" />
        <h1>Restaurant3</h1>
        <span>"Indulge in Gastronomic Bliss at our Exquisite Eatery - A Food Lover's Paradise!"</span>
      </div>
      <div className="cardImg">
        <img src={restaurant4} alt="restaurant4.jpg" />
        <h1>Restaurant3</h1>
        <span>"Indulge in Gastronomic Bliss at our Exquisite Eatery - A Food Lover's Paradise!"</span>
      </div>
      <div className="cardImg">
        <img src={restaurants} alt="restaurant5.jpg" />
        <h1>Restaurant3</h1>
        <span>"Indulge in Gastronomic Bliss at our Exquisite Eatery - A Food Lover's Paradise!"</span>
      </div>
      <div className="cardImg">
        <img src={restaurant3} alt="restaurant3.jpg" />
        <h1>Restaurant3</h1>
        <span>"Indulge in Gastronomic Bliss at our Exquisite Eatery - A Food Lover's Paradise!"</span>
      </div>
    </div>
    </div>
  );
};

export default card;