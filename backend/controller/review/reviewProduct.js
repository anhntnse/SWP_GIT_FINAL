const productModel = require("../../models/productModel")
const reviewModel = require("../../models/reviewModel")

// Thêm đánh giá
const addReview = async (req, res) => {
  const { productId, rating, comment, isAnonymous } = req.body;
  

  if (!productId || rating === undefined || !comment) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  console.log("Add review");
  console.log(req.body);
  try {
    const newReview = new reviewModel({
      productId,
      rating,
      comment,
      createdAt: new Date(),
      isAnonymous,  
      //user: isAnonymous ? null : req.user._id 
    });

    await newReview.save();
    res.json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add review' });
  }
};

// Lấy danh sách đánh giá cho sản phẩm
const getReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    // Ensure productId is a valid ObjectId

    // Fetch reviews based on productId and sort by createdAt descending
    const reviews = await reviewModel.find({ productId }).sort({ createdAt: -1 });

    // If no reviews found
    if (!reviews.length) {
      return res.status(404).json({ success: false, message: 'No reviews found for this product' });
    }

    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
};


module.exports = {
  addReview,
  getReviews,
};