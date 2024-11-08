import React from 'react';
import { CgClose } from "react-icons/cg";
import { MdError } from "react-icons/md";

function alertCart({
    onClose,
    data
}) {
    return (
        <div className='fixed w-full h-full bg-slate-500 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center' >
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[40%] overflow-hidden'>
                <div className='flex justify-between items-center pb-1'>
                    <span className='font-bold text-lg text-red-400 me-1'><MdError /></span>
                    <h2 className='font-bold text-lg text-red-400'> Error:</h2>
                    <h2 style={{ fontSize: '20px', marginLeft: '10px', fontWeight: '600' }}>
                        The product you purchased is currently not available.
                    </h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <div className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'>
                    <h1 style={{ fontSize: '15px', textAlign: 'center' }}>Details</h1>
                    <div class="relative overflow-x-auto" style={{ marginTop: '0px' }}>
                        <table class="w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ fontSize: '10px' }}>
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-2">
                                        Product name
                                    </th>
                                    <th scope="col" class="px-6 py-2 text-center">
                                        Quantity in stock
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <tr key={item.productName + index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.productName}
                                            </th>
                                            <td class="px-6 py-4 text-center">
                                                {item.quantityInStock}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default alertCart;