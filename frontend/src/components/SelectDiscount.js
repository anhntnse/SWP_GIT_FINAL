import { useState, useEffect } from 'react';
import { CgClose } from "react-icons/cg";
import DiscountCard from './DiscountCard';

function SelectDiscount(
    {
        onClose,
        callFunc,
    }
) {

    const [discounts, setDiscounts] = useState([]);

    console.log(callFunc);

    // Fetch an user's all discounts
    const fetchAllDiscounts = async () => {
        try {
            const response = await fetch('https://swp-final-backend.onrender.com/api/show-all-discounts',
                {
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            const dataResponse = await response.json();

            // const discounts = dataResponse.data.filter((item, index) => {
            //     return new Date(item.expirationDate).getTime() > Date.now();
            // });

            const discounts = dataResponse.data;

            setDiscounts(discounts || []);

            console.log('discounts: ', discounts);
            console.log('type of discounts: ', typeof dataResponse.data[0]?.expirationDate);
            console.log('discounts: ', new Date(dataResponse.data[0]?.expirationDate).getTime());
            console.log('Date now: ', Date.now());

        } catch (error) {
            console.log(error);
        }


        // setAllProduct(products || []);
    };

    useEffect(() => {
        fetchAllDiscounts();
    }, []);

    return (
        <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-4xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Select Discounts</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <div>
                    <h3>You can choose 1 voucher.</h3>
                </div>
                <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-250px)] overflow-y-scroll' style={{ marginTop: '20px' }}>
                    {
                        discounts.map((item, index) => {
                            if (new Date(item.expirationDate).getTime() > Date.now()) {
                                return <DiscountCard data={item} calbFunc={callFunc} onClose={onClose} />
                            }
                            else {
                                return <DiscountCard data={item} calbFunc={callFunc} onClose={onClose} disable={true} />
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectDiscount;