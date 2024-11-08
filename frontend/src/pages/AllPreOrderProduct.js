import React, { useEffect, useState } from 'react';
import moment from 'moment';
import SummaryApi from '../common';
import UploadPreOrderProduct from '../components/uploadPreOrderProduct';
import AdminEditPreOrderProduct from '../components/AdminEditPreOrderProduct';

const AllPreOrderProduct = () => {
    const [
        openUploadPreOrderProduct,
        setOpenUploadPreOrderProduct
    ] = useState(false);

    const [
        allPreOrderProduct,
        setAllPreOrderProduct
    ] = useState([]);

    const [openEditPreOrderProduct, setOpenEditPreOrderProduct] = useState(false);
    const [editProduct, setEditProduct] = useState();

    const fetchAllPreOrderProduct = async () => {
        const response = await fetch(SummaryApi.allPreOrderProduct.url, {
            method: SummaryApi.allPreOrderProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });
        const dataResponse = await response.json();

        console.log("pre-order product data", dataResponse);

        setAllPreOrderProduct(dataResponse?.data || []);
    };

    useEffect(() => {
        fetchAllPreOrderProduct();
    }, []);

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Pre-Order Product</h2>
                <button className='border-2 border-red-600 text-red-600 hover:bg-gray-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={() => setOpenUploadPreOrderProduct(true)}>Upload Pre-Order Product</button>
            </div>

            {/**all pre-order product */}
            <div className='bg-white py-2 px-4'>
                <table className="w-full userTable">
                    <thead>
                        <tr className="bg-black text-white">
                            <th>Sr.</th>
                            <th>Product Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Selling Price</th>
                            <th>Pre-order Price</th>
                            <th>Quantity</th>
                            <th>Release Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPreOrderProduct.map((product, index) => ( // Change allOrder to currentOrders
                            <tr key={index + product?.productName}>
                                <td>{index + 1}</td> {/* Adjust index for pagination */}
                                <td>{product?.productName}</td>
                                <td>{product?.brandName}</td>
                                <td>{product?.category}</td>
                                <td>{product?.price}</td>
                                <td>{product?.sellingPrice}</td>
                                <td>{Math.ceil(product?.sellingPrice / 2)}</td>
                                <td>{product?.stockForPreOrder}</td>
                                <td>{moment(product?.releaseDate).format("LL")}</td>
                                <td>
                                    <button
                                        className="bg-green-600 text-white font-semibold py-1 px-2 rounded-md shadow hover:bg-green-800 transition duration-200 ease-in-out"
                                        onClick={() => { setOpenEditPreOrderProduct(true); setEditProduct(product) }}
                                    >
                                        Edit
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/**upload pre-order prouct component */}
            {
                openUploadPreOrderProduct && (
                    <UploadPreOrderProduct onClose={() => setOpenUploadPreOrderProduct(false)} fetchData={fetchAllPreOrderProduct} />
                )
            }

            {
                openEditPreOrderProduct && (
                    <AdminEditPreOrderProduct productData={editProduct} onClose={() => setOpenEditPreOrderProduct(false)} fetchdata={fetchAllPreOrderProduct} />
                )
            }
        </div >
    )
}

export default AllPreOrderProduct;