import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [outOfStock, setOutOfStock] = useState(""); // State for out-of-stock warning
  const loadingCart = new Array(4).fill(null);
  const styles = {
    pagetitle: {
      body: {
        backgroundColor: "#FAFBFC !important",
      },
      fontSize: "36px",
      fontWeight: "bold",
      marginLeft: "100px",
      marginTop: "100px",
      color: "#1d1f23",
      textAlign: "left",
    },
  };

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty, stockQty) => {
    if (qty + 1 > stockQty) {
      setOutOfStock("This product is out of stock!");
      return;
    }
    setOutOfStock("");
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  // Toggle product selection with stock check
  const toggleProductSelection = (product) => {
    const isSelected = selectedProducts.includes(product._id);

    // If not selected yet, check stock before selecting
    if (!isSelected && product.quantity > product.productId.stock_quantity) {
      setOutOfStock(
        `The product "${product.productId.productName}" is out of stock and cannot be selected.`
      );
      return;
    }

    // Clear out-of-stock message if selection is valid
    setOutOfStock("");
    setSelectedProducts((prevSelected) =>
      isSelected
        ? prevSelected.filter((productId) => productId !== product._id)
        : [...prevSelected, product._id]
    );
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const selectedTotalPrice = data
    .filter((product) => selectedProducts.includes(product._id))
    .reduce(
      (prev, curr) => prev + curr.quantity * curr.productId.sellingPrice,
      0
    );

  return (
    <div className="container-fluid mx-auto">
      <h1 style={styles.pagetitle} title="Giỏ hàng" itemProp="headline">
        Giỏ hàng
      </h1>
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      {/* Display out-of-stock message */}
      {outOfStock && (
        <div className="text-red-500 text-center">{outOfStock}</div>
      )}

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View products */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data
                .filter((product) => product && product.productId) // Check for non-null product and productId
                .map((product) => (
                  <div
                    key={product._id}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[32px,128px,1fr]"
                  >
                    {/* Checkbox for selecting products */}
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => toggleProductSelection(product)}
                      />
                    </div>
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product.productId.productImage?.[0] || ""}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        alt={product.productId.productName || "Product Image"}
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/* Delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product.productId.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product.productId.category || "Unknown Category"}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayINRCurrency(
                            product.productId.sellingPrice || 0
                          )}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            (product.productId.sellingPrice || 0) *
                              product.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-gray-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                          onClick={() =>
                            decraseQty(product._id, product.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-gray-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                          onClick={() =>
                            increaseQty(
                              product._id,
                              product.quantity,
                              product.productId.stock_quantity || 0
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="bg-white border border-slate-300 rounded-lg">
              <h2 className="text-slate-700 font-bold px-4 py-2">
                Product to Purchase
              </h2>

              {/* Display selected products */}
              {data
                .filter((product) => selectedProducts.includes(product._id))
                .map((product) => (
                  <div
                    key={product._id}
                    className="flex justify-between px-4 py-2"
                  >
                    <p className="text-slate-600">
                      {product.productId.productName}
                    </p>
                    <p className="font-medium text-slate-600">
                      {displayINRCurrency(
                        product.productId.sellingPrice * product.quantity
                      )}
                    </p>
                  </div>
                ))}

              {/* Selected Items Total */}
              <div className="flex items-center justify-between px-4 py-2 text-slate-600 border-t border-slate-300 mt-2">
                <p style={{ color: "black", fontWeight: "bold" }}>TOTAL</p>
                <p className="font-medium">
                  {displayINRCurrency(selectedTotalPrice)}
                </p>
              </div>

              <Link to="/payment" state={{ selectedProducts }}>
                <button
                  className="bg-blue-600 p-2 text-white w-full rounded-b-lg"
                  disabled={selectedProducts.length === 0}
                >
                  Proceed to Payment
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
