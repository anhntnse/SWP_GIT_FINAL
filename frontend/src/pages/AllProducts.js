import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20); // Number of products per page

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  // Calculate products to display for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allProduct.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          className='border-2 border-red-600 text-red-600 hover:bg-gray-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => {
            setOpenUploadProduct(true);
            setCurrentPage(1); // Reset to first page when opening upload
          }}
        >
          Upload Product
        </button>
      </div>

      {/* All products */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-hidden'>
        {
          currentProducts.map((product, index) => {
            return (
              <AdminProductCard
                data={product}
                key={index + "allProduct"}
                fetchdata={fetchAllProduct}
              />
            );
          })
        }
      </div>

      {/* Upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={() => {
            fetchAllProduct();
            setCurrentPage(1); // Reset to first page after upload
          }} />
        )
      }

      {/* Pagination */}
      <div className='flex justify-center mt-4'>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
