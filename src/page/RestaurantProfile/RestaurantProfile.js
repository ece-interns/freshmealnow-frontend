import React from "react";
import { Link } from "react-router-dom";
import "./RestaurantProfile.css";
import { useSelector } from "react-redux";

const RestaurantProfile = () => {
  const { restaurantInfo } = useSelector((state) => state.authRestaurant);
  return (
    <>
      <div>{JSON.stringify(restaurantInfo)}</div>
      <div>
        <Link to="/restaurant/add-product">Add Product</Link>
      </div>
    </>
  );
};

export default RestaurantProfile;
