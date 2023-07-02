import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ _id, name, featuredImage, description }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card" onClick={() => navigate(`/r/${_id}`)}>
        <img src={featuredImage.url} alt="restaurant" />
        <h1>{name}</h1>
        <div className="desc">{description}</div>
      </div>
    </>
  );
};

export default Card;
