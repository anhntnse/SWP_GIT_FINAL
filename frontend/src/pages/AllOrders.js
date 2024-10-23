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

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Product</th>
            <th>Shipping Address</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {allOrder.map((el, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {/* Since product details are in the products array, we map over it */}
                {el?.products && el.products.length > 0 ? (
                  el.products.map((product, idx) => (
                    <p key={idx}>{product.productName}</p>
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </td>
              <td>
                {/* Format the shipping address for rendering */}
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
                    {/* If 'phone' field is available */}
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
              <td>{el?.totalPrice}</td>
              <td>
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

              <td>{moment(el?.createdAt).format("LL")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
