import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import { toast } from 'react-toastify';
import moment from 'moment';

import displayINRCurrency from '../helpers/displayCurrency';


const PreOrderModal = ({
    onClose,
    preOrder,
}) => {


    {/**upload product */ }

    return (
        <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[30%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Pre-order Message</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <div>
                    <h1>You must pay <span style={{ fontWeight: '700' }}>50% of the product price</span> in advance to be able to pre-order the product.</h1>
                    <p>Are you sure ?</p>
                </div>
                <div style={{ paddingTop: '30px', width: '100%', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={preOrder}
                    >
                        Pre-order
                    </button>
                    <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PreOrderModal;