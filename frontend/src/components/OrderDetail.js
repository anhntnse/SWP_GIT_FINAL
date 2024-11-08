import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FiArrowLeft, FiBox, FiCalendar, FiMapPin, FiDollarSign } from "react-icons/fi";
import displayINRCurrency from "../helpers/displayCurrency";

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
    <div className="order-detail max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8 my-10">
      <button
        onClick={onBack}
        className="text-blue-600 flex items-center mb-6 hover:underline"
      >
        <FiArrowLeft className="mr-2" /> Back to Orders
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Order Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b pb-6">
        <div>
          <p className="text-lg font-semibold text-gray-600 flex items-center">
            <FiBox className="mr-2 text-gray-500" /> Order Code:
          </p>
          <p className="text-xl text-gray-800">{orderDetail.orderCode}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-600 flex items-center">
            <FiDollarSign className="mr-2 text-gray-500" /> Total Price:
          </p>
          <p className="text-xl text-gray-800">{displayINRCurrency(orderDetail.totalPrice)}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-600 flex items-center">
            <FiCalendar className="mr-2 text-gray-500" /> Created Date:
          </p>
          <p className="text-xl text-gray-800">
            {moment(orderDetail.createdAt).format("LL")}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-600">Status:</p>
          <p className="text-xl text-gray-800">{orderDetail.status}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Products</h3>
        <ul className="space-y-4 pl-4">
          {orderDetail.products.map((product, index) => (
            <li key={index} className="text-lg text-gray-800">
              <span className="font-semibold">{product.productName}</span> - Quantity: {product.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Address</h3>
        <div className="pl-4 text-lg text-gray-800">
          <p>
            {orderDetail.shipping_address.firstName}{" "}
            {orderDetail.shipping_address.lastName}
          </p>
          <p>{orderDetail.shipping_address.address}</p>
          <p>{orderDetail.shipping_address.city}, {orderDetail.shipping_address.postalCode}</p>
          {orderDetail.shipping_address.phone && (
            <p>Phone: {orderDetail.shipping_address.phone}</p>
          )}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Method</h3>
        <p className="text-lg text-gray-800 mb-4">{orderDetail.shippingMethod?.name}</p>
        <p className="text-lg text-gray-800">
          <strong>Order Status:</strong> {orderDetail.order_status}
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
