import React from 'react';
import { toast } from 'react-toastify';

function DiscountCard({ data, calbFunc, onClose, disable }) {

    return (
        <>
            <div key={data._id} class="max-w-sm w-full lg:max-w-full lg:flex" style={{ border: '1px solid black', marginBottom: '10px', opacity: disable ? '0.3' : 1 }}>
                <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{}}>
                    <div style={{ width: '100%', height: '100%', fontSize: '45px', backgroundColor: '#f1c40f', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1> - {data.value} %</h1>
                    </div>
                </div>
                <div class="p-4 flex flex-col justify-between leading-normal" style={{ width: '400px' }} >
                    <div class="mb-8">
                        {/* <p class="text-sm text-gray-600 flex items-center">
                        Members only
                    </p> */}
                        <div class="text-gray-900 font-bold text-xl mb-2">Voucher</div>
                        <p class="text-gray-700 text-base">{data.content}</p>
                    </div>
                    <div class="flex items-center">
                        <div class="text-sm">
                            <p class="text-gray-900 leading-none">ECommerce</p>
                            <p class="text-gray-600">Date Exiration: {new Date(data.expirationDate).toLocaleString('en-GB').split(',')[0]}</p>
                        </div>
                    </div>
                </div>
                <div className='p-4' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    {!disable ? (
                        <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick={() => {
                                calbFunc(data);
                                onClose();
                                toast.success('Successfully Applied .');
                            }}
                        >
                            Apply
                        </button>
                    ) :
                        (
                            <div style={{ padding: '20px', fontSize: '30px' }}>Expired</div>
                        )}
                </div>
            </div >
        </>
    )
}

export default DiscountCard;