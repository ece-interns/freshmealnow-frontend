import React, { useState } from "react";
import "./AddProduct.css";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../app/productsApiSlice";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [uploadImageApiCall] = useUploadProductImageMutation();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { restaurantInfo } = useSelector((state) => state.authRestaurant);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!name || !cuisine || !category || !price || !description || !image) {
      toast.info("Fill all the required fields", { autoClose: 1000 });
      return;
    }
    try {
      await createProduct({
        restaurantId: restaurantInfo._id,
        name,
        cuisine,
        category,
        price,
        description,
        image,
      }).unwrap();
      toast.success("Product Added", { autoClose: 1000 });
      navigate("/restaurant/profile");
    } catch (err) {
      toast.error(err?.data?.message || err.error, { autoClose: 1000 });
    }
  };

  const uploadImage = async () => {
    if (!imageFile || loading) {
      return;
    }
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      setLoading(true);
      const resp = await uploadImageApiCall(formData);
      const { image: data } = resp.data;
      setLoading(false);
      if (data.url) {
        setImage(data);
        setImageFile(null);
        toast.info("Image Uploaded", { autoClose: 1000 });
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something Went Wrong", { autoClose: 1000 });
    }
  };

  return (
    <>
      <div className="container">
        <h1>Add Product</h1>
        {(loading || isLoading) && <LoadingScreen />}
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              type="file"
              className="form-control"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
              required
            />
            <button
              onClick={uploadImage}
              className="file-upload-btn"
              type="button"
            >
              Upload
            </button>
            {image && (
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
            <label htmlFor="cuisine">Cuisine</label>
            <input
              id="cuisine"
              placeholder="Enter Cuisine ..."
              className="form-control"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              placeholder="Enter Category ..."
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              placeholder="Enter Price ..."
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required={true}
            />
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Enter Description ..."
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
