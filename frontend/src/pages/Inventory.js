import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { MdModeEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Inventory = () => {
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response.json();

      if (dataResponse.success) {
        // Sort products in descending order before setting state
        const sortedProducts = dataResponse.data.sort((a, b) => a.stock_quantity - b.stock_quantity);
        setAllProduct(sortedProducts);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleUpdateStockQuantity = async (
    productId,
    currentQuantity,
    newQuantity
  ) => {
    // Show confirmation alert if there's a change
    if (newQuantity !== currentQuantity) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update the stock quantity?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        customClass: {
          confirmButton: "swal2-confirm btn-yes",
          cancelButton: "swal2-cancel btn-no",
          popup: "swal2-popup",
        },
      });

      // If the user confirms the update
      if (result.isConfirmed) {
        const body = {
          _id: productId,
          stock_quantity: newQuantity,
        };

        try {
          const response = await fetch(`${SummaryApi.updateStockQuantity.url}`, {
            method: SummaryApi.updateStockQuantity.method,
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const data = await response.json();

          if (data.success) {
            toast.success("Stock quantity updated successfully.");
            fetchAllProduct(); // Refresh the product list
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Failed to update stock quantity.");
        }
      }
    } else {
      toast.info("No changes made to stock quantity.");
    }
  };

  const deleteProduct = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      customClass: {
        confirmButton: "swal2-confirm btn-yes",
        cancelButton: "swal2-cancel btn-no",
        popup: "swal2-popup",
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${SummaryApi.deleteProduct.url}/${productId}`,
          {
            method: SummaryApi.deleteProduct.method,
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.success) {
          toast.success("Product deleted successfully.");
          fetchAllProduct(); // Refresh the product list after deletion
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to delete product.");
      }
    }
  };

  return (
    <div className="bg-white pb-4">
      <h2 className="text-xl font-bold mb-4">Product Inventory</h2>
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th className="text-center">STT</th>
            <th className="text-center">Product Name</th>
            <th className="text-center">Stock Quantity</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProduct.map((product, index) => (
            <tr key={product._id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{product.productName}</td>
              <td className="text-center">
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    defaultValue={product.stock_quantity}
                    min="0"
                    className="border rounded p-2 text-center w-24"
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "green",
                      backgroundColor: "#f9f9f9",
                      marginRight: "8px",
                    }}
                    onChange={(e) => {
                      product.newQuantity = e.target.value; // Temporarily store the new quantity
                    }}
                  />
                  <button
                    className="bg-blue-500 text-white p-1 rounded hover:bg-blue-700 flex items-center"
                    onClick={() => {
                      const newQuantity = product.newQuantity || product.stock_quantity; // Use stored new quantity or current stock quantity
                      handleUpdateStockQuantity(
                        product._id,
                        product.stock_quantity, // Current quantity from the product object
                        newQuantity // New quantity from the stored variable
                      );
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </div>
              </td>
              <td className="text-center">
                <button
                  className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white ml-2"
                  onClick={() => deleteProduct(product._id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .btn-yes {
          background-color: #4caf50;
          color: white;
        }
        .btn-no {
          background-color: #f44336;
          color: white;
        }
        .btn-yes:hover {
          background-color: #45a049;
        }
        .btn-no:hover {
          background-color: #e53935;
        }
      `}</style>
    </div>
  );
};

export default Inventory;
