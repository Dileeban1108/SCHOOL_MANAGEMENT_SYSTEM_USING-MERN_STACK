import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/review.css";
import userImage from "../assets/user.png"; // Correctly import the image
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
    rating: 0,
    image: userImage, // Set default image here
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getReviews"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === reviews.length - 1 ? 0 : prevPage + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNextPage, 3500);
    return () => clearInterval(interval);
  }, [reviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/createReview",
        newReview
      );
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setNewReview({
        name: "",
        review: "",
        rating: "",
        image: userImage,
      });
      toast.success("Review added Successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to add review");
    }
  };

  return (
    <section className="reviews">
      <ToastContainer />
      <div className="text">
        <h1>Valuable Thoughts From Users</h1>
      </div>

      <div className="review-container">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="review-box"
            style={{ transform: `translateX(-${currentPage * 112.8}%)` }}
          >
            <img src={userImage} alt="Reviewer" />
            <h3>{review.name}</h3>
            <p>{review.review}</p>
            <div className="rating">
              {[...Array(review.rating)].map((_, index) => (
                <span key={index} className="star">
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="review-inputs">
          <div className="sub1">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={newReview.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              value={newReview.rating}
              onChange={handleChange}
              required
              min="1"
              max="5"
            />
            <textarea
              name="review"
              placeholder="Your Review"
              value={newReview.review}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="sub2">
            <button type="submit">Submit Review</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ReviewPage;
