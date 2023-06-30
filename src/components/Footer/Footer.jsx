import React from "react";
import "./Footer.css";
import { AppName } from "../../utils/constants";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
      <div className="Appname">
        <h1>{AppName}</h1>
      </div>
      <div className="contain">
        <div className="colprime">
        <div className="col">
          <ul>
          <h1>Company</h1>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <ul>
          <h1>Products</h1>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <ul>
          <h1>Support</h1>
            <li>Contact us</li>
            <li>Web chat</li>
          </ul>
        </div>
        <div className="col social">
          <ul>
          <h2>SOCIAL</h2>
            <li>
              <TwitterIcon />
            </li>
            <li>
              <InstagramIcon />
            </li>
            <li>
              <YouTubeIcon />
            </li>
            <li>
              <FacebookIcon />
            </li>
          </ul>
        </div>
        </div>
        <div className="clearfix"></div>
      </div>
      </div>
    </div>
  );
};

export default Footer;
