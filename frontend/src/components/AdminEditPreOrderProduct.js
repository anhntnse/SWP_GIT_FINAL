import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const AdminEditPreOrderProduct = ({
    onClose,
    productData,
    fetchdata,
}) => {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        productBrand: productData?.brandName,
        productCategory: productData?.category,
        productImage: productData?.productImage || [],
        productDescription: productData?.description,
        productPrice: productData?.price,
        productSellingPrice: productData?.sellingPrice,
        productStock: productData?.quantity_stock,
        productStockForPreOrder: productData?.stockForPreOrder,
        productReleaseDate: productData?.releaseDate,
    });
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const [inputError, setInputError] = useState({});


    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
    }

    const handleDeleteProductImage = async (index) => {
        console.log("image index", index)

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })

    }

    const validateInput = () => {
        let error = {};
        if (!data.productName) {
            error.productName = {
                message: `Please enter the name's product !`,
            };
        }
        if (!data.productBrand) {
            error.productBrand = {
                message: `Please enter the brand's product !`,
            };
        };
        if (!data.productCategory) {
            error.productBrand = {
                message: `Please enter the category's product !`,
            };
        };
        if (!data.productImage) {
            error.productImage = {
                message: `Please enter the images's product !`,
            };
        };
        if (!data.productDescription) {
            error.productDescription = {
                message: `Please enter the description's product !`,
            };
        };
        if (!data.productPrice) {
            error.productPrice = {
                message: `Please enter the price's product !`,
            };
        };
        if (!data.productSellingPrice) {
            error.productSellingPrice = {
                message: `Please enter the selling price's product !`,
            };
        };
        if (!data.productReleaseDate) {
            error.productReleaseDate = {
                message: `Please enter the release date's product !`,
            };
        };
        if (new Date(data.productReleaseDate).getTime() <= Date.now()) {
            error.productReleaseDateInvalid = {
                message: `Invalid release Date. Please Enter another release date !`,
            }
        }
        if (!data.productStockForPreOrder) {
            error.productStockForPreOrder = {
                message: `Please enter the quantity's product for Pre-order !`,
            };
        };
        if (!data.productStock) {
            error.productStock = {
                message: `Please enter the quantity's product for Sell !`,
            };
        };

        return error;
    };

    {/**upload product */ }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.updatePreOrderProduct.url, {
            method: SummaryApi.updatePreOrderProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                ...data,
                productId: productData._id,
            })
        })

        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchdata()
        }

        if (responseData.error) {
            toast.error(responseData?.message)
        }
    }

    return (
        <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name :</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='enter product name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    {inputError?.productName && (
                        <p className='text-red-600 text-xs'>{inputError?.productName?.message}</p>
                    )}

                    <label htmlFor='productBrand' className='mt-3'>Brand Name :</label>
                    <input
                        type='text'
                        id='productBrand'
                        placeholder='enter brand name'
                        value={data.productBrand}
                        name='productBrand'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    {inputError?.productBrand && (
                        <p className='text-red-600 text-xs'>{inputError?.productBrand?.message}</p>
                    )}

                    <label htmlFor='productCategory' className='mt-3'>Category :</label>
                    <select value={data.productCategory} name='productCategory' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                        <option value={""}>Select Category</option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>
                    {inputError?.productCategory && (
                        <p className='text-red-600 text-xs'>{inputError?.productCategory?.message}</p>
                    )}

                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img
                                                        src={el}
                                                        alt={el}
                                                        width={80}
                                                        height={80}
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(el)
                                                        }} />

                                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please upload product image</p>
                            )
                        }
                    </div>
                    {inputError?.productImage && (
                        <p className='text-red-600 text-xs'>{inputError?.productImage?.message}</p>
                    )}

                    <label htmlFor='productPrice' className='mt-3'>Price :</label>
                    <input
                        type='number'
                        id='productPrice'
                        placeholder='enter price'
                        value={data.price}
                        name='productPrice'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    {inputError?.productPrice && (
                        <p className='text-red-600 text-xs'>{inputError?.productPrice?.message}</p>
                    )}


                    <label htmlFor='productSellingPrice' className='mt-3'>Selling Price :</label>
                    <input
                        type='number'
                        id='productSellingPrice'
                        placeholder='enter selling price'
                        value={data.sellingPrice}
                        name='productSellingPrice'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    {inputError?.productSellingPrice && (
                        <p className='text-red-600 text-xs'>{inputError?.productSellingPrice?.message}</p>
                    )}

                    <label htmlFor='productStockForPreOrder' className='mt-3'>Quantity of pre-order products</label>
                    <input
                        type='number'
                        id='productStockForPreOrder'
                        placeholder='enter pre-order product quantity'
                        value={data.productStockForPreOrder}
                        name='productStockForPreOrder'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    {inputError?.productStockForPreOrder && (
                        <p className='text-red-600 text-xs'>{inputError?.productStockForPreOrder?.message}</p>
                    )}

                    <label htmlFor='productStock' className='mt-3'>Quantity of products for sell</label>
                    <input
                        type='number'
                        id='productStock'
                        placeholder='enter product quantity for sell'
                        value={data.productStock}
                        name='productStock'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    {inputError?.productStock && (
                        <p className='text-red-600 text-xs'>{inputError?.productStock?.message}</p>
                    )}

                    <label htmlFor='productReleaseDate' className='mt-3'>Release Date :</label>
                    <input
                        type='Date'
                        id='productReleaseDate'
                        placeholder='enter release date'
                        value={data.productReleaseDate}
                        name='productReleaseDate'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    {inputError?.productReleaseDate && (
                        <p className='text-red-600 text-xs'>{inputError?.productReleaseDate?.message}</p>
                    )}
                    {inputError?.productReleaseDateInvalid && (
                        <p className='text-red-600 text-xs'>{inputError?.productReleaseDateInvalid?.message}</p>
                    )}

                    <label htmlFor='productDescription' className='mt-3'>productDescription :</label>
                    <textarea
                        className='h-28 bg-slate-100 border resize-none p-1'
                        placeholder='enter product productDescription'
                        rows={3}
                        onChange={handleOnChange}
                        name='productDescription'
                        value={data.productDescription}
                    >
                    </textarea>
                    {inputError?.productDescription && (
                        <p className='text-red-600 text-xs'>{inputError?.productDescription?.message}</p>
                    )}
                    <button type='submit' className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
                </form>
            </div>

            {/***display image full screen */}
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }


        </div>
    )
}

export default AdminEditPreOrderProduct;