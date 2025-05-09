import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  // Dummy rating & review data
  const rating = 4.2;
  const reviewCount = 122;
  const dummyReviews = [
    {
      user: "Aditi K.",
      text: "Beautiful quality! Got so many compliments.",
    },
    {
      user: "Rahul M.",
      text: "Exactly like the picture. Worth the price.",
    },
    {
      user: "Neha S.",
      text: "Loved the fabric and color. Would buy again.",
    },
  ];

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => <img key={i} src={star_icon} alt="star" />)}
        {hasHalfStar && <img src={star_icon} alt="star" style={{ opacity: 0.5 }} />}
        {[...Array(emptyStars)].map((_, i) => <img key={i + fullStars} src={star_dull_icon} alt="empty-star" />)}
      </>
    );
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={backend_url + product.image} alt="img" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-stars">
          {renderStars()}
          <p>({reviewCount})</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">{currency}{product.old_price}</div>
          <div className="productdisplay-right-price-new">{currency}{product.new_price}</div>
        </div>

        <div className="productdisplay-right-description">
          {product.description}
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>

        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest</p>

        {/* ⭐ Dummy Reviews */}
        <div className="productdisplay-reviews">
          <h2>Customer Reviews</h2>
          {dummyReviews.map((review, index) => (
            <div key={index} className="productdisplay-review">
              <strong>{review.user}</strong>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
