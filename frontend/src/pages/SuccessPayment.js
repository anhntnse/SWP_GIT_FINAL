import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import SummaryApi from '../common';

function SuccessPayment() {

    const preOrderId = useParams();
    const navigate = useNavigate();
    console.log('pre-order Id: ', preOrderId.preOrderId);

    const updatePreOrder = async () => {
        try {
            const response = await fetch(SummaryApi.updatePreOrder.url, {
                method: SummaryApi.updatePreOrder.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    preOrderId: preOrderId.preOrderId,
                    status: 'Completed'
                }),
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                const res = await fetch(SummaryApi.updateQuantityPreOrderProduct.url, {
                    method: SummaryApi.updateQuantityPreOrderProduct.method,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productId: dataResponse.data.productId,
                        quantity: 1,
                    }),
                });

                if (res.ok) {
                    console.log('Cập nhật thành công !');
                    console.log('updated pre-order', dataResponse.data);
                    toast.success('Successfully Payment .');
                }
            } else {
                console.log('Cập nhật thất bại !');
            };
            navigate('/');
        } catch (error) {
            console.log('Something wrong !');
        }
    };

    updatePreOrder();


    return (
        <div>
        </div>
    )
}

export default SuccessPayment;