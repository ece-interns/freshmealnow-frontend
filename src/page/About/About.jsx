import React from "react";
import "./About.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/pexels-anna-shvets-5953576.jpg";
import img2 from "../../assets/pexels-ash-376464.jpg";
import img3 from "../../assets/pexels-rdne-stock-project-7363052.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const About = () => {
  return (
    <>
    <div className="container about-container">
      
        <Carousel
          infiniteLoop
          autoPlay
          showStatus={false}
          showThumbs={false}
          showArrows={false}
          interval={1000}
        >
          <div>
            <img src={img1} alt="Item1" />
            <p className="legend">Deliciously Savory Meals</p>
          </div>
          <div>
            <img src={img2} alt="Item1" />
            <p className="legend">Tempting Gourmet Delights</p>
          </div>
          <div>
            <img src={img3} alt="Item1" />
            <p className="legend">Peer-to-peer Support</p>
          </div>
        </Carousel>
          <h1 className="abut">Who are we?</h1>
        <div className="aboutus">
        <p>FreshMealNow,launched in 2023, is your ultimate destination for delightful food delivery. We pride ourselves on bringing freshness, flavor, and convenience right to your doorstep. Our dedicated team of culinary experts and passionate food enthusiasts curate a diverse menu of mouthwatering dishes, crafted with the finest ingredients. From gourmet delicacies to comforting classics, each bite is a culinary adventure. With our seamless online platform and lightning-fast delivery, we aim to redefine your dining experience. Savor the goodness of FreshMealNow and indulge in extraordinary flavors that will leave you craving for more.</p>
        <div className="imgabout">
        <img src={img3} alt="Item1" />
        </div>
        </div>
      
      </div>
    </>
  );
};

export default About;
