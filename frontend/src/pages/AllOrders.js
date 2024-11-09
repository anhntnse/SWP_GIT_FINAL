import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";

const AllOrders = () => {
  const styles = {
    statusTag: {
      display: "inline-flex",
      alignItems: "center",
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "bold",
      color: "white",
    },
    icon: {
      marginRight: "5px",
    },
    success: {
      backgroundColor: "#28a745" /* Green */,
    },
    pending: {
      backgroundColor: "#ffc107" /* Yellow */,
    },
    cancelled: {
      backgroundColor: "#dc3545" /* Red */,
    },
  };

  const [allOrder, setAllOrder] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allOrder.url, {
        method: SummaryApi.allOrder.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllOrder(dataResponse.data);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error("Error fetching orders:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const body = {
        _id: orderId,
        order_status: "Cancelled",
      };
      console.log(body);
      const fetchData = await fetch(`${SummaryApi.updateOrderStatus.url}`, {
        method: SummaryApi.updateOrderStatus.method,
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        toast.success("Order cancelled successfully");
        fetchAllOrders(); // Gọi lại hàm fetchAllOrders sau khi hủy đơn thành công
      } else {
        toast.error(dataResponse.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error("Failed to cancel order");
      console.error("Error cancelling order:", error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const body = {
        _id: orderId,
        order_status: newStatus,
      };
      const response = await fetch(SummaryApi.updateOrderStatus.url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Order status updated successfully");
        fetchAllOrders(); // Gọi lại hàm fetchAllOrders sau khi cập nhật trạng thái thành công
      } else {
        toast.error(data.message || "Failed to update order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrder.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(allOrder.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th className="text-center">Sr.</th>
            <th className="text-center">Product</th>
            <th className="text-center">Shipping Address</th>
            <th className="text-center">Total Price</th>
            <th className="text-center">Payment Status</th>
            <th className="text-center">Order Status</th>
            <th className="text-center">Created Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((el, index) => (
            <tr key={index}>
              <td>{index + 1 + (currentPage - 1) * ordersPerPage}</td> {/* Adjust index for pagination */}
              <td className="text-center">
                {el?.products && el.products.length > 0 ? (
                  el.products.map((product, idx) => (
                    <p key={idx}>{product.productName}</p>
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </td>
              <td className="text-center">
                {el?.shipping_address ? (
                  <div>
                    <p>
                      {el.shipping_address.firstName}{" "}
                      {el.shipping_address.lastName}
                    </p>
                    <p>{el.shipping_address.address}</p>
                    <p>
                      {el.shipping_address.city},{" "}
                      {el.shipping_address.postalCode}
                    </p>
                    {el.shipping_address.phone ? (
                      <p>{el.shipping_address.phone}</p>
                    ) : (
                      <p>No phone number available</p>
                    )}
                  </div>
                ) : (
                  <p>No shipping address available</p>
                )}
              </td>
              <td className="text-center">{el?.totalPrice}</td>
              <td className="text-center">
                <span
                  style={{
                    ...styles.statusTag,
                    ...(el.status === "Payment successful"
                      ? styles.success
                      : styles.pending),
                  }}
                >
                  {el.status === "Payment successful" ? (
                    <i className="fa fa-check-circle" style={styles.icon}></i>
                  ) : (
                    <i className="fa fa-hourglass-half" style={styles.icon}></i>
                  )}
                  {el.status === "Payment successful" ? "Success" : "Pending"}
                </span>
              </td>
              <td className="text-center">
                <span
                  style={{
                    ...styles.statusTag,
                    ...(el.order_status === "Delivered"
                      ? styles.success
                      : el.order_status === "Cancelled"
                      ? styles.cancelled
                      : styles.pending),
                  }}
                >
                  {el.order_status || "Pending"}
                </span>
              </td>
              <td className="text-center">
                {moment(el?.createdAt).format("LL")}
              </td>
              <td className="text-center">
                {el.order_status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelOrder(el._id)}
                    className="text-red-500"
                  >
                    Cancel Order
                  </button>
                )}{" "}
                {"     "}
                <select
                  onChange={(e) => handleUpdateStatus(el._id, e.target.value)}
                  value={el.order_status}
                  disabled={el.order_status === "Cancelled" || el.order_status === "Delivered" || el.order_status === "Returned"}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Returned">Returned</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            } text-white font-semibold py-2 px-4 rounded-l-md transition duration-200 ease-in-out`}
        >
          Previous
        </button>

        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            } text-white font-semibold py-2 px-4 rounded-r-md transition duration-200 ease-in-out`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllOrders;
