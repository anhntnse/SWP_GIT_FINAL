const orderModel = require('../../models/orderModel'); // Đảm bảo đường dẫn đúng tới mô hình Order


// Controller để tạo đơn hàng mới
const createOrder = async (req, res) => {
    const { userId, products,  totalPrice, shipping_address, orderCode, status } = req.body;

  try {
    // Tạo một đơn hàng mới từ dữ liệu được gửi lên
    const newOrder = new orderModel({
      userId: userId,
      products:  products,
      totalPrice: totalPrice,
      shipping_address:  shipping_address,
      orderCode: orderCode,
      status: status || 'pending' // Mặc định là 'pending' nếu không truyền vào
    });

    // Lưu đơn hàng mới vào database
    await newOrder.save();

    // Phản hồi thành công
    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    // Phản hồi khi có lỗi xảy ra
    return res.status(500).json({
      success: false,
      message: 'Server error. Failed to create order.',
    });
  }
};
module.exports = createOrder
