// import React, { useEffect, useState } from "react";
// import SummaryApi from "../common";
// import { toast } from "react-toastify";
// import moment from "moment";

// const AllOrders = () => {
//     const styles = {
//         statusTag: {
//           display: 'inline-flex',
//           alignItems: 'center',
//           padding: '5px 10px',
//           borderRadius: '20px',
//           fontSize: '14px',
//           fontWeight: 'bold',
//           color: 'white',
//         },
//         icon: {
//           marginRight: '5px',
//         },
//         success: {
//           backgroundColor: '#28a745', /* Green */
//         },
//         pending: {
//           backgroundColor: '#ffc107', /* Yellow */
//         }
//       };

//   const [allOrder, setAllOrder] = useState([]);

//   const fetchAllOrders = async () => {
//     try {
//       const fetchData = await fetch(SummaryApi.allOrder.url, {
//         method: SummaryApi.allOrder.method,
//         credentials: "include",
//       });

//       const dataResponse = await fetchData.json();

//       if (dataResponse.success) {
//         setAllOrder(dataResponse.data);
//       } else if (dataResponse.error) {
//         toast.error(dataResponse.message);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//       console.error("Error fetching orders:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   return (
//     <div className="bg-white pb-4">
//       <table className="w-full userTable">
//         <thead>
//           <tr className="bg-black text-white">
//             <th>Sr.</th>
//             <th>Product</th>
//             <th>Shipping Address</th>
//             <th>Total Price</th>
//             <th>Status</th>
//             <th>Created Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allOrder.map((el, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{el?.name}</td>
//               <td>
//                 {/* Format the shipping address for rendering */}
//                 {el?.shipping_address ? (
//                   <div>
//                     <p>
//                       {el.shipping_address.firstName}{" "}
//                       {el.shipping_address.lastName}
//                     </p>
//                     <p>{el.shipping_address.address}</p>
//                     <p>
//                       {el.shipping_address.city},{" "}
//                       {el.shipping_address.postalCode}
//                     </p>
//                     <p>{el.shipping_address.phone}</p>
//                   </div>
//                 ) : (
//                   <p>No shipping address available</p>
//                 )}
//               </td>
//               <td>{el?.totalPrice}</td>
//               <td>
//                 <span style={{ ...styles.statusTag, ...(el.status === 'Payment successful' ? styles.success : styles.pending) }}>
//                   {el.status === 'Payment successful' ? (
//                     <i className="fa fa-check-circle" style={styles.icon}></i>
//                   ) : (
//                     <i className="fa fa-hourglass-half" style={styles.icon}></i>
//                   )}
//                   {el.status === 'Payment successful' ? 'Success' : 'Pending'}
//                 </span>
//               </td>

//               <td>{moment(el?.createdAt).format("LL")}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllOrders;
import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import displayVNDCurrency from "../helpers/displayCurrency";

const AllPreOrders = () => {
    const styles = {
        statusTag: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'white',
        },
        icon: {
            marginRight: '5px',
        },
        success: {
            backgroundColor: '#28a745', /* Green */
        },
        pending: {
            backgroundColor: '#ffc107', /* Yellow */
        },
        cancel: {
            backgroundColor: '#dc3545', /* Red */
        }
    };

    const [allPreOrder, setAllPreOrder] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPreOrderId, setSelectedPreOrderId] = useState(null);
    const [currentOrderStatus, setCurrentOrderStatus] = useState("");

    const fetchAllPreOrders = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allPreOrder.url, {
                method: SummaryApi.allPreOrder.method,
                credentials: "include",
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllPreOrder(dataResponse.data);
            } else if (dataResponse.error) {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to fetch orders");
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchAllPreOrders();
    }, []);

    const handleOpenModal = (preOrderId, status) => {
        setSelectedPreOrderId(preOrderId);
        setCurrentOrderStatus(status);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPreOrderId(null);
        setCurrentOrderStatus("");
    };

    const handleUpdateStatusPreOrder = async (preOrderId, newStatus) => {
        try {
            const response = await fetch(SummaryApi.updatePreOrder.url, {
                method: SummaryApi.updatePreOrder.method,
                credentials: 'include',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ preOrderId: preOrderId, status: newStatus }),
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                setAllPreOrder((prevPreOrders) =>
                    prevPreOrders.map((preOrder) =>
                        preOrder._id === preOrderId ? { ...preOrder, status: newStatus } : preOrder
                    )
                );
                console.log("Pre-Order updated successfully:", dataResponse.data);
                toast.success("Order status updated successfully");
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to update order");
        } finally {
            handleCloseModal();
        }
    };

    const Modal = ({ isOpen, onClose, onConfirm, preOrderId }) => {
        const [status, setStatus] = useState("");

        useEffect(() => {
            if (isOpen) {
                setStatus(""); // Reset status when modal opens
            }
        }, [isOpen]);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 transition-opacity">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96 transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Pre-order Status</h2>
                    <p className="mb-4 text-gray-600">Select the new status for the pre-order:</p>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                    >
                        <option value="" disabled>--Select--</option> {/* Default option */}
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <div className="flex justify-between mt-4">
                        <button
                            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                            onClick={() => onConfirm(preOrderId, status)}
                            disabled={!status} // Disable button if no status is selected
                        >
                            Confirm Update
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400 transition duration-150 ease-in-out"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(20);

    // Calculate pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = allPreOrder.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(allPreOrder.length / ordersPerPage);

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
                        <th>Sr.</th>
                        <th>Product</th>
                        <th>User</th>
                        <th>Deposit Price</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((el, index) => ( // Change allPreOrder to currentOrders
                        <tr key={index}>
                            <td>{index + 1 + (currentPage - 1) * ordersPerPage}</td> {/* Adjust index for pagination */}
                            <td>{el?.productId?.productName}</td>
                            <td>
                                {el?.userId?.name}
                            </td>
                            <td>{el?.depositPrice !== 0 ? displayVNDCurrency(el?.depositPrice) : displayVNDCurrency(Math.ceil(el?.productId?.sellingPrice * 50 / 100))}</td>
                            <td>
                                <span
                                    style={{
                                        ...styles.statusTag,
                                        ...(el.status === "Completed"
                                            ? styles.success
                                            : el.status === "Pending"
                                                ? styles.pending
                                                : styles.cancel),
                                    }}
                                >
                                    <i
                                        className={
                                            el.status === "Completed"
                                                ? "fa fa-check-circle"
                                                : el.status === "Pending"
                                                    ? "fa fa-hourglass-half"
                                                    : "fa fa-times-circle"
                                        }
                                        style={styles.icon}
                                    ></i>
                                    {/* {el.status === "Completed"
                                        ? "Completed"
                                        : el.status === "Pending"
                                            ? "Pending"
                                            : "Cancelled"} */}
                                    {el?.status}
                                </span>
                            </td>
                            <td>{moment(el?.createdAt).format("LL")}</td>
                            <td>
                                <button
                                    className="bg-green-600 text-white font-semibold py-1 px-2 rounded-md shadow hover:bg-green-800 transition duration-200 ease-in-out"
                                    onClick={() => handleOpenModal(el._id, el.status)}
                                >
                                    Update Status
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onConfirm={handleUpdateStatusPreOrder}
                preOrderId={selectedPreOrderId}
            />

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

export default AllPreOrders;
