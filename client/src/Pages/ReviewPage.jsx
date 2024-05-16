import React, { useState, useEffect } from "react";
import "../styles/review.css";

const ReviewPage = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      review: "Great service! Very satisfied.",
      rating: 5,
      image: "../assets/user.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "Excellent app! Easy to use and very helpful.",
      rating: 4,
      image: "url_to_image2",
    },
    {
      id: 3,
      name: "Alice Johnson",
      review: "I love this app! It's a lifesaver.",
      rating: 5,
      image: "url_to_image3",
    },
    {
      id: 4,
      name: "Bob Brown",
      review: "Could be better. Some features are lacking.",
      rating: 3,
      image: "url_to_image4",
    },
    {
      id: 5,
      name: "Emily Davis",
      review: "Good app overall, but needs improvement.",
      rating: 4,
      image: "url_to_image5",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === reviews.length - 1 ? 0 : prevPage + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNextPage, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="reviews">
      <div className="text">
      <h1>Valuable Thoughts From Customers</h1>
      </div>
      <div className="review-container">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="review-box"
            style={{ transform: `translateX(-${currentPage * 114}%)` }}
          >
            <img src={review.image} alt="Reviewer" />
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
    </section>
  );
};

export default ReviewPage;
