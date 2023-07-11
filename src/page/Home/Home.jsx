import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "../../components/Card/Card";
import { useGetRestaurantsByLocationQuery } from "../../app/restaurantsApiSlice";
import getLocation from "../../utils/getLocation";

const Home = () => {
  const [district, setDistrict] = useState("kamrup");
  const [place, setPlace] = useState("The Town");

  const getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(async (location) => {
      const { data } = await getLocation(
        location.coords.latitude,
        location.coords.longitude
      );
      if (data) {
        setPlace(
          data?.address?.county ||
            data?.address?.town ||
            data?.address?.state_district
        );
        setDistrict(data?.address?.state_district);
      }
    });
  };

  useEffect(() => {
    getLocationHandler();
  }, []);

  const { data: restaurants } = useGetRestaurantsByLocationQuery(district);

  return (
    <>
      <div className="homepage">
        <h1 className="heading">Popular Restaurants In {place}</h1>
        <div className="card-container">
          {restaurants &&
            restaurants.map((restaurant) => (
              <Card {...restaurant} key={restaurant._id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
