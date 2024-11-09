
import React from 'react';

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      <h3>All Reviews:</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review._id} className="review-item">
              <div className="review-rating">
                <span>Review: </span>
                {[...Array(review.rating)].map((_, index) => (
                  <span key={index} className="star">★</span>
                ))}
              </div>
              <p>{review.comment}</p>
              <div className="review-date">{new Date(review.createdAt).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
