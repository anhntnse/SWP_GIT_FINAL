import React, { useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import SummaryApi from '../common';

function CancelPayment() {

    // const [searchParams, setSearchParams] = useSearchParams();
    // const status = searchParams.get("status");
    // console.log(status);
    const preOrderId = useParams();
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
                    status: 'Cancelled'
                }),
            });

            const dataResponse = await response.json();
            if (dataResponse.success) {
                console.log('Cập nhật thành công !');
                console.log('updated pre-order', dataResponse.data);
            } else {
                console.log('Cập nhật thất bại !');
            }
        } catch (error) {
            console.log('Something wrong !');
        }
    };

    useEffect(() => {
        updatePreOrder();
    }, []);

    return (
        <div style={{ marginTop: '20px', marginLeft: '20px' }}>
            <h1>Thanh toán thất bại</h1>
            <p>Nếu có bất kỳ câu hỏi nào, hãy gửi email tới</p>
            <p>Trở về trang Tạo Link thanh toán</p>
        </div>
    )
}

export default CancelPayment;