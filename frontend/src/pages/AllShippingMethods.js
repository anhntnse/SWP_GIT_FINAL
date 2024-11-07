import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { MdModeEdit, MdDelete } from "react-icons/md";
import ChangeShippingMethod from "../components/ChangeShippingMethod";

const AllShippingMethods = () => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [openUpdateMethod, setOpenUpdateMethod] = useState(false);
  const [updateMethodDetails, setUpdateMethodDetails] = useState({
    name: "",
    price: "",
    estimatedDelivery: "",
    minDeliveryDays: "",
    maxDeliveryDays: "",
    _id: "",
  });

  // State cho form thêm phương thức giao hàng mới
  const [newMethod, setNewMethod] = useState({
    name: "",
    price: "",
    estimatedDelivery: "",
    minDeliveryDays: "", // Thêm biến cho ngày giao hàng tối thiểu
    maxDeliveryDays: "", // Thêm biến cho ngày giao hàng tối đa
  });

  const fetchShippingMethods = async () => {
    try {
      const response = await fetch(SummaryApi.allShippingMethods.url, {
        method: SummaryApi.allShippingMethods.method,
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        setShippingMethods(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch shipping methods.");
    }
  };

  // Add a new shipping method
  const addShippingMethod = async () => {
    try {
      const response = await fetch(SummaryApi.addShippingMethod.url, {
        method: SummaryApi.addShippingMethod.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMethod),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Shipping method added successfully.");
        setNewMethod({
          name: "",
          price: "",
          estimatedDelivery: "",
          minDeliveryDays: "",
          maxDeliveryDays: "",
        }); // Clear the form
        fetchShippingMethods(); // Refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add shipping method.");
    }
  };

  // Delete a shipping method
  const deleteShippingMethod = async (id) => {
    try {
      const response = await fetch(
        `${SummaryApi.deleteShippingMethod.url}/${id}`,
        {
          method: SummaryApi.deleteShippingMethod.method,
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.success("Shipping method deleted successfully.");
        fetchShippingMethods(); // Refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete shipping method.");
    }
  };

  useEffect(() => {
    fetchShippingMethods();
  }, []);

  const handleEditClick = (method) => {
    setUpdateMethodDetails(method);
    setOpenUpdateMethod(true);
    console.log("Modal should open for method:", method); // Kiểm tra giá trị của method
  };

  return (
    <div className="bg-white pb-4">
      <h2 className="text-xl font-bold mb-4">Add New Shipping Method</h2>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={newMethod.name}
          onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={newMethod.price}
          onChange={(e) =>
            setNewMethod({ ...newMethod, price: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Estimated Delivery"
          value={newMethod.estimatedDelivery}
          onChange={(e) =>
            setNewMethod({ ...newMethod, estimatedDelivery: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Min Delivery Days"
          value={newMethod.minDeliveryDays}
          onChange={(e) =>
            setNewMethod({ ...newMethod, minDeliveryDays: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Max Delivery Days"
          value={newMethod.maxDeliveryDays}
          onChange={(e) =>
            setNewMethod({ ...newMethod, maxDeliveryDays: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addShippingMethod}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Method
        </button>
      </div>

      <table className="w-full shippingMethodTable">
        <thead>
          <tr className="bg-black text-white">
            <th className="text-center" style={{ width: "4%" }}>
              Sr.
            </th>
            <th className="text-center" style={{ width: "20%" }}>
              Name
            </th>
            <th className="text-center" style={{ width: "11%" }}>
              Price
            </th>
            <th className="text-center" style={{ width: "25%" }}>
              Estimated Delivery
            </th>
            <th className="text-center" style={{ width: "15%" }}>
              Min Delivery Days
            </th>
            <th className="text-center" style={{ width: "15%" }}>
              Max Delivery Days
            </th>
            <th className="text-center" style={{ width: "10%" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {shippingMethods.map((method, index) => (
            <tr key={method._id}>
              <td className="text-center" style={{ width: "4%" }}>{index + 1}</td>
              <td className="text-center" style={{ width: "20%" }}>{method?.name}</td>
              <td className="text-center" style={{ width: "11%" }}>${method?.price}</td>
              <td className="text-center" style={{ width: "25%" }}>{method?.estimatedDelivery}</td>
              <td className="text-center" style={{ width: "15%" }}>{method?.minDeliveryDays}</td>
              <td className="text-center" style={{ width: "15%" }}>{method?.maxDeliveryDays}</td>
              <td className="text-center" style={{ width: "10%" }}>
                <button
                  className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                  onClick={() => handleEditClick(method)}
                >
                  <MdModeEdit />
                </button>
                <button
                  className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white ml-2"
                  onClick={() => deleteShippingMethod(method._id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdateMethod && (
        <ChangeShippingMethod
          onClose={() => setOpenUpdateMethod(false)}
          methodDetails={updateMethodDetails}
          refreshMethods={fetchShippingMethods}
        />
      )}
    </div>
  );
};

export default AllShippingMethods;
