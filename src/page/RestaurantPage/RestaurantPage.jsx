import React, { useEffect, useState } from "react";
import "./RestaurantPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByRestaurantIdQuery } from "../../app/productsApiSlice";
import { useGetRestaurantByIdQuery } from "../../app/restaurantsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/cartSlice";
import { toast } from "react-toastify";

const RestaurantPage = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const { data: restaurant, isLoading: isLoadingRes } =
    useGetRestaurantByIdQuery(id);
  const { data, isLoading } = useGetProductByRestaurantIdQuery(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setProducts(data);
    if (data) {
      let categories = data.map(({ category }) => category);
      categories = new Set(categories);
      setCategories(categories);
    }
  }, [data, isLoading]);

  const addToCartHandler = (product) => {
    if (!userInfo) {
      toast.info("Login to add", { autoClose: 1000 });
      navigate("/user/login");
      return;
    }
    dispatch(addToCart(product));
    toast.success("Item added to Cart", { autoClose: 1000 });
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setProducts(data);
      return;
    }
    const filterBySearch = data.filter((item) => {
      if (item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return item;
      }
      return false;
    });
    setProducts(filterBySearch);
  };

  return (
    <>
      {!isLoadingRes ? (
        <section className="res-header">
          <div className="img-container">
            <img src={restaurant.featuredImage.url} alt="" />
          </div>
          <h1 className="heading">{restaurant.name}</h1>
          <div className="desc">{restaurant.description}</div>
        </section>
      ) : (
        <h1 className="loading">Loading...</h1>
      )}
      <br />
      <hr />
      <br />
      <main className="res-main">
        <aside>
          <h3>Menu Items</h3>
          <div className="categories">
            {Array.from(categories).map((category) => (
              <div className="category" key={category}>
                {category}
              </div>
            ))}
          </div>
        </aside>
        <section>
          <div className="menu-search">
            <input
              type="text"
              value={search}
              onChange={searchHandler}
              placeholder="Search Products..."
            />
          </div>
          <div className="products">
            <div className="">{search && `Search : ${search}`}</div>
            {products &&
              products.map((product) => (
                <div className="product" key={product._id}>
                  <img src={product.image.url} alt="" />
                  <div className="desc">
                    <div>
                      <h4>{product.name}</h4>
                      <span>{product.description}</span>
                    </div>
                    <div className="product-footer">
                      <p>Rs. {product.price}</p>
                      <button onClick={() => addToCartHandler(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default RestaurantPage;
