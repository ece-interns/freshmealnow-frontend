import React, { useState, useEffect } from "react";
import "./RestaurantRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import {
  useRegisterRestaurantMutation,
  useUploadFeaturedImageMutation,
  useUploadImagesMutation,
} from "../../app/restaurantsApiSlice";
import { setCredentialsRestaurant } from "../../app/authSliceRestaurant";
import getLocation from "../../utils/getLocation";
import { toast } from "react-toastify";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const RestaurantRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState(null);
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterRestaurantMutation();
  const { restaurantInfo } = useSelector((state) => state.authRestaurant);
  const [uploadFeaturedImageApiCall] = useUploadFeaturedImageMutation();
  const [uploadImagesApiCall] = useUploadImagesMutation();

  useEffect(() => {
    if (restaurantInfo) {
      navigate("/");
    }
  }, [navigate, restaurantInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!name || !email || !password || !address || !pin) {
      toast.info("Fill all the required fields");
      return;
    }
    const { county, postcode, state_district, state, country } = address;
    const newAddress = { county, state_district, state, postcode, country };
    try {
      const res = await register({
        name,
        email,
        password,
        pin,
        description,
        address: newAddress,
        featuredImage,
        images,
      }).unwrap();
      dispatch(setCredentialsRestaurant({ ...res }));
      toast.success("Registration Successful");
      navigate("/restaurant/profile");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(async (location) => {
      const { data, error } = await getLocation(
        location.coords.latitude,
        location.coords.longitude
      );
      if (data) setAddress(data.address);
      else if (error) console.log(error);
    });
  };

  const uploadFeaturedImage = async () => {
    if (!featuredImageFile || loading) {
      return;
    }
    const formData = new FormData();
    formData.append("featuredImage", featuredImageFile);
    try {
      setLoading(true);
      const resp = await uploadFeaturedImageApiCall(formData);
      const { image } = resp.data;
      setLoading(false);
      if (image.url) {
        setFeaturedImage(image);
        setFeaturedImageFile(null);
        toast.info("Image Uploaded");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something Went Wrong");
    }
  };

  const uploadImages = async () => {
    if (!imageFiles.length || loading) {
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append(`images`, imageFiles[i]);
    }
    try {
      setLoading(true);
      const resp = await uploadImagesApiCall(formData);
      const { images: data } = resp.data;
      setLoading(false);
      if (data) {
        setImages(data);
        setImageFiles([]);
        toast.info("Images Uploaded");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Error occured");
    }
  };

  return (
    <>
      <div className="restrauntregis">
        <h1>Restaurant Register</h1>
        {(loading || isLoading) && <LoadingScreen />}
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <div className="getlocation">
            <input
              type="button"
              onClick={getLocationHandler}
              value="Get Location"
            /></div>
            {address ? <span>got location</span> : <span>allow location</span>}
            {address && (
              <div>
                <span>district :{address.state_district}</span>
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="" htmlFor="featuredImage">
              Featured Image
            </label>
            <input
              id="featuredImage"
              type="file"
              className="form-control"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setFeaturedImageFile(e.target.files[0]);
                }
              }}
              required
            />
            <button
              onClick={uploadFeaturedImage}
              className="file-upload-btn"
              type="button"
            >
              Upload
            </button>
            {featuredImage && (
              <span className="file-uploaded">
                Uploaded
                <TiTick className="tick-mark" />
              </span>
            )}
          </div>
          <div className="form-group">
            <label className="" htmlFor="images">
              Images
            </label>
            <input
              id="images"
              type="file"
              multiple={true}
              className="form-control"
              onChange={(e) => {
                if (e.target.files) {
                  setImageFiles(e.target.files);
                }
              }}
            />
            <button
              onClick={uploadImages}
              className="mt-4 bg-blue-600 py-1 px-2 text-white shadow hover:shadow-black"
              type="button"
            >
              Upload
            </button>
            {images.length > 0 && (
              <span className="file-uploaded">
                Uploaded
                <TiTick className="tick-mark" />
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Enter Name ..."
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email ..."
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password ..."
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pin">Pin</label>
            <input
              type="number"
              id="pin"
              placeholder="Enter Pin ..."
              className="form-control"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter Description ..."
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit">Add the product</button>
        </form>
        <div>
          Already Have An Account? <Link to="/restaurant/login">Login</Link>
        </div>
      </div>
    </>
  );
};

export default RestaurantRegister;
