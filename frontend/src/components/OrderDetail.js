import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";

const OrderDetail = ({ orderId, onBack }) => {
  const [orderDetail, setOrderDetail] = useState(null);

  const fetchOrderDetail = async () => {
    try {
      const fetchData = await fetch(`${SummaryApi.orderDetail.url}/${orderId}`, {
        method: SummaryApi.orderDetail.method,
        credentials: "include",
      });
      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setOrderDetail(dataResponse.data);
      } else {
        toast.error("Failed to fetch order details");
      }
    } catch (error) {
      toast.error("Failed to fetch order details");
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  if (!orderDetail) return <div>Loading...</div>;

  return (
    <div className="order-detail">
      <button onClick={onBack}>Back to Orders</button>
      <h2>Order Detail</h2>
      <p><strong>Order ID:</strong> {orderDetail._id}</p>
      <p><strong>Total Price:</strong> ${orderDetail.totalPrice}</p>
      <p><strong>Status:</strong> {orderDetail.status}</p>
      <p><strong>Created Date:</strong> {moment(orderDetail.createdAt).format("LL")}</p>
      
      <h3>Products:</h3>
      {orderDetail.products.map((product, index) => (
        <div key={index}>
          <p>{product.productName} - {product.quantity}</p>
        </div>
      ))}

      <h3>Shipping Address:</h3>
      <p>{orderDetail.shipping_address.firstName} {orderDetail.shipping_address.lastName}</p>
      <p>{orderDetail.shipping_address.address}</p>
      <p>{orderDetail.shipping_address.city}, {orderDetail.shipping_address.postalCode}</p>
      {orderDetail.shipping_address.phone && <p>Phone: {orderDetail.shipping_address.phone}</p>}
    </div>
  );
};

export default OrderDetail;
