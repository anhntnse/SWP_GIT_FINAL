import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SummaryApi from "../common";
import { useLocation } from 'react-router-dom';


const PaymentSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');
  const navigate = useNavigate();
  const updateOrder = async () => {
    const body = {
      _id: _id,
      status: "Payment successful",
    };
    try {
      const response = await fetch(SummaryApi.updateOrder.url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const dataResponse = await response.json();
      if (response.ok && dataResponse.success) {
        console.log('Order status updated successfully');
        navigate("/"); // Redirect to homepage after updating order
      } else {
        console.error('Failed to update order status:', dataResponse.message);
        alert("Failed to update order status. Please contact support.");
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    if (_id) {
      updateOrder(); // Update order status once the user returns from payment
    }
  }, [_id]);

  return null; // No need to render anything, just handle the redirection
};

export default PaymentSuccess;
