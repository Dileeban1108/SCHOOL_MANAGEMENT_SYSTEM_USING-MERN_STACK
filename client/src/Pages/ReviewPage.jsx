import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/review.css";
import userImage from "../assets/users.jpg"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ReviewPage = ({userRole}) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
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
        image: userImage,
      });
      toast.success("Review added Successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to add review");
    }
  };
  const handleDelete = async (reviewToDelete) => {
    try {
      await axios.delete(`http://localhost:3001/auth/deleteReview/${reviewToDelete._id}`);
      setReviews(reviews.filter((review) => review._id !== reviewToDelete._id));
      toast.success("Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    }
  };
  return (
    <section className="reviews">
      <ToastContainer />
      <div className="text2">
        <h1>DON'T FORGRT TO COMMMENT</h1>
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
            <textarea
              name="review"
              placeholder="Your Review"
              value={newReview.review}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="review_submit">
              Submit{" "}
            </button>
          </div>
        </div>
      </form>
      <div className="review-container">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="review-box"
            style={{ transform: `translateX(-${currentPage * 112.8}%)` }}
          >
             {userRole === "user" && ( 
              <div className="delete_icon" onClick={() => handleDelete(review)}>
                <FontAwesomeIcon icon={faTrash} />
              </div>
            )}
            <img src={userImage} alt="Reviewer" />
            <h3>{review.name}</h3>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewPage;
