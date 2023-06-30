import React from "react";
import "./RestaurantPage.css";
import { useParams } from "react-router-dom";

const RestaurantPage = () => {
  const { slug } = useParams();
  return <div>{slug}</div>;
};

export default RestaurantPage;
