import React, { useEffect, useState } from 'react';
import AddReview from './AddReview';
import ListReview from './ListReview';
import SummaryApi from '../common';

const ProductDetail = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      console.log('review url: ', SummaryApi.getProductReviews.url);
      const response = await fetch(`${SummaryApi.getProductReviews.url}/${productId}`, {
        method: SummaryApi.getProductReviews.method,
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      
      if (data.success) {
        console.log("Danh sách đánh giá:", data.data);
        setReviews(data.data); 
      } else {
        setError("Không thể tải đánh giá.");
      }
    } catch (err) {
      setError("Lỗi khi tải đánh giá.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleReviewAdded = () => {
    fetchReviews(); 
  };

  return (
    <div className="product-details">
      <h1>Chi tiết sản phẩm</h1>
      <AddReview productId={productId} onReviewAdded={handleReviewAdded} />
      {error ? (
        <p>{error}</p>
      ) : (
        <ListReview reviews={reviews} />
      )}
    </div>
  );
};

export default ProductDetail;
