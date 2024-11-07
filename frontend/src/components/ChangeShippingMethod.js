import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import './ChangeShippingMethod.css';

const ChangeShippingMethod = ({ onClose, methodDetails, refreshMethods }) => {
    const [method, setMethod] = useState(methodDetails);
    const [error, setError] = useState({});

    useEffect(() => {
        setMethod(methodDetails);
        setError({});
    }, [methodDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newMethod = { ...method, [name]: value };
        let newError = { ...error };

        // Validation logic
        if (name === "maxDeliveryDays" && Number(value) < Number(newMethod.minDeliveryDays)) {
            newError.maxDeliveryDays = "Max Delivery Days must be greater than or equal to Min Delivery Days.";
        } else if (name === "minDeliveryDays" && Number(value) > Number(newMethod.maxDeliveryDays)) {
            newError.minDeliveryDays = "Min Delivery Days must be less than or equal to Max Delivery Days.";
        } else {
            newError = {}; // Clear errors if inputs are valid
        }

        setError(newError);
        setMethod(newMethod);
    };

    const updateShippingMethod = async () => {
        if (Object.values(error).some(Boolean)) {
            toast.error("Please fix the errors before saving.");
            return;
        }

        try {
            const response = await fetch(`${SummaryApi.updateShippingMethod.url}`, {
                method: SummaryApi.updateShippingMethod.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(method),
            });
            const data = await response.json();

            if (data.success) {
                toast.success("Shipping method updated successfully.");
                refreshMethods();
                onClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to update shipping method.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Edit Shipping Method</h3>
                </div>
                <div className="modal-body">
                    <input 
                        name="name" 
                        value={method.name || ''} 
                        onChange={handleInputChange} 
                        placeholder="Name"
                    />
                    <input 
                        name="price" 
                        type="number" 
                        value={method.price || ''} 
                        onChange={handleInputChange} 
                        placeholder="Price"
                    />
                    <input 
                        name="estimatedDelivery" 
                        value={method.estimatedDelivery || ''} 
                        onChange={handleInputChange} 
                        placeholder="Estimated Delivery"
                    />
                    <input 
                        name="minDeliveryDays" 
                        type="number" 
                        value={method.minDeliveryDays || ''} 
                        onChange={handleInputChange} 
                        placeholder="Min Delivery Days"
                        className={error.minDeliveryDays ? "input-error" : ""}
                    />
                    {error.minDeliveryDays && (
                        <div className="error-message">{error.minDeliveryDays}</div>
                    )}
                    <input 
                        name="maxDeliveryDays" 
                        type="number" 
                        value={method.maxDeliveryDays || ''} 
                        onChange={handleInputChange} 
                        placeholder="Max Delivery Days"
                        className={error.maxDeliveryDays ? "input-error" : ""}
                    />
                    {error.maxDeliveryDays && (
                        <div className="error-message">{error.maxDeliveryDays}</div>
                    )}
                </div>
                <div className="modal-footer">
                    <button 
                        className="save-button" 
                        onClick={updateShippingMethod}
                        disabled={Boolean(error.maxDeliveryDays || error.minDeliveryDays)}
                    >
                        Save
                    </button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ChangeShippingMethod;
