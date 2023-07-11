import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ _id, name, featuredImage, description }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card" onClick={() => navigate(`/r/${_id}`)}>
        <img src={featuredImage.url} alt="restaurant" />
        <h1 className="truncate-1">{name}</h1>
        <div className="desc truncate-2">
          {description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ipsam eos quibusdam animi libero itaque voluptatem quia, nemo minima
          eveniet accusantium recusandae molestiae laborum unde repellat.
          Deleniti sit necessitatibus nam. In.
        </div>
      </div>
    </>
  );
};

export default Card;
